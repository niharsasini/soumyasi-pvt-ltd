/**
 * Single source of truth for the company's solution offerings.
 * Consumed by the /solutions page (and any future homepage solutions section).
 *
 * Icons are stored as lucide-react component references (not JSX) so each
 * consumer can choose its own size/props at render time.
 */
import { Sun, Zap, Building2, Settings, ShieldCheck, Cpu } from "lucide-react";

export const SOLUTIONS_META = {
  badge: "Our Core Expertise",
  heading: "Advanced Power Solutions",
  description:
    "Comprehensive energy and electrical solutions built with modern engineering precision.",
};

export const SOLUTIONS = [
  {
    icon: Sun,
    title: "Solar Energy Systems",
    description:
      "High-efficiency solar installations designed for commercial and residential energy optimization.",
  },
  {
    icon: Zap,
    title: "Power Distribution",
    description:
      "Reliable electrical distribution networks engineered for scalable infrastructure growth.",
  },
  {
    icon: Building2,
    title: "Industrial Electrification",
    description:
      "Turnkey electrical solutions for factories, plants, and industrial facilities.",
  },
  {
    icon: Settings,
    title: "Maintenance & AMC",
    description:
      "Preventive maintenance ensuring uninterrupted system performance and reliability.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Compliance",
    description:
      "Electrical audits and safety compliance aligned with national standards.",
  },
  {
    icon: Cpu,
    title: "Smart Energy Automation",
    description:
      "IoT-enabled smart monitoring systems for intelligent energy management.",
  },
];
