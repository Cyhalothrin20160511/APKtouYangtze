import './css/bootstrap.min.css'
import { ReactNode } from 'react'

export const metadata = {
  icons: { icon: '/favicon.ico' },
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html>
      <head>
        <meta charSet="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </head>
      <body>
        {children}
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        <script src="/assets/js/bootstrap.bundle.min.js"></script>
      </body>
    </html>
  )
}
