import { expect, test } from "@playwright/test";

// Pruebas de humo de solo lectura: piden páginas y miran respuestas. No crean cuentas ni pedidos.

const SLUG_COMERCIO = process.env.SHOP_SLUG ?? "kiosco-eli";
const UA_WHATSAPP = "WhatsApp/2.23.20.0";

test("la página principal carga con el título de la marca", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Local/);
  await expect(page.locator("header")).toBeVisible();
});

test("términos y privacidad están publicados", async ({ request }) => {
  for (const [ruta, titulo] of [
    ["/terminos", "Términos y condiciones"],
    ["/privacidad", "Política de privacidad"],
  ]) {
    const res = await request.get(ruta);
    expect(res.status(), ruta).toBe(200);
    expect(await res.text(), ruta).toContain(titulo);
  }
});

test("el manifiesto es válido y cada ícono existe con el tamaño declarado", async ({ request }) => {
  const res = await request.get("/manifest.webmanifest");
  expect(res.status()).toBe(200);
  const manifiesto = await res.json();
  expect(manifiesto.name).toBeTruthy();
  expect(manifiesto.start_url).toBeTruthy();
  expect(manifiesto.icons.length).toBeGreaterThanOrEqual(2);

  for (const icono of manifiesto.icons as { src: string; sizes: string; type: string }[]) {
    const r = await request.get(icono.src);
    expect(r.status(), icono.src).toBe(200);
    expect(r.headers()["content-type"], icono.src).toContain("image/png");
    const cuerpo = await r.body();
    // Un PNG guarda ancho y alto en los bytes 16 a 23.
    const [ancho, alto] = [cuerpo.readUInt32BE(16), cuerpo.readUInt32BE(20)];
    expect(`${ancho}x${alto}`, icono.src).toBe(icono.sizes);
  }
});

test("el service worker mínimo se sirve como JavaScript", async ({ request }) => {
  const res = await request.get("/sw.js");
  expect(res.status()).toBe(200);
  expect(res.headers()["content-type"]).toContain("javascript");
});

// Regresión de BUG-005: los programas de vista previa no ejecutan JavaScript.
test("el link de un comercio entrega su nombre en la vista previa (sin ejecutar JS)", async ({ request }) => {
  const res = await request.get(`/${SLUG_COMERCIO}`, {
    headers: { "user-agent": UA_WHATSAPP },
    maxRedirects: 0,
  });
  test.skip(res.status() === 404, `El comercio "${SLUG_COMERCIO}" ya no existe: definí SHOP_SLUG con uno vigente`);
  expect(res.status()).toBe(200);
  const html = await res.text();
  const titulo = html.match(/<meta property="og:title" content="([^"]+)"/)?.[1];
  expect(titulo, "og:title").toBeTruthy();
  expect(titulo).not.toBe("Local — Productos y precios del barrio");
  expect(html).toMatch(/<meta property="og:image" content="https:\/\//);
});

test("un comercio inexistente responde 404", async ({ request }) => {
  const res = await request.get("/este-comercio-no-existe-xyz", { maxRedirects: 0 });
  expect(res.status()).toBe(404);
});

test("www redirige al dominio principal", async ({ request, baseURL }) => {
  test.skip(!baseURL?.includes("localarg.com"), "Solo aplica al dominio de producción");
  const res = await request.get("https://www.localarg.com/", { maxRedirects: 0 });
  expect(res.status()).toBe(301);
  expect(res.headers()["location"]).toContain("localarg.com");
  expect(res.headers()["location"]).not.toContain("www.");
});

test("el sitio del catálogo responde", async ({ request, baseURL }) => {
  test.skip(!baseURL?.includes("localarg.com"), "Solo aplica al dominio de producción");
  const res = await request.get("https://catalogo.localarg.com/");
  expect(res.status()).toBe(200);
});
