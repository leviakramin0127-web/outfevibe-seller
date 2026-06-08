import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';
import { getProducts, deleteProduct } from '../lib/store';
import {
  PlusCircle, Search, Package, Edit3, Trash2,
  Eye, MoreVertical, Filter, Grid, List, ExternalLink
} from 'lucide-react';
import './Products.css';

export default function Products() {
  const { seller } = useAuth();
  const [products, setProducts] = useState(getProducts(seller?.id));
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');
  const [filterStatus, setFilterStatus] = useState('all');
  const [deleteId, setDeleteId] = useState(null);

  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || p.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = (id) => {
    deleteProduct(id);
    setProducts(getProducts(seller?.id));
    setDeleteId(null);
  };

  return (
    <div>
      <div className="page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className="page-title">Products</h1>
          <p className="page-subtitle">Manage your product catalog — {products.length} item{products.length !== 1 ? 's' : ''} listed</p>
        </div>
        <Link href="/dashboard/add-product" className="btn btn-primary" id="products-add-btn">
          <PlusCircle size={18} />
          Add Product
        </Link>
      </div>

      {/* Toolbar */}
      <div className="products-toolbar">
        <div className="search-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="products-search"
          />
        </div>

        <div className="toolbar-right">
          <div className="filter-group">
            <Filter size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              className="form-input filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              id="products-filter"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="draft">Draft</option>
              <option value="paused">Paused</option>
            </select>
          </div>

          <div className="view-toggle">
            <button
              className={`btn btn-icon ${view === 'grid' ? 'active' : ''}`}
              onClick={() => setView('grid')}
              title="Grid view"
            >
              <Grid size={18} />
            </button>
            <button
              className={`btn btn-icon ${view === 'list' ? 'active' : ''}`}
              onClick={() => setView('list')}
              title="List view"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Products Grid/List */}
      {filtered.length === 0 ? (
        <div className="empty-state" style={{ padding: '80px 20px' }}>
          <Package size={56} style={{ color: 'var(--text-muted)', marginBottom: 16, opacity: 0.3 }} />
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
            {products.length === 0 ? 'No products yet' : 'No products match your search'}
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: 24, maxWidth: 360 }}>
            {products.length === 0
              ? 'Add your first product and start selling to AI-matched buyers across India.'
              : 'Try adjusting your search or filter criteria.'}
          </p>
          {products.length === 0 && (
            <Link href="/dashboard/add-product" className="btn btn-primary">
              <PlusCircle size={18} />
              Add Your First Product
            </Link>
          )}
        </div>
      ) : view === 'grid' ? (
        <div className="products-grid stagger-children">
          {filtered.map(product => (
            <div key={product.id} className="product-card card animate-fadeInUp">
              <div className="product-card-image">
                {product.images?.[0] ? (
                  <img src={product.images[0]} alt={product.name} />
                ) : (
                  <div className="product-card-placeholder">
                    <Package size={32} />
                  </div>
                )}
                <span className={`badge badge-${product.status === 'active' ? 'success' : product.status === 'draft' ? 'warning' : 'info'} product-status-badge`}>
                  {product.status}
                </span>
              </div>
              <div className="product-card-body">
                <h3 className="product-card-name">{product.name}</h3>
                <p className="product-card-category">{product.category || 'Uncategorized'}</p>
                <div className="product-card-pricing">
                  <span className="product-card-price">₹{product.sellingPrice}</span>
                  {product.mrp && product.mrp > product.sellingPrice && (
                    <span className="product-card-mrp">₹{product.mrp}</span>
                  )}
                </div>
                <div className="product-card-meta">
                  <span><Eye size={14} /> {product.views || 0}</span>
                  {product.platform && <span className="badge badge-gold" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>{product.platform}</span>}
                </div>
                {product.productLink && (
                  <a
                    href={product.productLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="product-link-preview"
                    style={{ marginTop: 8, fontSize: '0.78rem', padding: '6px 10px' }}
                    onClick={e => e.stopPropagation()}
                  >
                    <ExternalLink size={12} />
                    Buy Link
                  </a>
                )}
              </div>
              <div className="product-card-actions">
                <button className="btn btn-ghost btn-sm" title="Edit">
                  <Edit3 size={15} />
                </button>
                <button
                  className="btn btn-ghost btn-sm"
                  title="Delete"
                  onClick={() => setDeleteId(product.id)}
                  style={{ color: 'var(--error)' }}
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Platform</th>
                <th>Link</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div className="recent-product-thumb">
                        {product.images?.[0] ? (
                          <img src={product.images[0]} alt={product.name} />
                        ) : (
                          <Package size={18} style={{ color: 'var(--text-muted)' }} />
                        )}
                      </div>
                      <span style={{ fontWeight: 500 }}>{product.name}</span>
                    </div>
                  </td>
                  <td>{product.category || '—'}</td>
                  <td style={{ fontWeight: 600 }}>₹{product.sellingPrice}</td>
                  <td>
                    {product.platform ? (
                      <span className="badge badge-gold">{product.platform}</span>
                    ) : '—'}
                  </td>
                  <td>
                    {product.productLink ? (
                      <a
                        href={product.productLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: 'var(--accent-gold)', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.82rem' }}
                      >
                        <ExternalLink size={14} />
                        Visit
                      </a>
                    ) : '—'}
                  </td>
                  <td>
                    <span className={`badge badge-${product.status === 'active' ? 'success' : 'warning'}`}>
                      {product.status}
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="btn btn-ghost btn-sm"><Edit3 size={14} /></button>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setDeleteId(product.id)}
                        style={{ color: 'var(--error)' }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deleteId && (
        <div className="modal-overlay" onClick={() => setDeleteId(null)}>
          <div className="modal-box" onClick={e => e.stopPropagation()}>
            <h3 style={{ fontFamily: 'var(--font-body)', fontSize: '1.05rem', fontWeight: 600, marginBottom: 8 }}>
              Delete Product?
            </h3>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: 24 }}>
              This action cannot be undone. The product will be permanently removed from your catalog.
            </p>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
              <button className="btn btn-secondary btn-sm" onClick={() => setDeleteId(null)}>Cancel</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(deleteId)}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
