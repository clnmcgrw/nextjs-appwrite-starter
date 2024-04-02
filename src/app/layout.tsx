import { Metadata } from 'next';
import { Inconsolata } from 'next/font/google';
import { Theme, ThemePanel } from '@radix-ui/themes';
import AppHeader from '@/components/app-header';
import AppFooter from '@/components/app-footer';

import '@radix-ui/themes/styles.css';
import '@/styles/global.css';

const fontFamily = Inconsolata({
  weight: ['400', '500', '600', '800'],
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: `NextJS Appwrite Starter Template`,
  description: `Get started quickly with Appwrite as your backend`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={fontFamily.className}>
        <Theme accentColor="indigo" grayColor="slate">
          <AppHeader />
          <main>
            {children}
          </main>
          <AppFooter />
          <ThemePanel />
        </Theme>
      </body>
    </html>
  );
}
