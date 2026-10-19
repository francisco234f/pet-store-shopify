import Image from 'next/image';
import Link from 'next/link';
import { addToCart } from '@/lib/cart';
import { Product } from '@/lib/shopify';

export default function Storefront({ products }: { products: Product[] }) {
  const collections = [
    { label: 'Dog Beds', href: '#dog-beds', tone: 'soft-mint' },
    { label: 'Cat Beds', href: '#cat-beds', tone: 'soft-rose' },
    { label: 'Bundle Deals', href: '#shop', tone: 'soft-stone' },
  ];

  return (
    <main>
      <section className="hero-section">
        <div className="container hero-shell">
          <div className="hero-copy">
            <p className="eyebrow">Petora</p>
            <h1>Comfort-first beds for naps, play, and happy homes.</h1>
            <p className="lede">
              Soft, supportive design for dogs and cats who love to curl up in a calm, beautiful space.
            </p>
            <div className="cta-row">
              <a href="#shop" className="primary-btn">Shop beds</a>
              <Link href="/cart" className="secondary-btn">View cart</Link>
            </div>
            <div className="hero-badges">
              <span>Free shipping over $75</span>
              <span>Machine washable covers</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Petora bedroom collection">
            <div className="hero-card main-card">
              <Image
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=900&q=80"
                alt="Dog lying in bed"
                width={700}
                height={640}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      <section id="collections" className="container section-shell">
        <div className="section-heading">
          <p className="eyebrow">Shop by mood</p>
          <h2>Cozy for every pet corner</h2>
        </div>
        <div className="collection-grid">
          {collections.map((collection) => (
            <a key={collection.label} href={collection.href} className={`collection-card ${collection.tone}`}>
              <span>{collection.label}</span>
            </a>
          ))}
        </div>
      </section>

      <section id="shop" className="container section-shell">
        <div className="section-heading row-between">
          <div>
            <p className="eyebrow">Featured picks</p>
            <h2>Best sellers for dogs & cats</h2>
          </div>
        </div>

        <div className="product-grid">
          {products.map((product) => (
            <article key={product.id} className="product-card">
              <div className="product-img-wrap">
                <img src={product.image} alt={product.title} />
              </div>
              <div className="product-body">
                <p className="mini-label">{product.category}</p>
                <h3>{product.title}</h3>
                <div className="price-row">
                  <span className="price">${product.price}</span>
                  {product.compareAtPrice ? <span className="compare-at">${product.compareAtPrice}</span> : null}
                </div>
                <div className="card-actions">
                  <Link href={`/products/${product.handle}`} className="secondary-btn small-btn">
                    View details
                  </Link>
                  <button
                    className="primary-btn small-btn"
                    onClick={() => {
                      addToCart(product);
                      window.location.href = '/cart';
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
