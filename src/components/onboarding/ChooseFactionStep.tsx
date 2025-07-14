import React, { useEffect, useState } from 'react';
import { authFetch } from '@/lib/api';

interface Faction {
  id: number;
  name: string;
  style: string;
  icon: string;
}

interface ChooseFactionStepProps {
  user: any;
  onSuccess: () => void;
}

const ChooseFactionStep: React.FC<ChooseFactionStepProps> = ({ user, onSuccess }) => {
  const [factions, setFactions] = useState<Faction[]>([]);
  const [selected, setSelected] = useState<number | null>(user.faction?.id || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchFactions();
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
      onSuccess();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  if (fetching) {
    return <div className="text-center">Lade Fraktionen...</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Wähle deine Fraktion</h2>
        <p className="text-gray-600 mb-4">Wähle eine Fraktion, die zu dir passt.</p>
        <div className="flex flex-col gap-4">
          {factions.map(faction => (
            <label key={faction.id} className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${selected === faction.id ? 'border-ultra-red bg-ultra-red/10' : 'border-gray-300 bg-gray-100 hover:border-ultra-red'}`}>
              <input
                type="radio"
                name="faction"
                value={faction.id}
                checked={selected === faction.id}
                onChange={() => setSelected(faction.id)}
                className="accent-ultra-red"
              />
              <span className="font-semibold text-gray-900">{faction.name}</span>
              {/* Optional: Icon oder Style anzeigen */}
            </label>
          ))}
        </div>
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

export default ChooseFactionStep; 