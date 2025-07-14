// src/lib/api.ts

import { getDiscordAuthUrl, REDIRECT_URI } from "./authService";

// Base URL deiner API
export const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// ─── Low-level fetch with automatic JWT refresh ─────────────────────────────
async function authFetch(
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  const access = localStorage.getItem("accessToken");
  if (!access) {
    throw new Error("No access token stored");
  }

  // Content-Type nur setzen, wenn KEIN FormData
  const isFormData = init.body instanceof FormData;
  const headers = {
    ...init.headers,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    Authorization: `Bearer ${access}`,
  };

  let res = await fetch(`${API_BASE}${input}`, {
    ...init,
    headers,
  });

  if (res.status === 401) {
    const refresh = localStorage.getItem("refreshToken");
    if (!refresh) {
      throw new Error("No refresh token stored");
    }

    const refreshRes = await fetch(`${API_BASE}/api/v1/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshRes.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      throw new Error("Refresh token invalid");
    }

    const { access: newAccess, refresh: newRefresh } =
      await refreshRes.json();
    localStorage.setItem("accessToken", newAccess);
    localStorage.setItem("refreshToken", newRefresh);

    // Retry original request with new access token
    const retryHeaders = {
      ...init.headers,
      ...(isFormData ? {} : { "Content-Type": "application/json" }),
      Authorization: `Bearer ${newAccess}`,
    };
    res = await fetch(`${API_BASE}${input}`, {
      ...init,
      headers: retryHeaders,
    });
  }

  return res;
}

// ─── Redirect to Discord OAuth2 endpoint ─────────────────────────────────────
export function redirectToDiscordLogin(): void {
  window.location.href = getDiscordAuthUrl();
}

// ─── Exchange Discord code for JWT pair ──────────────────────────────────────
export async function loginWithDiscord(code: string): Promise<void> {
  const res = await fetch(
    `${API_BASE}/api/v1/auth/discord/callback/`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        redirect_uri: REDIRECT_URI,
      }),
    }
  );

  if (!res.ok) {
    throw new Error(`Login failed (${res.status})`);
  }

  const { access, refresh } = await res.json();
  localStorage.setItem("accessToken", access);
  localStorage.setItem("refreshToken", refresh);
}

// ─── Fetch current user via JWT ───────────────────────────────────────────────
export async function fetchCurrentUser<T = any>(): Promise<T> {
  const res = await authFetch("/api/v1/auth/me/");
  if (!res.ok) {
    throw new Error(`Fetch user failed (${res.status})`);
  }
  return res.json();
}

// ─── Logout by clearing tokens ────────────────────────────────────────────────
export function logoutUser(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

// ─── Export the low-level fetch for PATCH/PUT/DELETE ──────────────────────────
export { authFetch };

// ─── Leaderboard-API: Aktive Season holen ───────────────────────────────
export async function fetchActiveSeason(): Promise<{ id: number }> {
  const res = await authFetch("/api/v1/seasons/active/");
  if (!res.ok) throw new Error("Fehler beim Laden der Season");
  return res.json();
}

// ─── Leaderboard-API: Leaderboard für Layer und Season ────────────────
export async function fetchLeaderboard({
  season,
  real_layer,
  cyber_layer,
  top
}: {
  season: number;
  real_layer?: string;
  cyber_layer?: string;
  top?: number;
}): Promise<any[]> {
  const params = new URLSearchParams({ season: String(season) });
  if (real_layer) params.append("real_layer", real_layer);
  if (cyber_layer) params.append("cyber_layer", cyber_layer);
  if (top) params.append("top", String(top));
  const res = await authFetch(`/api/v1/rankings/leaderboard/?${params.toString()}`);
  if (!res.ok) throw new Error("Fehler beim Laden des Leaderboards");
  return res.json();
}

// ─── Leaderboard-API: Eigene XP in aktiver Season ─────────────────────
export async function fetchOwnSeasonXP(): Promise<any> {
  const res = await authFetch("/api/v1/seasons/active/xp/");
  if (!res.ok) throw new Error("Fehler beim Laden der eigenen XP");
  return res.json();
}

// ─── Alle Seasons holen ───────────────────────────────────────────────
export async function fetchAllSeasons(): Promise<any[]> {
  const res = await authFetch("/api/v1/seasons/");
  if (!res.ok) throw new Error("Fehler beim Laden der Seasons");
  return res.json();
}

// ─── Alle Spieler einer Season nach XP holen ───────────────────────────────
export async function fetchSeasonXP(season: number, layer_type?: string): Promise<any[]> {
  const params = new URLSearchParams();
  if (layer_type) params.append("layer_type", layer_type);
  const res = await authFetch(`/api/v1/seasons/${season}/xp/${params.toString() ? '?' + params.toString() : ''}`);
  if (!res.ok) throw new Error("Fehler beim Laden der Season-XP");
  return res.json();
}
