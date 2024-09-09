export const API_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3002"
    : "https://heartfelt-delight-production.up.railway.app";
