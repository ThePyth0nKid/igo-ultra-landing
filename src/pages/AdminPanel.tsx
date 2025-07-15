import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import UserList from "@/components/admin/UserList";
import SeasonList from "@/components/admin/SeasonList";

const AdminPanel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
  const [tab, setTab] = useState<'users' | 'seasons'>('users');
  const navigate = useNavigate();

  useEffect(() => {
    fetchCurrentUser()
      .then(user => {
        if (user.is_staff) {
          setIsStaff(true);
        } else {
          navigate("/dashboard");
        }
      })
      .catch(() => navigate("/dashboard"))
      .finally(() => setLoading(false));
  }, [navigate]);

  if (loading) {
    return <div className="text-center text-gray-400 py-10">Lade Admin Panel…</div>;
  }
  if (!isStaff) {
    return null;
  }

  return (
    <div className="max-w-6xl mx-auto mt-12 p-8 bg-black/80 rounded-xl shadow-lg border border-gray-800">
      <h1 className="text-3xl font-bold mb-6 text-ultra-red">Admin Panel</h1>
      <div className="flex gap-4 mb-8">
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${tab === 'users' ? 'border-ultra-red text-ultra-red bg-black' : 'border-transparent text-gray-400 bg-gray-900 hover:text-ultra-red'}`}
          onClick={() => setTab('users')}
        >
          User-Admin
        </button>
        <button
          className={`px-4 py-2 rounded-t-lg font-semibold border-b-2 transition-all ${tab === 'seasons' ? 'border-ultra-red text-ultra-red bg-black' : 'border-transparent text-gray-400 bg-gray-900 hover:text-ultra-red'}`}
          onClick={() => setTab('seasons')}
        >
          Season-Admin
        </button>
      </div>
      {tab === 'users' && <UserList />}
      {tab === 'seasons' && <SeasonList />}
    </div>
  );
};

export default AdminPanel; 