import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import { addProduct } from '../lib/store';
import {
  Upload, X, PlusCircle, ArrowLeft, Sparkles,
  CheckCircle2, Image as ImageIcon, Tag, ExternalLink, Link as LinkIcon
} from 'lucide-react';
import './AddProduct.css';

const categories = [
  'Ethnic Wear', 'Western Wear', 'Streetwear', 'Indo-Fusion',
  'Formal Wear', 'Casual Wear', 'Party Wear', 'Activewear',
  'Accessories', 'Footwear', 'Bags & Wallets', 'Jewellery',
];

const platforms = [
  'Amazon India', 'Meesho', 'Myntra', 'Flipkart', 'Ajio',
  'Nykaa Fashion', 'Tata CLiQ', 'Shopify', 'Own Website', 'Other',
];

const occasions = [
  'Casual', 'Office', 'College', 'Date Night', 'Wedding', 'Festive',
  'Diwali', 'Eid', 'Mehendi', 'Haldi', 'Sangeet', 'Party',
];

const bodyTypes = [
  'Hourglass', 'Pear', 'Apple', 'Rectangle', 'Inverted Triangle', 'All Types',
];

const skinTones = [
  'Fair', 'Light', 'Warm Medium', 'Medium', 'Olive', 'Tan', 'Dark', 'Deep', 'All Tones',
];

const sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '2XL', '3XL', 'Free Size'];

