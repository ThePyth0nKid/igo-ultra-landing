import React, { useEffect, useState } from "react";
import {
  getAdminUsers,
  deleteAdminUser,
  AdminUser
} from "@/lib/adminUserApi";
import { useNavigate } from "react-router-dom";

const PAGE_SIZE = 10;

const UserList: React.FC = () => {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("date_joined");
  const [ordering, setOrdering] = useState<"asc" | "desc">("desc");
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);
    getAdminUsers({
      page,
      page_size: PAGE_SIZE,
      search,
      ordering: ordering === "desc" ? `-${sort}` : sort
    })
      .then(data => {
        if (Array.isArray(data)) {
          setUsers(data);
          setCount(data.length);
        } else if (Array.isArray(data.results)) {
          setUsers(data.results);
          setCount(typeof data.count === "number" ? data.count : data.results.length);
        } else {
          setUsers([]);
          setCount(0);
        }
      })
      .catch(() => {
        setError("Fehler beim Laden der User");
        setUsers([]);
        setCount(0);
      })
      .finally(() => setLoading(false));
  }, [page, search, sort, ordering]);

  const handleDelete = async (id: number) => {
    if (!window.confirm("Diesen User wirklich löschen?")) return;
    try {
      await deleteAdminUser(id);
      setUsers(users => users.filter(u => u.id !== id));
      setCount(count => count - 1);
    } catch {
      alert("Fehler beim Löschen des Users");
    }
  };

  const totalPages = Math.ceil(count / PAGE_SIZE);

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-end gap-4 mb-6">
        <div>
          <label className="block text-sm font-semibold mb-1">Suche</label>
          <input
            type="text"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            placeholder="Username, Ultra-Name, Email..."
            className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white w-64"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1">Sortierung</label>
          <select
            value={sort}
            onChange={e => setSort(e.target.value)}
            className="px-3 py-2 rounded bg-gray-900 border border-gray-700 text-white"
          >
            <option value="date_joined">Beitritt</option>
            <option value="last_login">Letzter Login</option>
            <option value="username">Username</option>
            <option value="ultra_name">Ultra-Name</option>
          </select>
          <button
            className="ml-2 px-2 py-1 rounded border border-gray-700 bg-gray-800 text-white"
            onClick={() => setOrdering(o => o === "asc" ? "desc" : "asc")}
            title={ordering === "asc" ? "Aufsteigend" : "Absteigend"}
          >
            {ordering === "asc" ? "↑" : "↓"}
          </button>
        </div>
        <div className="flex-1 text-right">
          <button
            className="px-4 py-2 rounded bg-ultra-red text-white hover:bg-red-800"
            onClick={() => navigate("/admin-panel/users/create")}
          >
            Neuen User anlegen
          </button>
        </div>
      </div>
      {loading ? (
        <div className="text-center text-gray-400 py-10">Lade User…</div>
      ) : error ? (
        <div className="text-center text-red-500 py-10">{error}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-black/80 border border-gray-800 rounded-xl">
            <thead>
              <tr className="bg-gray-900 text-gray-300">
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">Username</th>
                <th className="px-4 py-2 text-left">Ultra-Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Staff</th>
                <th className="px-4 py-2 text-left">Aktiv</th>
                <th className="px-4 py-2 text-left">Beitritt</th>
                <th className="px-4 py-2 text-left">Aktionen</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className="border-t border-gray-800 hover:bg-gray-900">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">{user.ultra_name || <span className="text-gray-500">–</span>}</td>
                  <td className="px-4 py-2">{user.email}</td>
                  <td className="px-4 py-2">{user.is_staff ? "✔️" : ""}</td>
                  <td className="px-4 py-2">{user.is_active ? "✔️" : ""}</td>
                  <td className="px-4 py-2">{user.date_joined ? new Date(user.date_joined).toLocaleDateString() : "–"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="px-2 py-1 rounded bg-blue-700 text-white hover:bg-blue-800 text-xs"
                      onClick={() => navigate(`/admin-panel/users/${user.id}`)}
                    >
                      Details
                    </button>
                    <button
                      className="px-2 py-1 rounded bg-red-700 text-white hover:bg-red-800 text-xs"
                      onClick={() => handleDelete(user.id)}
                    >
                      Löschen
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center text-gray-500 py-8">Keine User gefunden.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button
              key={p}
              className={`px-3 py-1 rounded ${p === page ? "bg-ultra-red text-white" : "bg-gray-800 text-gray-300"}`}
              onClick={() => setPage(p)}
            >
              {p}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList; 