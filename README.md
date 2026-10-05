# Rhealyn Vasquez — Static Portfolio

A responsive React and Vite portfolio with a futuristic charcoal/lime design, light and dark themes, an animated portrait, scroll reveals, and local SVG project concepts. No database or backend is connected.

Run `npm install` once, then `npm run dev`. Use `npm run build` for the production site and `npm run lint` for code checks. In Windows PowerShell with scripts disabled, use `npm.cmd` instead of `npm`.

All twelve SQL tables are represented in `src/data.js` with their original column names. `getPortfolio()` resolves User → Profile and each Profile’s projects, media, skills, analytics, experience, education, and social links through their IDs. Comments reference User and Project; endorsements reference User and Skills; messages reference the demo sender and receiver Profile. Date columns use ISO dates, ongoing experience has a null end date, and endorsement counts come from related records. `password` is an inert sample value; there is no login or credential storage.

Presentation-only details (portrait, project tags, tools, and descriptions for the expertise cards) are separate from the schema records. Project previews are local SVG illustrations of concepts, rather than screenshots of deployed products. Live demo URLs are null until real links are supplied. Social URLs point to the platform homepages and are labeled as placeholders.

The theme persists in localStorage. Comments, endorsements, and demo messages also persist in this browser using the `rv-*-v1` storage keys. They are not sent anywhere, and the interface explicitly identifies them as demo data. Endorsements toggle a single record per skill and demo user. Contact messages can be cleared from the form; the email link opens an email app for real contact.

To customize, update the records in `src/data.js`, replace `src/assets/pfp.jpg`, and add real URLs to `Project.demo_url` and `Social_Link.url`. Respect `Profile.is_public` to show or hide the portfolio. Clear site storage in your browser to reset the demo.

Animations respect reduced-motion settings. Navigation supports a mobile menu, keyboard focus, and a skip link. Project dialogs use native modal focus management and close with Escape.
