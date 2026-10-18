import { defineConfig, devices } from "@playwright/test";

// Pruebas de solo lectura contra el sitio real. Cambiá BASE_URL para probar otro entorno.
export default defineConfig({
  testDir: "./tests",
  timeout: 45_000,
  retries: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: process.env.BASE_URL ?? "https://localarg.com",
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
});
