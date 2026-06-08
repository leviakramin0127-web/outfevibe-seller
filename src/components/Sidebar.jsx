'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  CreditCard,
  BarChart3,
  Settings,
  PlusCircle,
  HelpCircle,
  Store,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const mainLinks = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', exact: true },
  { href: '/dashboard/products', icon: Package, label: 'Products' },
  { href: '/dashboard/add-product', icon: PlusCircle, label: 'Add Product' },
  { href: '/dashboard/orders', icon: ShoppingBag, label: 'Orders' },
];

const otherLinks = [
  { href: '/dashboard/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  const { seller } = useAuth();
  const pathname = usePathname();

  const isActive = (href, exact) => {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <aside className="sidebar">
      {/* Seller Profile Mini */}
      <div style={{
        padding: '16px 14px',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-md)',
        marginBottom: 16,
        display: 'flex',
        alignItems: 'center',
        gap: 12,
      }}>
        <div style={{
          width: 40,
          height: 40,
          borderRadius: 'var(--radius-sm)',
          background: 'var(--accent-gold-muted)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--accent-gold)',
          fontWeight: 700,
          fontSize: '1rem',
          fontFamily: 'var(--font-heading)',
          flexShrink: 0,
        }}>
          {seller?.brandName?.[0]?.toUpperCase() || 'S'}
        </div>
        <div style={{ overflow: 'hidden' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {seller?.brandName || 'Your Brand'}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
            Seller Account
          </div>
        </div>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Main</div>
        {mainLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${isActive(link.href, link.exact) ? 'active' : ''}`}
          >
            <link.icon size={20} />
            {link.label}
          </Link>
        ))}
      </div>

      <div className="sidebar-divider" />

      <div className="sidebar-section">
        <div className="sidebar-section-title">Other</div>
        {otherLinks.map(link => (
          <Link
            key={link.href}
            href={link.href}
            className={`sidebar-link ${isActive(link.href) ? 'active' : ''}`}
          >
            <link.icon size={20} />
            {link.label}
          </Link>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ marginTop: 'auto', padding: '16px 0' }}>
        <div style={{
          padding: '16px',
          background: 'linear-gradient(135deg, rgba(212,175,127,0.08), rgba(212,175,127,0.02))',
          border: '1px solid var(--border-gold)',
          borderRadius: 'var(--radius-md)',
          textAlign: 'center',
        }}>
          <Store size={20} style={{ color: 'var(--accent-gold)', marginBottom: 8 }} />
          <div style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 4 }}>Visit Outfevibe</div>
          <a
            href="https://outfevibe.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}
          >
            outfevibe.com →
          </a>
        </div>
      </div>
    </aside>
  );
}
