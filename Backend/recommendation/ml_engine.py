# Backend/recommendation/ml_engine.py

import spacy
from spacy.matcher import PhraseMatcher
from skillNer.general_params import SKILL_DB
from skillNer.skill_extractor_class import SkillExtractor
import PyPDF2
import fitz  # PyMuPDF
import warnings
import pandas as pd
import torch
import numpy as np
from sentence_transformers import SentenceTransformer, util
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from typing import List
from recommendation.models import RecommendedJob
import os
import json

# Initialize global variables
nlp = None
skill_extractor = None
model = None
job_embeddings = None
df = None

def initialize_ml_components():
    """Initialize ML components once at startup"""
    global nlp, skill_extractor, model
    
    warnings.filterwarnings("ignore", message="\\[W008\\]")
    
    # Load SpaCy model
    nlp = spacy.load("en_core_web_lg")
    
    # Initialize SkillExtractor
    try:
        skill_extractor = SkillExtractor(nlp, SKILL_DB, PhraseMatcher)
    except Exception as e:
        print(f"Warning: Could not initialize SkillExtractor: {e}")
        skill_extractor = None
    
    # Load SentenceTransformer model
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    model = SentenceTransformer('all-MiniLM-L6-v2', device=device)
    
    # Load job data
    load_job_data()

def load_job_data():
    """Load job data and precompute embeddings"""
    global df, job_embeddings
    
    # Load job dataset
    df = pd.read_csv("camhr_cleaned_data.csv")
    df['job_text_lower'] = df['job_text'].fillna('').str.lower()
    
    # Load or compute embeddings
    embeddings_file = "job_embeddings.npy"
    if os.path.exists(embeddings_file):
        job_embeddings = torch.tensor(np.load(embeddings_file))
    else:
        job_embeddings = model.encode(df['job_text'].tolist(), 
                                    convert_to_tensor=True, 
                                    batch_size=32, 
                                    show_progress_bar=True)
        np.save(embeddings_file, job_embeddings.cpu().numpy())

def extract_skills_from_text(text: str) -> List[str]:
    """Extract skills from text using both NLP and custom keywords"""
    nlp_skills = set()
    custom_skills = set()
    
    # Extract skills using SkillExtractor (NLP)
    if skill_extractor:
        try:
            annotations = skill_extractor.annotate(text)
            full_matches = annotations["results"].get("full_matches", [])
            ngram_matches = annotations["results"].get("ngram_scored", [])
            
            for match in full_matches + ngram_matches:
                if "doc_node_value" in match:
                    nlp_skills.add(match["doc_node_value"])
        except Exception as e:
            print(f"Error using SkillExtractor: {e}")
    
    # Extract skills using custom keywords
    custom_skills_list = load_skills_from_json()
    custom_skills = set(skill for skill in custom_skills_list if skill.lower() in text.lower())
    
    # Combine and normalize skills
    all_skills = nlp_skills.union(custom_skills)
    normalized_skills = set(skill.strip().lower() for skill in all_skills)
    
    # Filter out single-letter skills
    ignore = ["c", "d", "m", "a", "b", "e", "f", "g", "h", "i", 
              "j", "k", "l", "n", "r", "o", "p", "q", "s", "t", 
              "u", "v", "w", "x", "y", "z"]
    
    return sorted([s for s in normalized_skills if s not in ignore])

def load_skills_from_json(file_path: str = "skills.json") -> List[str]:
    """Load custom skills from JSON file"""
    try:
        with open(file_path, "r", encoding="utf-8") as file:
            data = json.load(file)
            return data.get("skills", [])
    except Exception as e:
        print(f"Could not load custom skills from JSON: {e}")
        return []

def get_job_recommendations_from_cv_text(cv_text: str) -> List[RecommendedJob]:
    """Main function to get job recommendations from CV text"""
    if model is None or df is None:
        initialize_ml_components()
    
    # Extract skills from CV
    cv_skills = extract_skills_from_text(cv_text)
    cv_skills_set = set(skill.lower() for skill in cv_skills)
    cv_text_processed = ' '.join(cv_skills_set)
    
    # Generate embeddings and compute similarity
    cv_embedding = model.encode(cv_text_processed, convert_to_tensor=True)
    cosine_scores = util.cos_sim(cv_embedding, job_embeddings)[0]
    df['bert_match_score'] = cosine_scores.cpu().numpy()
    
    # Compute TF-IDF similarity
    texts = df['job_text'].tolist() + [cv_text_processed]
    tfidf_vectorizer = TfidfVectorizer()
    tfidf_matrix = tfidf_vectorizer.fit_transform(texts)
    cv_vector = tfidf_matrix[-1]
    job_vectors = tfidf_matrix[:-1]
    cosine_scores_tfidf = cosine_similarity(cv_vector, job_vectors).flatten()
    df['tfidf_match_score'] = cosine_scores_tfidf
    
    # Combine scores
    df['final_score'] = 0.6 * df['bert_match_score'] + 0.4 * df['tfidf_match_score']
    
    # Get matched skills
    def match_skills(job_text):
        return {skill for skill in cv_skills_set if skill in job_text.lower()}
    
    df['matched_skills'] = df['job_text'].apply(match_skills)
    
    # Sort and filter
    df_sorted = df.sort_values(by='final_score', ascending=False)
    top_matches = df_sorted[df_sorted['final_score'] > 0.3]
    top_matches = top_matches.drop_duplicates(subset=['Company Name', 'Job Title'], keep='first')
    
    # Convert to RecommendedJob models
    recommendations = []
    for _, row in top_matches.head(5).iterrows():
        recommendations.append(RecommendedJob(
            title=row['Job Title'],
            company=row['Company Name'],
            location=row["Location"],  # Add if available in your data
            term=row["Term"],      # Add if available in your data
            salary=row['Salary'],    # Add if available in your data
            skills=list(row['matched_skills']),
            match=f"{row['final_score']*100:.0f}%",
            posted=row['Publish Date'],     # Add if available in your data
            link=row['Link URL']    # Add if available in your data
        ))
    
    return recommendations