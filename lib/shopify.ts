export type Product = {
  id: string;
  handle: string;
  title: string;
  category: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  image: string;
  variantId?: string;
};

export const mockProducts: Product[] = [
  {
    id: 'dog-bed-1',
    handle: 'cloud-curve-dog-bed',
    title: 'Cloud Curve Dog Bed',
    category: 'Dog Beds',
    description: 'A cloud-soft orthopedic bed for larger dogs that love cozy naps and restful sleep.',
    price: 129,
    compareAtPrice: 159,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=900&q=80',
    variantId: '1234567890',
  },
  {
    id: 'cat-bed-1',
    handle: 'purr-pillow-cat-bed',
    title: 'Purr Pillow Cat Bed',
    category: 'Cat Beds',
    description: 'A plush, raised sleeping nook designed to cradle cats with warmth and quiet comfort.',
    price: 89,
    compareAtPrice: 109,
    image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?auto=format&fit=crop&w=900&q=80',
    variantId: '1234567891',
  },
  {
    id: 'dog-bed-2',
    handle: 'nest-lounge-dog-bed',
    title: 'Nest Lounge Dog Bed',
    category: 'Dog Beds',
    description: 'A modern lounge bed with supportive cushioning and washable cover for everyday comfort.',
    price: 145,
    compareAtPrice: 179,
    image: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80',
    variantId: '1234567892',
  },
  {
    id: 'cat-bed-2',
    handle: 'moon-cove-cat-bed',
    title: 'Moon Cove Cat Bed',
    category: 'Cat Beds',
    description: 'A soft curved sleeping nest for curious cats who prefer quiet corners and warm spots.',
    price: 95,
    compareAtPrice: 119,
    image: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=900&q=80',
    variantId: '1234567893',
  },
];

export async function getProducts() {
  const shopDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

  if (!shopDomain || !token) {
    return mockProducts;
  }

  try {
    const response = await fetch(
      `https://${shopDomain}/api/2024-01/graphql.json`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': token,
        },
        body: JSON.stringify({
          query: `query { products(first: 10) { edges { node { id handle title description productType images(first: 1) { nodes { url } } variants(first: 1) { nodes { id price { amount } } } } } } }`,
        }),
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      return mockProducts;
    }

    const data = await response.json();
    const products = data?.data?.products?.edges ?? [];

    return products.map((entry: any) => {
      const node = entry.node;
      const image = node.images?.nodes?.[0]?.url ?? mockProducts[0].image;
      const variant = node.variants?.nodes?.[0];

      return {
        id: node.id,
        handle: node.handle,
        title: node.title,
        category: node.productType || 'Pet Beds',
        description: node.description,
        price: Number(variant?.price?.amount ?? 99),
        image,
        variantId: variant?.id,
      };
    });
  } catch {
    return mockProducts;
  }
}
