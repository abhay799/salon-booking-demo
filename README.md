# Élan Studio — salon booking / WhatsApp demo

A responsive Next.js App Router + TypeScript + Tailwind project showcasing a fictional salon. Uses CSS artwork so no stock-image licensing or external image dependencies are required.

**Important:** This is an appointment **request** demo, not a live booking system. There is no inventory, slot locking, database, admin panel, automatic confirmation, or actual salon. The business, opening hours, and prices are fictional. The site has `noindex` metadata until adapted for a real client.

## Run on Windows PowerShell or WSL

```bash
npm install
npm test
npm run lint
npm run build
npm run dev
```

Open http://localhost:3000.

## WhatsApp integration

Copy `.env.example` to `.env.local`. Set `NEXT_PUBLIC_SALON_WHATSAPP` to the **authorized business-owned** WhatsApp number in international format without plus, spaces or punctuation, e.g. `919876543210`. Restart the server. Without a number the form safely stays in demo mode and never sends a request.

The client constructs a pre-filled WhatsApp message. It opens WhatsApp; the visitor must manually send the message, and the salon must manually confirm. Do not claim live availability. Entered data is not stored by this app, but when the visitor sends it on WhatsApp it is handled by WhatsApp and the receiving business.

## Deploy to Vercel

1. Create a fresh GitHub repository and push these files (never commit `.env.local`).
2. Import the repository in Vercel or run `npx vercel` and then `npx vercel --prod`.
3. In Vercel project Settings > Environment Variables, enter `NEXT_PUBLIC_SALON_WHATSAPP` only after the business approves the contact number. Redeploy after changing a `NEXT_PUBLIC_` variable.
4. Test on iOS/Android/desktop, validate WhatsApp handoff and show visible booking disclaimers.

## Before a real customer goes live

Replace the fictional branding, content, prices, location, hours, imagery and SEO. Get client signoff. Confirm what happens to form data, add proper privacy and contact information, consider consent requirements, accessibility and end-to-end tests, and implement real scheduling with a database, capacity checks, authentication and double-booking prevention if confirmed appointments are promised. For a production domain enable indexing only after real content and ownership are verified.
