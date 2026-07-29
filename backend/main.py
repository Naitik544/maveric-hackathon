import os
import sys
from fastapi import FastAPI, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv

# Add backend directory to sys.path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from models import SMSRequest, WhatsAppRequest, CallRequest, AnalysisResponse
from services.gemini_service import analyze_with_gemini

load_dotenv()

app = FastAPI(
    title="SafeBank AI Backend",
    description="AI Financial Safety Assistant API powered by FastAPI and Google Gemini API",
    version="1.2.0"
)

# Configure CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/", tags=["Health Check"])
async def root():
    return {
        "status": "online",
        "service": "SafeBank AI Financial Safety Backend",
        "version": "1.2.0",
        "gemini_api_configured": bool(os.getenv("GEMINI_API_KEY"))
    }

@app.post("/analyze/sms", response_model=AnalysisResponse, tags=["Scam Analyzer"])
async def analyze_sms(payload: SMSRequest):
    if not payload.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="SMS message content cannot be empty."
        )
    return await analyze_with_gemini(payload.message, "SMS Message")

@app.post("/analyze/whatsapp", response_model=AnalysisResponse, tags=["Scam Analyzer"])
async def analyze_whatsapp(payload: WhatsAppRequest):
    if not payload.message.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="WhatsApp message content cannot be empty."
        )
    return await analyze_with_gemini(payload.message, "WhatsApp Message")

@app.post("/analyze/call", response_model=AnalysisResponse, tags=["Scam Analyzer"])
async def analyze_call(payload: CallRequest):
    if not payload.transcript.strip():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Call transcript cannot be empty."
        )
    return await analyze_with_gemini(payload.transcript, "Call Audio Transcript")

@app.post("/report-scam", tags=["Scam Reporting"])
async def report_scam(payload: dict):
    return {
        "status": "success",
        "message": "Scam report logged into SafeBank AI Threat Intelligence Database.",
        "report_id": f"REP-{os.urandom(4).hex().upper()}"
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
