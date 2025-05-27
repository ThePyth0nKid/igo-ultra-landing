// src/pages/ProtectedRoute.tsx

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCurrentUser } from "@/lib/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        // Attempt to load the current user via JWT
        await fetchCurrentUser();
        setAuth(true);
      } catch {
        // Not authenticated → redirect to login or home
        navigate("/login");
      } finally {
        setLoading(false);
      }
    })();
  }, [navigate]);

  if (loading) {
    return <div>Loading…</div>;
  }

  // If authenticated, render children; otherwise render nothing
  return auth ? <>{children}</> : null;
}
