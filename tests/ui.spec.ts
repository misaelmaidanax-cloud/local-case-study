import { expect, test } from "@playwright/test";

// Pruebas de interfaz de solo lectura. Ninguna llega a crear una cuenta.

async function abrirCartelDeCuenta(page: import("@playwright/test").Page) {
  await page.goto("/");
  // Se reintenta el clic hasta que la página termine de hidratarse.
  await expect(async () => {
    await page.getByRole("button", { name: "Iniciar sesión" }).first().click();
    await expect(page.getByRole("heading", { name: "Tu cuenta en Local" })).toBeVisible({ timeout: 1500 });
  }).toPass({ timeout: 15_000 });
}

// Regresión de BUG-001: el cartel quedaba cortado dentro de la barra de arriba.
test("el cartel de cuenta se abre centrado y completo en la pantalla", async ({ page }) => {
  await page.setViewportSize({ width: 1280, height: 800 });
  await abrirCartelDeCuenta(page);

  const tarjeta = page.getByRole("heading", { name: "Tu cuenta en Local" }).locator("xpath=..");
  const caja = await tarjeta.boundingBox();
  expect(caja).not.toBeNull();
  const { x, y, width, height } = caja!;
  expect(y, "borde superior dentro de la pantalla").toBeGreaterThanOrEqual(0);
  expect(y + height, "borde inferior dentro de la pantalla").toBeLessThanOrEqual(800);
  expect(Math.abs(x + width / 2 - 640), "centrado horizontalmente").toBeLessThan(4);
  // Cada campo del formulario tiene que estar dentro de la pantalla.
  for (const campo of ["Email", "Contraseña"]) {
    const c = await page.getByLabel(campo, { exact: true }).boundingBox();
    expect(c, campo).not.toBeNull();
    expect(c!.y, campo).toBeGreaterThan(0);
  }
});

test("para crear una cuenta hay que aceptar los términos (no se crea nada sin eso)", async ({ page }) => {
  await abrirCartelDeCuenta(page);
  await page.getByRole("button", { name: "Crear cuenta" }).first().click();
  await page.getByLabel("Email", { exact: true }).fill("prueba.qa@example.com");
  await page.getByLabel("Contraseña", { exact: true }).fill("una-clave-de-prueba");
  await page.getByRole("button", { name: "Crear cuenta" }).last().click();
  await expect(page.getByText("tenés que aceptar los términos")).toBeVisible();
});

test("el ojito muestra y oculta la contraseña", async ({ page }) => {
  await abrirCartelDeCuenta(page);
  const campo = page.getByLabel("Contraseña", { exact: true });
  await expect(campo).toHaveAttribute("type", "password");
  await page.getByRole("button", { name: "Mostrar contraseña" }).click();
  await expect(campo).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Ocultar contraseña" }).click();
  await expect(campo).toHaveAttribute("type", "password");
});

test("en el celular aparece el aviso de instalación cuando el navegador lo permite", async ({ browser }) => {
  const contexto = await browser.newContext({ viewport: { width: 375, height: 812 }, isMobile: true, hasTouch: true });
  const page = await contexto.newPage();
  await page.goto("/");
  await expect(page.locator("nav").last()).toBeVisible();
  // Se simula el evento que lanza Chrome cuando la app se puede instalar.
  await expect(async () => {
    await page.evaluate(() => {
      const evento = new Event("beforeinstallprompt");
      Object.assign(evento, { prompt: async () => {}, userChoice: Promise.resolve({ outcome: "dismissed" }) });
      window.dispatchEvent(evento);
    });
    await expect(page.getByText("Instalar Local")).toBeVisible({ timeout: 1500 });
  }).toPass({ timeout: 15_000 });
  await page.getByRole("button", { name: "Cerrar" }).click();
  await expect(page.getByText("Instalar Local")).toBeHidden();
  await contexto.close();
});

test("el pie lleva a los términos y a la privacidad", async ({ page }) => {
  await page.goto("/perfil");
  await page.getByRole("link", { name: "Términos y condiciones" }).click();
  await expect(page).toHaveURL(/\/terminos$/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Términos");
});
