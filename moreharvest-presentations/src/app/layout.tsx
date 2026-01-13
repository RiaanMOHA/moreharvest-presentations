import { REM, Noto_Sans_JP, Noto_Sans_TC, Noto_Sans_SC } from 'next/font/google'
import './globals.css'

const rem = REM({ 
  subsets: ['latin'],
  weight: ['400', '600'],
  variable: '--font-rem',
  display: 'swap',
})

const notoJP = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-noto-jp',
  display: 'swap',
})

const notoTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-tc',
  display: 'swap',
})

const notoSC = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-noto-sc',
  display: 'swap',
})

export const metadata = {
  title: 'MoreHarvest Presentations',
  description: 'AI-powered presentation builder',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      className={`${rem.variable} ${notoJP.variable} ${notoTC.variable} ${notoSC.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
