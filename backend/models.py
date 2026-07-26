from pydantic import BaseModel, Field
from typing import List, Optional

class SMSRequest(BaseModel):
    message: str = Field(..., description="The raw SMS message text to analyze")

class WhatsAppRequest(BaseModel):
    message: str = Field(..., description="The raw WhatsApp message text to analyze")
    sender_info: Optional[str] = Field(None, description="Optional sender header or number")

class CallRequest(BaseModel):
    transcript: str = Field(..., description="The speech-to-text transcript or audio notes to analyze")
    caller_id: Optional[str] = Field(None, description="Optional caller phone number")

class AnalysisResponse(BaseModel):
    riskScore: int = Field(..., ge=0, le=100, description="Fraud risk score percentage from 0 to 100")
    riskLevel: str = Field(..., description="High Risk, Medium Risk, Low Risk, or Safe")
    scamCategory: str = Field(..., description="Category of fraud (e.g. Bank KYC Phishing, Electricity Bill Scam, Safe Message, etc.)")
    confidence: float = Field(..., ge=0.0, le=100.0, description="AI confidence score percentage")
    reasons: List[str] = Field(..., description="List of reasons and threat indicators detected")
    safetyAdvice: List[str] = Field(..., description="List of recommended safety steps for the user")
    summary: str = Field(..., description="Executive summary of the AI analysis")
