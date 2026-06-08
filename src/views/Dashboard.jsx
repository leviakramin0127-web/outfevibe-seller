import { useAuth } from '../context/AuthContext';
import { getSellerStats, getProducts, getOrders } from '../lib/store';
import Link from 'next/link';
import {
  Package, ShoppingBag, Eye, TrendingUp,
  PlusCircle, ArrowRight, Sparkles
} from 'lucide-react';
import './Dashboard.css';

export default function Dashboard() {
  const { seller } = useAuth();
  const stats = getSellerStats(seller?.id);
  const products = getProducts(seller?.id).slice(0, 5);
  const orders = getOrders(seller?.id).slice(0, 5);

  const statCards = [
    {
      label: 'Total Products',
      value: stats.totalProducts,
      icon: Package,
      color: 'var(--accent-gold)',
      bg: 'var(--accent-gold-muted)',
    },
    {
      label: 'Active Orders',
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: 'var(--info)',
      bg: 'var(--info-bg)',
    },
    {
      label: 'Total Views',
      value: stats.totalViews,
      icon: Eye,
      color: 'var(--success)',
      bg: 'var(--success-bg)',
    },
    {
      label: 'Revenue',
      value: `₹${stats.totalRevenue.toLocaleString('en-IN')}`,
      icon: TrendingUp,
      color: 'var(--warning)',
      bg: 'var(--warning-bg)',
    },
  ];

  return (
    <div>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <div className="welcome-banner-glow" />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="page-title" style={{ marginBottom: 4 }}>
            Welcome back, {seller?.name?.split(' ')[0] || 'Seller'} ✨
          </h1>
          <p className="page-subtitle">
            Here's what's happening with <strong style={{ color: 'var(--accent-gold)' }}>{seller?.brandName || 'your store'}</strong> today.
          </p>
        </div>
        <Link href="/dashboard/add-product" className="btn btn-primary" id="dash-add-product">
          <PlusCircle size={18} />
          Add Product
        </Link>
      </div>

      {/* Stats */}
      <div className="stats-grid stagger-children">
        {statCards.map((s, i) => (
          <div key={i} className="stat-card animate-fadeInUp">
            <div className="stat-card-header">
              <span className="stat-card-label">{s.label}</span>
              <div className="stat-card-icon" style={{ background: s.bg, color: s.color }}>
                <s.icon size={20} />
              </div>
            </div>
            <div className="stat-card-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Quick Actions + Recent Products */}
      <div className="dashboard-grid">
        {/* Quick Actions */}
        <div className="card">
          <h3 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)', marginBottom: 20 }}>
            Quick Actions
          </h3>
          <div className="quick-actions">
            <Link href="/dashboard/add-product" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: 'var(--accent-gold-muted)', color: 'var(--accent-gold)' }}>
                <PlusCircle size={24} />
              </div>
              <div>
                <div className="quick-action-title">Add New Product</div>
                <div className="quick-action-desc">List a new item in your store</div>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
            </Link>

            <Link href="/dashboard/products" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: 'var(--info-bg)', color: 'var(--info)' }}>
                <Package size={24} />
              </div>
              <div>
                <div className="quick-action-title">View Products</div>
                <div className="quick-action-desc">Manage your product catalog</div>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
            </Link>

            <Link href="/dashboard/orders" className="quick-action-card">
              <div className="quick-action-icon" style={{ background: 'var(--success-bg)', color: 'var(--success)' }}>
                <ShoppingBag size={24} />
              </div>
              <div>
                <div className="quick-action-title">View Orders</div>
                <div className="quick-action-desc">Track and manage orders</div>
              </div>
              <ArrowRight size={16} style={{ color: 'var(--text-muted)', marginLeft: 'auto' }} />
            </Link>
          </div>
        </div>

        {/* Recent Products */}
        <div className="card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
            <h3 style={{ fontSize: '1rem', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
              Recent Products
            </h3>
            <Link href="/dashboard/products" className="btn btn-ghost btn-sm" style={{ fontSize: '0.78rem' }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          {products.length === 0 ? (
            <div className="empty-state">
              <Sparkles size={40} style={{ color: 'var(--accent-gold)', marginBottom: 12, opacity: 0.5 }} />
              <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                No products yet. Add your first product to get started!
              </p>
              <Link href="/dashboard/add-product" className="btn btn-primary btn-sm">
                <PlusCircle size={16} />
                Add First Product
              </Link>
            </div>
          ) : (
            <div className="recent-products-list">
              {products.map(p => (
                <div key={p.id} className="recent-product-item">
                  <div className="recent-product-thumb">
                    {p.images?.[0] ? (
                      <img src={p.images[0]} alt={p.name} />
                    ) : (
                      <Package size={20} style={{ color: 'var(--text-muted)' }} />
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.88rem', fontWeight: 500, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {p.name}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      ₹{p.sellingPrice}
                    </div>
                  </div>
                  <span className={`badge badge-${p.status === 'active' ? 'success' : 'warning'}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
