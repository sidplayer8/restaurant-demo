# Firebase Test Phone Number Setup

## What This Does

This allows you to test phone authentication **without sending real SMS** and **without needing reCAPTCHA to work**.

---

## Step 1: Enable Test Phone Numbers in Firebase Console

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: **restaurant-demo-c2b52**
3. Click **Authentication** in the left menu
4. Click **Sign-in method** tab
5. Scroll down and find **Phone numbers for testing**
6. Click to expand it

---

## Step 2: Add a Test Phone Number

Click **Add phone number** and enter:

- **Phone Number:** `+6590214181` (Singapore format)
- **Verification Code:** `123456`

Click **Add**.

**Important:** The phone number MUST include the country code (+65).

---

## Step 3: How to Use

### On Your Website:

1. **Refresh** the page at http://localhost:8080/
2. Select **Singapore (+65)** from the country dropdown
3. Enter: `90214181`
4. Click **Send Verification Code**
5. Enter code: `123456`
6. Click **Verify Code**
7. **You will be logged in!**

### Important Notes:

- ✅ **No real SMS** will be sent
- ✅ **reCAPTCHA** will auto-resolve (no need to click it)
- ✅ Works even with **network blocks**
- ✅ Can test **unlimited times**
- ✅ **Instant verification** (no waiting)

---

## For Real Testing:

If you want to test with **real phone numbers** and **real SMS**:

1. Remove the test phone number from Firebase Console
2. Turn off testing mode in `firebase-phone-auth.js`:
   ```javascript
   // Comment out this line:
   // firebase.auth().settings.appVerificationDisabledForTesting = true;
   ```
3. Use your actual phone number
4. You'll receive a real SMS

---

## Troubleshooting

**If verification fails:**
1. Make sure the test number is in Firebase Console
2. Use exactly `+6590214181` with code `123456`
3. Clear browser cache and refresh

**Network errors:**
- Test mode works even with network blocks
- The reCAPTCHA willauto-resolve automatically

---

## Current Status

✅ Test Mode: **ENABLED**  
✅ Test Number: `+6590214181`  
✅ Test Code: `123456`  
✅ reCAPTCHA: **Auto-resolves**  

Just add the test number in Firebase Console and you're ready to test!
