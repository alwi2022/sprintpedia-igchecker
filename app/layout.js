// app/layout.tsx
import { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"], display: "swap" });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"], display: "swap" });

const TITLE = "CASE STUDY - DAPURBUZZER.CO.ID";
const DESC =
  "Proxy API untuk mengakses Instagram Spam Filter Sprintpedia via backend (auto login + CSRF handling). Studi kasus integrasi dari dapurbuzzer.co.id.";
const DOMAIN = "https://sprintpedia-igcheckher.vercel.app";
const OG_IMAGE = "/og.png";

export const metadata = {
  metadataBase: new URL(DOMAIN),
  title: TITLE,
  description: DESC,
  icons: { icon: "/favicon.ico" },
  keywords: [
    "Sprintpedia",
    "Instagram Spam Filter",
    "proxy API",
    "CSRF",
    "case study",
    "dapurbuzzer",
    "imambahrialwi21@gmail.com",
    "Next.js",
  ],
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "/",
    siteName: "DAPURBUZZER",
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [OG_IMAGE],
  },
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
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
