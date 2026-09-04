# Environment Variables Required

Add these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Value |
|----------|-------|
| GMAIL_USER | soumyashipower@gmail.com |
| GMAIL_APP_PASSWORD | (16-char Gmail App Password) |
| ADMIN_EMAIL | soumyashipower@gmail.com |
| NEXT_PUBLIC_SITE_URL | https://www.soumyashipower.in |

## How to get Gmail App Password
1. Go to myaccount.google.com
2. Security → 2-Step Verification (enable if not on)
3. Security → App Passwords
4. Select: Mail + Other (type "Soumyashi Website")
5. Copy the 16-character password
6. Add as GMAIL_APP_PASSWORD in Vercel

## Testing locally
Create frontend/.env.local with above values
Run: cd frontend && npm run dev
Test each form submission
