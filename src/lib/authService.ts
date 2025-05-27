// src/lib/authService.ts

// Ensure these environment variables are provided
const clientId = import.meta.env.VITE_DISCORD_CLIENT_ID;
const redirectUri = import.meta.env.VITE_REDIRECT_URI;

if (!clientId) {
  throw new Error("VITE_DISCORD_CLIENT_ID is not defined in your environment");
}
if (!redirectUri) {
  throw new Error("VITE_REDIRECT_URI is not defined in your environment");
}

// Discord OAuth client settings
export const CLIENT_ID = clientId;
export const REDIRECT_URI = redirectUri;
export const SCOPE = "identify";

/**
 * Builds the Discord OAuth2 authorization URL.
 */
export function getDiscordAuthUrl(): string {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: "code",
    scope: SCOPE,
  });
  return `https://discord.com/oauth2/authorize?${params.toString()}`;
}
