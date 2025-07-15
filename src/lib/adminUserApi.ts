import { authFetch, API_BASE } from "./api";

// Typ für User (angepasst an die API)
export type AdminUser = {
  id: number;
  username: string;
  email: string;
  is_staff: boolean;
  is_active: boolean;
  ultra_name?: string;
  bio?: string;
  avatar_url?: string;
  avatar?: string;
  faction?: any;
  faction_id?: number;
  origin?: any;
  origin_id?: number;
  missing_onboarding_fields?: string[];
  date_joined?: string;
  last_login?: string;
  level?: number;
  xp?: number;
  rank?: string;
};

// User-Liste mit optionalen Query-Parametern (Suche, Filter, Pagination, Sortierung)
export async function getAdminUsers(params: Record<string, any> = {}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: AdminUser[];
}> {
  const query = new URLSearchParams(params).toString();
  const res = await authFetch(`/api/v1/auth/admin/users/${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Fehler beim Laden der User");
  return res.json();
}

// Einzelnen User holen
export async function getAdminUser(id: number): Promise<AdminUser> {
  const res = await authFetch(`/api/v1/auth/admin/users/${id}/`);
  if (!res.ok) throw new Error("Fehler beim Laden des Users");
  return res.json();
}

// User anlegen
export async function createAdminUser(data: Partial<AdminUser>): Promise<AdminUser> {
  const res = await authFetch(`/api/v1/auth/admin/users/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Fehler beim Anlegen des Users");
  return res.json();
}

// User bearbeiten
export async function updateAdminUser(id: number, data: Partial<AdminUser>): Promise<AdminUser> {
  // Nur erlaubte Felder senden
  const allowed: (keyof AdminUser)[] = [
    "username",
    "email",
    "ultra_name",
    "bio",
    "is_staff",
    "is_active",
    "faction_id",
    "origin_id"
  ];
  const filtered: Partial<AdminUser> = {};
  for (const key of allowed) {
    if (key in data) filtered[key] = data[key];
  }
  const res = await authFetch(`/api/v1/auth/admin/users/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(filtered),
  });
  if (!res.ok) throw new Error("Fehler beim Bearbeiten des Users");
  return res.json();
}

// User löschen
export async function deleteAdminUser(id: number): Promise<void> {
  const res = await authFetch(`/api/v1/auth/admin/users/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Fehler beim Löschen des Users");
} 