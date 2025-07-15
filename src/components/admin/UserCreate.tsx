import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createAdminUser, AdminUser } from "@/lib/adminUserApi";

const UserCreate: React.FC = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState<Partial<AdminUser>>({
    username: "",
    email: "",
    ultra_name: "",
    is_staff: false,
    is_active: true,
    bio: ""
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const user = await createAdminUser(form);
      navigate(`/admin-panel/users/${user.id}`);
    } catch (err: any) {
      setError("Fehler beim Anlegen des Users");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-black/80 rounded-xl border border-gray-800 shadow-lg p-8 mt-8">
      <input className="mb-4 px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" placeholder="Test-Input" />
      <h2 className="text-2xl font-bold text-ultra-red mb-6">Neuen User anlegen</h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-semibold mb-1">Username</label>
          <input name="username" value={form.username || ""} onChange={handleChange} required className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Ultra-Name</label>
          <input name="ultra_name" value={form.ultra_name || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Email</label>
          <input name="email" type="email" value={form.email || ""} onChange={handleChange} className="w-full px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white" />
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
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-4 mt-6">
          <button type="submit" className="px-4 py-2 rounded bg-ultra-red text-white hover:bg-red-800" disabled={saving}>{saving ? "Speichern…" : "Anlegen"}</button>
          <button type="button" className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-800" onClick={() => navigate(-1)}>Abbrechen</button>
        </div>
      </form>
    </div>
  );
};

export default UserCreate; 