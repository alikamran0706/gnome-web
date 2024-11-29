
'use client';
import './globals.css'
import { useState } from 'react';
import Loading from '@/components/Loading';
export default function RootLayout({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  return (
    <html lang="en">
      <body >{
        isLoading ? (
          <Loading
            isLoading={isLoading}
            setIsLoading={setIsLoading}
          />
        ) :
          children
      }</body>
    </html>
  )
}
