import './globals.css'

export const metadata = {
  title: 'Soumyashi Power — Admin Panel',
  description: 'Admin dashboard for Soumyashi Power',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
