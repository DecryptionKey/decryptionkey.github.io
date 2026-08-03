import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Clock3 } from "lucide-react";
import { blogPosts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — Ma'Nye Wade",
  description: "Field notes on cloud security, Linux, identity, automation, incident response, and the evidence behind the work.",
  openGraph: {
    title: "Blog — Ma'Nye Wade",
    description: "Security notes built from hands-on work and evidence.",
    type: "website",
  },
};

export default function BlogIndexPage() {
  return (
    <main className="blog-page blog-index-page">
      <header className="blog-header">
        <Link className="blog-header-brand" href="/#top" aria-label="Ma'Nye Wade — home">
          <img src="/media/brandmark.png" alt="Ma'Nye Wade" />
        </Link>
        <Link className="blog-back-link" href="/#writing">
          <ArrowLeft size={16} aria-hidden="true" /> Back to portfolio
        </Link>
      </header>

      <section className="blog-index-hero">
        <p className="blog-kicker">BLOG / FIELD NOTES</p>
        <h1>Security notes, built from evidence.</h1>
        <div className="blog-index-intro">
          <p>
            Practical write-ups on the systems I build, the controls I test, and the findings that shape the next security decision.
          </p>
          <span>{String(blogPosts.length).padStart(2, "0")} published article{blogPosts.length === 1 ? "" : "s"}</span>
        </div>
      </section>

      <section className="blog-index-collection" aria-labelledby="blog-collection-heading">
        <div className="blog-index-heading">
          <span>01</span>
          <h2 id="blog-collection-heading">All articles</h2>
        </div>
        <div className="blog-index-grid">
          {blogPosts.map((post, index) => (
            <article className="blog-index-card" key={post.slug}>
              <Link className="blog-index-card-image" href={post.href} aria-label={"Read " + post.title}>
                <img src={post.image} alt={post.imageAlt} />
                <span>{String(index + 1).padStart(2, "0")}</span>
              </Link>
              <div className="blog-index-card-copy">
                <p>{post.category}</p>
                <h3><Link href={post.href}>{post.title}</Link></h3>
                <div className="blog-index-card-meta">
                  <span><Clock3 size={14} aria-hidden="true" /> {post.readTime}</span>
                  <span>{post.published}</span>
                </div>
                <p className="blog-index-card-excerpt">{post.excerpt}</p>
                <Link className="blog-index-card-link" href={post.href}>
                  Read article <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="blog-index-cta">
        <p>More field notes will appear here as the work develops.</p>
        <Link href="/#work">Explore projects <ArrowUpRight size={16} aria-hidden="true" /></Link>
      </section>

      <footer className="blog-footer">
        <Link href="/#top" aria-label="Ma'Nye Wade — home"><img src="/media/horizontal-logo.png" alt="Ma'Nye Wade" /></Link>
        <p>Cloud security · Security automation · IAM</p>
        <p>© 2026 Ma&apos;Nye Wade</p>
      </footer>
    </main>
  );
}
