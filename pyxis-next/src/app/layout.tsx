import './globals.css'

export const metadata = {
  title: 'Pyxis Habits',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <script src="https://kit.fontawesome.com/03c91ce9d4.js" crossOrigin="anonymous"></script>
      <body>{children}</body>
    </html>
  )
}