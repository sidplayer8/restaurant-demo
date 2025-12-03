// Firebase Phone Authentication with reCAPTCHA
console.log("📱 Firebase Phone Auth Loading...");

// Global State
window.recaptchaVerifier = null;
window.confirmationResult = null;

// Initialize reCAPTCHA when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    if (typeof firebase === 'undefined') {
        console.error("❌ Firebase SDK not loaded.");
        return;
    }
    initRecaptcha();
});

function initRecaptcha() {
    if (window.recaptchaVerifier) return;

    try {
        console.log("Creating reCAPTCHA verifier...");
        window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('send-code-btn', {
            'size': 'invisible',
            'callback': (response) => {
                console.log("✅ reCAPTCHA verified");
            },
            'expired-callback': () => {
                console.warn("⚠️ reCAPTCHA expired");
                window.recaptchaVerifier.clear();
                window.recaptchaVerifier = null;
            }
        });

        window.recaptchaVerifier.render().then((widgetId) => {
            console.log("✅ reCAPTCHA rendered. Widget ID:", widgetId);
        });
    } catch (error) {
        console.error("❌ reCAPTCHA init failed:", error);
    }
}

// SEND VERIFICATION CODE
window.sendFirebaseVerificationCode = function (phoneNumber) {
    console.log("📱 Sending verification code...");

    const sendButton = document.getElementById('send-code-btn');
    const countryCode = document.getElementById('country-code')?.value || '+65';
    phoneNumber = phoneNumber.replace(/\D/g, '');
    const fullPhone = countryCode + phoneNumber;

    console.log("📞 Phone:", fullPhone);

    if (sendButton) {
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';
    }

    firebase.auth().signInWithPhoneNumber(fullPhone, window.recaptchaVerifier)
        .then((confirmationResult) => {
            console.log("✅ SMS sent successfully!");
            window.confirmationResult = confirmationResult;

            // Transition UI
            document.getElementById('phone-step').classList.add('hidden');
            document.getElementById('verification-step').classList.remove('hidden');
            document.getElementById('phone-display').innerText = fullPhone;

            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send Verification Code';
            }
        })
        .catch((error) => {
            console.error("❌ SMS send failed:", error);

            if (sendButton) {
                sendButton.disabled = false;
                sendButton.textContent = 'Send Verification Code';
            }

            let errorMsg = "Failed: ";
            if (error.code === 'auth/invalid-app-credential') {
                errorMsg += "reCAPTCHA not working. Try Firebase test numbers or deploy to real domain.";
            } else if (error.code === 'auth/too-many-requests') {
                errorMsg += "Too many requests. Try again later.";
            } else if (error.code === 'auth/captcha-check-failed') {
                errorMsg += "reCAPTCHA failed. Refresh page or use test numbers.";
                try { window.recaptchaVerifier.reset(); } catch (e) { }
            } else {
                errorMsg += error.message || "Unknown error.";
            }

            alert(errorMsg);
        });
};

// VERIFY CODE
window.verifyFirebaseSMSCode = function (code) {
    console.log("🔐 Verifying code...");

    if (!window.confirmationResult) {
        alert("No SMS session found.");
        return;
    }

    window.confirmationResult.confirm(code)
        .then((result) => {
            console.log("✅ Verified! User:", result.user.phoneNumber);
            if (typeof loginWithPhone === 'function') {
                loginWithPhone(result.user.phoneNumber);
            }
        })
        .catch((error) => {
            console.error("❌ Verification failed:", error);
            alert("Invalid code. Try again.");
        });
};

console.log("✅ Real Firebase Phone Auth Ready");
