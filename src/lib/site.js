export const siteUrl = "https://ziiah.net";
export const homeTitle = "Sophia Keziah (Ziah) | Software Developer in Pampanga";
export const homeDescription = "Sophia Keziah's portfolio: a Computer Science student and software developer in Pampanga, Philippines, building web apps, SaaS products, and data tools.";

export function pageMetadata(title, description, path) {
  const url = new URL(path, siteUrl).href;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title, description, url,
      siteName: "Ziah — Sophia Keziah",
      locale: "en_US",
      type: "website",
      images: [{ url: `${siteUrl}/og-image.png`, width: 1200, height: 630, alt: "Sophia Keziah — Software Developer & CS Student" }],
    },
    twitter: {
      card: "summary_large_image", title, description,
      images: [`${siteUrl}/og-image.png`],
    },
  };
}

export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite", "@id": `${siteUrl}/#website`,
      url: `${siteUrl}/`, name: "Ziah — Sophia Keziah", inLanguage: "en",
      author: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person", "@id": `${siteUrl}/#person`,
      name: "Sophia Keziah", alternateName: ["Ziah", "Ziiah"],
      url: `${siteUrl}/`, image: `${siteUrl}/my-avatar.webp`,
      description: homeDescription,
      sameAs: ["https://github.com/zii4h", "https://linkedin.com/in/sophiakeziahpineda", "https://threads.net/@sphy.keziah"],
    },
  ],
};
