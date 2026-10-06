import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = { title: 'CareAlert Dashboard', description: 'Patient-safety alert dashboard scaffold' };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><div className="shell"><nav className="nav" aria-label="Main navigation"><Link className="brand" href="/">CareAlert</Link><div className="links"><Link href="/">Dashboard</Link><Link href="/contacts">Emergency Contacts</Link><Link href="/settings">Settings</Link><Link href="/health">Health Check</Link></div></nav>{children}</div></body></html>;
}
