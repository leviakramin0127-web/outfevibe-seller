import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Eye, EyeOff, ArrowRight, CheckCircle2 } from 'lucide-react';
import './Auth.css';

const perks = [
  'Zero listing fees forever (launch offer)',
  'AI-powered buyer matching',
  'Real-time analytics dashboard',
  'Direct access to Gen Z customers',
];

export default function Signup() {
  const { signUp } = useAuth();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    name: '',
    brandName: '',
    websiteLink: '',
    contact: '',
    address: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!form.name.trim()) return setError('Name is required');
    if (!form.brandName.trim()) return setError('Brand name is required');
    if (!form.contact.trim()) return setError('Contact number is required');
    if (!form.address.trim()) return setError('Address is required');
    if (!form.email.trim()) return setError('Email is required');
    if (!/\S+@\S+\.\S+/.test(form.email)) return setError('Please enter a valid email');
    if (!form.password || form.password.length < 6) return setError('Password must be at least 6 characters');
    if (!/^\d{10}$/.test(form.contact.replace(/\s/g, ''))) return setError('Please enter a valid 10-digit phone number');

    setLoading(true);
    try {
      const result = await signUp(form);
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
            Start selling to <em>millions</em> of style-conscious buyers.
          </h1>

          <p className="auth-left-desc">
            Join India's first AI-powered fashion marketplace. Your products get matched with the right buyers automatically.
          </p>

          <div className="auth-perks">
            {perks.map((perk, i) => (
              <div key={i} className="auth-perk">
                <CheckCircle2 size={18} style={{ color: 'var(--success)', flexShrink: 0 }} />
                <span>{perk}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="auth-left-grid" />
        <div className="auth-left-glow" />
      </div>

      <div className="auth-right">
        <div className="auth-form-container">
          <div className="auth-form-header">
            <h2 className="auth-form-title">Create Your Seller Account</h2>
            <p className="auth-form-subtitle">Fill in your details to get started — it's completely free.</p>
          </div>

          {error && (
            <div className="auth-error">
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="auth-form" id="signup-form">
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  id="signup-name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Brand Name *</label>
                <input
                  type="text"
                  name="brandName"
                  className="form-input"
                  placeholder="Your brand or store name"
                  value={form.brandName}
                  onChange={handleChange}
                  id="signup-brand"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Email ID *</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="you@yourbrand.com"
                  value={form.email}
                  onChange={handleChange}
                  id="signup-email"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Contact Number *</label>
                <input
                  type="tel"
                  name="contact"
                  className="form-input"
                  placeholder="10-digit mobile number"
                  value={form.contact}
                  onChange={handleChange}
                  id="signup-contact"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Website Link</label>
              <input
                type="url"
                name="websiteLink"
                className="form-input"
                placeholder="https://yourbrand.com (optional)"
                value={form.websiteLink}
                onChange={handleChange}
                id="signup-website"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Address *</label>
              <textarea
                name="address"
                className="form-input form-textarea"
                placeholder="Full address with city, state, and PIN code"
                value={form.address}
                onChange={handleChange}
                rows={3}
                id="signup-address"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Password *</label>
              <div className="password-wrap">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  className="form-input"
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={handleChange}
                  id="signup-password"
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
              id="signup-submit"
            >
              {loading ? 'Creating Account...' : (
                <>
                  Create Seller Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>

            <p className="auth-switch">
              Already have an account? <Link href="/login">Log in here</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
