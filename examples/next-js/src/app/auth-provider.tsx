'use client'

import { AuthProvider } from "react-starter-auth"


export default function Provider ({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}

