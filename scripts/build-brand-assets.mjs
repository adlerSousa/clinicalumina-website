import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";

const SRC = process.env.BRAND_KIT_DIR ?? "assets/kit-marca/";
const OUT = "public/brand/";

const assets = [
  { from: "LOGO VERSÃO 1 - BRANCO.png", to: "logo-lockup-branco", width: 1000 },
  { from: "LOGO VERSÃO 1 - DOURADO.png", to: "logo-lockup-dourado", width: 1000 },
  { from: "LOGO VERSÃO 1 - PRETO.png", to: "logo-lockup-preto", width: 1000 },
  { from: "ÍCONE BRANCO.png", to: "icone-branco", width: 256 },
  { from: "ÍCONE DOURADO.png", to: "icone-dourado", width: 256 },
  { from: "ÍCONE PRETO.png", to: "icone-preto", width: 256 },
];

async function build() {
  await mkdir(OUT, { recursive: true });

  for (const asset of assets) {
    const destino = `${OUT}${asset.to}.png`;

    await sharp(SRC + asset.from)
      .ensureAlpha()
      .resize({ width: asset.width, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(destino);

    const { size } = await stat(destino);
    console.log(`${asset.to}.png  ${asset.width}w  ${(size / 1024).toFixed(1)} KB`);
  }

  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 0x3d, g: 0x37, b: 0x30, alpha: 1 },
    },
  })
    .composite([
      {
        input: await sharp(SRC + "ÍCONE DOURADO.png")
          .resize({ width: 340 })
          .toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile("src/app/icon.png");

  console.log("icon.png  512x512  (favicon)");
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
