import BlogEmbedFrame from "@/components/blog/BlogEmbedFrame";

export const dynamic = "force-static";

export const metadata = {
  title: "Blog | Blue Blocks",
  description:
    "Embedded Blue Blocks blog view.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://www.blueblocks.in/blog/",
  },
};

const BLOG_URL = "https://blueblocks.in/blog/";

export default function BlogPage() {
  return (
    <main className="pt-28 sm:pt-32">
      <BlogEmbedFrame src={BLOG_URL} fallbackHref={BLOG_URL} title="Blue Blocks Blog" />
    </main>
  );
}
