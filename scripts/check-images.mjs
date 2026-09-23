import fs from "fs";
import path from "path";

const productsFile = path.join(process.cwd(), "data", "products.ts");
const text = fs.readFileSync(productsFile, "utf8");

const matches = [...text.matchAll(/"brand":\s*"([^"]+)"[\s\S]*?"slug":\s*"([^"]+)"/g)];
const imageExtensions = [".webp", ".png", ".jpg", ".jpeg"];

let missing = 0;

for (const match of matches) {
  const brand = match[1].toLowerCase();
  const slug = match[2];

  const imageDir = path.join(process.cwd(), "public", "products", brand);
  const hasImage = imageExtensions.some((extension) =>
    fs.existsSync(path.join(imageDir, `${slug}${extension}`))
  );

  if (!hasImage) {
    missing++;
    console.log(`❌ ${brand}/${slug}`);
  }
}

console.log(`\nВсего товаров: ${matches.length}`);
console.log(`Нет изображений: ${missing}`);
console.log(`Есть изображений: ${matches.length - missing}`);
