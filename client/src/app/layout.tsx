import { ReactNode } from "react";
import { GoogleAnalytics } from '@next/third-parties/google'

export default function RootLayout({ children }: { children: ReactNode }) {

  return (
    <html lang="en">
      <GoogleAnalytics gaId="G-6LBMCHCWKZ" />
      <body>
        {children}
      </body>
    </html>
  )
}