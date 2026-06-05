import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }) {
  return {
    title: `Blog | Soumyasi Power`,
    description: "Energy insights on solar, EV charging, and industrial power in Odisha.",
  };
}

export default function BlogArticlePage({ params }) {
  return (
    <div className="min-h-screen bg-[#FFFBF0] flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 mb-6">
          <span className="text-3xl">📝</span>
        </div>
        <p className="text-xs font-bold tracking-[0.3em] uppercase text-[#d97706] mb-4">
          Coming Soon
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold font-display text-[#1a1208] mb-4 leading-tight">
          Full Article Coming Soon
        </h1>
        <p className="text-[#78614a] text-lg leading-relaxed mb-10">
          We&apos;re working on detailed articles for our knowledge base. Check back soon for the full content.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full border-2 border-amber-400 text-amber-700 font-semibold text-sm hover:bg-amber-50 transition-all duration-300"
        >
          <ArrowLeft size={15} /> Back to Blog
        </Link>
      </div>
    </div>
  );
}
