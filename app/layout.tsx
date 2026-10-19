import './globals.css';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Petora | Cozy Beds for Dogs & Cats',
  description: 'Shop premium dog and cat beds with soft, modern comfort designed for cozy living.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="container nav-shell">
            <Link href="/" className="brand">
              <span className="brand-mark">P</span>
              Petora
            </Link>
            <nav className="main-nav" aria-label="Main navigation">
              <Link href="/">Home</Link>
              <Link href="/#shop">Shop</Link>
              <Link href="/#collections">Collections</Link>
              <Link href="/cart">Cart</Link>
            </nav>
          </div>
        </header>
        {children}
        <footer className="site-footer">
          <div className="container footer-shell">
            <div>
              <h3>Petora</h3>
              <p>Designer beds for happy dogs and cats.</p>
            </div>
            <div>
              <p>info@petora.store</p>
              <p>+1 (800) PET-ORA</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
