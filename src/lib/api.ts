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

  let res = await fetch(`${API_BASE}${input}`, {
    ...init,
    headers: {
      ...init.headers,
      "Content-Type": "application/json",
      Authorization: `Bearer ${access}`,
    },
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
    res = await fetch(`${API_BASE}${input}`, {
      ...init,
      headers: {
        ...init.headers,
        "Content-Type": "application/json",
        Authorization: `Bearer ${newAccess}`,
      },
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
