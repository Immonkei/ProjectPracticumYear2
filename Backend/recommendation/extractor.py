# Backend/recommendation/extractor.py

import io
import os
from fastapi import HTTPException, status

# Import the necessary libraries
from PyPDF2 import PdfReader # Use PdfReader for PyPDF2 v2.x. If you get an error, try PdfFileReader for older PyPDF2 versions.
from docx import Document

def extract_text_from_pdf(file_content: bytes) -> str:
    """
    Extracts text from a PDF file's bytes content.
    """
    try:
        pdf_file = io.BytesIO(file_content)
        reader = PdfReader(pdf_file) # For PyPDF2 v2.x and later
        # reader = PdfFileReader(pdf_file) # For older PyPDF2 v1.x (if PdfReader doesn't work)
        
        text = ""
        for page in reader.pages:
            text += page.extract_text() or "" # .extract_text() returns None for empty pages
        return text
    except Exception as e:
        # It's good to log the actual error for debugging
        print(f"Error extracting text from PDF: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to extract text from PDF file. It might be corrupted or in an unsupported format."
        )

def extract_text_from_docx(file_content: bytes) -> str:
    """
    Extracts text from a DOCX (Word) file's bytes content.
    """
    try:
        doc_file = io.BytesIO(file_content)
        document = Document(doc_file)
        text = ""
        for para in document.paragraphs:
            text += para.text + "\n"
        return text
    except Exception as e:
        print(f"Error extracting text from DOCX: {e}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Failed to extract text from DOCX file. It might be corrupted or an old .doc format."
        )

def extract_cv_text(file_content: bytes, file_extension: str) -> str:
    """
    Main function to extract text from CV content based on file extension.
    """
    file_extension = file_extension.lower() # Ensure lowercase for comparison

    if file_extension == ".pdf":
        return extract_text_from_pdf(file_content)
    elif file_extension == ".docx":
        return extract_text_from_docx(file_content)
    elif file_extension == ".doc":
        # Handling .doc (old Word format) is significantly more complex than .docx.
        # It's often recommended to convert them to .docx or PDF externally,
        # or use a more specialized library/service.
        # For simplicity, we'll raise an error for now.
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="'.doc' files (old Word format) are not directly supported for text extraction. Please use .pdf or .docx files."
        )
    else:
        # Fallback for plain text files or unhandled types if any make it through
        # In a real app, you might want to specifically check for "text/plain" mimetype
        # but for robustness, it's safer to reject unknown types if not explicitly supported.
        try:
            return file_content.decode('utf-8')
        except UnicodeDecodeError:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Could not decode file content as plain text. Unsupported or binary file type."
            )