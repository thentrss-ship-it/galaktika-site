import fs from "fs/promises";
import path from "path";

const root = process.cwd();

const items = [
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Apricot_Yellow_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-apricot-yellow.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Burgundy_Red_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-burgundy-red.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Metallic_Purple_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1776049141",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-metallic-purple.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Midnight_Black_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-midnight-black.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Misty_Blue_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-misty-blue.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Mocha_Gold_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-mocha-gold.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Moonlight_Silver_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-moonlight-silver.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Blinky_Black.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-new-color-blinky-black.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Fizzy_Grape.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-new-color-fizzy-grape.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Fizzy_Lemon.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-new-color-fizzy-lemon.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Fizzy_Mint.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-new-color-fizzy-mint.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Fizzy_Peach.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-new-color-fizzy-peach.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Rocket_Silver.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-new-color-rocket-silver.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Ocean_Blue_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-ocean-blue.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Olive_Green_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1776049141",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-olive-green.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Sakura_Pink_GeekVape_Sonder_Q_2_Pod_System_Kit_1350mAh.png?v=1775208217",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q2-1350mah-pod-kit-sakura-pink.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-carbon_black.png?v=1783425793",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-carbon-black.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-fluid_blue.png?v=1783425812",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-fluid-blue.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-fluid_green.png?v=1783425798",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-fluid-green.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-fluid_purple.png?v=1783425803",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-fluid-purple.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-gold_silk.png?v=1783432943",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-gold-silk.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-grey_silk.png?v=1783425807",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-grey-silk.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-sheer_pink.png?v=1783425816",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-sheer-pink.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXE_X3-sheer_red.png?v=1783425820",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-luxe-x3-kit-sheer-red.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/VIBE-cherrypink.png?v=1783424993",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-vibe-1100mah-24w-kit-cherry-pink.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/VIBE-freshgreen.png?v=1783424999",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-vibe-1100mah-24w-kit-fresh-green.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/VIBE-racingred.png?v=1783425006",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-vibe-1100mah-24w-kit-racing-red.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/VIBE-silver.png?v=1783424983",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-vibe-1100mah-24w-kit-silver.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/XROS_6_MINI-Jelly_Pink.png?v=1783425429",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-6-mini-kit-plume-pink.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/xros_pro_2-sunlight_blue.png?v=1783425054",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-pro-2-2000mah-kit-sunlight-blue.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/xros_pro_2-sunlight_red.png?v=1783425049",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-pro-2-2000mah-kit-sunlight-red.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/xros_pro_2-sunlight_silver.png?v=1783425052",
    file: "public/products/vaporesso/vaporesso-nabor-vaporesso-xros-pro-2-2000mah-kit-sunlight-silver.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTI_0.15_MESH_1_f2251c66-1575-4338-9496-2760a00e31c2.png?v=1783425268",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gti-0-15-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTI_0.2_MESH_23b67e2e-3330-4e60-85f4-328b39188c5c.png?v=1783425271",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gti-0-2-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTI_0.4_MESH_545d5458-28cb-47ac-b791-84b1d86e4dae.png?v=1783425274",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gti-0-4-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTI_0.5_MESH_1_9d246e7c-0f92-47ef-a8f3-90ba452b849f.png?v=1783425277",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gti-0-5-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTX_0.15_Mesh.png?v=1783425543",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gtx-0-15-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTX_0.2_Mesh.png?v=1783425558",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gtx-0-2-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/products/GTX_0.3_Mesh.png?v=1783425532",
    file: "public/products/vaporesso/vaporesso-isparitel-vaporesso-gtx-0-3-om-mesh-coil-5sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXEXPOD_0.4.png?v=1783425322",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-luxe-x-0-4o-5ml-corex-2-0-2-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/XROSPOD-N0.6-2ML.png?v=1783425238",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-xros-2ml-0-6-om-corex-3-0-pod-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/XROSPOD-N0.8-2ML.png?v=1783425245",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-xros-2ml-0-8-om-corex-3-0-pod-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/XROS1.0_Pod_new.png?v=1783425230",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-xros-2ml-1-0-om-corex-3-0-pod-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/XROS1.2_Pod.png?v=1783425197",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-xros-2ml-1-2-om-corex-3-0-pod-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/XROSPOD-N0.8-3ML.png?v=1783425234",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-xros-3ml-0-8-om-corex-3-0-pod-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/OSMALL2POD.png?v=1783422761",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-osmall-2-1-2o-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/APEXPOD-0.6.png?v=1783424712",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-apex-0-6-om-5ml-2sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/APEXPOD-0.8.png?v=1783424716",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-apex-0-8-om-5ml-2sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/ECONANOPOD.png?v=1783425628",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-eco-nano-0-8o-6-ml-2-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/ECONANOPOD-1.2.png?v=1783425634",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-eco-nano-1-2o-6-ml-2-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXEQ3ml_0.6-2ml.png?v=1783423224",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-luxe-q-0-6o-2ml-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXEQ3ml_0.8-2ml.png?v=1783423227",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-luxe-q-0-8o-2ml-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXEQ3ml_1.0-2ml.png?v=1783423529",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-luxe-q-1-0o-3ml-4-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXEX2-0.6.png?v=1783425313",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-luxe-x-0-6o-5ml-corex-2-0-2-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://cdn.shopify.com/s/files/1/0071/4758/5626/files/LUXEX2-0.8.png?v=1783425317",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-luxe-x-0-8o-5ml-corex-2-0-2-sht.png",
  },
  {
    source: "VOOPOO official store",
    url: "https://img-va.myshopline.com/image/store/1747294110724/ITO-M1-3_1000x.jpg?h=1000&q=80&w=1000",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-ito-m1-coil-0-7-om-5sht.jpg",
  },
  {
    source: "VOOPOO official store",
    url: "https://img-va.myshopline.com/image/store/1747294110724/ITO-M1-2_1000x.jpg?h=1000&q=80&w=1000",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-ito-m3-coil-1-2-om-5sht.jpg",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/argus-cartridges/ARGUS-Top-Fill-Cartridge-0.4.png?v=7cf428a6c2",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-argus-top-fill-0-4o-2ml-3-sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/product/detail/argus-cartridges/ARGUS-pod-Cartridge-2.png?v=b1905cdc1a",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-argus-pod-1-2o-2ml-3-sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/platform/pnp/coil/PnP-VM4.png?v=d896cba28f",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-pnp-vm4-mesh-0-6-om-vinci-vinci-r-x-drag-x-s-navi-doric-60-5sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/platform/pnp/coil/PnP-VM5.png?v=64ae6e571a",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-pnp-vm5-mesh-0-2-om-vinci-vinci-r-x-drag-x-s-navi-doric-60-5sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/page/dm1.png?v=d4213d3625",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-tpp-dm1-0-15-om-drag-3-drag-x-plus-3sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/page/dm2.png?v=bf69321f25",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-tpp-dm2-0-2-om-drag-3-drag-x-plus-3sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/page/dm3.png?v=46abae4d75",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-tpp-dm3-0-15-om-drag-3-drag-x-plus-3sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://sen.voopoo.com.cn/www-voopoo/static/dist/images/page/dm4.png?v=79c384b54a",
    file: "public/products/voopoo/voopoo-isparitel-voopoo-tpp-dm4-0-3-om-drag-3-drag-x-plus-3sht.png",
  },
  {
    source: "VOOPOO official store",
    url: "https://img-va.myshopline.com/image/store/1747294110724/Vinci-Series-V2-Cartridge-0-8.jpg?h=700&w=700",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-vinci-series-v2-pod-0-8o-3-sht.jpg",
  },
  {
    source: "VOOPOO official store",
    url: "https://img-va.myshopline.com/image/store/1747294110724/Vinci-Series-V2-Cartridge-1-2.jpg?h=700&w=700",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-vinci-series-v2-pod-1-2o-3-sht.jpg",
  },
  {
    source: "VOOPOO official store",
    url: "https://img-va.myshopline.com/image/store/1747294110724/0-7-5.jpg?w=600&h=600",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-vmate-top-fill-v-thru-pro-0-7o-3ml-2-sht.jpg",
  },
  {
    source: "VOOPOO official website",
    url: "https://www.voopoo.com/static/dist/images/platform/pnp/pod/PnP-MTL-Pod.png",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-bez-isparitelia-pnp-mtl-pod-2ml-2-sht.png",
  },
  {
    source: "VOOPOO official website",
    url: "https://www.voopoo.com/static/dist/images/platform/pnp/pod/PnP-Pod-II.png",
    file: "public/products/voopoo/voopoo-kartridzh-voopoo-bez-isparitelia-pnp-pod-ii-5ml-2-sht.png",
  },
  {
    source: "Vaporesso official store",
    url: "https://store.vaporesso.com/cdn/shop/files/13-8.png?v=1717567256&width=550",
    file: "public/products/vaporesso/vaporesso-kartridzh-vaporesso-xtra-2ml-0-8o-2-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/b015_2048x2048.png?v=1768380622",
    file: "public/products/geekvape/geekvape-isparitel-geekvape-b-0-15o-boost-version-5sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/B_Series_Coil_Boost.png?v=1775209023",
    file: "public/products/geekvape/geekvape-isparitel-geekvape-b-0-2o-boost-version-5sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/B_Series_Coil_Boost.png?v=1775209023",
    file: "public/products/geekvape/geekvape-isparitel-geekvape-b-0-3o-boost-version-5sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/B_Series_Coil_Boost.png?v=1775209023",
    file: "public/products/geekvape/geekvape-isparitel-geekvape-b-0-4o-boost-version-5sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/B_Series_Coil_Boost.png?v=1775209023",
    file: "public/products/geekvape/geekvape-isparitel-geekvape-b-0-6o-boost-version-5sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Geekvape_Q_Cartridge_Pod_3pcs_pack-Q_0.4_Cartridge-3ML-0.4.png?v=1775208565&width=600",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-q-0-4-side-fill-3-ml-3-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Geekvape_Q_Cartridge_Pod_3pcs_pack-Q_0.6_Cartridge-3ML-0.6.png?v=1775208565&width=600",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-q-0-6-side-fill-3ml-3-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Geekvape_Q_Cartridge_Pod_3pcs_pack-Q_0.8_Cartridge-3ML-0.8.png?v=1775208565&width=600",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-q-0-8-side-fill-3ml-3-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Geekvape_Q_Cartridge_Pod_3pcs_packQ_1.2_Cartridge-2ML-1.2.png?v=1775208565&width=600",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-q-1-2-side-fill-2ml-3-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Iron_Black_H45_Aegis_Hero_2_cartridge.png?v=1775208756&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geekvape-hero-5-dark-6-5ml-up-1-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Pure_White_H45_Aegis_Hero_2_cartridge.png?v=1775208756&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geekvape-hero-5-white-6-5ml-up-1-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/H45_Aegis_Hero_2_cartridge_green.png?v=1775208756&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geekvape-h45-crystal-green-4ml-2-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Geekvape_H45_Aegis_Hero_2_Empty_cartridge_4ml_2pcs_pack.png?v=1775208756&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-s-isparitelem-geekvape-h45-0-4o-5ml-2-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/Geekvape_H45_Aegis_Hero_2_Empty_cartridge_4ml_2pcs_pack.png?v=1775208756&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-s-isparitelem-geekvape-h45-0-6o-5ml-2-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/GeekvapeAegisNANOKit-_10_9da51525-ab1d-4616-a9c1-43af6f291ada.jpg?v=1620269071&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geekvape-aegis-nano-pod-1-2o-2ml-black-2-sht.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/GeekvapeAegisNANOKit-_9_50695628-573a-49bf-8adb-e09cdcb8a502.jpg?v=1775208934&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geekvape-n-aegis-nano-2-pod-0-6o-2ml-2-sht.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/files/AEGISFORCECartridge.png?v=1764662141&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-aegis-force-2-sht.png",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/Geekvapeonepodkit-_10_9972982f-6b4f-40d1-b57b-c0c6cfa3ffd2.jpg?v=1634788607&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-aegis-one-pod-1-2o-3-sht.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/Sonder-U-pod2.jpg?v=1656993186&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-u-1-1o-2ml-3-sht.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/GeekvapeWenaxH1-_16_de56b26b-29be-49bd-823b-187d12a1e85d.jpg?v=1650881282&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-wenax-h1-0-7ohm-2-5ml-pod-black-3-sht.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://store.geekvape.com/cdn/shop/products/GeekvapeWenaxH1-_16_de56b26b-29be-49bd-823b-187d12a1e85d.jpg?v=1650881282&width=900",
    file: "public/products/geekvape/geekvape-kartridzh-geek-vape-wenax-h1-1-4ohm-2-5ml-pod-black-3-sht.jpg",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/levin-pk-cartridge/detail-05.webp",
    file: "public/products/smoant/smoant-kartridzh-smoant-levin-pro-0-6o-2-sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/levin-pk-cartridge/detail-06.webp",
    file: "public/products/smoant/smoant-kartridzh-smoant-levin-pro-0-8o-2-sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/levin-pk-cartridge/detail-07.webp",
    file: "public/products/smoant/smoant-kartridzh-smoant-levin-pro-1-0o-2-sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/pasito-3/11.avif",
    file: "public/products/smoant/smoant-kartridzh-smoant-pasito-iii-7-ml-bez-isparitelia.avif",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/pasito-mini-cartridge/detail-01.jpg",
    file: "public/products/smoant/smoant-kartridzh-smoant-pasito-mini-3-5ml-bez-isparitelia.jpg",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/pasito-2-cartridge/detail-07.jpg",
    file: "public/products/smoant/smoant-adapter-smoant-pasito-2-perekhodnik-dlia-isparitelei-pasito.jpg",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/k-1-coil/detail-03.avif",
    file: "public/products/smoant/smoant-isparitel-smoant-k1-mesh-0-3-ohm-coil-pasito-2-knight-80-3-sht.avif",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/k-1-coil/detail-03.avif",
    file: "public/products/smoant/smoant-isparitel-smoant-k3-half-dtl-0-6-ohm-coil-pasito-2-knight-80-3sht.avif",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/battlestar-baby-ni80/detail-05.jpg",
    file: "public/products/smoant/smoant-isparitel-smoant-mesh-0-6-om-battlestar-baby-charon-baby-veer-3sht.jpg",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/battlestar-baby-ni80/detail-05.jpg",
    file: "public/products/smoant/smoant-isparitel-smoant-ni80-coil-1-2-om-battlestar-baby-charon-baby-veer-3sht.jpg",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/p-1-coil/detail-02.avif",
    file: "public/products/smoant/smoant-isparitel-smoant-p-2-mesh-0-8-om-pasito-mini-3sht.avif",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/p-1-coil/detail-02.avif",
    file: "public/products/smoant/smoant-isparitel-smoant-p-3-mesh-1-0-om-pasito-mini-3sht.avif",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/pasito-rba/detail-03.jpg",
    file: "public/products/smoant/smoant-isparitel-smoant-pasito-mtl-ni80-pasito-knight-80-upak-3-sht.jpg",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/s-1-coil/detail-06.webp",
    file: "public/products/smoant/smoant-isparitel-smoant-s1-0-4-om-santi-charon-baby-plus-3sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/s-1-coil/detail-06.webp",
    file: "public/products/smoant/smoant-isparitel-smoant-s2-0-6-om-santi-charon-baby-plus-3sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/s-1-coil/detail-06.webp",
    file: "public/products/smoant/smoant-isparitel-smoant-s3-1-2-om-santi-charon-baby-plus-3sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/s-1-coil/detail-07.webp",
    file: "public/products/smoant/smoant-isparitel-smoant-s4-0-35-om-santi-charon-baby-plus-3sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/s-1-coil/detail-07.webp",
    file: "public/products/smoant/smoant-isparitel-smoant-s5-0-55-om-santi-charon-baby-plus-3sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/s-1-coil/detail-07.webp",
    file: "public/products/smoant/smoant-isparitel-smoant-s6-1-1-om-santi-charon-baby-plus-3sht.webp",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/k-1-coil/detail-03.avif",
    file: "public/products/smoant/smoant-obsluzhivaemaia-baza-smoant-pasito-2-knight-80-k-rba.avif",
  },
  {
    source: "Smoant official website",
    url: "https://smoant.com/images/products/pasito-rba/detail-04.jpg",
    file: "public/products/smoant/smoant-obsluzhivaemaia-baza-smoant-pasito-rba-single-coil-0-5-1-0ohm.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/BeatBlack_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084968",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-beat-black.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/BeatNavy_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084979",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-beat-navy.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/BeatSilver_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084929",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-beat-silver.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/GroovePurple_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084911",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-groove-purple.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/GrooveTeal_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084989",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-groove-teal.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/GrooveYellow_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781085000",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-groove-yellow.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/VibeBlue_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084920",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-vibe-blue.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/VibeOrange_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084944",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-vibe-orange.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/VibeRed_Geekvape_Sonder_Q3_Pod_Starter_Kit_1750mAh_3ml.png?v=1781084955",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-sonder-q3-1750mah-pod-kit-vibe-red.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Bronze.jpg?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-bronze.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/products/CobaltBlue.png?v=1766111058",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-cobalt-blue.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Crystal-Pink.jpg?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-crystal-pink.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/products/GradientDark.png?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-gradient-dark.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/products/GradientViolet.png?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-gradient-violet.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/products/RosePink_4684ca15-01f7-45fd-9ff3-fd9d57536ae3.png?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-rose-pink.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/products/SakuraPink.png?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-sakura-pink.png",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Silver_8f3f6cde-ee24-42ac-8612-ca4f8a0e8fd0.jpg?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-silver.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/files/Titanium.jpg?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-titanium.jpg",
  },
  {
    source: "Geekvape official store",
    url: "https://cdn.shopify.com/s/files/1/0507/3708/6660/products/TurquoiseGreen.png?v=1775208576",
    file: "public/products/geekvape/geekvape-nabor-geek-vape-wenax-q-1000mah-pod-kit-turquoise-green.png",
  },
];

for (const item of items) {
  const destination = path.join(root, item.file);
  await fs.mkdir(path.dirname(destination), { recursive: true });
  const response = await fetch(item.url, {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Referer: new URL(item.url).origin,
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
