import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSeason, updateSeason, deleteSeason, Season } from "@/lib/seasonApi";

const SeasonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [season, setSeason] = useState<Season | null>(null);
  const [form, setForm] = useState<Partial<Season>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getSeason(Number(id))
      .then(data => {
        setSeason(data);
        setForm(data);
      })
      .catch(() => setError("Season nicht gefunden"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateSeason(Number(id), form);
      const fresh = await getSeason(Number(id));
      setSeason(fresh);
      setForm(fresh);
      setSuccess("Season erfolgreich gespeichert.");
      setTimeout(() => setSuccess(null), 3000);
    } catch {
      setError("Fehler beim Speichern. Bitte prüfe die Eingaben.");
      setTimeout(() => setError(null), 4000);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    if (!window.confirm("Diese Season wirklich löschen?")) return;
    try {
      await deleteSeason(Number(id));
      navigate("/admin-panel/seasons");
    } catch {
      setError("Fehler beim Löschen der Season");
      setTimeout(() => setError(null), 4000);
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-10">Lade Season…</div>;
  if (error || !season) return <div className="text-center text-red-500 py-10">{error || "Season nicht gefunden"}</div>;

  return (
    <div className="max-w-xl mx-auto bg-black/80 rounded-xl border border-gray-800 shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-ultra-red mb-6">Season bearbeiten</h2>
      <form className="space-y-4" onSubmit={handleSave}>
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input name="name" value={form.name || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Start</label>
            <input name="start" type="date" value={form.start || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Ende</label>
            <input name="end" type="date" value={form.end || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_active" checked={!!form.is_active} onChange={handleChange} /> Aktiv
          </label>
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-4 py-2 rounded bg-ultra-red text-white hover:bg-red-800" disabled={saving}>{saving ? "Speichern…" : "Speichern"}</button>
          <button type="button" className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800" onClick={handleDelete}>Löschen</button>
          <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800" onClick={() => navigate(-1)}>Zurück</button>
        </div>
      </form>
      {success && <div className="mt-4 text-green-400 font-semibold">{success}</div>}
      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
    </div>
  );
};

export default SeasonDetail; 