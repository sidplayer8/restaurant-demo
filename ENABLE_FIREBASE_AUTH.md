# 🚨 CRITICAL: Enable Firebase Authentication

Your app code is correct, but **Firebase is blocking the login** because the providers are disabled in the console.

## 1. Open Firebase Console
Go to: [https://console.firebase.google.com/project/restaurant-demo-c2b52/authentication/providers](https://console.firebase.google.com/project/restaurant-demo-c2b52/authentication/providers)

## 2. Enable Phone Authentication (For SMS)
1. Click on the **Phone** row.
2. Toggle the **Enable** switch to **ON**.
3. Click **Save**.

## 3. Enable Google Authentication (For Google Login)
1. Click on the **Google** row.
2. Toggle the **Enable** switch to **ON**.
3. Select your email address in the **Project support email** dropdown.
4. Click **Save**.

## 4. Verify Authorized Domains
1. Click on the **Settings** tab (next to Sign-in method).
2. Scroll down to **Authorized domains**.
3. Make sure `localhost` is in the list.
   - If not, click **Add domain**, type `localhost`, and click **Add**.

## 5. Test Again!
1. Go back to your browser: [http://localhost:8080](http://localhost:8080)
2. Refresh the page.
3. Try **Google Login** or **SMS Verification**.

It should work now! ✅
