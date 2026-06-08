import Link from 'next/link';
import {
  Sparkles, TrendingUp, Users, ShieldCheck, Zap, ArrowRight,
  Brain, CreditCard, ExternalLink, BarChart3, Star, CheckCircle2,
  Target, Eye, Globe, Palette, ShoppingBag, Clock, X, Award
} from 'lucide-react';
import './Landing.css';

const stats = [
  { value: '10K+', label: 'Monthly Visitors', icon: Users },
  { value: '₹0', label: 'Listing Fee', icon: CreditCard },
  { value: 'AI', label: 'Smart Matching', icon: Brain },
  { value: '5 min', label: 'Setup Time', icon: Zap },
];

const steps = [
  {
    number: '01',
    title: 'Create Your Seller Profile',
    desc: 'Sign up with your brand name, contact details, and website link. Takes under 5 minutes — no paperwork, no approvals, no waiting.',
    icon: Sparkles,
    highlight: 'Free & instant',
  },
  {
    number: '02',
    title: 'Add Your Product Links',
    desc: 'Paste your product links from Amazon, Meesho, Myntra, Flipkart, or your own website. Add images, prices, sizes, and tag which body types and skin tones your product suits.',
    icon: ExternalLink,
    highlight: 'Any platform',
  },
  {
    number: '03',
    title: 'AI Drives Traffic to You',
    desc: 'When a user uploads their photo, our AI analyzes their body shape, skin tone, and style. If your product is a match — we show it to them with a direct link to buy from your store.',
    icon: Target,
    highlight: 'Targeted buyers',
  },
];

const benefits = [
  {
    icon: Brain,
    title: 'AI-Matched Buyers, Not Random Traffic',
    desc: 'Outfevibe doesn\'t just list your product — it actively recommends it to users whose body shape, skin tone, and style persona are a perfect match. That means every click on your link is a high-intent buyer who already knows your product suits them.',
  },
  {
    icon: CreditCard,
    title: 'Completely Free — No Catch',
    desc: 'No listing fees. No commissions. No monthly charges. You keep 100% of every sale. We\'re building this marketplace together, and during launch, everything is free.',
  },
  {
    icon: Globe,
    title: 'Sell From Anywhere You Already Sell',
    desc: 'Already on Amazon, Meesho, or Myntra? Just paste your product links. Outfevibe drives targeted traffic directly to your existing listings — no new infrastructure needed.',
  },
  {
    icon: Eye,
    title: 'Massive Visibility You Can\'t Get Alone',
    desc: 'Your product gets featured alongside AI-curated outfit suggestions. When a user gets styled, your product shows up if it fits their body, skin, and vibe — that\'s exposure money can\'t buy.',
  },
  {
    icon: Palette,
    title: 'Occasion & Culture-Aware Placement',
    desc: 'Our AI understands Indian occasions — Diwali, Eid, weddings, mehendi, college fests. Your festive kurti shows up when someone is styling for Navratri, not randomly in a feed.',
  },
  {
    icon: ShieldCheck,
    title: 'Your Brand, Your Store, Your Rules',
    desc: 'Your brand identity stays yours. We showcase your products with your name, your pricing, and a direct link to your store. No white-labeling, no middleman.',
  },
];

const testimonials = [
  {
    name: 'Priya Sharma',
    brand: 'Ethnika Studio',
    text: 'I just pasted my Meesho links and within a week I noticed more clicks coming through. The best part? These buyers already knew my kurti would suit their body type before they clicked. The conversion rate is insane.',
    avatar: 'P',
  },
  {
    name: 'Arjun Mehta',
    brand: 'StreetKraft',
    text: 'I sell on Amazon and my own Shopify store. Outfevibe sends me traffic I could never get on my own — buyers who are specifically looking for streetwear that fits their body. And I didn\'t pay a single rupee.',
    avatar: 'A',
  },
  {
    name: 'Neha Gupta',
    brand: 'Minimal Mode',
    text: 'What sold me was the AI persona matching. My minimalist designs automatically get shown to "Minimalist Maven" users. It\'s like having a marketing team that works 24/7 — for free.',
    avatar: 'N',
  },
];

const comparisonData = [
  { feature: 'Listing fee', outfevibe: '₹0 (Free forever during launch)', others: '₹500–₹5,000/month' },
  { feature: 'Commission per sale', outfevibe: '0%', others: '10–25%' },
  { feature: 'Buyer targeting', outfevibe: 'AI-matched by body, skin & style', others: 'Random browsing + paid ads' },
  { feature: 'Setup time', outfevibe: '5 minutes', others: '2–7 days' },
  { feature: 'Documents required', outfevibe: 'None', others: 'GSTIN, PAN, bank proof' },
  { feature: 'Where buyers purchase', outfevibe: 'Your existing store (Amazon, Meesho, etc.)', others: 'Only on their platform' },
];

