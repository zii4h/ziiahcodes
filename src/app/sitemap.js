import { siteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap() {
  return [{ url: `${siteUrl}/` }, { url: `${siteUrl}/misc/` }];
}
