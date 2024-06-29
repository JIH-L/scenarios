import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import '@/app/globals.css';
import Footer from '@/components/Footer';
import Header from '@/components/Header';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://chatscripter.vercel.app/'),
  alternates: {
    canonical: '/',
  },
  title: 'ChatScripter - AI 劇本創作平台 | AI Powered Script Writing',
  description:
    '探索 ChatScripter —— 一個結合 AI 技術與創意劇本寫作的創新平台。輕鬆使用 AI 助力生成獨特劇本。 | Explore ChatScripter, an innovative platform where AI technology meets creative scriptwriting. Generate unique scripts effortlessly with AI.',
  keywords:
    'AI 劇本寫作, 自動編劇, ChatGPT 劇本, 創意寫作 AI, 數字劇本創作, AI scriptwriting, automated screenplay, creative writing AI.',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: 'https://chatscripter.vercel.app/',
    siteName: 'ChatScripter',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: 'ChatScripter - AI 劇本創作平台 | AI Powered Script Writing',
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
    <html lang="zh-TW">
      <body className={inter.className}>
        <Header />
        <div className="mx-auto max-w-sm px-4 md:max-w-2xl md:px-0 xl:max-w-5xl">
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
