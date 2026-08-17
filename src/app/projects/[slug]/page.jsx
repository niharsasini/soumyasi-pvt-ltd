import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { MapPin, Calendar, Zap, CheckCircle2, ArrowRight } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { PROJECTS, getProjectBySlug } from "@/lib/data/projects";

export async function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) return { title: "Project Not Found | Soumyashi Power" };
  return {
    title: project.title,
    description: project.description,
  };
}

const STATUS_COLOR = {
  Completed: "bg-emerald-100 text-emerald-700",
  "In Progress": "bg-amber-100 text-amber-700",
  "Coming Soon": "bg-amber-100 text-amber-700",
};

export default function ProjectDetailPage({ params }) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = PROJECTS.filter((p) => p.category === project.category && p.slug !== project.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-ink">
      {/* Hero image */}
      <div className="relative h-64 sm:h-80 lg:h-96 w-full">
        <Image src={project.image} alt={project.title} fill priority sizes="100vw" className="object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 max-w-5xl mx-auto px-4 sm:px-6 pb-8 w-full">
          <span className={`inline-flex text-[11px] font-bold px-2.5 py-1 rounded-full mb-3 ${STATUS_COLOR[project.status] || "bg-amber-100 text-amber-700"}`}>
            {project.status}
          </span>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold font-display text-white leading-tight max-w-2xl">
            {project.title}
          </h1>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Projects", href: "/projects" }, { label: project.title }]} />

        <div className="grid lg:grid-cols-3 gap-10 mt-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            <h2 className="font-bold font-display text-xl text-brand-ink mb-4">Overview</h2>
            <p className="text-brand-brown text-[15px] leading-[1.8] mb-8">{project.description}</p>

            <h2 className="font-bold font-display text-xl text-brand-ink mb-4">Highlights</h2>
            <ul className="grid sm:grid-cols-2 gap-3 mb-8">
              {project.highlights.map((h) => (
                <li key={h} className="flex items-start gap-2.5 bg-white border border-brand-border rounded-xl px-4 py-3 shadow-warm">
                  <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-brand-ink text-sm font-medium">{h}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Stats sidebar */}
          <div>
            <div className="bg-white border border-brand-border rounded-2xl shadow-warm p-6 space-y-5 sticky top-24">
              <div>
                <div className="flex items-center gap-2 text-brand-muted text-xs mb-1">
                  <MapPin size={13} /> Location
                </div>
                <p className="font-semibold text-brand-ink text-sm">{project.location}</p>
              </div>
              <div className="pt-4 border-t border-brand-border">
                <div className="flex items-center gap-2 text-brand-muted text-xs mb-1">
                  <Zap size={13} /> Capacity
                </div>
                <p className="font-semibold text-brand-ink text-sm">{project.capacity}</p>
              </div>
              <div className="pt-4 border-t border-brand-border">
                <div className="flex items-center gap-2 text-brand-muted text-xs mb-1">
                  <Calendar size={13} /> {project.status === "Completed" ? "Completed" : "Timeline"}
                </div>
                <p className="font-semibold text-brand-ink text-sm">{project.completedDate}</p>
              </div>
              <div className="pt-4 border-t border-brand-border">
                <p className="text-brand-muted text-xs mb-1">Client Type</p>
                <p className="font-semibold text-brand-ink text-sm">{project.client}</p>
              </div>
              <Link
                href="/contact"
                className="btn-shimmer mt-2 w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-sm text-white bg-gradient-to-r from-amber-500 to-amber-600 shadow-gold hover:shadow-gold-lg hover:scale-[1.02] transition-all duration-300"
              >
                Start a Similar Project <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* Related projects */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="font-bold font-display text-xl text-brand-ink mb-6">More {project.category} Projects</h2>
            <div className="grid sm:grid-cols-3 gap-5">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/projects/${r.slug}`}
                  className="group bg-white border border-brand-border rounded-2xl shadow-warm overflow-hidden hover:border-amber-400 hover:shadow-card-hover transition-all duration-300"
                >
                  <div className="h-28 relative">
                    <Image src={r.image} alt={r.title} fill sizes="33vw" className="object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-brand-ink text-sm leading-snug">{r.title}</h3>
                    <span className="mt-2 inline-flex items-center gap-1 text-brand-gold text-xs font-semibold group-hover:gap-2 transition-all">
                      View Project <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
