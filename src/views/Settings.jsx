import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  User, Store, Mail, Phone, MapPin, Globe,
  Save, CheckCircle2
} from 'lucide-react';

export default function Settings() {
  const { seller, updateProfile } = useAuth();
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: seller?.name || '',
    brandName: seller?.brandName || '',
    email: seller?.email || '',
    contact: seller?.contact || '',
    address: seller?.address || '',
    websiteLink: seller?.websiteLink || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(form);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Settings</h1>
        <p className="page-subtitle">Manage your seller profile and store details.</p>
      </div>

      <div style={{ maxWidth: 640 }}>
        <form onSubmit={handleSubmit}>
          <div className="card form-section" style={{ gap: 18, display: 'flex', flexDirection: 'column' }}>
            <h3 style={{
              fontFamily: 'var(--font-body)',
              fontSize: '1rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              paddingBottom: 12,
              borderBottom: '1px solid var(--border)',
            }}>
              <User size={18} />
              Profile Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <User size={14} /> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={form.name}
                  onChange={handleChange}
                  id="settings-name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Store size={14} /> Brand Name
                  </span>
                </label>
                <input
                  type="text"
                  name="brandName"
                  className="form-input"
                  value={form.brandName}
                  onChange={handleChange}
                  id="settings-brand"
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="form-group">
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Mail size={14} /> Email
                  </span>
                </label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={form.email}
                  onChange={handleChange}
                  id="settings-email"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <Phone size={14} /> Contact
                  </span>
                </label>
                <input
                  type="tel"
                  name="contact"
                  className="form-input"
                  value={form.contact}
                  onChange={handleChange}
                  id="settings-contact"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Globe size={14} /> Website Link
                </span>
              </label>
              <input
                type="url"
                name="websiteLink"
                className="form-input"
                placeholder="https://yourbrand.com"
                value={form.websiteLink}
                onChange={handleChange}
                id="settings-website"
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <MapPin size={14} /> Address
                </span>
              </label>
              <textarea
                name="address"
                className="form-input form-textarea"
                value={form.address}
                onChange={handleChange}
                rows={3}
                id="settings-address"
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, paddingTop: 8 }}>
              <button type="submit" className="btn btn-primary" id="settings-save">
                <Save size={16} />
                Save Changes
              </button>
              {saved && (
                <span style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  color: 'var(--success)',
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  animation: 'fadeIn 0.3s ease',
                }}>
                  <CheckCircle2 size={16} />
                  Changes saved!
                </span>
              )}
            </div>
          </div>
        </form>

        {/* Account Info */}
        <div className="card" style={{ marginTop: 20, padding: 24 }}>
          <h3 style={{
            fontFamily: 'var(--font-body)',
            fontSize: '1rem',
            fontWeight: 600,
            marginBottom: 16,
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}>
            Account Information
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Account Status</span>
              <span className="badge badge-success">Active</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Seller ID</span>
              <span style={{ fontFamily: 'monospace', fontSize: '0.82rem', color: 'var(--text-muted)' }}>
                {seller?.id?.slice(0, 12)}...
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Member Since</span>
              <span style={{ color: 'var(--text-muted)' }}>
                {seller?.createdAt ? new Date(seller.createdAt).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' }) : '—'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>Listing Fee</span>
              <span style={{ color: 'var(--success)', fontWeight: 600 }}>FREE ✨</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
