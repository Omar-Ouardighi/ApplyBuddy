from fastapi import FastAPI, File, Form, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PyPDF2 import PdfReader
from llm import ApplyBuddy
import io

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-cover-letter/")
async def generate_cover_letter(
    cv_pdf: UploadFile = File(...), 
    job_description: str = Form(...)
) -> JSONResponse:
    try:
        cv_text = extract_text_from_pdf(cv_pdf.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF file: {e}")
        
    llm = ApplyBuddy()
    cover_letter = llm.generate_cover_letter(cv_text, job_description)
    return JSONResponse(content={"cover_letter": cover_letter})

@app.post("/job-fit-analysis/")
async def job_fit_analysis(
    cv_pdf: UploadFile = File(...), 
    job_description: str = Form(...)
) -> JSONResponse:
    try:
        cv_text = extract_text_from_pdf(cv_pdf.file)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error reading PDF file: {e}")
    
    llm = ApplyBuddy()
    job_fit_assessment = llm.job_fit_analysis(cv_text, job_description)
    return JSONResponse(content={"job_fit_analysis": job_fit_assessment})

# Helper function to extract text from PDFs
def extract_text_from_pdf(pdf_file: io.BytesIO) -> str:
    reader = PdfReader(pdf_file)
    text = ""
    for page in reader.pages:
        text += page.extract_text() or ""
    return text