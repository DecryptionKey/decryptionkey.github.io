export type BlogPost = {
  slug: string;
  href: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  published: string;
  publishedShort: string;
  image: string;
  imageAlt: string;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "ubuntu-security-baseline",
    href: "/blog/ubuntu-security-baseline/",
    category: "Field notes / Linux security",
    title: "Building an Ubuntu security lab and establishing a baseline.",
    excerpt:
      "A hands-on account of building an ARM64 Ubuntu VM, inspecting its users, services, packages, and network exposure, then documenting three security risks.",
    readTime: "7 min read",
    published: "February 12, 2026",
    publishedShort: "February 2026",
    image: "/media/security-baseline.png",
    imageAlt: "Three Ubuntu security risks identified during the baseline assessment",
    featured: true,
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
