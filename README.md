# Salesforce Architect Group, Noida

Community website for the Salesforce Architect Group, Noida (India): about, leadership, volunteers, events, a Twibbonize-style Poster Studio, and a link to the Jovvix quiz.

It is a static site with no build step. Images are stored separately in `assets/` and below-the-fold photos load lazily.

## Project structure
- `index.html`: page content, metadata, and structured data
- `css/styles.css`: site theme, layout, and responsive styles
- `js/config.js`: event, volunteer, topic, quiz, and poster content
- `js/site.js`: page content, navigation, theme, and topic interactions
- `js/poster-studio.js`: poster canvas, photo controls, and sharing
- `assets/`: community and event images

The JavaScript files are regular browser scripts, loaded in dependency order: `config.js`, `poster-studio.js`, then `site.js`. Keep them as separate scripts when adding features; no bundler or local install is required.

## Run locally
Open `index.html` in a browser.

## Deploy with GitHub Pages
Settings → Pages → Deploy from a branch → `main` / `(root)`.

## Update content
Edit `js/config.js` to update the quiz URL, Twibify campaign, upcoming events, poster details, volunteers, or topic descriptions. Keep image paths relative to the project root (for example, `assets/event-photo.jpg`).
