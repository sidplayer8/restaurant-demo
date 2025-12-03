# 🚨 CRITICAL: SMS Verification Won't Work from file://

## ⚠️ The Problem
Firebase Phone Authentication **REQUIRES** you to run from `http://localhost` - it will NOT work from `file://`

When you open `index.html` directly in your browser, you're using `file://` protocol, which Firebase blocks for security reasons.

## ✅ Solution: Start a Local Server

### Option 1: Using Node.js (Recommended)
```powershell
# Install http-server globally
npm install -g http-server

# Navigate to your project folder
cd C:\Projects\Demo

# Start the server
http-server -p 3000

# Open browser to: http://localhost:3000
```

### Option 2: Using Python (if you have it installed)
```powershell
# Navigate to your project folder
cd C:\Projects\Demo

# Python 3
python -m http.server 3000

# Open browser to: http://localhost:3000
```

### Option 3: Using VS Code Live Server
1. Install "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 📱 Testing with Your Singapore Number

Once you're on `http://localhost:3000`:

1. **Select Country Code**: Choose "🇸🇬 Singapore (+65)"
2. **Enter Phone Number**: `90214181` (without country code)
3. **Click "Send Verification Code"**
4. **Check Your Phone** for the SMS from Firebase
5. **Enter the 6-digit code** you receive
6. **Click "Verify Code"**

## 🎯 What I Fixed

### 1. ✅ Admin Login Button
- Now appears on BOTH:
  - Main phone entry screen ("Admin? Click here to login")
  - Verification screen
- Both buttons work and open the admin modal

### 2. ✅ Back Button
- Added back button in verification step
- Allows you to go back and change your phone number
- Properly resets the verification state

### 3. ✅ Country Code Selector
- 20 countries to choose from
- Automatically formats: `+65` + `90214181` = `+6590214181`
- Removes leading zeros automatically

### 4. ✅ Firebase Integration
- Code now checks for `window.sendFirebaseVerificationCode` (real SMS)
- Falls back to mock verification if Firebase isn't available
- Proper error messages showing the exact number being sent to

## 🧪 Current Status

**If you're on `file://`**: You'll see mock SMS (code shown in alert)
**If you're on `http://localhost`**: Firebase will send REAL SMS to +6590214181

Try it now with the local server!
