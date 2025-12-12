# 🔥 AI Prescription Generator with Firebase

Smart AI-powered prescription generator for Indian doctors with **Firebase backend integration**.

## ✨ Features

### 🎨 **Medical Theme Design**
- Dark sidebar (#1e2936 to #2d3748)
- Teal accents (#0d9488)
- Navy blue (#1e3a8a)
- Professional medical aesthetic

### 👥 **Patient Management** (NEW!)
- ✅ Patient registration with comprehensive details
- ✅ Quick search by name or phone
- ✅ Centralized patient profiles
- ✅ Allergy alerts & chronic condition tracking
- ✅ Emergency contact information

### 💊 **Prescription Features**
- 10+ Indian medicines database
- 5 quick diagnosis templates
- Smart medicine search with autocomplete
- Dosage management (OD, BD, TDS, QID)
- Prescription history tracking

### 🔒 **Secure Storage**
- Firebase Firestore database
- Real-time data synchronization
- Secure patient data storage
- Complete prescription history

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ installed
- Firebase account (free tier works!)

### 1. Clone & Install

\`\`\`bash
git clone https://github.com/vaibhaviimcal-web/ai-prescription-generator.git
cd ai-prescription-generator
npm install
\`\`\`

### 2. Firebase Setup

#### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name: `ai-prescription-generator`
4. Disable Google Analytics (optional)
5. Click "Create Project"

#### Step 2: Enable Firestore Database

1. In Firebase Console, go to **Build > Firestore Database**
2. Click "Create Database"
3. Select **"Start in test mode"** (for development)
4. Choose location: `asia-south1` (Mumbai) or closest to you
5. Click "Enable"

#### Step 3: Get Firebase Config

1. Go to **Project Settings** (gear icon)
2. Scroll to "Your apps" section
3. Click **Web icon** (</>)
4. Register app name: `AI Prescription Generator`
5. Copy the `firebaseConfig` object

#### Step 4: Configure Environment Variables

1. Create `.env` file in project root:

\`\`\`bash
cp .env.example .env
\`\`\`

2. Add your Firebase credentials to `.env`:

\`\`\`env
VITE_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef123456
\`\`\`

### 3. Run Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173)

## 📦 Firestore Database Structure

### Collections

#### **patients**
\`\`\`typescript
{
  id: string (auto-generated)
  name: string
  age: number
  gender: 'Male' | 'Female' | 'Other'
  phone: string
  email?: string
  weight?: number
  height?: number
  bloodGroup?: string
  allergies: string[]
  chronicConditions: string[]
  emergencyContact?: string
  address?: string
  createdAt: Timestamp
  updatedAt: Timestamp
}
\`\`\`

#### **prescriptions**
\`\`\`typescript
{
  id: string (auto-generated)
  patientId: string
  patientName: string
  diagnosis: string
  medicines: Medicine[]
  advice: string
  followUpDays: number
  createdAt: Timestamp
  doctorName?: string
}
\`\`\`

## 🎯 Usage Guide

### 1. Register a Patient

1. Click **"New Patient"** button
2. Fill in patient details:
   - Name, Age, Gender, Phone (required)
   - Weight, Height, Blood Group (optional)
   - Allergies (comma-separated)
   - Chronic conditions (comma-separated)
3. Click **"Register Patient"**

### 2. Search & Select Patient

1. Type patient name or phone in search box
2. Click on patient from dropdown
3. Patient details auto-fill with allergy alerts

### 3. Create Prescription

1. Select a quick template OR enter custom diagnosis
2. Click **"Add Medicine"**
3. Search and select medicines
4. Fill dosage, frequency, duration, timing
5. Add advice and follow-up days
6. Click **"Save & Download"**

### 4. View Patient History

- All prescriptions are automatically saved
- Access via patient profile (coming soon)

## 🔒 Firebase Security Rules

For production, update Firestore rules:

\`\`\`javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Patients collection
    match /patients/{patientId} {
      allow read, write: if request.auth != null;
    }
    
    // Prescriptions collection
    match /prescriptions/{prescriptionId} {
      allow read, write: if request.auth != null;
    }
  }
}
\`\`\`

## 🚀 Deployment

### Deploy to Vercel

1. Push code to GitHub
2. Go to [Vercel](https://vercel.com)
3. Import repository
4. Add environment variables in Vercel dashboard
5. Deploy!

### Environment Variables in Vercel

Add all `VITE_FIREBASE_*` variables from your `.env` file to Vercel:

1. Go to Project Settings > Environment Variables
2. Add each variable
3. Redeploy

## 💰 Cost

### Free Tier (Perfect for small clinics)
- **Firebase**: 1GB storage, 50K reads/day, 20K writes/day
- **Vercel**: 100GB bandwidth
- **Total**: $0/month for ~100-200 patients

### Paid Tier (For larger clinics)
- **Firebase Blaze**: Pay as you go (~$25/month for 500+ patients)
- **Vercel Pro**: $20/month
- **Total**: ~$45/month

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Firebase Firestore
- **Hosting**: Vercel

## 📝 Roadmap

- [x] Patient registration
- [x] Quick search
- [x] Prescription history
- [ ] PDF generation
- [ ] WhatsApp sharing
- [ ] Email prescriptions
- [ ] Analytics dashboard
- [ ] Multi-doctor support
- [ ] Patient portal

## 🤝 Contributing

Contributions welcome! Please open an issue or PR.

## 📄 License

MIT

## 🆘 Support

For issues or questions:
1. Check [Firebase Documentation](https://firebase.google.com/docs)
2. Open a GitHub issue
3. Contact: vaibhav.iimcal@gmail.com

---

**Made with ❤️ for Indian Doctors**
