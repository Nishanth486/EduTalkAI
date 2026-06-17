# EduTalk AI

AI-powered sentence and dialogue generator for language learners. Built with TanStack Start, React, Tailwind CSS, and the Gemini API.

## Features

- Sentence generation with grammar feedback
- Dialogue practice between two personas
- Image-to-sentence descriptions
- Dual language support (English / Tamil)
- Text-to-speech for pronunciation practice

---

## Local Development

**Requirements:** Node.js 20+

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/edutalk-ai.git
cd edutalk-ai

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your Gemini API key

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Getting a Gemini API Key

1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create a new API key
3. Add it to your `.env` as `GEMINI_API_KEY=your_key_here`

---

## Deploy to Vercel

### Option A — Vercel Dashboard (recommended)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. In **Environment Variables**, add:
   - `GEMINI_API_KEY` → your Gemini API key
   - `VITE_BASE_URL` → your Vercel URL (e.g. `https://edutalk-ai.vercel.app`)
4. Click **Deploy** — Vercel auto-detects the `vercel.json` config

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel

# Set environment variables
vercel env add GEMINI_API_KEY
vercel env add VITE_BASE_URL

# Deploy to production
vercel --prod
```

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `GEMINI_API_KEY` | ✅ Yes | Primary Gemini API key |
| `GEMINI_API_KEYS` | Optional | Comma-separated keys for round-robin rotation |
| `GEMINI_MODELS` | Optional | Override Gemini model list (comma-separated) |
| `VITE_BASE_URL` | Optional | Your deployed URL, used in the sitemap |

---

## Project Structure

```
src/
  assets/          Static images
  components/      UI components (shadcn/ui + site layout)
  hooks/           Custom React hooks
  lib/
    i18n.tsx       English / Tamil translations
    edutalk.functions.ts  Server functions (Gemini API calls)
    config.server.ts      Server-only config
  routes/
    index.tsx      Landing page
    workbench.tsx  Sentence / Dialogue / Image modules
    __root.tsx     Root layout + providers
  styles.css       Global Tailwind styles
```

## Tech Stack

- [TanStack Start](https://tanstack.com/start) — SSR framework
- [TanStack Router](https://tanstack.com/router) — type-safe routing
- [React 19](https://react.dev) — UI
- [Tailwind CSS v4](https://tailwindcss.com) — styling
- [shadcn/ui](https://ui.shadcn.com) — component library
- [Google Gemini](https://ai.google.dev) — AI backbone
