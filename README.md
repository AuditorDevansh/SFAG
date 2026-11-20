# Salesforce Architect Group, Noida

Next.js website for the Salesforce Architect Group, Noida (India): community information, events, a browser-based Poster Studio, and an SFAG-branded quiz experience at `/quiz`.

The quiz page is a branded entry point to the existing quiz service; live games and public quizzes continue to run there. Set `NEXT_PUBLIC_QUIZ_SERVICE_URL` to change its base URL.
The admin portal links to the existing platform’s authenticated quiz creation, library, live session, category, and reports screens. Sign-in is handled by that service; this static SFAG site does not store admin credentials.

## Project structure
- `app/page.js`: community homepage
- `app/quiz/page.js`: SFAG Quiz landing page and live-code form
- `app/admin/page.js`: quiz management portal
- `app/admin/login/page.js`: admin sign-in handoff to the quiz service
- `app/layout.js`: site metadata, fonts, and structured data
- `css/styles.css`: community site theme and layout
- `public/js/`: browser scripts for the existing Poster Studio and homepage interactions
- `public/assets/`: community and event images

## Run locally
1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env.local` and set the quiz-service URL if needed.
3. Run `npm run dev` and open the local URL printed by Next.js.

## Deploy with GitHub Pages
This repository is configured for GitHub Pages from `main` / root. Run `npm run build:pages` to build the static export and copy it to the repository root, then commit and push the changes. `public/CNAME` preserves the custom domain, and `public/.nojekyll` keeps Next.js assets from being processed by Jekyll.

## Update content
Edit `public/js/config.js` to update the Twibify campaign, upcoming events, poster details, volunteers, or topic descriptions. Keep image paths in the format `/assets/event-photo.jpg`.
