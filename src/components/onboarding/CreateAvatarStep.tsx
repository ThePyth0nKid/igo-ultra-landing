import React, { useRef, useState } from 'react';
import { authFetch } from '@/lib/api';

interface CreateAvatarStepProps {
  user: any;
  onSuccess: () => void;
}

const CreateAvatarStep: React.FC<CreateAvatarStepProps> = ({ user, onSuccess }) => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(user.avatar_url || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    if (f) {
      setPreview(URL.createObjectURL(f));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('avatar', file);
      const res = await authFetch('/api/v1/auth/avatar-upload/', {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || 'Fehler beim Hochladen des Avatars');
        setLoading(false);
        return;
      }
      // Optional: avatar_url aus der Antwort holen und anzeigen
      // const data = await res.json();
      // setPreview(data.avatar_url);
      onSuccess();
    } catch (e: any) {
      setError(e.message);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-gray-900">Erstelle deinen Avatar</h2>
        <p className="text-gray-600 mb-4">Lade ein Bild hoch, das dich repräsentiert. PNG oder JPG, max. 5MB.</p>
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
          <button
            type="button"
            className="bg-white border border-ultra-red text-ultra-red px-4 py-2 rounded-lg font-semibold hover:bg-ultra-red hover:text-white transition"
            onClick={() => fileInputRef.current?.click()}
          >
            {file ? 'Anderes Bild wählen' : 'Bild auswählen'}
          </button>
        </div>
      </div>
      {error && <div className="text-red-600 text-sm">{error}</div>}
      <button
        type="submit"
        className="bg-gradient-to-r from-ultra-red to-pink-600 text-white py-2 px-4 rounded-lg font-semibold hover:from-pink-600 hover:to-ultra-red transition disabled:opacity-50"
        disabled={loading || !file}
      >
        {loading ? 'Lade hoch...' : 'Avatar speichern'}
      </button>
    </form>
  );
};

export default CreateAvatarStep; 