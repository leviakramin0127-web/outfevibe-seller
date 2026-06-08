import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getOrders } from '../lib/store';
import {
  ShoppingBag, Filter, Search, Package,
  MapPin, Calendar, IndianRupee
} from 'lucide-react';

const statusColors = {
  pending: 'warning',
  confirmed: 'info',
  shipped: 'gold',
  delivered: 'success',
  cancelled: 'error',
  returned: 'error',
};

export default function Orders() {
  const { seller } = useAuth();
  const orders = getOrders(seller?.id);
  const [filterStatus, setFilterStatus] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = orders.filter(o => {
    const matchesStatus = filterStatus === 'all' || o.status === filterStatus;
    const matchesSearch = o.productName?.toLowerCase().includes(search.toLowerCase()) ||
      o.id?.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Orders</h1>
        <p className="page-subtitle">
          Track and manage incoming orders — {orders.length} total order{orders.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Toolbar */}
      <div className="products-toolbar">
        <div className="search-wrap">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Search by order ID or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="orders-search"
          />
        </div>
        <div className="toolbar-right">
          <div className="filter-group">
            <Filter size={16} style={{ color: 'var(--text-muted)' }} />
            <select
              className="form-input filter-select"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              id="orders-filter"
            >
              <option value="all">All Orders</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="empty-state" style={{ padding: '80px 20px' }}>
          <ShoppingBag size={56} style={{ color: 'var(--text-muted)', marginBottom: 16, opacity: 0.3 }} />
          <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-body)', marginBottom: 8 }}>
            No orders yet
          </h3>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', maxWidth: 360 }}>
            Once buyers start purchasing your products, orders will appear here.
            Add products to get started!
          </p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="empty-state" style={{ padding: '60px 20px' }}>
          <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)' }}>
            No orders match your search or filter.
          </p>
        </div>
      ) : (
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Amount</th>
                <th>City</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id}>
                  <td style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                    #{order.id.slice(0, 8)}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Package size={16} style={{ color: 'var(--text-muted)' }} />
                      <span style={{ fontWeight: 500 }}>{order.productName}</span>
                    </div>
                  </td>
                  <td>{order.quantity}</td>
                  <td style={{ fontWeight: 600 }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      ₹{order.amount?.toLocaleString('en-IN')}
                    </span>
                  </td>
                  <td>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4, color: 'var(--text-secondary)' }}>
                      <MapPin size={14} />
                      {order.city}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                      {new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </td>
                  <td>
                    <span className={`badge badge-${statusColors[order.status] || 'info'}`}>
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
