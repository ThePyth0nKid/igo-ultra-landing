// src/components/DiscordLogin.tsx

import { useCallback } from "react";
import Popup from "react-oauth-popup";
import { getDiscordAuthUrl } from "@/lib/authService";
import { loginWithDiscord } from "@/lib/api";

const DiscordLogin = () => {
  const onCode = useCallback(
    async (code: string) => {
      try {
        // 1) Exchange the OAuth code for JWT tokens
        await loginWithDiscord(code);

        // 2) Redirect to dashboard (or wherever)
        window.location.href = "/dashboard";
      } catch (error) {
        console.error("Discord login failed:", error);
        alert("Login via Discord failed");
      }
    },
    []
  );

  return (
    <Popup
      // use the same URL builder you have in authService
      url={getDiscordAuthUrl()}
      onCode={onCode}
      onClose={() => console.log("Popup closed")}
    >
      <button className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-all">
        Login with Discord
      </button>
    </Popup>
  );
};

export default DiscordLogin;
