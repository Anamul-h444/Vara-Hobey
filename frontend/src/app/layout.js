/**
 * ==============================================================================
 * Project: Vara Hobe Web Application
 * File: src/app/layout.js
 * Description: Root application layout configuring global Google & Bangla fonts,
 *              meta tags, Google OAuth provider, and global Auth context.
 * ==============================================================================
 */

import { Inter, Hind_Siliguri } from 'next/font/google';
import './globals.css';

// Context Providers
import { AuthProvider } from '@/context/AuthContext';
import { GoogleOAuthProvider } from '@react-oauth/google';

/* -------------------------------------------------------------------------- */
/*                            Google Fonts Config                             */
/* -------------------------------------------------------------------------- */
const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const hindSiliguri = Hind_Siliguri({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['bengali'],
  variable: '--font-bangla',
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/*                              Application Meta                              */
/* -------------------------------------------------------------------------- */
export const metadata = {
  title: 'Vara Hobe - Yours To Rent',
  description: 'Modern Rental Platform in Bangladesh',
};

/* -------------------------------------------------------------------------- */
/*                             Root Layout Component                          */
/* -------------------------------------------------------------------------- */
export default function RootLayout({ children }) {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="bg-[#080b11] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        <GoogleOAuthProvider clientId={clientId}>
          <AuthProvider>
            {children}
          </AuthProvider>
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}