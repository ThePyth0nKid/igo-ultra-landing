import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createSeason, Season } from "@/lib/seasonApi";

const SeasonCreate: React.FC = () => {
  const [form, setForm] = useState<Partial<Season>>({ is_active: false });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      await createSeason(form);
      setSuccess("Season erfolgreich angelegt.");
      setTimeout(() => navigate("/admin-panel/seasons"), 1200);
    } catch (err: any) {
      setError("Fehler beim Anlegen. Bitte prüfe die Eingaben.");
      setTimeout(() => setError(null), 4000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-black/80 rounded-xl border border-gray-800 shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-ultra-red mb-6">Neue Season anlegen</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-1">Name</label>
          <input name="name" value={form.name || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" required />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Start</label>
            <input name="start" type="date" value={form.start || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" required />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-semibold mb-1">Ende</label>
            <input name="end" type="date" value={form.end || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" required />
          </div>
        </div>
        <div>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_active" checked={!!form.is_active} onChange={handleChange} /> Aktiv
          </label>
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-4 py-2 rounded bg-ultra-red text-white hover:bg-red-800" disabled={loading}>{loading ? "Speichern…" : "Anlegen"}</button>
          <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800" onClick={() => navigate(-1)} disabled={loading}>Zurück</button>
        </div>
      </form>
      {success && <div className="mt-4 text-green-400 font-semibold">{success}</div>}
      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
    </div>
  );
};

export default SeasonCreate; 