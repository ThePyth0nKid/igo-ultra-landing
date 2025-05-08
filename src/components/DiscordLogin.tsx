import { useCallback } from "react";
import Popup from "react-oauth-popup";
import API from "@/lib/axios";

const clientId = "DEINE_DISCORD_CLIENT_ID";
const redirectUri = "https://igoultra-backend-v2-7307073ce46e.herokuapp.com/accounts/discord/login/callback/";

const DiscordLogin = () => {
  const onCode = useCallback(async (code: string) => {
    try {
      // Schritt 1: Auth-Code an Backend senden
      const response = await API.post("/api/auth/social/discord/", {
        code,
        redirect_uri: redirectUri,
      });

      const { access, refresh } = response.data;

      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);
      window.location.href = "/dashboard";
    } catch (error) {
      console.error("Discord login failed:", error);
      alert("Login via Discord failed");
    }
  }, []);

  return (
    <Popup
      url={`https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=identify email`}
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
