# 🌐 Network Access Setup - COMPLETE!

## ✅ Server is Now Running on Your Local Network!

### 📱 Access URLs:

**From this computer:**
- http://localhost:8080/

**From your phone or other devices on the same WiFi:**
- **http://192.168.18.70:8080/**

---

## 📋 Step-by-Step: Test on Your Phone

### 1. **Make Sure Your Phone is on the Same WiFi**
   - Check that your phone is connected to the same WiFi network as this computer

### 2. **Open Browser on Your Phone**
   - Open Safari (iPhone) or Chrome (Android)

### 3. **Enter the Network URL**
   - Type: `http://192.168.18.70:8080/`
   - Press Go/Enter

### 4. **Test the SMS Verification**
   - Select country: 🇸🇬 Singapore (+65)
   - Enter phone: 90214181
   - Click "Send Verification Code"
   - **Check if the reCAPTCHA badge appears in the bottom-right corner!**

---

## 🔥 Important: Add IP to Firebase Authorized Domains

Firebase might block the IP address. If you get an error, you need to authorize it:

### Steps:

1. **Go to Firebase Console:**
   https://console.firebase.google.com/project/restaurant-demo-c2b52/settings/general

2. **Scroll down to "Authorized domains"**

3. **Click "Add domain"**

4. **Enter:** `192.168.18.70`

5. **Click "Add"**

6. **Try again on your phone**

---

## 🎯 What to Test:

### On Your Phone:
1. ✅ Does the page load correctly?
2. ✅ Does the reCAPTCHA badge appear in bottom-right corner?
3. ✅ Can you click "Send Verification Code"?
4. ✅ Do you get to the code entry page?
5. ✅ Does the SMS arrive on your phone?

---

## 🔧 Troubleshooting:

### If the page doesn't load:
- Check Windows Firewall settings
- Make sure port 8080 is allowed
- Try: `http://192.168.42.1:8080/` (your other IP)

### If you get "Domain not authorized" error:
- Add `192.168.18.70` to Firebase authorized domains (see above)

### If reCAPTCHA still doesn't load:
- Your phone might also have network issues
- Try using mobile data instead of WiFi
- Or use Firebase Test Phone Numbers (see SMS_STATUS_REPORT.md)

---

## 🚀 Quick Test Commands:

**To stop the server:**
- Press `Ctrl+C` in the terminal

**To restart the server:**
```powershell
node server.js
```

**To check if server is running:**
- Open http://localhost:8080/ on this computer
- Open http://192.168.18.70:8080/ on your phone

---

## 📱 QR Code (Optional):

If you have a QR code generator, create one for:
```
http://192.168.18.70:8080/
```

Then scan it with your phone camera for quick access!

---

## ✅ Next Steps:

1. **Test on your phone** using http://192.168.18.70:8080/
2. **Check if reCAPTCHA works** on the phone
3. **If it works:** Your computer has the network issue
4. **If it doesn't work:** Add IP to Firebase or use Test Phone Numbers

Let me know what happens when you test on your phone!
