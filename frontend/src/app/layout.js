import { Inter, Hind_Siliguri } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  title: 'Vara Hobe - Yours To Rent',
  description: 'Modern Rental Platform in Bangladesh',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${inter.variable} ${hindSiliguri.variable}`}>
      <body className="bg-[#080b11] text-slate-100 antialiased selection:bg-emerald-500/30 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}