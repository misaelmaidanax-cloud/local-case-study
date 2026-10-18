// Saca las capturas de pantalla del README desde el sitio real (solo pantallas públicas, sin iniciar sesión).
// Uso: node tools/capture-screenshots.mjs
// Notas: la ubicación se simula en el centro de Córdoba para mostrar el puntito del mapa, y el aviso de
// instalación se muestra disparando el evento que lanza Chrome. Los comercios son datos de ejemplo.
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const BASE = process.env.BASE_URL ?? "https://localarg.com";
const SALIDA = new URL("../assets/screenshots/", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
mkdirSync(SALIDA, { recursive: true });

const navegador = await chromium.launch({ args: ["--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader"] });
const comun = {
  locale: "es-AR",
  timezoneId: "America/Argentina/Cordoba",
  geolocation: { latitude: -31.4201, longitude: -64.1888 },
  permissions: ["geolocation"],
};

async function abrir(contexto, ruta, esperaMapa = 0) {
  const page = await contexto.newPage();
  await page.goto(BASE + ruta, { waitUntil: "networkidle" });
  if (esperaMapa) await page.waitForTimeout(esperaMapa);
  return page;
}

async function abrirCartel(page, nombreBoton) {
  for (let i = 0; i < 10; i++) {
    await page.getByRole("button", { name: nombreBoton }).first().click().catch(() => {});
    if (await page.getByRole("heading", { name: "Tu cuenta en Local" }).isVisible()) return;
    await page.waitForTimeout(800);
  }
  throw new Error("No se abrió el cartel de cuenta");
}

// --- Computadora, tema claro ---
{
  const ctx = await navegador.newContext({ ...comun, viewport: { width: 1280, height: 800 }, colorScheme: "light", deviceScaleFactor: 1.5 });
  let page = await abrir(ctx, "/", 7000);
  await page.screenshot({ path: SALIDA + "01-desktop-map.png" });

  page = await abrir(ctx, "/almacen-centro", 5000);
  await page.waitForURL(/comercio=/);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: SALIDA + "02-desktop-shop-sheet.png" });

  page = await abrir(ctx, "/", 1500);
  await abrirCartel(page, "Iniciar sesión");
  await page.screenshot({ path: SALIDA + "03-desktop-login-dialog.png" });
  await page.getByRole("button", { name: "Crear cuenta" }).first().click();
  await page.getByLabel("Email", { exact: true }).fill("nombre@ejemplo.com");
  await page.getByRole("button", { name: "Mostrar contraseña" }).click();
  await page.getByLabel("Contraseña", { exact: true }).fill("ejemplo123");
  await page.screenshot({ path: SALIDA + "04-desktop-signup-terms-and-show-password.png" });
  await ctx.close();
}

// --- Celular ---
{
  const ctx = await navegador.newContext({
    ...comun,
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true,
    hasTouch: true,
    colorScheme: "light",
  });
  let page = await abrir(ctx, "/", 7000);
  await page.screenshot({ path: SALIDA + "05-mobile-map.png" });

  page = await abrir(ctx, "/almacen-centro", 5000);
  await page.waitForURL(/comercio=/);
  await page.waitForTimeout(3000);
  await page.screenshot({ path: SALIDA + "06-mobile-shop-sheet.png" });

  page = await abrir(ctx, "/perfil", 1500);
  await page.evaluate(() => {
    const e = new Event("beforeinstallprompt");
    Object.assign(e, { prompt: async () => {}, userChoice: Promise.resolve({ outcome: "dismissed" }) });
    window.dispatchEvent(e);
  });
  await page.waitForTimeout(800);
  await page.screenshot({ path: SALIDA + "07-mobile-profile-and-install-bar.png" });
  await ctx.close();
}

// --- Celular, tema oscuro ---
{
  const ctx = await navegador.newContext({ ...comun, viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true, colorScheme: "dark" });
  const page = await abrir(ctx, "/", 7000);
  await page.screenshot({ path: SALIDA + "08-mobile-map-dark.png" });
  await ctx.close();
}

await navegador.close();
console.log("Capturas guardadas en", SALIDA);
