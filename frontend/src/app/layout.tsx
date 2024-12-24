import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBT',
  description: 'My Beautiful Trip',
  icons: {
    icon: '/airplane.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
