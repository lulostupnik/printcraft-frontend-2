import { defineConfig } from "cypress";

export default defineConfig({
  projectId: '2myep6',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Cambia esto si tu servidor Next.js usa otro puerto
    supportFile: false,
  },
});
