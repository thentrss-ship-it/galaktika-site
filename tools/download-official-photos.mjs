import fs from "fs/promises";
import path from "path";

const root = process.cwd();

const items = [
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/AuroraRainbow-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-aurora-rainbow.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/CarbonBlack-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-carbon-black.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/EarthBrown-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-earth-brown.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/FrostSilver-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-frost-silver.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/GlacierGreen-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-glacier-green.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/RacingGold-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-racing-gold.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/TurboRed-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1750151394",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-turbo-red.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/TwilightBlue-Geekvape_Aegis_Legend_5_Kit_200W.png?v=1775208012",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-aegis-legend-5-kit-novinka-07-26-twilight-blue.png",
  },
  {
    source: "VOOPOO official site",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/drag-6/part6/pro_01.webp?v=dcf768b3c4",
    file: "public/products/voopoo/voopoo-nabor-voopoo-drag-6-kit-brown.webp",
  },
  {
    source: "VOOPOO official site",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/drag-6/part6/pro_02.webp?v=8e6024fc06",
    file: "public/products/voopoo/voopoo-nabor-voopoo-drag-6-kit-metal-gray.webp",
  },
  {
    source: "VOOPOO official site",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/drag-6/part6/pro_03.webp?v=4fee9fe566",
    file: "public/products/voopoo/voopoo-nabor-voopoo-drag-6-kit-green.webp",
  },
  {
    source: "VOOPOO official site",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/drag-6/part6/pro_04.webp?v=b4ce7ce881",
    file: "public/products/voopoo/voopoo-nabor-voopoo-drag-6-kit-red.webp",
  },
  {
    source: "VOOPOO official site",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/drag-6/part6/pro_05.webp?v=0d75ec08fe",
    file: "public/products/voopoo/voopoo-nabor-voopoo-drag-6-kit-blue.webp",
  },
  {
    source: "VOOPOO official site",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/drag-6/part6/pro_07.webp?v=aace7158ad",
    file: "public/products/voopoo/voopoo-nabor-voopoo-drag-6-kit-black.webp",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Abyssal_Blue.png?v=1783424816",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-abyssal-blue.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Aurora_Blue.png?v=1783424819",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-aurora-blue.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Carbon_Fiber_Gray.png?v=1783424822",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-carbon-fiber-gray.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Cosmic_Black.png?v=1783424810",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-cosmic-black.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Dreamy_Pink.png?v=1783424825",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-dreamy-pink.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Pearl_White.png?v=1783424840",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-pearl-white.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Scorching_Cloud.png?v=1783424843",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-scorching-cloud.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Silk_Brown.png?v=1783424846",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-silk-brown.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Silk_Gray.png?v=1783424850",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-silk-gray.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Silk_Green.png?v=1783424853",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-silk-green.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6-Slate_Black.png?v=1783424813",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-kit-slate-black.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Black.png?v=1783425097",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-black.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Brown.png?v=1783425100",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-brown.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Jelly_Blue.png?v=1783425438",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-jelly-blue.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Jelly_Green.png?v=1783425435",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-jelly-green.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Jelly_Orange.png?v=1783425454",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-jelly-orange.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Jelly_Pink.png?v=1783425429",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-jelly-pink.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Plume_Blue.png?v=1783425432",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-plume-blue.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Plume_White.png?v=1783425426",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-plume-white.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Titanium_Black.png?v=1783425115",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-titanium-black.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/XROS_6_MINI-Titanium_Silver.png?v=1783425118",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-titanium-silver.png",
  },
];

for (const item of items) {
  const destination = path.join(root, item.file);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const response = await fetch(item.url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      "Referer": new URL(item.url).origin,
    },
  });

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText}: ${item.url}`);
  }

  const buffer = Buffer.from(await response.arrayBuffer());
  await fs.writeFile(destination, buffer);
  console.log(`${item.file} <- ${item.source}`);
}

console.log(`Downloaded ${items.length} official photos.`);
