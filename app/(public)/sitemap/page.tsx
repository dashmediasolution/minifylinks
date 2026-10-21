
import Link from "next/link";
import { Link2, ArrowUpRight } from "lucide-react";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Sitemap | MinifyLinks",
  description: "Explore all pages, categories, tags, and blog posts on MinifyLinks.",
};

export default async function SitemapPage() {
  const baseUrl = "https://minifylinks.com";

  const posts = await prisma.blogPost.findMany({
    where: { isPublished: true },
    select: {
      slug: true,
      updatedAt: true,
      categories: true,
      metaKeywords: true,
    },
  });

  const categories = Array.from(
    new Set(
      posts
        .flatMap((post) => post.categories || [])
        .map((category) => category.slug)
        .filter(Boolean)
    )
  );

  const tags = Array.from(
    new Set(
      posts
        .flatMap((post) =>
          (post.metaKeywords || "")
            .split(",")
            .map((tag) => tag.trim())
        )
        .filter(Boolean)
        .map((tag) => tag.toLowerCase().replace(/\s+/g, "-"))
    )
  );

  const sections = [
    {
      title: "Quick Links",
      links: [
        { name: "Home", href: "/" },
        { name: "Blog", href: "/blog" },
        { name: "All Tags", href: "/tags" },
        { name: "FAQs", href: "/faqs" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms", href: "/terms" },
      ],
    },
    {
      title: "Blog Categories",
      links: categories.map((slug) => ({
        name: String(slug).replace(/-/g, " "),
        href: `/category/${slug}`,
      })),
    },
    {
      title: "Blog Tags",
      links: tags.map((tag) => ({
        name: tag.replace(/-/g, " "),
        href: `/tags/${tag}`,
      })),
    },
    {
      title: "All Blog Posts",
      links: posts.map((post) => ({
        name: post.slug.replace(/-/g, " "),
        href: `/blog/${post.slug}`,
      })),
    },
  ];

  return (
    <main className="mx-auto max-w-7xl space-y-5 px-5 py-26  relative top-6 ">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Sitemap</h1>
        <p className="mt-2 text-sm text-slate-600">
          Find all important pages and blog posts on MinifyLinks.
        </p>
      </div>

      {sections.map((section) => (
        <section
          key={section.title}
          className="overflow-hidden rounded-xl border border-primary/10"
        >
          
<div className="flex items-center gap-2 bg-primary/10 px-3 py-2.5">
  <Link2 className="h-4 w-4 text-primary" />
  <h2 className="text-base font-bold text-foreground">
    {section.title}
  </h2>
</div>

<div className="grid grid-cols-1 gap-2 p-2.5 sm:grid-cols-2 lg:grid-cols-4">
  {section.links.map((link) => (
    <Link
      key={link.href}
      href={link.href}
      className="flex min-h-8 items-center justify-between gap-3 rounded-lg bg-primary/5 px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
    >
      <span>{link.name}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 rounded-full bg-primary p-0.5 text-primary-foreground" />
    </Link>
  ))}
</div>


          <div className="grid grid-cols-1 gap-2 p-2.5 sm:grid-cols-2 lg:grid-cols-4">
            {section.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
      className="flex min-h-8 items-center justify-between gap-3 rounded-lg bg-primary/5 px-2.5 py-1.5 text-sm text-foreground transition-colors hover:bg-primary/15 hover:text-primary"
              >
                <span>{link.name}</span>
      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 rounded-full bg-primary p-0.5 text-primary-foreground" />
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}
