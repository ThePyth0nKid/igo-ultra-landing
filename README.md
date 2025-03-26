# iGoUltra – Frontend

**iGoUltra** is an immersive frontend experience built with **Vite**, **React**, **Tailwind CSS v4**, and **shadcn/ui**, designed for a new kind of digital-physical XP game.

---

## 🧱 Tech Stack

- [Vite](https://vitejs.dev/) – blazing-fast frontend tooling  
- [React 18](https://reactjs.org/) – UI library  
- [Tailwind CSS v4](https://tailwindcss.com/) – utility-first CSS  
- [shadcn/ui](https://ui.shadcn.com/) – beautiful UI components  
- [Framer Motion](https://www.framer.com/motion/) – animations  
- [Lucide Icons](https://lucide.dev/) – icon system  
- Custom 3D Cards, Parallax & Scroll Effects

---

## 🧪 Local Development

```bash
# install dependencies
npm install

# start dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
VITE_API_URL=https://your-backend-url.com
```

> This URL is used to connect the frontend to the Django backend.

---

## 🚀 Deployment

This project is deployed via [Vercel](https://vercel.com)

- `main` branch → production  
- `dev` branch → preview deployments (safe testing)

Every push triggers a new deployment automatically.

---

## 🌍 Project Structure

```
src/
├── components/         → UI components (Navbar, XP display, Cards, etc.)
├── lib/                → API calls and shared functions
├── pages/              → Main page views (if routing is used)
├── styles/             → Tailwind config & global styles
├── App.tsx             → Root component
```

---

## 🌐 Backend Connection

The frontend communicates with the **Django REST API** using `fetch()` with the URL from `VITE_API_URL`.

Make sure your Django backend:

- Has CORS enabled for Vercel + localhost  
- Exposes routes like `/api/xp/` that return JSON

---

## 🧭 Current Features

- Ultra-styled responsive layout  
- Animated 3D Mission Card  
- XP Progress Bar  
- Glow Buttons & Navbar with Scroll Detection  
- Parallax / ScrollReveal Elements  
- Tailwind CSS v4 Custom Theme Integration

---

## 🧠 To Do

- [ ] Connect to real XP API (DRF)  
- [ ] Dynamic level system  
- [ ] Leaderboard & user stats  
- [ ] User authentication (JWT or Session)  
- [ ] Weekly/Monthly Grind Rewards  
- [ ] Full XP Game Loop  
- [ ] Integrate with sensors / AR (future)

---

## 👤 Author

Developed with purpose by:

**Nelson Mehlis**  
Founder & Visionary of [iGoUltra](https://igoultra.org)

---

## 💬 Community

Join the [iGoUltra Discord](https://discord.gg/6QT6sHxSFJ)  
→ Become part of the **Ultra Tribe**  
→ Set your goal. Fight your demons.  
→ **Level up in real life.**

**AHHU.** 🥷
