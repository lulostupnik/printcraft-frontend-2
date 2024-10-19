import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl: 'http://localhost:3000', // Cambia esto si tu servidor Next.js usa otro puerto
    supportFile: false,
  },
});
