import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import '@/styles/globals.css'
import Header from '@/components/layout/header/header'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'deun blog',
  description: '개발 블로그',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Header />
        <main className="w-full max-w-3xl mx-auto px-4">{children}</main>
      </body>
    </html>
  )
}
