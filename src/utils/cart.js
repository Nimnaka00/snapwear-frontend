// src/utils/cart.js
export const CART_KEY = "snapwear-cart";

export const getCart = () => {
  try {
    return JSON.parse(localStorage.getItem(CART_KEY)) || [];
  } catch {
    return [];
  }
};

export const saveCart = (cart) => {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  // Let listeners (Navbar/CartPage) know the cart changed
  window.dispatchEvent(new CustomEvent("snapwear-cart-updated"));
};

export const countItems = () =>
  getCart().reduce((sum, i) => sum + Number(i.quantity || 0), 0);

export const addToCart = (product, quantity = 1, size = null) => {
  const cart = getCart();
  const id = product._id || product.id;
  const imageUrl = product.imageUrl || product.image;
  const name = product.name || "Unnamed";
  const price = Number(product.price) || 0;

  // key differentiates same product with different sizes
  const key = `${id}__${size || ""}`;
  const idx = cart.findIndex((i) => i.key === key);

  if (idx > -1) {
    cart[idx].quantity += quantity;
  } else {
    cart.push({
      key,
      productId: id,
      name,
      imageUrl,
      price,
      size: size || null,
      quantity: Number(quantity) || 1,
    });
  }

  saveCart(cart);
  return cart;
};

export const updateQuantity = (productId, size = null, quantity = 1) => {
  const cart = getCart();
  const key = `${productId}__${size || ""}`;
  const idx = cart.findIndex((i) => i.key === key);
  if (idx > -1) {
    cart[idx].quantity = Math.max(1, Number(quantity) || 1);
    saveCart(cart);
  }
  return cart;
};

export const removeFromCart = (productId, size = null) => {
  const cart = getCart();
  const key = `${productId}__${size || ""}`;
  const next = cart.filter((i) => i.key !== key);
  saveCart(next);
  return next;
};

export const clearCart = () => saveCart([]);
