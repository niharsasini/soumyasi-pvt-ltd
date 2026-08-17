import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, Clock, User, ArrowLeft, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { BLOG_POSTS, getPostBySlug, getRelatedPosts } from "@/lib/data/blog-posts";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: "Article Not Found | Soumyashi Power" };
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt },
  };
}

export default function BlogArticlePage({ params }) {
  const post = getPostBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink">
      {/* Cover */}
      <div className={`h-52 sm:h-64 bg-gradient-to-br ${post.gradient} relative`}>
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-3xl border border-brand-border shadow-warm-lg px-6 sm:px-10 py-10">
          <div className="mb-6">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: post.title }]} />
          </div>

          <span className={`inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full mb-4 ${post.catColor}`}>
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-brand-ink leading-tight mb-5">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-brand-muted text-xs pb-6 border-b border-brand-border">
            <span className="flex items-center gap-1.5"><User size={13} /> {post.author}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} /> {post.date}</span>
            <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime} read</span>
          </div>

          <div className="mt-8 space-y-5">
            {post.content.map((para, i) => (
              <p key={i} className="text-brand-brown text-[15px] leading-[1.8]">
                {para}
              </p>
            ))}
          </div>

          <div className="mt-10 pt-8 border-t border-brand-border">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-brand-gold hover:text-amber-700 font-semibold text-sm transition-colors"
            >
              <ArrowLeft size={15} /> Back to all articles
            </Link>
          </div>
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="mt-14 mb-16">
            <h2 className="font-bold font-display text-xl text-brand-ink mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300 flex flex-col"
                >
                  <div className={`h-20 bg-gradient-to-br ${r.gradient}`} />
                  <div className="p-5 flex flex-col flex-1">
                    <span className={`inline-flex self-start text-[10px] font-bold px-2 py-0.5 rounded-full mb-2 ${r.catColor}`}>
                      {r.category}
                    </span>
                    <h3 className="font-semibold text-brand-ink text-sm leading-snug flex-1">{r.title}</h3>
                    <span className="mt-3 text-brand-gold text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* CTA */}
      <section className="py-20 px-4 bg-gradient-to-br from-amber-600 to-amber-800 mt-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight mb-4">
            Ready to go solar or add an EV charger?
          </h2>
          <p className="text-amber-100 mb-8">Talk to our team for a free site assessment.</p>
          <Link
            href="/contact"
            className="btn-shimmer inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm text-amber-700 bg-white hover:bg-amber-50 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            Get Free Assessment
          </Link>
        </div>
      </section>
    </div>
  );
}
