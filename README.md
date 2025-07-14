# iGoUltra – Frontend

**iGoUltra** ist ein immersives XP-Game-Frontend, gebaut mit **Vite**, **React**, **Tailwind CSS v4** und **shadcn/ui**. Es bietet einen dynamischen, API-first Onboarding-Prozess, Discord-Login, Fraktions- und Herkunftswahl, Bio, Avatar-Upload und ein modernes Dashboard.

---

## 🧱 Tech Stack

- [Vite](https://vitejs.dev/) – ultraschnelles Frontend-Tooling
- [React 18](https://reactjs.org/) – UI Library
- [Tailwind CSS v4](https://tailwindcss.com/) – Utility-First CSS
- [shadcn/ui](https://ui.shadcn.com/) – UI-Komponenten
- [Framer Motion](https://www.framer.com/motion/) – Animationen
- [Lucide Icons](https://lucide.dev/) – Icon-System
- Eigene 3D Cards, Parallax & Scroll-Effekte

---

## 🚦 Features & Flow

### **1. Discord-Login & Authentifizierung**
- Login via Discord OAuth2
- JWT-Token-Handling (Access/Refresh im localStorage)
- Automatisches Token-Refresh
- Geschützte Routen (Dashboard, Leaderboard, Onboarding)

### **2. Dynamischer Onboarding-Flow**
- Nach Login: GET `/api/v1/auth/me/` prüft `missing_onboarding_fields`
- Schrittweise Abfrage: Ultraname → Fraktion → Herkunft (inkl. eigene Herkunft anlegen) → Bio → Avatar
- Nach jedem Schritt PATCH an `/api/v1/auth/me/` (außer Avatar)
- Nach jedem Schritt erneutes Prüfen, was noch fehlt
- Abschluss: Weiterleitung zum Dashboard

### **3. Avatar-Upload**
- Eigener Endpunkt: `POST /api/v1/auth/avatar-upload/` (FormData, Feld: `avatar`)
- Nach Upload: Userdaten neu laden, Avatarbild wird sofort angezeigt
- Fallback auf Default-Avatar, falls kein Bild vorhanden

### **4. Dashboard**
- Zeigt alle wichtigen Userdaten: Avatar, Ultraname, Username, Level, XP, Rang, Fraktion, Herkunft, Bio
- Responsive, modernes Layout mit Tailwind 4

### **5. API-Integration**
- Alle API-Requests laufen über `authFetch` (setzt automatisch den Token und Content-Type)
- PATCH/POST für Textfelder: JSON, für Avatar: FormData
- Fehlerbehandlung und automatische Weiterleitung bei fehlender Authentifizierung

---

## 🧪 Lokale Entwicklung

```bash
# Abhängigkeiten installieren
npm install

# Dev-Server starten
npm run dev
```

Frontend läuft auf [http://localhost:5173](http://localhost:5173)

---

## 🔐 Environment Variables

`.env` im Projekt-Root:
```env
VITE_API_URL=http://localhost:8000
```

---

## 🌍 Projektstruktur

```
src/
├── components/         → UI-Komponenten (Onboarding, Navbar, etc.)
├── lib/                → API-Utils, Auth-Handling
├── pages/              → Hauptseiten (Dashboard, Onboarding, etc.)
├── assets/             → Bilder, Videos
├── App.tsx             → Root-Komponente
```

---

## 🌐 Backend-Anbindung & API-Endpunkte

- **Userdaten:**
  - `GET /api/v1/auth/me/` → Userobjekt inkl. `missing_onboarding_fields`
  - `PATCH /api/v1/auth/me/` → Felder wie `ultra_name`, `bio`, `faction_id`, `origin_id`
- **Fraktionen:**
  - `GET /api/v1/factions/`
- **Herkünfte:**
  - `GET /api/v1/origins/`
  - `POST /api/v1/origins/` (eigene Herkunft anlegen)
- **Avatar-Upload:**
  - `POST /api/v1/auth/avatar-upload/` (FormData, Feld: `avatar`)

---

## 🛠️ Stolpersteine & Best Practices

### **1. Authentifizierung & Token-Handling**
- Immer `authFetch` verwenden, damit der Token im Header landet
- Nach Login: Access/Refresh-Token im localStorage speichern
- Bei 401: Automatisches Token-Refresh, sonst Logout

### **2. PATCH vs. FormData**
- Für Textfelder (Ultraname, Bio, etc.): PATCH mit JSON (`Content-Type: application/json`)
- Für Avatar: POST mit FormData (kein Content-Type setzen, Browser übernimmt das)
- In `authFetch` Content-Type nur setzen, wenn KEIN FormData gesendet wird

### **3. Medien-Handling im Backend**
- Django muss im Development `/media/`-URLs ausliefern:
  ```python
  from django.conf import settings
  from django.conf.urls.static import static
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
  ```
- Nach Upload: Datei muss im `media/`-Ordner liegen, sonst 404!
- Im Frontend immer die vom Backend gelieferte URL verwenden (`avatar_url` oder `avatar`)

### **4. Typische Fehler & Lösungen**
- **401 Unauthorized:** Token fehlt/abgelaufen → Login-Flow prüfen
- **500 Server Error:** PATCH mit falschem Content-Type → JSON vs. FormData beachten
- **404 beim Avatar:** Datei fehlt im Backend oder MEDIA-URL nicht ausgeliefert
- **Onboarding bleibt hängen:** Backend gibt `missing_onboarding_fields` nicht korrekt zurück

---

## 🧠 Lessons Learned
- API-first Onboarding ist nur robust, wenn das Backend nach jedem PATCH/Upload den Userstatus korrekt zurückgibt
- Avatar-Uploads brauchen eigene Endpunkte und sauberes Medien-Handling
- Frontend muss immer die vom Backend gelieferte URL nutzen, nie selbst Pfade bauen
- Fehlerquellen sind meist Backend-Konfiguration oder falsche Content-Types

---

## 👤 Author

Developed with ❤️ by:

**Nelson Mehlis**  
Founder & Visionary of [iGoUltra](https://igoultra.org)

---

## 💬 Community

Join the [iGoUltra Discord](https://discord.gg/6QT6sHxSFJ)
→ Werde Teil der **Ultra Tribe**
→ Setz dir ein Ziel. Kämpfe. Level up in real life.

**AHHU.** 🥷

---

## 🆕 Neu: Globale Navigation & UX-Verbesserungen

- Die Navbar enthält jetzt ein Burger-Menü, das auf allen Bildschirmgrößen sichtbar ist.
- Im ausgeklappten Menü gibt es immer sichtbare Links zu allen Hauptbereichen der Landingpage:
  - UltraFit (#fit)
  - UltraMind (#mind)
  - UltraSpirit (#spirit)
  - UltraWorld (#world)
  - Ultrascience (#ultrascience)
  - Roadmap (#roadmap)
  - Community (#community)
- Diese Links scrollen direkt zu den jeweiligen Sections auf der Landingpage (egal ob eingeloggt oder nicht).
- Das Menü schließt automatisch, wenn man außerhalb klickt oder einen Link auswählt.
- In der Navbar wird (sofern vorhanden) der Ultra-Name des Users angezeigt, nicht mehr der Username.

---
