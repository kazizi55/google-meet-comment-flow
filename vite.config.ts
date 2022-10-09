import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Google Meet Comment Flow",
  version: "1.0.0",
  permissions: ["storage"],
  action: {
    default_popup: "index.html",
  },
  content_scripts: [
    {
      matches: ["https://meet.google.com/*"],
      js: ["src/contentScripts/index.ts"],
      run_at: "document_start",
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
