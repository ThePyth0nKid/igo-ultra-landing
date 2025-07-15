import { authFetch } from "./api";

export type Season = {
  id: number;
  name: string;
  start: string; // YYYY-MM-DD
  end: string;   // YYYY-MM-DD
  is_active: boolean;
};

// Alle Seasons holen (mit optionalen Parametern)
export async function getSeasons(params: Record<string, any> = {}): Promise<{
  count: number;
  next: string | null;
  previous: string | null;
  results: Season[];
} | Season[]> {
  const query = new URLSearchParams(params).toString();
  const res = await authFetch(`/api/v1/seasons/${query ? `?${query}` : ""}`);
  if (!res.ok) throw new Error("Fehler beim Laden der Seasons");
  return res.json();
}

// Einzelne Season holen
export async function getSeason(id: number): Promise<Season> {
  const res = await authFetch(`/api/v1/seasons/${id}/`);
  if (!res.ok) throw new Error("Fehler beim Laden der Season");
  return res.json();
}

// Season anlegen
export async function createSeason(data: Partial<Season>): Promise<Season> {
  const res = await authFetch(`/api/v1/seasons/`, {
    method: "POST",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Fehler beim Anlegen der Season");
  return res.json();
}

// Season bearbeiten
export async function updateSeason(id: number, data: Partial<Season>): Promise<Season> {
  const res = await authFetch(`/api/v1/seasons/${id}/`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Fehler beim Bearbeiten der Season");
  return res.json();
}

// Season löschen
export async function deleteSeason(id: number): Promise<void> {
  const res = await authFetch(`/api/v1/seasons/${id}/`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Fehler beim Löschen der Season");
} 