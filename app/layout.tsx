import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Navbar from './components/nav/Navbar';
import './globals.css';
import QueryProvider from './providers/QueryProvider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: { template: '%s | PDF Generator', default: 'PDF Generator' },
  description: 'Generate PDF from URL',
  openGraph: {
    title: 'Generate PDF',
    description: 'Generate PDF from URL',
    images: [
      {
        url: '/pdf-generator.png',
        width: 1200,
        height: 630,
        alt: 'Generate PDF',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <QueryProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <main className="flex-1">{children}</main>
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
