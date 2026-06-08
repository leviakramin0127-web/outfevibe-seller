import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Eye, EyeOff, ArrowRight } from 'lucide-react';
import './Auth.css';

export default function Login() {
  const { signIn } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email.trim()) return setError('Email is required');
    if (!form.password) return setError('Password is required');

    setLoading(true);
    try {
      const result = await signIn(form.email, form.password);
      if (result.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-left">
        <div className="auth-left-content">
          <div className="auth-brand">
            <Sparkles size={24} style={{ color: 'var(--accent-gold)' }} />
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', fontWeight: 600 }}>Outfevibe</span>
          </div>

          <h1 className="auth-left-title">
            Welcome back, <em>seller.</em>
          </h1>

          <p className="auth-left-desc">
            Log in to manage your products, track orders, and grow your business on India's smartest fashion marketplace.
          </p>
        </div>

        <div className="auth-left-grid" />
        <div className="auth-left-glow" />
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Seller Login</h2>
            <p className="auth-form-subtitle">Enter your credentials to access your dashboard.</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" id="login-form">
            <div className="form-group">
              <label className="form-label">Email ID</label>
              <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@yourbrand.com"
                value={form.email}
                onChange={handleChange}
                id="login-email"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Enter your password"
                  value={form.password}
                  onChange={handleChange}
                  id="login-password"
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg"
              style={{ width: '100%', marginTop: 8 }}
              disabled={loading}
              id="login-submit"
            >
              {loading ? 'Logging in...' : (
                <>
                  Log In
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="auth-switch">
              Don't have an account? <Link href="/signup">Create one for free</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
