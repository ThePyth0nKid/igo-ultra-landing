import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getAdminUser,
  updateAdminUser,
  deleteAdminUser,
  AdminUser
} from "@/lib/adminUserApi";

const UserDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [user, setUser] = useState<AdminUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // Entferne Edit-Mode komplett
  // const [edit, setEdit] = useState(true);
  const [form, setForm] = useState<Partial<AdminUser>>({});
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getAdminUser(Number(id))
      .then(data => {
        setUser(data);
        setForm(data);
      })
      .catch(() => setError("User nicht gefunden"))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === "checkbox" && e.target instanceof HTMLInputElement) {
      setForm(f => ({ ...f, [name]: e.target.checked }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    setError(null);
    setSuccess(null);
    try {
      await updateAdminUser(Number(id), form);
      // Nach dem Speichern User erneut laden
      const fresh = await getAdminUser(Number(id));
      setUser(fresh);
      setForm(fresh);
      setSuccess("Änderungen erfolgreich gespeichert.");
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
    if (!window.confirm("Diesen User wirklich löschen?")) return;
    try {
      await deleteAdminUser(Number(id));
      navigate("/admin-panel");
    } catch {
      alert("Fehler beim Löschen");
    }
  };

  if (loading) return <div className="text-center text-gray-400 py-10">Lade User…</div>;
  if (error || !user) return <div className="text-center text-red-500 py-10">{error || "User nicht gefunden"}</div>;

  return (
    <div className="max-w-xl mx-auto bg-black/80 rounded-xl border border-gray-800 shadow-lg p-8 mt-8">
      <div className="flex items-center gap-4 mb-6">
        {user.avatar_url && <img src={user.avatar_url} alt="Avatar" className="w-16 h-16 rounded-full border border-gray-700" />}
        <div>
          <h2 className="text-2xl font-bold text-ultra-red mb-1">User #{user.id}</h2>
          <div className="text-gray-400">{user.username}</div>
        </div>
      </div>
      <form className="space-y-4" onSubmit={e => { e.preventDefault(); handleSave(); }}>
        <div>
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input name="username" value={form.username || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Ultra-Name</label>
          <input name="ultra_name" value={form.ultra_name || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input name="email" value={form.email || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_staff" checked={!!form.is_staff} onChange={handleChange} /> Staff
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" name="is_active" checked={!!form.is_active} onChange={handleChange} /> Aktiv
          </label>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Bio</label>
          <input name="bio" value={form.bio || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-4 py-2 rounded bg-ultra-red text-white hover:bg-red-800" disabled={saving}>{saving ? "Speichern…" : "Speichern"}</button>
          <button type="button" className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800" onClick={handleDelete}>Löschen</button>
          <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800" onClick={() => navigate(-1)}>Zurück</button>
        </div>
      </form>
      {success && <div className="mt-4 text-green-400 font-semibold">{success}</div>}
      {error && <div className="mt-4 text-red-500 font-semibold">{error}</div>}
      <div className="text-xs text-gray-500 mt-8">
        <div>Beitritt: {user.date_joined ? new Date(user.date_joined).toLocaleString() : "–"}</div>
        <div>Letzter Login: {user.last_login ? new Date(user.last_login).toLocaleString() : "–"}</div>
        <div>Level: {user.level ?? "–"} | XP: {user.xp ?? "–"} | Rank: {user.rank ?? "–"}</div>
        <div>Faction: {user.faction?.name || user.faction_id || "–"}</div>
        <div>Origin: {user.origin?.name || user.origin_id || "–"}</div>
      </div>
    </div>
  );
};

export default UserDetail; 