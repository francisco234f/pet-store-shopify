export type CartItem = {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  quantity: number;
  variantId?: string;
};

const CART_KEY = 'petora-cart';

export function formatPrice(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
}

export function getCartItems(): CartItem[] {
  if (typeof window === 'undefined') return [];

  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveCartItems(items: CartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

export function addToCart(product: {
  id: string;
  title: string;
  category: string;
  image: string;
  price: number;
  variantId?: string;
}) {
  const current = getCartItems();
  const existing = current.find((item) => item.id === product.id);

  const next = existing
    ? current.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      )
    : [...current, { ...product, quantity: 1 }];

  saveCartItems(next);
  return next;
}

export function removeFromCart(id: string) {
  const next = getCartItems().filter((item) => item.id !== id);
  saveCartItems(next);
  return next;
}

export function getCheckoutUrl(cart: CartItem[]) {
  const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
  if (!domain) return '';

  const cleanDomain = domain.replace(/^https?:\/\//, '').replace(/\/$/, '');

  if (cart.length === 0) return `https://${cleanDomain}/cart`;

  const cartLine = cart
    .filter((item) => item.variantId)
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  return cartLine
    ? `https://${cleanDomain}/cart/${cartLine}`
    : `https://${cleanDomain}/cart`;
}
