# ⚡ Quick Setup - 1 Minute Solution

## 🚨 Problem
Getting "Failed to save patient" error because Firebase environment variables are missing in Vercel.

---

## ✅ Solution (Choose ONE)

### Option 1: Vercel CLI (Recommended - 1 minute)

Open your terminal and run:

```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Go to your project directory
cd ai-prescription-generator

# Add missing environment variables
vercel env add VITE_FIREBASE_AUTH_DOMAIN
# When prompted, enter: ai-prescription-generator.firebaseapp.com
# Select: Production, Preview, Development (all)

vercel env add VITE_FIREBASE_PROJECT_ID
# When prompted, enter: ai-prescription-generator
# Select: Production, Preview, Development (all)

# Deploy
vercel --prod
```

**Done!** Your app will be live in 2-3 minutes.

---

### Option 2: Vercel Dashboard (2 minutes)

1. **Login to Vercel**: https://vercel.com/login
2. **Make sure you're on the right account** (check top-left dropdown)
3. **Go to project settings**: https://vercel.com/vaibhaviimcal-web/ai-prescription-generator-8l73/settings/environment-variables
4. **Click "Add New"** and add:

**First Variable:**
```
Key: VITE_FIREBASE_AUTH_DOMAIN
Value: ai-prescription-generator.firebaseapp.com
Environments: ✅ Production ✅ Preview ✅ Development
```

**Second Variable:**
```
Key: VITE_FIREBASE_PROJECT_ID
Value: ai-prescription-generator
Environments: ✅ Production ✅ Preview ✅ Development
```

5. **Redeploy**: Go to Deployments → Click "..." on latest → Redeploy

---

### Option 3: Use the Setup Script (Automated)

```bash
# Clone the repo (if not already)
git clone https://github.com/vaibhaviimcal-web/ai-prescription-generator.git
cd ai-prescription-generator

# Make script executable
chmod +x setup-env.sh

# Run the script
./setup-env.sh
```

The script will automatically:
- Install Vercel CLI
- Login to Vercel
- Add environment variables
- Deploy your app

---

## 🎯 What This Fixes

After adding these variables:
- ✅ Patient registration works
- ✅ Firebase saves data
- ✅ No more errors
- ✅ Full patient management system functional

---

## 📋 All Environment Variables (For Reference)

Your Vercel project needs these 6 variables:

| Variable | Value |
|----------|-------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAwZezxbGCj07sHog7ieLAxLmZvY0qbH2c` |
| `VITE_FIREBASE_AUTH_DOMAIN` | `ai-prescription-generator.firebaseapp.com` |
| `VITE_FIREBASE_PROJECT_ID` | `ai-prescription-generator` |
| `VITE_FIREBASE_STORAGE_BUCKET` | `ai-prescription-generator.firebasestorage.app` |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `532061686038` |
| `VITE_FIREBASE_APP_ID` | `1:532061686038:web:8336b16e7cdcf83ddca837` |

The first 4 are already set. You only need to add the 2 missing ones (AUTH_DOMAIN and PROJECT_ID).

---

## 🆘 Still Having Issues?

If you get a 404 error on the Vercel dashboard:
1. Check you're logged in with the correct account
2. Use **Option 1 (Vercel CLI)** instead - it always works
3. Or contact me for help

---

**Recommended: Use Option 1 (Vercel CLI) - It's the fastest and most reliable!**
