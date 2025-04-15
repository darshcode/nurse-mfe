import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import federation from "@originjs/vite-plugin-federation";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    federation({
      name: "nurseApp",
      filename: "remoteEntry.js", // remote exposed file
      exposes: {
        "./NurseAppComponent": "./src/NurseAppComponent",
      },
      shared: ["react", "react-dom", "@apollo/client", "lucide-react"],
    }),
  ],

  preview: {
    host: "0.0.0.0",
    port: 3002,
    strictPort: true,
    allowedHosts: ["nurse-mfe.onrender.com"], // ✅ add your Render hostname here
  },

  build: {
    modulePreload: false,
    target: "esnext",
    outDir: "dist",
    minify: false,
    cssCodeSplit: false,
  },
});
