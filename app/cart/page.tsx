import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CartItem, getCartItems, addToCart, removeFromCart, getCheckoutUrl, formatPrice } from '@/lib/cart';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    setCart(getCartItems());
  }, []);

  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [cart]
  );

  const handleCheckout = () => {
    const checkoutUrl = getCheckoutUrl(cart);
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
      return;
    }
    window.alert('Add your Shopify domain and access token to enable hosted checkout.');
  };

  return (
    <main className="container page-shell cart-page">
      <div className="page-heading-row">
        <div>
          <p className="eyebrow">Your bag</p>
          <h1>Cart</h1>
        </div>
        <Link href="/" className="secondary-btn">Continue shopping</Link>
      </div>

      {cart.length === 0 ? (
        <div className="empty-state">
          <p>Your cart is empty. Add a pet bed and make your room cozy.</p>
        </div>
      ) : (
        <div className="cart-layout">
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="cart-copy">
                  <h3>{item.title}</h3>
                  <p>{item.category}</p>
                  <div className="meta-row">
                    <span>{formatPrice(item.price)}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                </div>
                <button
                  className="ghost-btn"
                  onClick={() => {
                    removeFromCart(item.id);
                    setCart(getCartItems());
                  }}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <aside className="cart-summary">
            <h3>Order summary</h3>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{formatPrice(subtotal)}</strong>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <strong>Calculated at checkout</strong>
            </div>
            <button className="primary-btn full-width" onClick={handleCheckout}>
              Continue to Shopify Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
