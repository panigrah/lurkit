import './globals.css'
import Navbar from './navbar';
import ContextProviders from './ContextProviders';
import AuthProvider from './Session';
import { BottomNav } from './BottomNav';
import { MediaViewer } from '@/components/MediaViewer';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1F2937" />
        <meta name="application-name" content="Lurk on Reddit" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Lurkit" />
        <meta name="description" content="Lurk on Reddit" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#2B5797" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover'
        />
      </head>
      <body className="h-screen flex w-full overflow-hidden flex-col">
        <AuthProvider>
        <ContextProviders>
          <Navbar />
          <main className="flex flex-auto overflow-hidden mb-16">
            {children}
          </main>
          <MediaViewer />
          <BottomNav />
        </ContextProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
