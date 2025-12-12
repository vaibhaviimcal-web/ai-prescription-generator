# 🔥 AI Prescription Generator with Firebase

Complete patient management system for Indian doctors with **Firebase backend integration**.

## ✨ Complete Features

### 👥 **Patient Management System**
- ✅ **Patient Registration** - Comprehensive form with all medical details
- ✅ **Quick Search** - Real-time search by name, phone, or email
- ✅ **Patient List View** - Grid view with filters (All, Allergies, Chronic)
- ✅ **Centralized Patient Profile** - Complete patient dashboard with:
  - Personal information (age, gender, contact)
  - Physical measurements (weight, height, BMI calculation)
  - Blood group and vitals
  - Allergy alerts (red warnings)
  - Chronic condition tracking (yellow badges)
  - Emergency contact information
  - Registration and update timestamps
- ✅ **Complete Prescription History** - View all past prescriptions per patient
- ✅ **Edit/Delete Patients** - Full CRUD operations
- ✅ **Secure Firebase Storage** - All data encrypted and stored securely

### 💊 **Prescription Features**
- ✅ 10+ Indian medicines database
- ✅ 5 quick diagnosis templates (Viral Fever, URTI, Gastritis, Diabetes, Hypertension)
- ✅ Smart medicine search with autocomplete
- ✅ Dosage management (OD, BD, TDS, QID)
- ✅ Prescription history tracking per patient
- ✅ Auto-save to Firebase with patient linking
- ✅ Follow-up scheduling

### 🎨 **Medical Theme Design**
- Dark sidebar (#1e2936 to #2d3748)
- Teal accents (#0d9488)
- Navy blue (#1e3a8a)
- Professional medical aesthetic
- Responsive design (mobile-friendly)

### 🔒 **Security & Data**
- Firebase Firestore database
- Real-time data synchronization
- Secure patient data storage
- HIPAA-ready architecture
- Row-level security (when auth enabled)

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

## 🎯 Complete Usage Guide

### 1. Patient Management

#### Register New Patient
1. Click **"New Patient"** button (sidebar or top-right)
2. Fill comprehensive form:
   - **Basic Info**: Name, Age, Gender, Phone (required)
   - **Contact**: Email, Emergency contact, Address
   - **Physical**: Weight, Height (auto-calculates BMI)
   - **Medical**: Blood group, Allergies, Chronic conditions
3. Click **"Register Patient"**
4. Patient saved to Firebase instantly

#### View All Patients
1. Click **"Patients"** in sidebar
2. See grid view of all patients
3. Use filters:
   - **All** - Show all patients
   - **Allergies** - Only patients with allergies
   - **Chronic** - Only patients with chronic conditions
4. Search by name, phone, or email

#### View Patient Profile
1. Click **"View"** on any patient card
2. See complete patient dashboard:
   - **Profile Tab**: All patient details, BMI, vitals, alerts
   - **History Tab**: All past prescriptions with full details
3. Edit or delete patient from profile

### 2. Create Prescription

#### Quick Method (Using Templates)
1. Search and select patient
2. Click a template (e.g., "Viral Fever")
3. Auto-fills diagnosis, medicines, advice
4. Adjust as needed
5. Click **"Save & Download"**

#### Custom Method
1. Search and select patient
2. Enter custom diagnosis
3. Click **"Add Medicine"**
4. Search and select medicines
5. Fill dosage, frequency, duration, timing
6. Add advice and follow-up days
7. Click **"Save & Download"**

### 3. View Patient History

1. Select patient from search or list
2. Click **"View Full Profile"**
3. Switch to **"Prescription History"** tab
4. See all past prescriptions with:
   - Diagnosis
   - Complete medicine list
   - Advice given
   - Follow-up schedule
   - Date and time

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

## 💰 Cost Breakdown

### Free Tier (Perfect for small clinics)
- **Firebase Firestore:**
  - 1GB storage
  - 50,000 reads/day
  - 20,000 writes/day
  - **Good for:** 100-200 patients, 50-100 prescriptions/day

- **Vercel:**
  - 100GB bandwidth
  - Unlimited deployments

**Total: $0/month** ✅

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
- **Date Handling**: date-fns
- **Hosting**: Vercel

## 📱 Key Components

### Patient Management
- `PatientSearch.tsx` - Quick search with dropdown
- `PatientRegistration.tsx` - Comprehensive registration form
- `PatientList.tsx` - Grid view with filters
- `PatientProfile.tsx` - Complete patient dashboard with history

### Services
- `patientService.ts` - Patient CRUD operations
- `prescriptionService.ts` - Prescription management
- `firebase.ts` - Firebase initialization

### Types
- `patient.ts` - TypeScript interfaces for type safety

## 📊 Features Breakdown

### Patient Profile Dashboard
- **Personal Info**: Name, age, gender, contact details
- **Physical Measurements**: Weight, height, BMI (auto-calculated)
- **Medical Alerts**: 
  - Red alerts for allergies
  - Yellow badges for chronic conditions
- **Vitals Display**: Blood group, BMI category
- **Complete History**: All prescriptions with full details
- **Actions**: Edit, Delete, Create new prescription

### Patient List View
- **Grid Layout**: Responsive card-based design
- **Smart Filters**: All, Allergies only, Chronic conditions only
- **Real-time Search**: Name, phone, email
- **Quick Actions**: View profile, Create prescription
- **Visual Indicators**: Allergy warnings, chronic condition badges
- **Patient Count**: Shows total and filtered counts

### Prescription History
- **Chronological Order**: Latest prescriptions first
- **Complete Details**: Diagnosis, medicines, advice, follow-up
- **Medicine Breakdown**: Dosage, frequency, duration, timing
- **Date Tracking**: Exact date and time of prescription
- **Patient Linking**: All prescriptions linked to patient ID

## 📝 Roadmap

- [x] Patient registration
- [x] Quick search
- [x] Patient list view
- [x] Centralized patient profiles
- [x] BMI calculation
- [x] Prescription history
- [x] Edit/Delete patients
- [x] Allergy alerts
- [x] Chronic condition tracking
- [ ] PDF generation with clinic branding
- [ ] WhatsApp sharing
- [ ] Email prescriptions
- [ ] Analytics dashboard
- [ ] Multi-doctor support
- [ ] Patient portal
- [ ] Appointment scheduling
- [ ] Lab report integration

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

**Live Demo:** https://ai-prescription-generator-8l73-bxktwd4et.vercel.app
