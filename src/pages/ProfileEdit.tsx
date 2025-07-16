import React, { useEffect, useRef, useState } from "react";
import { authFetch, fetchCurrentUser } from "@/lib/api";
import { useLocation, useNavigate } from "react-router-dom";
import LayoutWithSidebar from "@/components/layout/LayoutWithSidebar";
import LayoutWithBottomNav from "@/components/layout/LayoutWithBottomNav";

const ProfileEdit: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser()
      .then(data => {
        setUser(data);
        setPreview(data.avatar_url || null);
      })
      .catch(() => setUser(null));
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640); // sm breakpoint
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setSuccess(false);
    setError(null);
    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

  // NEU: Avatar direkt zu S3 hochladen und im Backend speichern
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // 1. Presigned URL vom Backend holen
      const presignRes = await authFetch('/users/avatar/presign/', {
        method: 'POST',
        body: JSON.stringify({ file_name: file.name, file_type: file.type }),
      });
      if (!presignRes.ok) {
        const data = await presignRes.json();
        setError(data.detail || 'Fehler beim Anfordern der Presigned URL');
        setLoading(false);
        return;
      }
      const { data, url } = await presignRes.json();

      // 2. Bild direkt zu S3 hochladen
      const formData = new FormData();
      Object.entries(data.fields).forEach(([k, v]) => formData.append(k, v as string));
      formData.append('file', file);
      const s3Res = await fetch(data.url, { method: 'POST', body: formData });
      if (!s3Res.ok) {
        setError('Fehler beim Upload zu S3');
        setLoading(false);
        return;
      }

      // 3. Avatar-URL im Backend speichern
      const saveRes = await authFetch('/users/avatar/', {
        method: 'PATCH',
        body: JSON.stringify({ avatar_url: url }),
      });
      if (!saveRes.ok) {
        const data = await saveRes.json();
        setError(data.detail || 'Fehler beim Speichern des Avatars');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      setFile(null);
      // Avatar neu laden
      fetchCurrentUser().then(data => {
        setUser(data);
        setPreview(data.avatar_url || null);
      });
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  // NEU: Avatar löschen
  const handleAvatarDelete = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await authFetch('/users/avatar/', {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Löschen des Avatars');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      setFile(null);
      setPreview(null);
      fetchCurrentUser().then(data => {
        setUser(data);
        setPreview(data.avatar_url || null);
      });
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (!user) {
    return <div className="text-center text-gray-400 py-10">Lade Profil…</div>;
  }

  const Layout = isMobile ? LayoutWithBottomNav : LayoutWithSidebar;

  return (
    <Layout>
      <div className="max-w-xl mx-auto mt-12 p-6 bg-black/80 rounded-xl shadow-lg border border-gray-800">
        <h1 className="text-3xl font-bold mb-6 text-ultra-red">Profil bearbeiten</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div>
            <h2 className="text-xl font-bold mb-2 text-gray-100">Avatar ändern</h2>
            <p className="text-gray-400 mb-4">Lade ein Bild hoch, das dich repräsentiert. PNG oder JPG, max. 5MB.</p>
            <div className="flex flex-col items-center gap-4">
              {preview && (
                <img src={preview} alt="Avatar Preview" className="w-32 h-32 rounded-full object-cover border-2 border-ultra-red shadow" />
              )}
              <input
                type="file"
                accept="image/png, image/jpeg"
                className="hidden"
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <div className="flex gap-2">
                <button
                  type="button"
                  className="bg-zinc-900 border border-ultra-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-ultra-red hover:text-white transition shadow"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={loading}
                >
                  {file ? 'Anderes Bild wählen' : 'Bild auswählen'}
                </button>
                {preview && (
                  <button
                    type="button"
                    className="bg-red-700 border border-ultra-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-ultra-red hover:text-white transition shadow"
                    onClick={handleAvatarDelete}
                    disabled={loading}
                  >
                    Avatar löschen
                  </button>
                )}
              </div>
            </div>
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-500 text-sm">Aktion erfolgreich!</div>}
          <button
            type="submit"
            className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
            disabled={loading || !file}
          >
            {loading ? 'Lade hoch…' : 'Avatar speichern'}
          </button>
        </form>
        <OriginEdit user={user} onSuccess={() => fetchCurrentUser().then(data => setUser(data))} />
        <FactionEdit user={user} onSuccess={() => fetchCurrentUser().then(data => setUser(data))} />
        <DeleteAccountSection />
      </div>
    </Layout>
  );
};

interface OriginEditProps {
  user: any;
  onSuccess: () => void;
}

const OriginEdit: React.FC<OriginEditProps> = ({ user, onSuccess }) => {
  const [origins, setOrigins] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(user.origin?.id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customType, setCustomType] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customLoading, setCustomLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchOrigins();
    // eslint-disable-next-line
  }, []);

  const fetchOrigins = async () => {
    setFetching(true);
    try {
      const res = await authFetch('/api/v1/origins/');
      if (!res.ok) throw new Error('Fehler beim Laden der Herkünfte');
      const data = await res.json();
      setOrigins(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await authFetch('/api/v1/auth/me/', {
        method: 'PATCH',
        body: JSON.stringify({ origin_id: selected }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Speichern der Herkunft');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      onSuccess();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  const handleCustomSubmit = async () => {
    setCustomLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/v1/origins/', {
        method: 'POST',
        body: JSON.stringify({ name: customName, type: customType, description: customDesc }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Anlegen der Herkunft');
        setCustomLoading(false);
        return;
      }
      const newOrigin = await res.json();
      setOrigins([...origins, newOrigin]);
      setSelected(newOrigin.id);
      setShowCustom(false);
      setCustomName('');
      setCustomType('');
      setCustomDesc('');
      // Nach dem Anlegen direkt speichern
      setTimeout(() => {
        document.getElementById('origin-edit-form')?.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
      }, 100);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCustomLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center text-gray-400 py-6">Lade Herkünfte…</div>;
  }

  return (
    <form id="origin-edit-form" onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-100">Herkunft ändern</h2>
        <p className="text-gray-400 mb-4">Wähle aus der Liste oder lege eine eigene Herkunft an.</p>
        <div className="flex flex-col gap-4 mb-2">
          {origins.map(origin => (
            <label key={origin.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === origin.id ? 'border-ultra-red bg-ultra-red/10' : 'border-gray-700 bg-gray-900 hover:border-ultra-red'}`}>
              <input
                type="radio"
                name="origin"
                value={origin.id}
                checked={selected === origin.id}
                onChange={() => setSelected(origin.id)}
                className="accent-ultra-red"
              />
              <span className="font-semibold text-gray-100">{origin.name}</span>
              <span className="text-xs text-gray-400">({origin.type})</span>
            </label>
          ))}
        </div>
        <button
          type="button"
          className="text-ultra-red underline text-sm mb-2"
          onClick={() => setShowCustom(!showCustom)}
        >
          {showCustom ? 'Eigene Herkunft ausblenden' : 'Eigene Herkunft anlegen'}
        </button>
        {showCustom && (
          <div className="flex flex-col gap-2 bg-gray-900 p-4 rounded-lg border border-gray-700 mb-2">
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-700 bg-black text-white"
              placeholder="Name der Herkunft"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              required
            />
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-700 bg-black text-white"
              placeholder="Typ (z.B. Stadt, Planet, Mythos)"
              value={customType}
              onChange={e => setCustomType(e.target.value)}
              required
            />
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-700 bg-black text-white"
              placeholder="Beschreibung (optional)"
              value={customDesc}
              onChange={e => setCustomDesc(e.target.value)}
            />
            <button
              type="button"
              className="bg-ultra-red text-white py-1 px-4 rounded mt-2"
              disabled={customLoading || !customName || !customType}
              onClick={handleCustomSubmit}
            >
              {customLoading ? 'Speichere…' : 'Herkunft anlegen'}
            </button>
          </div>
        )}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">Herkunft erfolgreich gespeichert!</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
        disabled={loading || !selected}
      >
        {loading ? 'Speichere…' : 'Herkunft speichern'}
      </button>
    </form>
  );
};

// Fraktion ändern Komponente (analog zu Onboarding)
interface FactionEditProps {
  user: any;
  onSuccess: () => void;
}

const FactionEdit: React.FC<FactionEditProps> = ({ user, onSuccess }) => {
  const [factions, setFactions] = useState<any[]>([]);
  const [selected, setSelected] = useState<number | null>(user.faction?.id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchFactions();
    // eslint-disable-next-line
  }, []);

  const fetchFactions = async () => {
    setFetching(true);
    try {
      const res = await authFetch('/api/v1/factions/');
      if (!res.ok) throw new Error('Fehler beim Laden der Fraktionen');
      const data = await res.json();
      setFactions(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selected) return;
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await authFetch('/api/v1/auth/me/', {
        method: 'PATCH',
        body: JSON.stringify({ faction_id: selected }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Speichern der Fraktion');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      onSuccess();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center text-gray-400 py-6">Lade Fraktionen…</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 mt-10">
      <div>
        <h2 className="text-xl font-bold mb-2 text-gray-100">Fraktion ändern</h2>
        <p className="text-gray-400 mb-4">Wähle eine Fraktion, die zu dir passt.</p>
        <div className="flex flex-col gap-4">
          {factions.map(faction => (
            <label key={faction.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === faction.id ? 'border-ultra-red bg-ultra-red/10' : 'border-gray-700 bg-gray-900 hover:border-ultra-red'}`}>
              <input
                type="radio"
                name="faction"
                value={faction.id}
                checked={selected === faction.id}
                onChange={() => setSelected(faction.id)}
                className="accent-ultra-red"
              />
              <span className="font-semibold text-gray-100">{faction.name}</span>
            </label>
          ))}
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      {success && <div className="text-green-500 text-sm">Fraktion erfolgreich gespeichert!</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
        disabled={loading || !selected}
      >
        {loading ? 'Speichere…' : 'Fraktion speichern'}
      </button>
    </form>
  );
};

// Konto löschen Komponente mit Modal
const DeleteAccountSection: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/v1/auth/me/', {
        method: 'DELETE',
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Löschen des Kontos');
        setLoading(false);
        return;
      }
      setSuccess(true);
      setLoading(false);
      // Nach kurzer Zeit zur Landingpage weiterleiten
      setTimeout(() => {
        navigate('/');
        window.location.reload();
      }, 2000);
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <div className="mt-16 flex flex-col items-center">
      <button
        className="bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-6 rounded-lg shadow transition"
        onClick={() => setShowModal(true)}
      >
        Konto löschen
      </button>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-zinc-900 border border-red-700 rounded-xl p-8 max-w-sm w-full flex flex-col items-center shadow-2xl">
            <h2 className="text-2xl font-bold text-red-600 mb-4 text-center">Konto wirklich löschen?</h2>
            <p className="text-gray-200 mb-6 text-center">Bist du sicher, dass du dein Konto <span className='text-red-400 font-bold'>unwiderruflich</span> löschen möchtest? Diese Aktion kann nicht rückgängig gemacht werden!</p>
            {error && <div className="text-red-400 text-sm mb-2">{error}</div>}
            {success ? (
              <div className="text-green-500 font-semibold mb-2">Konto gelöscht. Du wirst abgemeldet…</div>
            ) : (
              <div className="flex gap-4 w-full">
                <button
                  className="flex-1 bg-red-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition"
                  onClick={handleDelete}
                  disabled={loading}
                >
                  {loading ? 'Lösche…' : 'Ja, löschen'}
                </button>
                <button
                  className="flex-1 bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-lg transition"
                  onClick={() => setShowModal(false)}
                  disabled={loading}
                >
                  Abbrechen
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileEdit; 