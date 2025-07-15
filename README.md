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

## 👑 User-Admin-Panel (Juli 2024)

### Features
- Admin-Panel für User-Management (nur für is_staff-User sichtbar)
- User-Liste mit Suche, Sortierung, Pagination, Details, Löschen, Anlegen
- User-Detailansicht: Immer editierbar, robustes Speichern, Erfolgsmeldung, Fehler-Handling
- User-Anlegen: Funktioniert, E-Mail ist optional, robustes State-Handling
- Routing: `/admin-panel`, `/admin-panel/users/:id`, `/admin-panel/users/create`

### API-Integration
- **Basis-Endpoint:** `/api/v1/auth/admin/users/`
- **Methoden:**
  - `GET /api/v1/auth/admin/users/` (Liste, Suche, Filter, Sortierung, Pagination)
  - `POST /api/v1/auth/admin/users/` (User anlegen)
  - `GET /api/v1/auth/admin/users/<id>/` (Detail)
  - `PATCH /api/v1/auth/admin/users/<id>/` (Bearbeiten)
  - `DELETE /api/v1/auth/admin/users/<id>/` (Löschen)
- **Nur für is_staff-User zugänglich (403 sonst)**
- **JWT-Auth wie im Rest des Projekts**

### Typische Probleme & Lösungen
- **404 Not Found bei User-API:**
  - Ursache: Falscher API-Endpoint (z.B. `/api/v1/admin/users/` statt `/api/v1/auth/admin/users/`).
  - Lösung: Alle API-Calls auf den neuen Pfad umgestellt.
- **User-Liste bleibt leer, obwohl User existieren:**
  - Ursache: Backend liefert ein Array statt `{ results: [...] }`.
  - Lösung: Frontend erkennt jetzt beide Formate.
- **PATCH (Bearbeiten) gibt 400 Bad Request:**
  - Ursache: Es wurden zu viele oder falsche Felder (z.B. id, avatar_url) gesendet.
  - Lösung: Nur erlaubte Felder werden an das Backend geschickt.
- **Nach Speichern fehlen Felder wie `date_joined` oder `last_login`:**
  - Ursache: PATCH-Response enthält nicht alle Felder.
  - Lösung: Nach dem Speichern wird der User erneut per GET geladen.
- **Felder im Formular nicht editierbar:**
  - Ursache: Edit-Mode war zu restriktiv oder State-Handling fehlerhaft.
  - Lösung: Edit-Mode entfernt, Felder sind immer editierbar.
- **Kein Feedback nach Speichern:**
  - Lösung: Erfolgsmeldung (grün) und Fehler-Handling (rot) eingebaut, Meldungen verschwinden automatisch.

### Lessons Learned
- Immer das tatsächliche Backend-Response-Format prüfen (Array vs. Objekt)
- Nach PATCH nie blind das Response-Objekt als neuen State setzen, sondern ggf. nochmal GET machen
- Felder im PATCH immer filtern, nie das ganze User-Objekt senden
- UX: Editierbarkeit und Feedback sind für Admins entscheidend
- Fehlerquellen sind meist Backend-Serializer, API-Response-Format oder zu viele Felder im PATCH

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

## 🚀 Neue Features & Bugfixes (Juni 2024)

### Profil bearbeiten & Self-Service
- **Neue Profilseite:** Über das Burger-Menü ("Profil bearbeiten") gelangst du auf eine eigene Seite, um dein Profil zu verwalten.
- **Avatar ändern:** Du kannst dein Avatar-Bild jederzeit neu hochladen und speichern. Das Bild wird sofort aktualisiert.
- **Herkunft ändern:** Du kannst deine Herkunft aus einer Liste wählen oder eine eigene Herkunft anlegen und speichern. (Backend-Limitierung für Wechsel folgt)
- **Fraktion wechseln:** Du kannst deine Fraktion beliebig oft ändern und speichern.
- **Konto löschen:** Am Ende der Profilseite gibt es einen "Konto löschen"-Button. Vor dem Löschen erscheint ein Modal zur Bestätigung. Nach Bestätigung wird das Konto per API gelöscht und du wirst ausgeloggt.

### Navigation & UX
- **Sidebar & BottomNav:** Die Sidebar ist jetzt auf allen relevanten Seiten sichtbar. Auf kleinen Geräten funktioniert die BottomNav für UltraFit, UltraMind, UltraSpirit und UltraWorld wie die Sidebar.
- **Dashboard-Icon:** In der Sidebar gibt es ein Dashboard-Icon, das immer sichtbar ist, wenn du nicht auf dem Dashboard bist.

### Bugfixes & Lessons Learned
- **DELETE /api/v1/auth/me/:** Ursprünglich war das Löschen des eigenen Kontos nicht möglich ("Method DELETE not allowed"). Lösung: Backend muss einen eigenen DELETE-Endpoint für den eingeloggten User bereitstellen.
- **Eigene Herkunft speichern:** Nach dem Anlegen einer eigenen Herkunft wird diese jetzt automatisch gespeichert.
- **Doppelte Imports:** Linter-Fehler durch doppelte React- und API-Imports wurden behoben.
- **Button-Styles:** Avatar-Upload-Button und andere Buttons wurden an das dunkle Design angepasst.

### Hinweise für Backend
- Für das Löschen des eigenen Kontos und Limitierung der Herkunftswechsel sind Backend-Anpassungen nötig (siehe Projekt-Prompts).

---
