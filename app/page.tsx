import Link from 'next/link';
import Storefront from '@/components/storefront';
import { getProducts } from '@/lib/shopify';

export default async function HomePage() {
  const products = await getProducts();

  return <Storefront products={products} />;
}
