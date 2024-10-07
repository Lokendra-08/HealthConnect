import './globals.css'
import { ReactNode } from 'react'

export const metadata = {
  title: 'HealthConnect',
  description: 'A healthcare management application',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}