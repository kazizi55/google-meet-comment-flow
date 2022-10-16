import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { crx, defineManifest } from "@crxjs/vite-plugin";

const manifest = defineManifest({
  manifest_version: 3,
  name: "Google Meet Comment Flow",
  version: "1.0.0",
  permissions: ["storage", "tabs", "scripting"],
  host_permissions: ["http://*/*", "https://*/*"],
  action: {
    default_popup: "index.html",
  },
  background: { service_worker: "src/background/index.ts" },
  content_scripts: [
    {
      matches: ["https://meet.google.com/*"],
      js: [
        "src/contentScripts/saveComment.ts",
        "src/contentScripts/streamComment.ts",
      ],
      run_at: "document_start",
    },
  ],
});

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), crx({ manifest })],
});
