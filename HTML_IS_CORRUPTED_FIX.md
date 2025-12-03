## URGENT: index.html is Corrupted

The  HTML file has become corrupted due to editing errors. The critical missing elements are:

1. **`<div id="recaptcha-container"></div>`** - This is REQUIRED for Firebase Phone Auth
2. Proper closing tags for verification step
3. Proper closing tags for login form and login view

## To Fix Manually:

Open `index.html` and find line ~96 (where the "Verify Code" button is).

After the "Verify Code" button, you should have:
```html
                        </button>
                        <p class="disclaimer" style="margin-top: 16px;">
                            <a href="#" id="admin-login-link"
                                style="color: var(--primary); text-decoration: none;">Admin? Click here to login</a>
                        </p>
                    </div>
                </form>

                <!-- reCAPTCHA container (VISIBLE for real SMS) -->
                <div id="recaptcha-container"></div>
                <p class="recaptcha-instruction">
                    <span class="material-icons-round">verified_user</span>
                    Complete the security check above to send REAL SMS
                </p>
            </div>
        </section>

        <!-- Admin Login Modal -->
```

## Or Use Test Phone Numbers Instead

Since the HTML is corrupted, the easiest solution is to use TEST PHONE NUMBERS in Firebase:

1. Go to: https://console.firebase.google.com/project/restaurant-demo-c2b52/authentication/providers
2. Click "Phone" provider
3. Scroll to "Phone numbers for testing"
4. Add: `+6590214181` → Code: `123456`
5. Save

Then on localhost:8080:
- Enter: 90214181
- When prompted for code, enter: 123456
- You'll be logged in (no HTML fix needed!)

This bypasses the reCAPTCHA requirement entirely.
