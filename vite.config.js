import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// ADDED: This logs to the Cloudflare build terminal so we can see what it receives
console.log("BUILD ENV CHECK:", {
  url: process.env.VITE_SUPABASE_URL,
  key: process.env.VITE_SUPABASE_ANON_KEY ? "Key is present" : "Key is MISSING",
});

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
