import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

if (!process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
  throw new Error(
    "🚨 CRITICAL: VITE_SUPABASE ENV VARS ARE MISSING DURING BUILD! 🚨",
  );
}

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
