import '@/app/globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_URL || 'https://chatscripter.vercel.app/'
  ),
  alternates: {
    canonical: '/',
  },
  title: 'ChatScripter - AI 劇本創作平台 | AI Powered Script Writing',
  description:
    'ChatScripter 取得靈感，創作劇本。如果你是編劇、作家、遊戲設計師，這裡是你的創作天地，透過劇本創作，讓你的想法實現。',
  keywords:
    'AI 劇本寫作, 自動編劇, ChatGPT 劇本, 創意寫作 AI, 數字劇本創作, AI scriptwriting, automated screenplay, creative writing AI.',
  openGraph: {
    type: 'website',
    locale: 'zh_TW',
    url: `${process.env.NEXT_PUBLIC_URL || 'https://chatscripter.vercel.app/'}`,
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
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-7819194777376926"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body className={inter.className}>
        <Header />
        <div className="mx-auto max-w-sm px-4 sm:max-w-lg md:max-w-2xl md:px-0 xl:max-w-5xl">
          {children}
        </div>
        <SpeedInsights />
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
