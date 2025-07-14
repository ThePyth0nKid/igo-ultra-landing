import React, { useState } from 'react';
import { authFetch } from '@/lib/api';

interface WriteBioStepProps {
  user: any;
  onSuccess: () => void;
}

const WriteBioStep: React.FC<WriteBioStepProps> = ({ user, onSuccess }) => {
  const [bio, setBio] = useState(user.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await authFetch('/api/v1/auth/me/', {
        method: 'PATCH',
        body: JSON.stringify({ bio }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Speichern der Bio');
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
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Schreibe deine Ultra-Bio</h2>
        <p className="text-gray-600 mb-4">Erzähl der Community, wer du bist oder was dich antreibt. Sei kreativ!</p>
        <textarea
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-ultra-red text-gray-900 bg-gray-100 min-h-[100px]"
          placeholder="Deine Ultra-Bio..."
          value={bio}
          onChange={e => setBio(e.target.value)}
          minLength={10}
          maxLength={300}
          required
        />
        {/* KI-Button (Platzhalter) */}
        <button
          type="button"
          className="mt-2 text-ultra-red underline text-sm"
          disabled
        >
          Bio von KI generieren (bald verfügbar)
        </button>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
        disabled={loading || bio.length < 10}
      >
        {loading ? 'Speichere...' : 'Weiter'}
      </button>
    </form>
  );
};

export default WriteBioStep; 