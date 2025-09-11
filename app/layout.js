// app/layout.tsx
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "CASE STUDY - DAPURBUZZER.CO.ID",
  description: "CASE STUDY - DAPURBUZZER.CO.ID",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          "min-h-dvh bg-background text-foreground antialiased",
          "motion-safe:scroll-smooth",
        ].join(" ")}
      >
        <div className="min-h-dvh">{children}</div>
      </body>
    </html>
  );
}
