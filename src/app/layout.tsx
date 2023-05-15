import { Providers } from '@/lib/Providers';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Revenue Group',
  description: 'for Involve Asia',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
