'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

// Create a new QueryClient instance
const queryClient = new QueryClient();

export default function ReactQueryProvider({ children }) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
