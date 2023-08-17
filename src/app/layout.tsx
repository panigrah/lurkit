import './globals.css'
import Navbar from './navbar';
import ContextProviders from './ContextProviders';
import AuthProvider from './Session';
import { BottomNav } from './BottomNav';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes"/>
      </head>
      <body className="h-screen flex w-full overflow-hidden flex-col">
        <AuthProvider>
        <ContextProviders>
          <Navbar />
          <main className="flex flex-auto overflow-hidden mb-16">
            {children}
          </main>
          <BottomNav />
        </ContextProviders>
        </AuthProvider>
      </body>
    </html>
  )
}
