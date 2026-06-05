import { Sun, Zap, Building2, Settings, ShieldCheck, Cpu } from "lucide-react";

export const SOLUTIONS_META = {
  badge: "Our Core Expertise",
  heading: "Advanced Power Solutions",
  description:
    "Comprehensive energy and electrical solutions built with modern engineering precision.",
};

export const SOLUTIONS = [
  {
    slug: "solar-energy",
    icon: Sun,
    title: "Solar Energy Systems",
    description:
      "High-efficiency solar installations designed for commercial and residential energy optimization.",
    features: [
      "Monocrystalline & polycrystalline panel options",
      "Rooftop and ground-mount configurations",
      "Grid-tied and off-grid systems",
      "Net metering assistance",
      "25-year performance warranty",
      "MNRE-certified installation",
    ],
  },
  {
    slug: "power-distribution",
    icon: Zap,
    title: "Power Distribution",
    description:
      "Reliable electrical distribution networks engineered for scalable infrastructure growth.",
    features: [
      "LT & HT power distribution systems",
      "Switchgear and panel boards",
      "Cable management and laying",
      "Load flow analysis",
      "Fault protection and relay coordination",
      "Turnkey distribution solutions",
    ],
  },
  {
    slug: "industrial-electrification",
    icon: Building2,
    title: "Industrial Electrification",
    description:
      "Turnkey electrical solutions for factories, plants, and industrial facilities.",
    features: [
      "Complete factory electrification",
      "Motor control centres (MCC)",
      "Variable frequency drives (VFD)",
      "Power factor correction",
      "Substation design and erection",
      "Compliance with IE rules and BIS standards",
    ],
  },
  {
    slug: "maintenance-amc",
    icon: Settings,
    title: "Maintenance & AMC",
    description:
      "Preventive maintenance ensuring uninterrupted system performance and reliability.",
    features: [
      "Annual maintenance contracts (AMC)",
      "Planned preventive maintenance schedules",
      "24/7 emergency breakdown support",
      "Thermal imaging and power quality audits",
      "Spare parts management",
      "Dedicated service engineers",
    ],
  },
  {
    slug: "safety-compliance",
    icon: ShieldCheck,
    title: "Safety & Compliance",
    description:
      "Electrical audits and safety compliance aligned with national standards.",
    features: [
      "Electrical safety audits",
      "IE Act compliance",
      "Earth leakage and insulation testing",
      "RCD and ELCB installation",
      "Hazardous area classification",
      "Safety training for plant personnel",
    ],
  },
  {
    slug: "smart-energy-automation",
    icon: Cpu,
    title: "Smart Energy Automation",
    description:
      "IoT-enabled smart monitoring systems for intelligent energy management.",
    features: [
      "Real-time energy monitoring dashboards",
      "Smart meter integration",
      "SCADA systems for power infrastructure",
      "Automated demand response",
      "Remote diagnostics and alerts",
      "Energy analytics and reporting",
    ],
  },
];
