import "./globals.css";
import { seoKeywords } from "./seo";

export const metadata = {

   icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-64x64.png", sizes: "64x64", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  
  keywords: seoKeywords,
  title: "Ziah | Software Developer & CS Student",
  description:
    "Portfolio of Sophia Keziah (Ziah) — CS student, data nerd, and developer based in Pampanga, PH. Specializing in building SaaS products, web apps, and data-driven tools.",
  
  authors: [{ name: "Sophia Keziah", url: "https://ziiah.net" }],
  creator: "Sophia Keziah",
  openGraph: {
    title: "Ziah | Software Developer & CS Student",
    description:
      "CS student, data nerd, and developer based in Pampanga, PH. Building SaaS products, web apps, and data tools.",
    url: "https://ziiah.net",
    siteName: "ziiahcodes",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Ziah | Software Developer",
    description: "CS student and developer based in Pampanga, PH.",
    creator: "@sphy.keziah",
  },
  robots: {
    index: true,
    follow: true,
  },
  metadataBase: new URL("https://ziiah.net"),
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

    
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}