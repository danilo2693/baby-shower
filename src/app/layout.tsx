import type { Metadata } from 'next';
import { Geist, Geist_Mono, Cookie, Dancing_Script } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

const cookie = Cookie({
  variable: '--font-cookie-mono',
  weight: '400',
  subsets: ['latin']
});

const dancing = Dancing_Script({
  variable: '--font-dancing',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: 'Baby shower - Samantha',
  description: 'Baby shower in honor to Samantha'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${cookie.variable} ${dancing.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
