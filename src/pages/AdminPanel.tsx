import React, { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/lib/api";
import { useNavigate } from "react-router-dom";
import UserList from "@/components/admin/UserList";

const AdminPanel: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [isStaff, setIsStaff] = useState(false);
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
      <UserList />
    </div>
  );
};

export default AdminPanel; 