# 🌹 Romantic Birthday Surprise Website for babygirl

A luxurious, cinematic, dark red and burgundy romantic birthday website with serverless passcode authentication, faceless photography, and complete love letter reveal.

---

## ✨ Website Flow

1. **Secret Passcode Screen:**
   * Minimal heart-shaped lock icon requiring the 16-digit secret code: `0102200529102007`.
   * Preserves leading zeros.
   * Server-side verification via `/api/verify` (no hardcoded passwords in client JavaScript).
   * Subtle error feedback on incorrect entry.
   * Smooth unlocking bloom sequence.

2. **Main Birthday Homepage:**
   * Centered romantic typography: `"Happy Birthday babygirl ❤️"`.
   * Emotional sub-message in bold cursive calligraphy:
     `"I wish I could be there with you and celebrate your birthday, shonuuuuuu 🥺💔😔"`.
   * Cormorant Garamond luxury serif with crimson glow and resting heartbeat pulse.
   * Atmospheric faded floating love emojis (`8%–18%` opacity).
   * 5 faceless couple photographs softly blended into the dark red world.
   * Subtle bottom navigation trigger: `"One more surprise ♡"`.

3. **Second Surprise Page & Love Letter:**
   * Accessible by tapping `"One more surprise ♡"`.
   * Elegant back button (`← ♡`) in the top corner to return at any time without reload.
   * Central glowing heart with: `"I have one last surprise for you ❤️"`.
   * Button: `"Reveal My Surprise 💗"`.
   * **The Complete Love Letter Reveal:**
     - Ambient background dims with expanding crimson glow.
     - Romantic hearts float upward into the atmosphere.
     - Heading: `"For my shonuuuuuu ❤️"`.
     - The entire approved 8-paragraph birthday love letter presented on smooth vertically scrollable parchment.
     - Signature: `"Forever & always yours ❤️"` and `"Back to Birthday Page ♡"`.

---

## 🎨 Color Palette

* **Deep Dark Red:** `#3B0008`
* **Burgundy:** `#5A0010`
* **Dark Wine:** `#240006`
* **Subtle Crimson Highlights:** `#8B0018`

---

## 🛠️ Tech Stack & Architecture

* **Frontend:** React 19 + TypeScript + Vite 8
* **Styling:** Vanilla CSS with hardware-accelerated transforms and keyframes
* **Fonts:** Cormorant Garamond, Dancing Script, Great Vibes, Alex Brush
* **Backend:** Vercel Edge Serverless Function (`/api/verify`) with dev server middleware
* **Routing:** `vercel.json` configured with SPA fallback and API passthrough

---

## 🚀 Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variable (Optional)
The default passcode is `0102200529102007`. You can set a custom passcode in `.env.local`:
```env
BIRTHDAY_PASSCODE=0102200529102007
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5174](http://localhost:5174) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🌐 Deploying to Vercel

### Method 1: Deploy with Git (Recommended)
1. Push this project to your repository on GitHub:
   ```bash
   git init
   git add .
   git commit -m "Romantic birthday surprise website ready for Vercel"
   git branch -M main
   git remote add origin https://github.com/sujal19-sujal/Website_new0819.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import your repository `Website_new0819`.
4. In the **Environment Variables** section, configure:
   * **Key:** `BIRTHDAY_PASSCODE`
   * **Value:** `0102200529102007`
5. Click **"Deploy"**.

### Method 2: Deploy directly via Vercel CLI (No Git required)
```bash
npx vercel --prod
```
During setup, accept the default settings. Then add the environment variable:
```bash
npx vercel env add BIRTHDAY_PASSCODE
```
Enter `0102200529102007`, then run `npx vercel --prod` again.

---

## 🔒 Security Architecture

* **Server-Side Verification:** The passcode is validated solely inside the edge serverless function `api/verify.ts`.
* **Zero Client Exposure:** There are **zero** hardcoded passcodes in `src/` or `dist/` bundles.
* **Session Authorization:** Only upon a valid server response is the session token issued and the client unlocked.