'use client';
import '../index.css';
import { AuthProvider } from '../context/AuthContext';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Sell your fashion products on Outfevibe — India's first AI-powered fashion marketplace. Zero listing fees. AI-matched buyers. Start selling today." />
        <meta name="theme-color" content="#0a0a0a" />
        <meta property="og:title" content="Sell on Outfevibe — India's AI Fashion Marketplace" />
        <meta property="og:description" content="List your products for free. Our AI matches them with buyers based on body shape, skin tone & style persona." />
        <meta property="og:type" content="website" />
        <title>Sell on Outfevibe — India&apos;s AI Fashion Marketplace for Sellers</title>
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
