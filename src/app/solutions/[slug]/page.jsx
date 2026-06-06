import { notFound } from "next/navigation";
import { SOLUTIONS } from "@/lib/data/solutions";
import SolutionPageClient from "./SolutionPageClient";

export function generateStaticParams() {
  return SOLUTIONS.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) return {};
  return {
    title: solution.metaTitle,
    description: solution.metaDescription,
  };
}

export default function SolutionDetailPage({ params }) {
  const solution = SOLUTIONS.find((s) => s.slug === params.slug);
  if (!solution) notFound();
  return <SolutionPageClient solution={solution} />;
}
