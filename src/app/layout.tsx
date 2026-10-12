import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Élan Studio | Beauty, reimagined', description: 'A fictional premium salon demo showcasing services and WhatsApp appointment requests.', robots: { index: false, follow: false } };
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body>{children}</body></html>; }
