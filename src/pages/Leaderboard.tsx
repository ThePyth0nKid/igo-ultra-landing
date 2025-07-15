import React, { useEffect, useState } from "react";
import { fetchAllSeasons, fetchSeasonXP } from "@/lib/api";

const LAYERS = [
  "BaseLayer",
  "EmotionLayer",
  "FlowLayer",
  "CoreLayer",
  "UltraLayer",
  "SurfaceWebLayer",
  "DeepNetLayer",
  "DarkCodeLayer",
  "SyntheticLayer",
  "VOIDLayer",
];

const Leaderboard = () => {
  const [season, setSeason] = useState<number | null>(null);
  const [seasons, setSeasons] = useState<any[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<string>("UltraLayer");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAllSeasons()
      .then((all) => {
        setSeasons(all);
        const active = all.find((s: any) => s.is_active);
        setSeason(active ? active.id : all[0]?.id || null);
      })
      .catch(() => setError("Fehler beim Laden der Seasons."));
  }, []);

  useEffect(() => {
    if (!season) return;
    setLoading(true);
    setError(null);
    fetchSeasonXP(season, selectedLayer)
      .then(setData)
      .catch(() => setError("Fehler beim Laden des Leaderboards."))
      .finally(() => setLoading(false));
  }, [season, selectedLayer]);

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-ultra-red">Leaderboard</h1>
      <div className="mb-4">
        <label className="block mb-1 text-sm text-gray-400">Season wählen:</label>
        <select
          className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white mb-4"
          value={season ?? ''}
          onChange={e => setSeason(Number(e.target.value))}
        >
          {seasons.map((s: any) => (
            <option key={s.id} value={s.id}>
              {s.name} ({s.start} – {s.end})
            </option>
          ))}
        </select>
      </div>
      <div className="mb-8">
        <select
          className="bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 text-white"
          value={selectedLayer}
          onChange={(e) => setSelectedLayer(e.target.value)}
        >
          {LAYERS.map((layer) => (
            <option key={layer} value={layer}>
              {layer}
            </option>
          ))}
        </select>
      </div>
      {loading && <div className="text-gray-400">Lade Leaderboard...</div>}
      {error && <div className="text-red-500">{error}</div>}
      {/* Tabelle */}
      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead>
          <tr className="text-xs text-gray-400">
            <th className="px-2">#</th>
            <th className="px-2">Name</th>
            <th className="px-2">XP</th>
            <th className="px-2">Layer</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry, i) => (
            <tr
              key={entry.user + i}
              className={`rounded-lg ${i < 3 ? "bg-ultra-red/10" : "bg-white/5"}`}
            >
              <td className="px-2 py-1 font-bold">{i + 1}</td>
              <td className="px-2 py-1">{entry.user}</td>
              <td className="px-2 py-1">{entry.xp}</td>
              <td className="px-2 py-1">{entry.layer_type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard; 