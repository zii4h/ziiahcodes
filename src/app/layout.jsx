import "./globals.css";
import Script from "next/script";
import PageSwitcher from "@/components/PageSwitcher";
import { seoKeywords } from "./seo";
import { homeTitle, homeDescription, pageMetadata, siteUrl, structuredData } from "@/lib/site";

export const metadata = {
  ...pageMetadata(homeTitle, homeDescription, "/"),
  metadataBase: new URL(siteUrl),
  keywords: seoKeywords,
  authors: [{ name: "Sophia Keziah", url: siteUrl }],
  creator: "Sophia Keziah",
  icons: {
    icon: [16, 32, 48, 64].map((size) => ({ url: `/favicon-${size}x${size}.png`, sizes: `${size}x${size}`, type: "image/png" })),
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      </head>
      <body>
        <a className="skip-link" href="#main-content">Skip to content</a>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
        {children}
        <PageSwitcher />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-C46WKGX5LY');
          `}
        </Script>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-C46WKGX5LY" strategy="lazyOnload" />
      </body>
    </html>
  );
}
