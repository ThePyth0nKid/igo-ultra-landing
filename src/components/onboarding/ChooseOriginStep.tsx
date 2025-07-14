import React, { useEffect, useState } from 'react';
import { authFetch } from '@/lib/api';

interface Origin {
  id: number;
  name: string;
  type: string;
}

interface ChooseOriginStepProps {
  user: any;
  onSuccess: () => void;
}

const ChooseOriginStep: React.FC<ChooseOriginStepProps> = ({ user, onSuccess }) => {
  const [origins, setOrigins] = useState<Origin[]>([]);
  const [selected, setSelected] = useState<number | null>(user.origin?.id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);
  const [showCustom, setShowCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customType, setCustomType] = useState('');
  const [customDesc, setCustomDesc] = useState('');
  const [customLoading, setCustomLoading] = useState(false);

  useEffect(() => {
    fetchOrigins();
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
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCustomLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center">Lade Herkünfte...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Wähle deine Herkunft</h2>
        <p className="text-gray-600 mb-4">Wähle aus der Liste oder lege eine eigene Herkunft an.</p>
        <div className="flex flex-col gap-4 mb-2">
          {origins.map(origin => (
            <label key={origin.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === origin.id ? 'border-ultra-red bg-ultra-red/10' : 'border-gray-300 bg-gray-100 hover:border-ultra-red'}`}>
              <input
                type="radio"
                name="origin"
                value={origin.id}
                checked={selected === origin.id}
                onChange={() => setSelected(origin.id)}
                className="accent-ultra-red"
              />
              <span className="font-semibold text-gray-900">{origin.name}</span>
              <span className="text-xs text-gray-500">({origin.type})</span>
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
          <div className="flex flex-col gap-2 bg-gray-50 p-4 rounded-lg border border-gray-200 mb-2">
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-300"
              placeholder="Name der Herkunft"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              required
            />
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-300"
              placeholder="Typ (z.B. Stadt, Planet, Mythos)"
              value={customType}
              onChange={e => setCustomType(e.target.value)}
              required
            />
            <input
              type="text"
              className="px-3 py-2 rounded border border-gray-300"
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
              {customLoading ? 'Speichere...' : 'Herkunft anlegen'}
            </button>
          </div>
        )}
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
        disabled={loading || !selected}
      >
        {loading ? 'Speichere...' : 'Weiter'}
      </button>
    </form>
  );
};

export default ChooseOriginStep; 