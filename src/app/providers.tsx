"use client"

import * as React from "react"
import { ThemeProvider } from "next-themes"
export function Providers({ children, ...props }: React.PropsWithChildren<any>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
