import MiscClient from "@/components/MiscClient";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Ziiah | Misc",
  "Explore Sophia Keziah's music, photo collection, favorite apps, and personal interests. The miscellaneous corner of Ziah's portfolio.",
  "/misc/",
);

export default function MiscPage() {
  return <MiscClient />;
}
