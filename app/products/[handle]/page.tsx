import Link from 'next/link';
import { getProducts } from '@/lib/shopify';

export default async function ProductPage({ params }: { params: { handle: string } }) {
  const products = await getProducts();
  const product = products.find((item) => item.handle === params.handle) ?? products[0];

  if (!product) {
    return <main className="container page-shell"><h1>Product not found.</h1></main>;
  }

  return (
    <main className="container page-shell product-page">
      <div className="product-gallery">
        <img src={product.image} alt={product.title} />
      </div>
      <div className="product-summary">
        <p className="eyebrow">{product.category}</p>
        <h1>{product.title}</h1>
        <div className="price-row">
          <span className="price">${product.price}</span>
          {product.compareAtPrice ? <span className="compare-at">${product.compareAtPrice}</span> : null}
        </div>
        <p>{product.description}</p>
        <div className="cta-row">
          <Link href="/cart" className="primary-btn">Add to cart</Link>
          <Link href="/" className="secondary-btn">Continue shopping</Link>
        </div>
      </div>
    </main>
  );
}
