# 🛡️ SafeBank AI — AI Financial Safety Assistant for India.

> ***Empowering Senior Citizens & Citizens across Gujarat and India against Digital Banking Fraud with Multi-Lingual AI Intelligence.***

---

## 🚀 Key Highlights & Unique Features




- **🌐 Multi-Lingual Regional Support (English, Hindi - हिंदी, Gujarati - ગુજરાતી)**
  - Seamless 1-click real-time UI translation specifically tailored for users and senior citizens in Gujarat and across India.
- **📱 Real-Time SMS & WhatsApp Scam Checkers**
  - Instant 300ms evaluation of suspicious URLs (`bit.ly`, `fake-bank.in`), artificial urgency triggers, and KYC / OTP theft attempts.
- **🎙️ Live Mic Voice Recorder & Audio Vishing Analyzer**
  - Built-in `MediaRecorder` audio player capturing real microphone speech with Web Speech API transcription to detect impersonating bank officers, CBI digital arrest calls, and remote access app traps (AnyDesk/TeamViewer).
- **💳 NPCI & Cyber Crime UPI / QR Code Fraud Verifier**
  - Verify suspicious UPI VPAs (`sbi-kyc-verify@ybl`, `paytm-refund@okicici`) against reported threat handles before making transfers.
- **🚨 1-Tap National Cyber Crime Helpline (1930) Direct Integration**
  - Quick dial `1930` for Golden Hour money recovery and direct link to official Govt reporting portal (`cybercrime.gov.in`).
- **🗄️ Full Audit History & Prisma PostgreSQL Threat Database**
  - Log scan reports, audit histories, and scammer numbers into persistent DB storage for community-wide protection.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend Framework** | Next.js 16 (App Router & Turbopack), React 19, TypeScript |
| **Styling & Design Token** | Glassmorphism, Ambient Mesh Gradients, Tailwind CSS, Framer Motion |
| **AI Threat Engine** | Google Gemini AI (`gemini-1.5-flash`), Python FastAPI |
| **Authentication** | Clerk Auth (`@clerk/nextjs`) |
| **Database & ORM** | PostgreSQL, Prisma ORM (`User`, `AnalysisHistory`, `ScamReport`) |
| **Audio Processing** | Web Speech API, MediaRecorder Audio Blobs |

---

## 📦 Getting Started & Local Installation

### Prerequisites
- Node.js v18+ & `npm`
- Python 3.9+ & `pip`

### 1. Clone the Repository
```bash
git clone https://github.com/Naitik544/maveric-hackathon.git
cd maveric-hackathon
```

### 2. Frontend Setup (Next.js)
```bash
# Install dependencies
npm install

# Start Next.js development server (runs on http://localhost:3000)
npm run dev
```

### 3. Backend Setup (FastAPI & Gemini AI Engine)
```bash
cd backend

# Install Python requirements
pip install -r requirements.txt

# Start FastAPI server (runs on http://localhost:8000)
python -m uvicorn main:app --host 0.0.0.0 --port 8000
```

---

## 🔌 Backend API Endpoints

- `POST /analyze/sms` — Scans SMS text for phishing links and urgency signals.
- `POST /analyze/whatsapp` — Analyzes WhatsApp chats and cash prize lottery fraud.
- `POST /analyze/call` — Evaluates speech transcripts & audio call recordings for vishing.
- `POST /report-scam` — Registers community scammer numbers and phishing VPAs.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for details.

---

<p align="center">Made with ❤️ for a safer digital India.</p>
