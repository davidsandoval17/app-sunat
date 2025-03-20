//@ts-check
import puppeteer from "puppeteer";

export async function scrap(user) {
  const browser = await puppeteer.launch({
    executablePath:
      "D:\\Users\\CORFINAN\\Desktop\\app\\chrome\\win64-133.0.6943.53\\chrome-win64\\chrome.exe",
    headless: true,
    defaultViewport: null,
    // slowMo: 150,
    // timeout: 60000,
  });
  const page = await browser.newPage();

  await page.goto(
    "https://api-seguridad.sunat.gob.pe/v1/clientessol/4f3b88b3-d9d6-402a-b85d-6a0bc857746a/oauth2/loginMenuSol?lang=es-PE&showDni=true&showLanguages=false&originalUrl=https://e-menu.sunat.gob.pe/cl-ti-itmenu/AutenticaMenuInternet.htm&state=rO0ABXNyABFqYXZhLnV0aWwuSGFzaE1hcAUH2sHDFmDRAwACRgAKbG9hZEZhY3RvckkACXRocmVzaG9sZHhwP0AAAAAAAAx3CAAAABAAAAADdAAEZXhlY3B0AAZwYXJhbXN0AEsqJiomL2NsLXRpLWl0bWVudS9NZW51SW50ZXJuZXQuaHRtJmI2NGQyNmE4YjVhZjA5MTkyM2IyM2I2NDA3YTFjMWRiNDFlNzMzYTZ0AANleGVweA=="
  );
  await page.type("#txtRuc", user.ruc.toString());
  await page.type("#txtUsuario", user.user.toString());
  await page.type("#txtContrasena", user.password.toString());
  await page.click("#btnAceptar");
  await browser.close();
}
