'use client';
import { ReactNode } from 'react';
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
const queryClient = new QueryClient()

export default function ContextProviders({
  children,
}: {
  children: ReactNode;
}) {
  return (
      <ThemeProvider attribute="class">
          <QueryClientProvider client={queryClient}>
          {children}
          </QueryClientProvider>
        </ThemeProvider>
  );
}

