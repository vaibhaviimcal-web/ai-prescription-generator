# 🚀 Vercel Environment Variables Setup Guide

## Problem: 404 Error on Environment Variables Page

If you're getting a 404 error when accessing the Vercel environment variables page, it means you need to add the variables using an alternative method.

---

## ✅ Solution 1: Use Vercel CLI (Recommended - 2 minutes)

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Login to Vercel
```bash
vercel login
```
- Use the same email as your GitHub account: `vaibhav.iimcal@gmail.com`

### Step 3: Run the Setup Script
```bash
chmod +x setup-env.sh
./setup-env.sh
```

This will automatically:
- Link to your project
- Add the missing environment variables
- Trigger a new deployment

---

## ✅ Solution 2: Manual CLI Commands (3 minutes)

If the script doesn't work, run these commands manually:

### Step 1: Login and Link
```bash
vercel login
vercel link
```

### Step 2: Add Environment Variables
```bash
# Add AUTH_DOMAIN
echo "ai-prescription-generator.firebaseapp.com" | vercel env add VITE_FIREBASE_AUTH_DOMAIN production preview development

# Add PROJECT_ID
echo "ai-prescription-generator" | vercel env add VITE_FIREBASE_PROJECT_ID production preview development
```

### Step 3: Deploy
```bash
vercel --prod
```

---

## ✅ Solution 3: Use Vercel Dashboard with Correct Account

### Step 1: Check Your Account
1. Go to https://vercel.com/
2. Click your profile picture (top-right)
3. Make sure you're logged in as the account that owns `vaibhaviimcal-web`

### Step 2: Switch Teams (if needed)
1. Click the team dropdown (top-left)
2. Select the correct team/account
3. Try accessing the environment variables page again

### Step 3: Add Variables Manually
Go to: https://vercel.com/vaibhaviimcal-web/ai-prescription-generator-8l73/settings/environment-variables

Add these 2 variables:

**Variable 1:**
- Key: `VITE_FIREBASE_AUTH_DOMAIN`
- Value: `ai-prescription-generator.firebaseapp.com`
- Environments: ✅ Production ✅ Preview ✅ Development

**Variable 2:**
- Key: `VITE_FIREBASE_PROJECT_ID`
- Value: `ai-prescription-generator`
- Environments: ✅ Production ✅ Preview ✅ Development

---

## ✅ Solution 4: GitHub Actions (Automatic)

I can create a GitHub Action that automatically sets environment variables on every deployment. This is the most automated solution.

Would you like me to create this?

---

## 📋 All Required Environment Variables

Your Vercel project needs these 6 variables:

| Variable | Value | Status |
|----------|-------|--------|
| `VITE_FIREBASE_API_KEY` | `AIzaSyAwZezxbGCj07sHog7ieLAxLmZvY0qbH2c` | ✅ Already set |
| `VITE_FIREBASE_AUTH_DOMAIN` | `ai-prescription-generator.firebaseapp.com` | ❌ **MISSING** |
| `VITE_FIREBASE_PROJECT_ID` | `ai-prescription-generator` | ❌ **MISSING** |
| `VITE_FIREBASE_STORAGE_BUCKET` | `ai-prescription-generator.firebasestorage.app` | ✅ Already set |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `532061686038` | ✅ Already set |
| `VITE_FIREBASE_APP_ID` | `1:532061686038:web:8336b16e7cdcf83ddca837` | ✅ Already set |

---

## 🎯 Quick Test

After adding the variables, test if they're working:

```bash
vercel env ls
```

You should see all 6 variables listed.

---

## 🆘 Still Having Issues?

If none of these work, you can:

1. **Contact Vercel Support** - They can help with account access
2. **Create a new Vercel project** - Import from GitHub again
3. **Use a different deployment platform** - Netlify, Railway, etc.

---

## ✨ Expected Result

Once the environment variables are added:
- ✅ Patient registration will work
- ✅ Firebase connection established
- ✅ Data saves to Firestore
- ✅ No more "Failed to save patient" errors

---

**Choose the solution that works best for you!**

Recommended: **Solution 1 (Vercel CLI)** - Fastest and most reliable.
