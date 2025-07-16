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
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] || null;
    setFile(f);
    setError(null);
    setSuccess(false);
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
      setPreview(url);
      onSuccess();
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
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-white border border-ultra-red text-ultra-red px-4 py-2 rounded-lg font-semibold hover:bg-ultra-red hover:text-white transition"
              onClick={() => fileInputRef.current?.click()}
              disabled={loading}
            >
              {file ? 'Anderes Bild wählen' : 'Bild auswählen'}
            </button>
            {preview && (
              <button
                type="button"
                className="bg-red-700 border border-ultra-red text-white px-4 py-2 rounded-lg font-semibold hover:bg-ultra-red hover:text-white transition"
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
        {loading ? 'Lade hoch...' : 'Avatar speichern'}
      </button>
    </form>
  );
};

export default CreateAvatarStep; 