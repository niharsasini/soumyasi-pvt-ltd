/**
 * Project portfolio — illustrative, representative project profiles.
 * Client names are generic descriptors (industry/type + location), not named
 * third-party organizations, since these engagements have not been individually verified for publication.
 */

export const PROJECTS = [
  {
    slug: "bhubaneswar-solar-factory",
    title: "Solar Rooftop — Manufacturing Plant, Bhubaneswar",
    category: "Solar",
    location: "Bhubaneswar, Odisha",
    client: "A manufacturing facility in the Mancheswar industrial area",
    capacity: "500 kW",
    completedDate: "March 2024",
    status: "Completed",
    description:
      "Complete rooftop solar installation for a manufacturing facility in the Mancheswar industrial area. The system generates an estimated 700 MWh annually, offsetting a significant share of the plant's daytime electricity draw.",
    highlights: ["500kW capacity", "~700 MWh annual generation", "~₹56L annual savings (estimated)", "~4.2 year payback period"],
    image: "/soumyasi/solar-field-odisha.png",
  },
  {
    slug: "cuttack-ev-hub",
    title: "EV Charging Hub — Commercial Complex, Cuttack",
    category: "EV",
    location: "Cuttack, Odisha",
    client: "A commercial complex on the Cuttack–Bhubaneswar corridor",
    capacity: "6 × 60kW DC Fast Chargers",
    completedDate: "August 2024",
    status: "Completed",
    description:
      "A 6-bay fast-charging hub installed at a commercial complex along one of Odisha's busiest inter-city routes, giving EV drivers a reliable fast-charge stop between Cuttack and Bhubaneswar.",
    highlights: ["6 × 60kW DC fast chargers", "OCPP network-connected", "~30 min average charge time", "24/7 remote monitoring"],
    image: "/soumyasi/ev-charger-ultra60.png",
  },
  {
    slug: "rourkela-industrial-substation",
    title: "Industrial Substation — Steel & Metals Facility, Rourkela",
    category: "Industrial",
    location: "Rourkela, Odisha",
    client: "A metals processing facility in the Rourkela industrial belt",
    capacity: "33 kV Substation",
    completedDate: "November 2023",
    status: "Completed",
    description:
      "Design and installation of a 33kV industrial substation, including switchgear, protective relays, and earthing system, engineered to eliminate the voltage instability that had been affecting production runs.",
    highlights: ["33kV substation design", "Zero unplanned outages since commissioning", "Custom switchgear sizing", "Full protective relay coordination"],
    image: "/soumyasi/industrial-power.png",
  },
  {
    slug: "puri-hotel-solar",
    title: "Rooftop Solar — Beachfront Hotel, Puri",
    category: "Solar",
    location: "Puri, Odisha",
    client: "A 60-room beachfront hotel near the temple town",
    capacity: "120 kW",
    completedDate: "January 2024",
    status: "Completed",
    description:
      "Rooftop solar system for a mid-size hotel property, sized to cover daytime common-area and HVAC load while staying within the property's limited roof footprint.",
    highlights: ["120kW capacity", "Covers ~65% of daytime load", "Salt-air rated mounting hardware", "Net-metered with SOUTHCO"],
    image: "/soumyasi/solar-field-odisha.png",
  },
  {
    slug: "nh16-highway-ev-station",
    title: "Highway EV Charging Station — NH-16",
    category: "EV",
    location: "NH-16, near Chandikhol, Odisha",
    client: "A highway fuel & rest stop on NH-16",
    capacity: "2 × 60kW DC Fast Chargers",
    completedDate: "February 2025",
    status: "Completed",
    description:
      "A highway-side fast-charging station added to an existing fuel and rest stop on NH-16, giving long-distance EV travellers a dependable charging point between Bhubaneswar and Balasore.",
    highlights: ["2 × 60kW DC fast chargers", "24/7 unattended operation", "App-based payment", "Highway signage & wayfinding"],
    image: "/soumyasi/ev-charger-ultra60.png",
  },
  {
    slug: "bhubaneswar-office-solar",
    title: "Rooftop Solar — IT Office Park, Bhubaneswar",
    category: "Solar",
    location: "Infocity, Bhubaneswar",
    client: "An IT office park in Infocity",
    capacity: "300 kW",
    completedDate: "June 2024",
    status: "Completed",
    description:
      "Rooftop solar for a multi-tenant office park, designed around the building's daytime-heavy office load profile for maximum self-consumption before any grid export.",
    highlights: ["300kW capacity", "High daytime self-consumption", "Shared-roof multi-tenant design", "Remote generation dashboard for facility team"],
    image: "/soumyasi/solar-field-odisha.png",
  },
  {
    slug: "gopalpur-wind-feasibility",
    title: "Coastal Wind Feasibility Study — Gopalpur",
    category: "Wind",
    location: "Gopalpur, Ganjam, Odisha",
    client: "A landholding industrial client near the Gopalpur coast",
    capacity: "Feasibility Stage — up to 5 MW",
    completedDate: "In Progress",
    status: "In Progress",
    description:
      "Wind resource assessment and grid-connectivity feasibility study for a coastal industrial landholding, evaluating turbine siting against measured wind data and OPTCL transmission capacity in the area.",
    highlights: ["12-month wind data collection", "OPTCL connectivity study underway", "Turbine siting analysis", "Complements client's existing solar assets"],
    image: "/soumyasi/wind-power-plant.png",
  },
  {
    slug: "berhampur-school-solar",
    title: "Solar Installation — Private School Campus, Berhampur",
    category: "Solar",
    location: "Berhampur, Odisha",
    client: "A private school campus in Berhampur",
    capacity: "80 kW",
    completedDate: "September 2024",
    status: "Completed",
    description:
      "Rooftop solar installation across two academic blocks, cutting the campus's grid dependency during school hours and doubling as a hands-on renewable-energy teaching exhibit for students.",
    highlights: ["80kW across two blocks", "Live generation display for STEM classes", "Reduced grid dependency during school hours", "25-year performance warranty"],
    image: "/soumyasi/solar-field-odisha.png",
  },
];

export function getProjectBySlug(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}
