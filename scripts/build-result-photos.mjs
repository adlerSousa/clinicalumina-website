import sharp from "sharp";
import { mkdir, readdir, stat } from "node:fs/promises";

const SRC = "assets/resultados/";
const OUT = "public/images/resultados/";
const LARGURA = 1100;

function ordem(nome) {
  const m = nome.match(/(\d+)/);
  return m ? Number(m[1]) : 0;
}

async function build() {
  await mkdir(OUT, { recursive: true });

  const arquivos = (await readdir(SRC))
    .filter((f) => /\.(jpe?g|png)$/i.test(f))
    .sort((a, b) => ordem(a) - ordem(b));

  let total = 0;
  for (const arquivo of arquivos) {
    const n = ordem(arquivo);
    const destino = `${OUT}ad-${n}.webp`;

    await sharp(SRC + arquivo)
      .resize({ width: LARGURA, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destino);

    const { size } = await stat(destino);
    total += size;
    console.log(`ad-${n}.webp  ${(size / 1024).toFixed(0)} KB`);
  }

  console.log(`\n${arquivos.length} fotos  ${(total / 1024 / 1024).toFixed(2)} MB`);
}

build().catch((error) => {
  console.error(error);
  process.exit(1);
});
