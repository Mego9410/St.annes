# St. Anne's Church, Chingford – Website

Modern redesign of [stannee4.org.uk](https://www.stannee4.org.uk/), built with React, TypeScript, Vite, Tailwind CSS, and shadcn-style components. All content and features from the original site are preserved across 9 consolidated pages.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview   # preview production build
```

## Pages

- **Home** – Hero, vision, noticeboard (newssheet, easyfundraising, easysearch), orders of service, safeguarding
- **Services & Events** – Weekly services, events diary
- **News** – Weekly newsheet, Hatch Herald / St Anne's Record
- **Give** – Parish Giving (PGS), easyfundraising, easysearch
- **Church Centre** – Regular events table
- **Environment** – Eco Church, Creation Care, environment PDFs, Environmental Challenges
- **About** – Who's Who, St Anne (patron saint)
- **Visit & Contact** – Location (address, transport, map), contact form
- **Resources** – Parish policies (PDFs), useful links

## Contact form

The contact form on **Visit & Contact** is a placeholder. To receive messages, wire it to one of:

- [Formspree](https://formspree.io/) – use the form `action` URL
- [Netlify Forms](https://docs.netlify.com/forms/setup/) – add `netlify` to the form
- A serverless function (e.g. Vercel/Netlify) that sends email via SendGrid/Resend

## Images

The hero uses the existing image from the live site (`https://www.stannee4.org.uk/images/IMG_5545.jpg`). To host images locally, add them under `public/images/` and update references in the code.

## Tech stack

- React 19, TypeScript, Vite 7
- React Router 7
- Tailwind CSS 3.4, tailwindcss-animate
- Cormorant Garamond (display) + Source Sans 3 (body) via Google Fonts
