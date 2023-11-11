"use client";
import "./globals.scss";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { AuthProvider } from "@/context/AuthContext";
import { ThemeProvider } from "@mui/material";
import {
  darkThemeWithResponsiveFontSizes,
  lightThemeWithResponsiveFontSizes,
} from "@/config/themes";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Activity Monitor</title>
      </head>
      <body className="h-screen">
        <ThemeProvider theme={lightThemeWithResponsiveFontSizes}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
