export function getProductImage(
  brand: string,
  slug: string
) {
  return `/products/${brand.toLowerCase()}/${slug}.webp`;
}

export function getBrandLogo(
  brand: string
) {
  return `/brands/${brand.toLowerCase()}/logo.webp`;
}