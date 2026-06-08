/**
 * LocalStorage-based data store.
 * Works out of the box for demo. When Supabase is connected, this is bypassed.
 */

const KEYS = {
  SELLERS: 'ofv_sellers',
  PRODUCTS: 'ofv_products',
  ORDERS: 'ofv_orders',
  CURRENT_SELLER: 'ofv_current_seller',
};

function get(key) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function set(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ───── Auth ─────
export function signUp(sellerData) {
  const sellers = get(KEYS.SELLERS) || [];
  const exists = sellers.find(s => s.email === sellerData.email);
  if (exists) {
    return { error: 'An account with this email already exists.' };
  }
  const seller = {
    id: crypto.randomUUID(),
    ...sellerData,
    createdAt: new Date().toISOString(),
    status: 'active',
  };
  sellers.push(seller);
  set(KEYS.SELLERS, sellers);
  set(KEYS.CURRENT_SELLER, seller);
  return { data: seller, error: null };
}

export function signIn(email, password) {
  const sellers = get(KEYS.SELLERS) || [];
  const seller = sellers.find(s => s.email === email && s.password === password);
  if (!seller) {
    return { data: null, error: 'Invalid email or password.' };
  }
  set(KEYS.CURRENT_SELLER, seller);
  return { data: seller, error: null };
}

export function signOut() {
  localStorage.removeItem(KEYS.CURRENT_SELLER);
}

export function getCurrentSeller() {
  return get(KEYS.CURRENT_SELLER);
}

export function updateSeller(updates) {
  const current = getCurrentSeller();
  if (!current) return { error: 'Not logged in' };
  const sellers = get(KEYS.SELLERS) || [];
  const idx = sellers.findIndex(s => s.id === current.id);
  if (idx === -1) return { error: 'Seller not found' };
  const updated = { ...sellers[idx], ...updates };
  sellers[idx] = updated;
  set(KEYS.SELLERS, sellers);
  set(KEYS.CURRENT_SELLER, updated);
  return { data: updated, error: null };
}

// ───── Products ─────
export function getProducts(sellerId) {
  const products = get(KEYS.PRODUCTS) || [];
  return products.filter(p => p.sellerId === sellerId);
}

export function addProduct(product) {
  const products = get(KEYS.PRODUCTS) || [];
  const newProduct = {
    id: crypto.randomUUID(),
    ...product,
    createdAt: new Date().toISOString(),
    status: 'active',
    views: 0,
    sales: 0,
  };
  products.push(newProduct);
  set(KEYS.PRODUCTS, products);
  return { data: newProduct, error: null };
}

export function updateProduct(productId, updates) {
  const products = get(KEYS.PRODUCTS) || [];
  const idx = products.findIndex(p => p.id === productId);
  if (idx === -1) return { error: 'Product not found' };
  products[idx] = { ...products[idx], ...updates };
  set(KEYS.PRODUCTS, products);
  return { data: products[idx], error: null };
}

export function deleteProduct(productId) {
  const products = get(KEYS.PRODUCTS) || [];
  set(KEYS.PRODUCTS, products.filter(p => p.id !== productId));
  return { error: null };
}

// ───── Orders (mock) ─────
export function getOrders(sellerId) {
  const orders = get(KEYS.ORDERS) || [];
  return orders.filter(o => o.sellerId === sellerId);
}

// ───── Stats ─────
export function getSellerStats(sellerId) {
  const products = getProducts(sellerId);
  const orders = getOrders(sellerId);
  const totalRevenue = orders.reduce((sum, o) => sum + (o.amount || 0), 0);
  const pendingOrders = orders.filter(o => o.status === 'pending').length;

  return {
    totalProducts: products.length,
    activeProducts: products.filter(p => p.status === 'active').length,
    totalOrders: orders.length,
    pendingOrders,
    totalRevenue,
    totalViews: products.reduce((sum, p) => sum + (p.views || 0), 0),
  };
}
