# Backend/recommendation/extractor.py

import io
import os
import fitz  # PyMuPDF
import PyPDF2
from fastapi import HTTPException, status
from typing import Optional

def extract_text_from_pdf(file_content: bytes) -> str:
    """Extracts text from PDF bytes using PyPDF2 with PyMuPDF fallback"""
    try:
        # Try PyPDF2 first
        pdf_file = io.BytesIO(file_content)
        reader = PyPDF2.PdfReader(pdf_file)
        text = ""
        for page in reader.pages:
            text += page.extract_text() or ""
        
        if text.strip():
            return text
        
        # Fallback to PyMuPDF if empty
        doc = fitz.open(stream=file_content, filetype="pdf")
        text = ""
        for page in doc:
            text += page.get_text("text") + "\n"
        return text
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to extract text from PDF: {str(e)}"
        )

def extract_text_from_docx(file_content: bytes) -> str:
    """Extracts text from DOCX bytes"""
    try:
        import docx2txt
        doc_file = io.BytesIO(file_content)
        return docx2txt.process(doc_file)
    except ImportError:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="DOCX processing requires docx2txt package"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Failed to extract text from DOCX: {str(e)}"
        )

def extract_cv_text(file_content: bytes, file_extension: str) -> str:
    """Main function to extract text from CV content"""
    file_extension = file_extension.lower()
    
    if file_extension == ".pdf":
        return extract_text_from_pdf(file_content)
    elif file_extension == ".docx":
        return extract_text_from_docx(file_content)
    elif file_extension == ".doc":
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="'.doc' files (old Word format) are not supported. Please use PDF or DOCX."
        )
    else:
        try:
            return file_content.decode('utf-8')
        except UnicodeDecodeError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not decode file content as plain text. Unsupported file type."
            )