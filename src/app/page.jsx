import HomeClient from "@/components/HomeClient";
import { homeDescription, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata("Ziiah | Home", homeDescription, "/");

export default function HomePage() {
  return <HomeClient />;
}
