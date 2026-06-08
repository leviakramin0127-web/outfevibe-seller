'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Sparkles, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { seller, signOut } = useAuth();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isDashboard = pathname.startsWith('/dashboard');

  return (
    <nav className="navbar">
      <Link href="/" className="navbar-logo">
        <span className="navbar-logo-icon"><Sparkles size={24} /></span>
        <span>Outfevibe</span>
        {isDashboard && <span style={{ fontSize: '0.7rem', color: 'var(--accent-gold)', fontFamily: 'var(--font-body)', fontWeight: 500, marginLeft: 4 }}>Seller Hub</span>}
      </Link>

      {!isDashboard && (
        <div className="navbar-links">
          <a href="#why" className="navbar-link" onClick={(e) => { e.preventDefault(); document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' }); }}>Why Sell</a>
          <a href="#how" className="navbar-link" onClick={(e) => { e.preventDefault(); document.getElementById('how')?.scrollIntoView({ behavior: 'smooth' }); }}>How It Works</a>
          <a href="#benefits" className="navbar-link" onClick={(e) => { e.preventDefault(); document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' }); }}>Benefits</a>
        </div>
      )}

      <div className="navbar-actions">
        {seller ? (
          <>
            {!isDashboard && (
              <Link href="/dashboard" className="btn btn-secondary btn-sm">Dashboard</Link>
            )}
            <button onClick={signOut} className="btn btn-ghost btn-sm" style={{ gap: 6 }}>
              <LogOut size={16} />
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost btn-sm">Login</Link>
            <Link href="/signup" className="btn btn-primary btn-sm">Start Selling</Link>
          </>
        )}
      </div>
    </nav>
  );
}
