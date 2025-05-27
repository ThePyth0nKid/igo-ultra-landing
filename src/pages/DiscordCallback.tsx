// src/pages/DiscordCallback.tsx

import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithDiscord, fetchCurrentUser } from "@/lib/api";

const DiscordCallback = () => {
  const navigate = useNavigate();
  const calledRef = useRef(false);

  useEffect(() => {
    // Guard: in React StrictMode this prevents a second execution
    if (calledRef.current) return;
    calledRef.current = true;

    (async () => {
      const code = new URLSearchParams(window.location.search).get("code");
      if (!code) {
        navigate("/login");
        return;
      }

      try {
        // 1) Exchange code for JWTs
        await loginWithDiscord(code);

        // 2) Fetch current user
        const user = await fetchCurrentUser();

        // 3) Redirect based on profile
        navigate(user.ultra_name ? "/dashboard" : "/onboarding");
      } catch (err) {
        console.error("Discord login failed:", err);
        navigate("/login");
      }
    })();
  }, [navigate]);

  return (
    <div className="flex items-center justify-center h-screen p-10 text-white">
      Verifying Discord login…
    </div>
  );
};

export default DiscordCallback;
