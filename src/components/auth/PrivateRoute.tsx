// src/components/PrivateRoute.tsx

import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchCurrentUser } from "@/lib/api";

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const [loading, setLoading] = useState(true);
  const [redirect, setRedirect] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const user = await fetchCurrentUser();
        // If ultra_name is not set, send to onboarding
        if (!user.ultra_name) {
          setRedirect("/onboarding");
        }
      } catch {
        // Not authenticated, send to login or home
        setRedirect("/login");
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
