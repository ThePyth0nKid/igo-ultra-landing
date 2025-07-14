import React, { useState } from 'react';
import { authFetch } from '@/lib/api';

interface ChooseUltraNameStepProps {
  user: any;
  onSuccess: () => void;
}

const ChooseUltraNameStep: React.FC<ChooseUltraNameStepProps> = ({ user, onSuccess }) => {
  const [ultraName, setUltraName] = useState(user.ultra_name || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/v1/auth/me/', {
        method: 'PATCH',
        body: JSON.stringify({ ultra_name: ultraName }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Speichern des Ultranamens');
        setLoading(false);
        return;
      }
      onSuccess();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Wähle deinen Ultranamen</h2>
        <p className="text-gray-600 mb-4">Dieser Name ist einzigartig und wird dich in iGoUltra repräsentieren.</p>
        <input
          type="text"
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ultra-red text-gray-900 bg-gray-100"
          placeholder="z.B. ShadowRunner42"
          value={ultraName}
          onChange={e => setUltraName(e.target.value)}
          minLength={3}
          maxLength={24}
          required
          autoFocus
        />
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
        disabled={loading || ultraName.length < 3}
      >
        {loading ? 'Speichere...' : 'Weiter'}
      </button>
    </form>
  );
};

export default ChooseUltraNameStep; 