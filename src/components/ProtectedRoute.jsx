'use client';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const { seller, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !seller) {
      router.push('/login');
    }
  }, [seller, loading, router]);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
      }}>
        Loading...
      </div>
    );
  }

  if (!seller) return null;

  return children;
}
