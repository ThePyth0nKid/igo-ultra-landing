// src/components/PrivateRoute.tsx

import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "@/lib/api";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchCurrentUser();
        // Weiterleitung, wenn Onboarding noch nicht abgeschlossen
        if (user.missing_onboarding_fields && user.missing_onboarding_fields.length > 0) {
          setRedirect("/onboarding");
        }
      } catch {
        // Not authenticated, send to login or home
        setRedirect("/");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // While checking auth, render nothing (or a spinner)
  if (loading) return null;

  // If redirect path determined, navigate there
  if (redirect) return <Navigate to={redirect} replace />;

  // Otherwise render the protected children
  return children;
};

export default PrivateRoute;