export default function AddProduct() {
  const { seller } = useAuth();
  const router = useRouter();
  const fileRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [images, setImages] = useState([]);
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    mrp: '',
    sellingPrice: '',
    stock: '',
    material: '',
    productLink: '',
    platform: '',
    selectedSizes: [],
    selectedOccasions: [],
    selectedBodyTypes: [],
    selectedSkinTones: [],
    color: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const toggleItem = (field, item) => {
    setForm(prev => ({
      ...prev,
      [field]: prev[field].includes(item)
        ? prev[field].filter(i => i !== item)
        : [...prev[field], item]
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImages(prev => [...prev, reader.result]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) return alert('Product name is required');
    if (!form.productLink.trim()) return alert('Product link is required');
    if (!form.sellingPrice) return alert('Selling price is required');
    if (!form.category) return alert('Category is required');

    setLoading(true);
    const product = {
      sellerId: seller.id,
      name: form.name,
      description: form.description,
      category: form.category,
      mrp: Number(form.mrp) || 0,
      sellingPrice: Number(form.sellingPrice),
      stock: Number(form.stock) || 0,
      material: form.material,
      productLink: form.productLink,
      platform: form.platform,
      sizes: form.selectedSizes,
      occasions: form.selectedOccasions,
      bodyTypes: form.selectedBodyTypes,
      skinTones: form.selectedSkinTones,
      color: form.color,
      images: images,
    };

    const result = addProduct(product);
    setLoading(false);

    if (!result.error) {
      setSuccess(true);
      setTimeout(() => router.push('/dashboard/products'), 1500);
    }
  };

  if (success) {
    return (
      <div className="empty-state" style={{ minHeight: '60vh' }}>
        <div className="success-animation">
          <CheckCircle2 size={64} style={{ color: 'var(--success)' }} />
        </div>
        <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', marginTop: 20, marginBottom: 8 }}>
          Product Listed Successfully!
        </h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Redirecting to your products...
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="page-header">
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => router.push('/dashboard/products')}
          style={{ marginBottom: 12, gap: 6 }}
        >
          <ArrowLeft size={16} />
          Back to Products
        </button>
        <h1 className="page-title">Add New Product</h1>
        <p className="page-subtitle">Fill in the details to list a new product on Outfevibe.</p>
      </div>

      <form onSubmit={handleSubmit} className="add-product-form" id="add-product-form">
        <div className="add-product-layout">
          {/* Left Column */}
          <div className="add-product-main">
            {/* Basic Info */}
            <div className="card form-section">
              <h3 className="form-section-title">Basic Information</h3>
              <div className="form-group">
                <label className="form-label">Product Name *</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="e.g., Women's Floral Kurti Set"
                  value={form.name}
                  onChange={handleChange}
                  id="product-name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  name="description"
                  className="form-input form-textarea"
                  placeholder="Describe your product — material, fit, styling tips..."
                  value={form.description}
                  onChange={handleChange}
                  rows={4}
                  id="product-description"
                />
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label className="form-label">Category *</label>
                  <select
                    name="category"
                    className="form-input"
                    value={form.category}
                    onChange={handleChange}
                    id="product-category"
                    style={{ cursor: 'pointer' }}
                  >
                    <option value="">Select category</option>
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Material</label>
                  <input
                    type="text"
                    name="material"
                    className="form-input"
                    placeholder="e.g., Cotton, Polyester"
                    value={form.material}
                    onChange={handleChange}
                    id="product-material"
                  />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Color</label>
                <input
                  type="text"
                  name="color"
                  className="form-input"
                  placeholder="e.g., Maroon, Navy Blue"
                  value={form.color}
                  onChange={handleChange}
                  id="product-color"
                />
              </div>
            </div>

            {/* Product Link */}
            <div className="card form-section">
              <h3 className="form-section-title">
                <LinkIcon size={18} style={{ color: 'var(--accent-gold)' }} />
                Product Link
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                Where can buyers purchase this product? Provide the link to the listing on the selling platform.
              </p>
              <div className="form-group">
                <label className="form-label">Product URL *</label>
                <input
                  type="url"
                  name="productLink"
                  className="form-input"
                  placeholder="https://www.amazon.in/dp/... or https://meesho.com/..."
                  value={form.productLink}
                  onChange={handleChange}
                  id="product-link"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Platform</label>
                <select
                  name="platform"
                  className="form-input"
                  value={form.platform}
                  onChange={handleChange}
                  id="product-platform"
                  style={{ cursor: 'pointer' }}
                >
                  <option value="">Select platform</option>
                  {platforms.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              {form.productLink && (
                <a
                  href={form.productLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-link-preview"
                >
                  <ExternalLink size={14} />
                  Preview link
                </a>
              )}
            </div>

            {/* Images */}
            <div className="card form-section">
              <h3 className="form-section-title">
                <ImageIcon size={18} />
                Product Images
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                Upload up to 5 high-quality images. First image is used as the cover.
              </p>

              <div className="image-upload-grid">
                {images.map((img, i) => (
                  <div key={i} className="image-preview">
                    <img src={img} alt={`Product ${i + 1}`} />
                    <button
                      type="button"
                      className="image-remove"
                      onClick={() => removeImage(i)}
                    >
                      <X size={14} />
                    </button>
                    {i === 0 && <span className="image-cover-label">Cover</span>}
                  </div>
                ))}
                {images.length < 5 && (
                  <button
                    type="button"
                    className="image-upload-btn"
                    onClick={() => fileRef.current?.click()}
                  >
                    <Upload size={24} />
                    <span>Upload</span>
                  </button>
                )}
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                onChange={handleImageUpload}
                style={{ display: 'none' }}
                id="product-images"
              />
            </div>

            {/* Sizes */}
            <div className="card form-section">
              <h3 className="form-section-title">Available Sizes</h3>
              <div className="chip-grid">
                {sizes.map(size => (
                  <button
                    key={size}
                    type="button"
                    className={`chip ${form.selectedSizes.includes(size) ? 'chip-active' : ''}`}
                    onClick={() => toggleItem('selectedSizes', size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* AI Tags */}
            <div className="card form-section">
              <h3 className="form-section-title">
                <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
                AI Matching Tags
              </h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 16 }}>
                Help Outfevibe's AI recommend your product to the right buyers.
                Tag which body types, skin tones, and occasions suit your product.
              </p>

              <div style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ marginBottom: 10, display: 'block' }}>Occasion Tags</label>
                <div className="chip-grid">
                  {occasions.map(o => (
                    <button
                      key={o}
                      type="button"
                      className={`chip ${form.selectedOccasions.includes(o) ? 'chip-active' : ''}`}
                      onClick={() => toggleItem('selectedOccasions', o)}
                    >
                      {o}
                    </button>
                  ))}
                </div>
              </div>

              <div style={{ marginBottom: 20 }}>
                <label className="form-label" style={{ marginBottom: 10, display: 'block' }}>Body Type Compatibility</label>
                <div className="chip-grid">
                  {bodyTypes.map(b => (
                    <button
                      key={b}
                      type="button"
                      className={`chip ${form.selectedBodyTypes.includes(b) ? 'chip-active' : ''}`}
                      onClick={() => toggleItem('selectedBodyTypes', b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="form-label" style={{ marginBottom: 10, display: 'block' }}>Skin Tone Compatibility</label>
                <div className="chip-grid">
                  {skinTones.map(s => (
                    <button
                      key={s}
                      type="button"
                      className={`chip ${form.selectedSkinTones.includes(s) ? 'chip-active' : ''}`}
                      onClick={() => toggleItem('selectedSkinTones', s)}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column — Pricing & Actions */}
          <div className="add-product-sidebar">
            <div className="card form-section sticky-card">
              <h3 className="form-section-title">
                <Tag size={18} />
                Pricing & Stock
              </h3>
              <div className="form-group">
                <label className="form-label">MRP (₹)</label>
                <input
                  type="number"
                  name="mrp"
                  className="form-input"
                  placeholder="Maximum retail price"
                  value={form.mrp}
                  onChange={handleChange}
                  min="0"
                  id="product-mrp"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Selling Price (₹) *</label>
                <input
                  type="number"
                  name="sellingPrice"
                  className="form-input"
                  placeholder="Your selling price"
                  value={form.sellingPrice}
                  onChange={handleChange}
                  min="0"
                  id="product-selling-price"
                />
              </div>
              {form.mrp && form.sellingPrice && Number(form.mrp) > Number(form.sellingPrice) && (
                <div className="discount-badge">
                  {Math.round(((Number(form.mrp) - Number(form.sellingPrice)) / Number(form.mrp)) * 100)}% off
                </div>
              )}
              <div className="form-group">
                <label className="form-label">Stock Quantity</label>
                <input
                  type="number"
                  name="stock"
                  className="form-input"
                  placeholder="Available units"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  id="product-stock"
                />
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 20, marginTop: 12 }}>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ width: '100%' }}
                  disabled={loading}
                  id="add-product-submit"
                >
                  {loading ? 'Listing...' : (
                    <>
                      <PlusCircle size={18} />
                      List Product
                    </>
                  )}
                </button>
                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center', marginTop: 10 }}>
                  ✨ Free listing — no commission
                </p>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
