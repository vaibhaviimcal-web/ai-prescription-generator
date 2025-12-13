#!/bin/bash

# Setup Environment Variables for Vercel
# Run this script to add missing Firebase environment variables

echo "🔥 Setting up Firebase Environment Variables for Vercel..."

# Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo "❌ Vercel CLI not found. Installing..."
    npm install -g vercel
fi

# Login to Vercel (if not already logged in)
echo "📝 Please login to Vercel..."
vercel login

# Link to project
echo "🔗 Linking to project..."
vercel link --yes

# Add missing environment variables
echo "➕ Adding VITE_FIREBASE_AUTH_DOMAIN..."
vercel env add VITE_FIREBASE_AUTH_DOMAIN production preview development <<EOF
ai-prescription-generator.firebaseapp.com
EOF

echo "➕ Adding VITE_FIREBASE_PROJECT_ID..."
vercel env add VITE_FIREBASE_PROJECT_ID production preview development <<EOF
ai-prescription-generator
EOF

echo "✅ Environment variables added successfully!"
echo "🚀 Triggering redeploy..."
vercel --prod

echo "✨ Done! Your app will be live in 2-3 minutes."