export default function Landing() {
  return (
    <div className="landing">
      {/* ─── HERO ─── */}
      <section className="hero">
        <div className="hero-bg-grid" />
        <div className="hero-glow hero-glow-1" />
        <div className="hero-glow hero-glow-2" />

        <div className="hero-content animate-fadeInUp">
          <div className="hero-badge">
            <Sparkles size={14} />
            <span>India's First AI-Powered Fashion Marketplace</span>
          </div>

          <h1 className="hero-title">
            Sell Your Style
            <br />
            to <em>Millions.</em>
          </h1>

          <p className="hero-subtitle">
            Add your product links from Amazon, Meesho, Myntra, or your own website.
            Our AI shows them to users whose body shape, skin tone & style persona
            are a perfect match. <strong>You sell. We match.</strong>
          </p>

          <div className="hero-actions">
            <Link href="/signup" className="btn btn-primary btn-lg" id="hero-cta">
              <Sparkles size={18} />
              Start Selling — It's Free
            </Link>
            <a href="#how" className="btn btn-secondary btn-lg">
              How It Works
              <ArrowRight size={16} />
            </a>
          </div>

          <p className="hero-note">
            <CheckCircle2 size={14} style={{ color: 'var(--success)' }} />
            Free forever during launch. No commission. No hidden fees.
          </p>
        </div>

        {/* Stats bar */}
        <div className="hero-stats stagger-children">
          {stats.map((stat, i) => (
            <div key={i} className="hero-stat animate-fadeInUp">
              <stat.icon size={20} className="hero-stat-icon" />
              <div className="hero-stat-value">{stat.value}</div>
              <div className="hero-stat-label">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ─── WHY SELL ─── */}
      <section className="section" id="why">
        <div className="section-container">
          <div className="section-header animate-fadeInUp">
            <span className="section-tag">Why List on Outfevibe</span>
            <h2 className="section-title">Your Products Deserve <em>Smarter</em> Discovery</h2>
            <p className="section-desc">
              On most platforms, your product sits in a catalog of millions and hopes someone scrolls past it.
              On Outfevibe, our AI actively recommends your product to users it's <em>proven to suit</em> — based on their
              body shape, skin tone, and personal style.
            </p>
          </div>

          <div className="benefits-grid stagger-children">
            {benefits.map((b, i) => (
              <div key={i} className="benefit-card card animate-fadeInUp">
                <div className="benefit-icon-wrap">
                  <b.icon size={24} />
                </div>
                <h3 className="benefit-title">{b.title}</h3>
                <p className="benefit-desc">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── HOW IT WORKS ─── */}
      <section className="section section-dark" id="how">
        <div className="section-container">
          <div className="section-header animate-fadeInUp">
            <span className="section-tag">How It Works</span>
            <h2 className="section-title">From Link to Sale in 3 Simple Steps</h2>
            <p className="section-desc">
              You don't need to change how you sell. Just share your product links —
              we'll drive the <em>right buyers</em> directly to your store.
            </p>
          </div>

          <div className="steps-container stagger-children">
            {steps.map((step, i) => (
              <div key={i} className="step-card animate-fadeInUp">
                <div className="step-number">{step.number}</div>
                <div className="step-icon-wrap">
                  <step.icon size={28} />
                </div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-desc">{step.desc}</p>
                {step.highlight && (
                  <span className="step-highlight">{step.highlight}</span>
                )}
                {i < steps.length - 1 && <div className="step-connector" />}
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 48 }}>
            <Link href="/signup" className="btn btn-primary btn-lg">
              <Sparkles size={18} />
              Start Listing — It's Free
            </Link>
          </div>
        </div>
      </section>

      {/* ─── TESTIMONIALS ─── */}
      <section className="section" id="testimonials">
        <div className="section-container">
          <div className="section-header animate-fadeInUp">
            <span className="section-tag">Seller Stories</span>
            <h2 className="section-title">What Sellers Are Saying</h2>
          </div>

          <div className="testimonials-grid stagger-children">
            {testimonials.map((t, i) => (
              <div key={i} className="testimonial-card card animate-fadeInUp">
                <div className="testimonial-stars">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={14} fill="var(--accent-gold)" color="var(--accent-gold)" />
                  ))}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="testimonial-avatar">{t.avatar}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-brand">{t.brand}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── COMPARISON TABLE ─── */}
      <section className="section section-dark" id="benefits">
        <div className="section-container">
          <div className="section-header animate-fadeInUp">
            <span className="section-tag">Outfevibe vs Others</span>
            <h2 className="section-title">See Why Sellers Choose <em>Outfevibe</em></h2>
            <p className="section-desc">
              We're not just another marketplace. Here's how we compare to traditional platforms.
            </p>
          </div>
          <div className="comparison-table-wrap animate-fadeInUp">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Feature</th>
                  <th className="comparison-highlight"><Sparkles size={14} /> Outfevibe</th>
                  <th>Other Platforms</th>
                </tr>
              </thead>
              <tbody>
                {comparisonData.map((row, i) => (
                  <tr key={i}>
                    <td className="comparison-feature">{row.feature}</td>
                    <td className="comparison-good">
                      <CheckCircle2 size={15} />
                      {row.outfevibe}
                    </td>
                    <td className="comparison-meh">{row.others}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── EDGE BENEFITS ─── */}
      <section className="section">
        <div className="section-container">
          <div className="section-header animate-fadeInUp">
            <span className="section-tag">Built for Indian Fashion</span>
            <h2 className="section-title">Your Products, Their Perfect Match</h2>
            <p className="section-desc">
              Every feature is designed around how Indian buyers actually shop for fashion.
            </p>
          </div>
          <div className="edge-grid">
            <div className="edge-item">
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
              <div>
                <strong>Body shape analysis</strong>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Hourglass, pear, apple, rectangle — your product is shown to the body type it flatters most</span>
              </div>
            </div>
            <div className="edge-item">
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
              <div>
                <strong>Skin tone matching</strong>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Fair to deep — your maroon kurti reaches warm-toned users, not everyone</span>
              </div>
            </div>
            <div className="edge-item">
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
              <div>
                <strong>Indian occasions</strong>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Diwali, Eid, weddings, Haldi, college fests — we style for real Indian life</span>
              </div>
            </div>
            <div className="edge-item">
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
              <div>
                <strong>Style persona targeting</strong>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Minimalist Maven, Streetwear Icon, Comfort Queen, Indo-Fusion, Power Dresser</span>
              </div>
            </div>
            <div className="edge-item">
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
              <div>
                <strong>Budget-aware placement</strong>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Your ₹800 top reaches users with ₹500–₹1500 budget, not luxury shoppers</span>
              </div>
            </div>
            <div className="edge-item">
              <CheckCircle2 size={20} style={{ color: 'var(--success)' }} />
              <div>
                <strong>Multi-platform support</strong>
                <span style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: 2 }}>Link products from Amazon, Meesho, Myntra, Flipkart, Ajio, or your own store</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="cta-section">
        <div className="cta-glow" />
        <div className="cta-content animate-fadeInUp">
          <h2 className="cta-title">Ready to Reach Your Perfect Customers?</h2>
          <p className="cta-desc">
            Join Outfevibe today. List your products for free. Let AI do the matchmaking.
          </p>
          <Link href="/signup" className="btn btn-primary btn-lg" id="footer-cta">
            <Sparkles size={18} />
            Create Your Seller Account
          </Link>
        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer className="landing-footer">
        <div className="footer-container">
          <div className="footer-brand">
            <div className="navbar-logo" style={{ marginBottom: 12 }}>
              <span className="navbar-logo-icon"><Sparkles size={20} /></span>
              <span>Outfevibe</span>
            </div>
            <p style={{ fontSize: '0.82rem', color: 'var(--text-muted)', maxWidth: 280 }}>
              India's first AI stylist for Gen Z & Millennials. Upload a photo, get styled for life.
            </p>
          </div>
          <div className="footer-links">
            <div>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-body)' }}>Sellers</h4>
              <Link href="/signup" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>Start Selling</Link>
              <Link href="/login" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>Seller Login</Link>
            </div>
            <div>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-body)' }}>Platform</h4>
              <a href="https://outfevibe.com" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>Outfevibe.com</a>
              <a href="https://outfevibe.com/outfit" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>AI Stylist</a>
            </div>
            <div>
              <h4 style={{ fontSize: '0.82rem', fontWeight: 600, marginBottom: 12, fontFamily: 'var(--font-body)' }}>Connect</h4>
              <a href="https://www.instagram.com/outfevibe" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>Instagram</a>
              <a href="https://www.linkedin.com/in/outfevibe-offical-14903a3a9" target="_blank" rel="noopener noreferrer" style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-muted)', marginBottom: 8 }}>LinkedIn</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Outfevibe. Built with intention.</span>
        </div>
      </footer>
    </div>
  );
}
