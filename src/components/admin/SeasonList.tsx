import React, { useEffect, useState } from "react";
import { getSeasons, deleteSeason, Season } from "@/lib/seasonApi";
import { useNavigate } from "react-router-dom";

const SeasonList: React.FC = () => {
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sort, setSort] = useState<"name" | "start" | "end" | "is_active">("start");
  const [ordering, setOrdering] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getSeasons({ ordering: ordering === "desc" ? `-${sort}` : sort })
      .then(data => {
        if (Array.isArray(data)) {
          setSeasons(data);
        } else if (Array.isArray(data.results)) {
          setSeasons(data.results);
        } else {
          setSeasons([]);
        }
      })
      .catch(() => setError("Fehler beim Laden der Seasons"))
      .finally(() => setLoading(false));
  }, [sort, ordering]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Diese Season wirklich löschen?")) return;
    try {
      await deleteSeason(id);
      setSeasons(seasons => seasons.filter(s => s.id !== id));
    } catch {
      alert("Fehler beim Löschen der Season");
    }
  };

  return (
    <div className="mt-16">
      <div className="flex justify-between items-end mb-6">
        <h2 className="text-2xl font-bold text-ultra-red">Seasons</h2>
        <button
          className="px-4 py-2 rounded bg-ultra-red text-white hover:bg-red-800"
          onClick={() => navigate("/admin-panel/seasons/create")}
        >
          Neue Season anlegen
        </button>
      </div>
      {loading ? (
        <div className="text-center text-gray-400 py-10">Lade Seasons…</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black/80 border border-gray-800 rounded-xl">
            <thead>
              <tr className="bg-gray-900 text-gray-300">
                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => setSort("name")}>Name</th>
                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => setSort("start")}>Start</th>
                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => setSort("end")}>Ende</th>
                <th className="px-4 py-2 text-left cursor-pointer" onClick={() => setSort("is_active")}>Aktiv</th>
                <th className="px-4 py-2 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {seasons.map(season => (
                <tr key={season.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="px-4 py-2">{season.name}</td>
                  <td className="px-4 py-2">{season.start}</td>
                  <td className="px-4 py-2">{season.end}</td>
                  <td className="px-4 py-2">{season.is_active ? "✔️" : ""}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-blue-700 text-white hover:bg-blue-800 text-xs"
                      onClick={() => navigate(`/admin-panel/seasons/${season.id}`)}
                    >
                      Bearbeiten
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-700 text-white hover:bg-red-800 text-xs"
                      onClick={() => handleDelete(season.id)}
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
              {seasons.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-gray-500 py-8">Keine Seasons gefunden.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      <div className="mt-4 flex gap-2">
        <button
          className="px-2 py-1 rounded border border-gray-700 bg-gray-800 text-white"
          onClick={() => setOrdering(o => o === "asc" ? "desc" : "asc")}
        >
          {ordering === "asc" ? "↑ Aufsteigend" : "↓ Absteigend"}
        </button>
      </div>
    </div>
  );
};

export default SeasonList; 