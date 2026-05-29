/**
 * Single source of truth for the industries the company serves.
 * Consumed by the homepage <Industries /> section and the /industries page.
 *
 * Icons are stored as lucide-react component references (not JSX) so each
 * consumer can choose its own size/props at render time.
 */
import {
  Factory,
  Building2,
  Hospital,
  School,
  Landmark,
  Cpu,
  Warehouse,
  Hotel,
} from "lucide-react";

export const INDUSTRIES_META = {
  badge: "Industries We Serve",
  heading: "Powering Multiple Industrial Sectors",
  description:
    "Our solutions support a wide range of industries with reliable, scalable, and efficient power systems designed for continuous operations.",
};

export const INDUSTRIES = [
  {
    icon: Factory,
    title: "Manufacturing & Industrial Plants",
    description:
      "Complete electrical infrastructure solutions for factories, heavy industries, and production facilities.",
  },
  {
    icon: Building2,
    title: "Commercial Complexes",
    description:
      "High-performance electrical systems for offices, malls, IT parks, and commercial buildings.",
  },
  {
    icon: Hospital,
    title: "Healthcare Facilities",
    description:
      "Reliable and compliant electrical installations for hospitals, clinics, and medical institutions.",
  },
  {
    icon: School,
    title: "Educational Institutions",
    description:
      "Safe and energy-efficient power systems for schools, colleges, and universities.",
  },
  {
    icon: Landmark,
    title: "Government & Infrastructure",
    description:
      "Large-scale electrification projects supporting public infrastructure and utilities.",
  },
  {
    icon: Cpu,
    title: "IT & Data Centers",
    description:
      "Smart power management systems for data centers and technology-driven enterprises.",
  },
  {
    icon: Warehouse,
    title: "Warehousing & Logistics",
    description:
      "Robust electrical setups designed for distribution hubs and logistics operations.",
  },
  {
    icon: Hotel,
    title: "Hospitality & Real Estate",
    description:
      "Energy-efficient solutions for hotels, residential complexes, and real estate developments.",
  },
];
