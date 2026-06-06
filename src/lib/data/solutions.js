export const SOLUTIONS = [
  {
    slug: "solar-rooftop",
    title: "Solar Rooftop Installation",
    shortTitle: "Solar Energy",
    tagline: "Clean energy for every rooftop in Odisha",
    description:
      "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Backed by 25-year performance warranties and MNRE-certified installation.",
    heroImage: "/soumyasi/solar-field-odisha.png",
    accentColor: "amber",
    icon: "Sun",
    category: "☀️ Solar",

    eyebrow: "SOLAR ROOFTOP SOLUTIONS",
    heroHeading: "Power Your Property with Solar Energy",
    heroGoldWords: ["Solar", "Energy"],
    heroSubtext:
      "We design, install, and maintain rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha.",
    heroCTAPrimary: { label: "Get Free Assessment", href: "/contact" },
    heroCTASecondary: { label: "View Projects", href: "/projects" },

    benefits: [
      { icon: "TrendingDown", title: "Reduce Electricity Bills", description: "Cut your electricity costs by up to 90% with solar energy. Most homes see ROI in 4–5 years." },
      { icon: "Shield",       title: "25-Year Warranty",         description: "All panels come with a 25-year performance guarantee backed by tier-1 manufacturers." },
      { icon: "Zap",         title: "Fast Installation",         description: "Most residential installations completed in 1–2 days by our certified technicians." },
      { icon: "Leaf",        title: "Zero Emissions",            description: "Generate clean energy and offset 15–20 tonnes of CO₂ over the system lifetime." },
    ],

    product: {
      eyebrow: "OUR TECHNOLOGY",
      heading: "Monocrystalline Solar Panels",
      description:
        "We use only tier-1 monocrystalline panels — the most efficient technology available for Indian conditions. Every panel is MNRE-certified and tested for Odisha's climate.",
      image: "/soumyasi/solar-field-odisha.png",
      specs: [
        { label: "Efficiency",     value: "Up to 22%" },
        { label: "Warranty",       value: "25 Years"  },
        { label: "Rating",         value: "IP67"       },
        { label: "Certification",  value: "MNRE India" },
        { label: "Type",           value: "Monocrystalline" },
        { label: "Output",         value: "400W–550W" },
      ],
    },

    requirements: [
      {
        title: "📍 Site Requirements",
        items: [
          "South-facing roof preferred for maximum generation",
          "Minimum 100 sq ft shadow-free area required",
          "Roof age under 15 years recommended",
          "Load-bearing capacity check required before installation",
          "Avoid trees and structures casting shadows between 9am–3pm",
        ],
        checklist: [
          "Roof inspection completed",
          "Shadow analysis (solar path simulation) done",
          "Structural assessment cleared",
          "South-facing orientation confirmed",
        ],
      },
      {
        title: "⚡ Electrical Requirements",
        items: [
          "Existing electrical meter must support net metering",
          "Main distribution board accessible for solar feed-in connection",
          "Adequate load capacity for the proposed system size",
          "Inverter installation space required (indoor, ventilated)",
        ],
        checklist: [
          "Meter board access confirmed",
          "Net metering eligibility checked with DISCOM",
          "Inverter wall space identified",
          "Earth continuity tested",
        ],
      },
      {
        title: "📄 Net Metering & Documentation",
        items: [
          "DISCOM application for net metering (we handle this)",
          "Sanctioned electrical load documentation required",
          "Property ownership or lease agreement needed",
          "No-objection certificate for rented properties",
        ],
        checklist: [
          "DISCOM application submitted",
          "Sanctioned load documents ready",
          "Property documents submitted",
          "Electricity bill copy provided",
        ],
      },
    ],

    process: [
      { step: "01", title: "Site Assessment",  description: "We visit and assess your roof, energy consumption, and grid connection." },
      { step: "02", title: "Custom Design",    description: "Our engineers design the optimal system size and layout for your property." },
      { step: "03", title: "Installation",     description: "Certified technicians install the complete system in 1–2 days." },
      { step: "04", title: "Commissioning",    description: "System testing, grid synchronization, and net metering application." },
      { step: "05", title: "Monitoring",       description: "24/7 remote monitoring and annual maintenance included." },
    ],

    testimonials: [
      { name: "Rajesh Mohanty",  location: "Bhubaneswar", rating: 5, text: "Installed a 10kW system on our factory. ROI achieved in 4 years. Excellent team — professional from assessment to commissioning." },
      { name: "Priya Nanda",     location: "Cuttack",     rating: 5, text: "Our electricity bill dropped from ₹8,000 to ₹400 per month. Unbelievable savings. The monitoring app shows real-time generation." },
      { name: "Suresh Pattnaik", location: "Puri",        rating: 5, text: "Professional installation, clean workmanship. The team was on time and finished our 5kW system in a single day." },
    ],

    ctaHeading: "Ready to Go Solar?",
    ctaSubtext: "Get a free site assessment — no obligation, no pressure.",
    ctaPrimary:   { label: "Book Free Assessment", href: "/contact" },
    ctaSecondary: { label: "Call Us Now",          href: "tel:+919876543210" },

    metaTitle:       "Solar Rooftop Installation in Odisha | Soumyasi Power",
    metaDescription: "Professional solar rooftop installation across Odisha. Residential, commercial, and industrial solar systems with 25-year warranty and MNRE certification.",
  },

  {
    slug: "ev-charging",
    title: "EV Charging Station Installation",
    shortTitle: "EV Charging",
    tagline: "Install a revenue-generating EV charging station at your location",
    description:
      "We handle everything — site assessment, electrical setup, installation, and ongoing support. Our Ultra 60 DC fast chargers serve Bhubaneswar, Cuttack, Puri, and growing.",
    heroImage: "/soumyasi/ev-charger-ultra60.png",
    accentColor: "emerald",
    icon: "Zap",
    category: "⚡ EV Charging",

    eyebrow: "EV CHARGING SOLUTIONS",
    heroHeading: "Install an EV Charging Station at Your Location",
    heroGoldWords: ["EV", "Charging", "Station"],
    heroSubtext:
      "We handle everything — site assessment, electrical setup, installation, and ongoing support. Your customers charge up, you earn revenue.",
    heroCTAPrimary:   { label: "Request Site Assessment", href: "/contact" },
    heroCTASecondary: { label: "Download Checklist",      href: "/contact?ref=checklist" },

    benefits: [
      { icon: "BadgeDollarSign", title: "Revenue Stream",          description: "Earn per kWh charged. Turn your parking lot into a profit centre with zero effort." },
      { icon: "Users",           title: "Customer Attraction",     description: "EV owners specifically seek out charging-friendly locations. Keep them longer, spend more." },
      { icon: "TrendingUp",      title: "Future Ready",            description: "EV adoption in India is doubling every year. Get ahead of the curve now." },
      { icon: "Award",           title: "Government Incentives",   description: "FAME II subsidies and Odisha state incentives available for eligible installations." },
    ],

    product: {
      eyebrow: "FLAGSHIP PRODUCT",
      heading: "Ultra 60 Thunder Charge",
      description:
        "Our most deployed charging unit — built for Indian conditions, certified for commercial use, and designed for minimal maintenance. Charges most EVs in under 30 minutes.",
      image: "/soumyasi/ev-charger-ultra60.png",
      specs: [
        { label: "60kW Output",  value: "DC Fast"       },
        { label: "Dual Connector", value: "CCS2 + CHAdeMO" },
        { label: "Touchscreen",  value: "7\" Display"   },
        { label: "RFID Access",  value: "Smart Card"    },
        { label: "IP65 Rated",   value: "Weatherproof"  },
        { label: "CMVR Cert.",   value: "India Approved" },
      ],
    },

    requirements: [
      {
        title: "📍 Location & Mounting",
        items: [
          "Select a dry, well-ventilated location away from dust and heat",
          "Allow clearance on both sides for ventilation",
          "Front must remain unobstructed for serviceability",
          "Install on non-combustible surface (concrete, stone, brick, or steel)",
          "Ground mounted or plinth mounting available",
          "Covered space/canopy recommended",
        ],
        checklist: [
          "Concrete base ready as per Soumyasi Power drawing",
          "Anchor bolts installed and extending above concrete",
          "Shed/canopy installed",
          "Clearance around concrete base confirmed",
        ],
      },
      {
        title: "⚡ Electrical & Wiring",
        items: [
          "3-Phase supply: L1, L2, L3, Neutral, Earth",
          "Voltage: 415V ±10%, 50Hz",
          "Current rating: 275A continuous (up to 365A peak)",
          "Transformer: 250 KVA recommended (400 KVA for 180kW)",
          "Cable: 3.5-core 400 sqmm Aluminium PVC armoured OR 3.5-core 240 sqmm Copper PVC armoured",
        ],
        checklist: [
          "Transformer supports required KVA",
          "3-phase voltages verified (415V ±10%)",
          "Input breaker capacity ≥500A",
          "Correct cable sizing installed",
        ],
      },
      {
        title: "🌍 Earthing Requirements",
        items: [
          "Two earth pits required",
          "30×10mm tinned copper bus bars for 180kW chargers",
          "Neutral to Earth voltage must be less than 2V",
          "Two M10 mounting bolts provided for earthing connection",
        ],
        checklist: [
          "Two earth pits available",
          "Earth bus bars: 30×10mm tinned copper installed",
          "Neutral-Earth voltage < 2V verified",
        ],
      },
      {
        title: "📶 Internet Connectivity",
        items: [
          "Required for OCPP communication and remote monitoring",
          "Options: 4G SIM (good signal, not M2M), Wi-Fi (100 Mbps recommended), LAN (Cat6)",
          "Do NOT use M2M SIM cards — limited connectivity",
        ],
        checklist: [],
      },
      {
        title: "🏗️ Safety & Infrastructure",
        items: [
          "Shelter/shed to protect charger and users from weather",
          "Safety pipe bollards around charger to prevent vehicle collision",
          "Adequate LED lighting for night usage",
          "Fire suppression system as per local regulations",
        ],
        checklist: [],
      },
    ],

    process: [
      { step: "01", title: "Site Survey",       description: "We visit and assess electrical capacity, location suitability, and connectivity." },
      { step: "02", title: "Technical Design",  description: "Custom electrical drawing provided by Soumyasi Power engineering team." },
      { step: "03", title: "Site Preparation",  description: "Customer prepares civil work per our drawing (concrete base, earthing, cabling)." },
      { step: "04", title: "Installation",      description: "Our certified technicians install and commission the charger on-site." },
      { step: "05", title: "Go Live",           description: "OCPP activation, payment gateway setup, and handover with staff training." },
    ],

    testimonials: [
      { name: "Deepak Rath",    location: "Cuttack Mall",   rating: 5, text: "The charging station at our mall has been running flawlessly for 18 months. Reliable hardware, smart access, zero downtime." },
      { name: "Ananya Das",     location: "Bhubaneswar",    rating: 5, text: "Soumyasi handled everything — from the electrical design to OCPP setup. We went live in under 3 weeks from site survey." },
      { name: "Bibhuti Nayak", location: "Puri",            rating: 5, text: "Our hotel guests love the charging facility. Excellent ROI — the station paid for itself in 14 months of operation." },
    ],

    ctaHeading: "Ready to Install an EV Charging Station?",
    ctaSubtext: "Contact us today for a free site assessment. We handle the technical design, installation, and commissioning.",
    ctaPrimary:   { label: "Request Free Assessment", href: "/contact" },
    ctaSecondary: { label: "Call Us Now",             href: "tel:+919876543210" },

    metaTitle:       "EV Charging Station Installation in Odisha | Soumyasi Power",
    metaDescription: "Install a 60kW DC fast EV charging station at your property. Soumyasi Power handles site assessment, electrical design, installation, and support across Odisha.",
  },

  {
    slug: "wind-power",
    title: "Wind Power Plant",
    shortTitle: "Wind Power",
    tagline: "Harnessing coastal winds for reliable renewable energy",
    description:
      "From small turbines to utility-scale wind farms, Soumyasi Power plans, installs, and maintains wind energy systems across Odisha's coastal and inland wind corridors.",
    heroImage: "/soumyasi/wind-power-plant.png",
    accentColor: "blue",
    icon: "Wind",
    category: "💨 Wind Power",

    eyebrow: "WIND POWER SOLUTIONS",
    heroHeading: "Powering Odisha with Coastal Wind Energy",
    heroGoldWords: ["Coastal", "Wind", "Energy"],
    heroSubtext:
      "Harnessing Odisha's coastal and inland wind corridors to generate reliable, renewable power. From small turbines to utility-scale wind farms — we plan, install, and maintain.",
    heroCTAPrimary:   { label: "Get Wind Assessment", href: "/contact" },
    heroCTASecondary: { label: "View Projects",       href: "/projects" },

    benefits: [
      { icon: "Wind",       title: "Consistent Power",    description: "Odisha's coastal winds provide reliable generation year-round, complementing solar for 24/7 clean power." },
      { icon: "BarChart3",  title: "Large Scale Output",  description: "Wind turbines generate megawatts of power — ideal for industrial consumers and utilities." },
      { icon: "Wrench",     title: "Low Maintenance",     description: "Modern turbines run for 20+ years with minimal maintenance. Remote monitoring included." },
      { icon: "Leaf",       title: "Carbon Credits",      description: "Wind energy projects qualify for carbon credits and renewable energy certificates (RECs) in India." },
    ],

    product: {
      eyebrow: "WIND TURBINE SPECIFICATIONS",
      heading: "Industrial Wind Turbines",
      description:
        "We source and install wind turbines from certified manufacturers suited for Odisha's coastal and semi-arid wind profiles. Each installation is site-optimised for maximum annual energy production.",
      image: "/soumyasi/wind-power-plant.png",
      specs: [
        { label: "Capacity",     value: "250kW–2MW"  },
        { label: "Hub Height",   value: "60m–120m"   },
        { label: "Rotor Dia.",   value: "40m–100m"   },
        { label: "Cut-in Speed", value: "3.5 m/s"    },
        { label: "Rated Speed",  value: "12–14 m/s"  },
        { label: "Design Life",  value: "20+ Years"  },
      ],
    },

    requirements: [
      {
        title: "🌬️ Wind Resource Assessment",
        items: [
          "Minimum average wind speed of 5.0 m/s at hub height required",
          "Wind data collected for minimum 12 months (ideally 3 years)",
          "Turbulence intensity assessment for site suitability",
          "Wind rose analysis to determine dominant wind direction",
          "Wake effect analysis for multi-turbine projects",
        ],
        checklist: [
          "Wind mast erected and data logger installed",
          "Minimum 12 months of wind data collected",
          "Wind resource report from certified agency",
          "Annual Energy Production (AEP) estimate completed",
        ],
      },
      {
        title: "🏔️ Land & Civil Requirements",
        items: [
          "Minimum 1 acre per turbine for access and safety exclusion zone",
          "Land free from protected forest and wildlife sanctuary boundaries",
          "Road access for heavy transport (cranes and turbine components)",
          "Soil bearing capacity assessment for turbine foundation design",
          "Proximity to grid substation (within 5–10 km preferred)",
        ],
        checklist: [
          "Land title documents verified",
          "Geotechnical (soil) survey completed",
          "Access road feasibility confirmed",
          "Grid proximity checked with DISCOM",
        ],
      },
      {
        title: "🔌 Grid Connectivity",
        items: [
          "Application to OPTCL/DISCOM for grid connectivity",
          "Load flow study required for projects above 1MW",
          "Dedicated feeder or substation bay may be required",
          "Power Evacuation Agreement (PEA) with utility mandatory",
          "SCADA integration for grid control compliance",
        ],
        checklist: [
          "Grid connectivity application submitted",
          "Feasibility study report received from DISCOM",
          "Power Purchase Agreement (PPA) negotiated",
          "SCADA system specifications agreed",
        ],
      },
      {
        title: "📋 Clearances & Compliance",
        items: [
          "Environmental clearance from Odisha SPCB for projects > 5MW",
          "Aviation clearance from AAI if within airport proximity zone",
          "Forest clearance if land involves reserved forest area",
          "OREDA (Odisha Renewable Energy Development Agency) registration",
        ],
        checklist: [
          "Environmental clearance obtained",
          "OREDA registration submitted",
          "AAI no-objection received (if required)",
          "All statutory approvals in place",
        ],
      },
    ],

    process: [
      { step: "01", title: "Wind Study",     description: "Wind mast installation and 12-month resource assessment to validate site potential." },
      { step: "02", title: "System Design",  description: "Turbine selection, layout optimisation, foundation design, and grid connectivity planning." },
      { step: "03", title: "Civil Work",     description: "Foundation construction, access roads, and substation infrastructure." },
      { step: "04", title: "Turbine Install", description: "Crane-assisted erection of tower, nacelle, and rotor by certified technicians." },
      { step: "05", title: "Grid Connect",   description: "Commissioning, SCADA integration, grid synchronisation, and performance handover." },
    ],

    testimonials: [
      { name: "Prakash Behera",   location: "Kendrapara, Odisha", rating: 5, text: "Soumyasi Power completed our 1.5MW wind installation ahead of schedule. They managed every clearance and handled the DISCOM coordination seamlessly." },
      { name: "Industrial Co-op", location: "Ganjam District",    rating: 5, text: "Their wind resource assessment was thorough and accurate. Actual generation has matched the AEP estimate within 3% — impressive engineering." },
      { name: "Manas Pradhan",    location: "Puri Coast",          rating: 5, text: "The O&M team is responsive and the remote monitoring dashboard gives us complete visibility. Zero unplanned downtime in 18 months." },
    ],

    ctaHeading: "Ready to Harness the Wind?",
    ctaSubtext: "Get a free wind resource consultation and site assessment for your project.",
    ctaPrimary:   { label: "Get Wind Assessment", href: "/contact" },
    ctaSecondary: { label: "Call Us Now",         href: "tel:+919876543210" },

    metaTitle:       "Wind Power Plant Installation in Odisha | Soumyasi Power",
    metaDescription: "Wind turbine installation and wind farm development in Odisha. Site assessment, design, civil work, and grid connection for 250kW to 2MW+ wind projects.",
  },

  {
    slug: "industrial-power",
    title: "Industrial Power Supply",
    shortTitle: "Industrial Power",
    tagline: "Complete electrical infrastructure for factories and commercial complexes",
    description:
      "Complete electrical infrastructure for factories, plants, and commercial complexes. Switchgear, transformers, substations, and 24/7 power management — engineered for zero downtime.",
    heroImage: "/soumyasi/industrial-power.png",
    accentColor: "orange",
    icon: "Factory",
    category: "🏭 Industrial",

    eyebrow: "INDUSTRIAL POWER SOLUTIONS",
    heroHeading: "Engineered for Zero Downtime Industrial Power",
    heroGoldWords: ["Zero", "Downtime"],
    heroSubtext:
      "Complete electrical infrastructure for factories, plants, and commercial complexes. Switchgear, transformers, substations, and 24/7 power management — built to last.",
    heroCTAPrimary:   { label: "Get Power Audit",  href: "/contact" },
    heroCTASecondary: { label: "View Projects",    href: "/projects" },

    benefits: [
      { icon: "ShieldCheck", title: "Zero Downtime Design",  description: "Redundant systems, automatic changeover, and UPS integration ensure 99.9% uptime for critical loads." },
      { icon: "Cpu",         title: "Custom Engineering",    description: "Every system is designed from a load analysis — no cookie-cutter solutions for industrial power." },
      { icon: "Users",       title: "Certified Engineers",   description: "All installations are carried out by IE Act licensed electrical supervisors and contractors." },
      { icon: "FileCheck",   title: "Full Compliance",       description: "CEIG approval, DISCOM clearances, and BIS-compliant equipment throughout." },
    ],

    product: {
      eyebrow: "INDUSTRIAL SYSTEMS",
      heading: "Substation & Switchgear Package",
      description:
        "We supply, install, and commission complete HT/LT substations with modern digital protection relays. Equipment sourced from ABB, Siemens, Havells, and Schneider Electric for reliability you can count on.",
      image: "/soumyasi/industrial-power.png",
      specs: [
        { label: "Transformer",  value: "25 KVA–10 MVA" },
        { label: "HT Switchgear", value: "11kV / 33kV"  },
        { label: "LT Panel",     value: "Up to 6300A"   },
        { label: "Protection",   value: "Digital Relay"  },
        { label: "Metering",     value: "ABT / AMI"     },
        { label: "Standard",     value: "IEC 62271"     },
      ],
    },

    requirements: [
      {
        title: "🔢 Load Analysis",
        items: [
          "Single line diagram (SLD) of proposed electrical system required",
          "Connected load list: all motors, lighting, HVAC, and process loads",
          "Demand factor and diversity factor to be established",
          "Future expansion load to be factored into design",
          "Power factor requirement: minimum 0.95 lagging at utility metering point",
        ],
        checklist: [
          "Equipment list with kW rating provided",
          "SLD draft reviewed with our team",
          "Future load expansion plan discussed",
          "Power factor target agreed (≥0.95)",
        ],
      },
      {
        title: "🏗️ Space & Civil Requirements",
        items: [
          "HT yard space: minimum 10m × 8m for 11kV substation",
          "Transformer plinth with oil containment pit as per IS 1886",
          "LT switch room: minimum 4m height clearance",
          "Dedicated cable trenches from HT yard to main LT panel",
          "Ventilation and lighting as per IE rules",
        ],
        checklist: [
          "Substation plot boundary marked",
          "Civil drawings reviewed and approved",
          "Transformer plinth and oil pit constructed",
          "Cable trench routing finalised",
        ],
      },
      {
        title: "🔌 Utility & Approvals",
        items: [
          "HT connection application to DISCOM (33kV or 11kV)",
          "CEIG approval required for HT substation commissioning",
          "Chief Electrical Inspector (CEI) inspection before energisation",
          "IE Act licence for electrical supervisory staff",
        ],
        checklist: [
          "DISCOM HT connection application submitted",
          "CEIG approval drawing set submitted",
          "CEI inspection scheduled",
          "Security deposit paid to utility",
        ],
      },
    ],

    process: [
      { step: "01", title: "Load Analysis",     description: "Detailed assessment of connected load, demand, power factor, and future expansion requirements." },
      { step: "02", title: "System Design",     description: "SLD preparation, equipment sizing, protection relay coordination, and cable sizing." },
      { step: "03", title: "Equipment Supply",  description: "Procurement of transformers, switchgear, cables, and protection panels from approved vendors." },
      { step: "04", title: "Installation",      description: "Civil work, equipment erection, cabling, earthing, and protection relay programming." },
      { step: "05", title: "Testing & Handover", description: "CEIG inspection, load testing, protection relay commissioning, and staff training." },
    ],

    testimonials: [
      { name: "Sunita Mishra",    location: "Industrial Estate, Bhubaneswar", rating: 5, text: "Their team upgraded our entire 33kV substation. Professional execution, on-time delivery, and excellent post-install support." },
      { name: "Arvind Senapati",  location: "Steel Plant, Angul",            rating: 5, text: "The entire 6.6kV HT distribution system for our plant was designed and commissioned by Soumyasi. Zero RFIs, zero punch items. Outstanding quality." },
      { name: "Kishore Panda",    location: "Textile Mill, Cuttack",         rating: 5, text: "We had chronic power quality issues — harmonics, voltage dips. Soumyasi diagnosed and fixed everything. Production downtime is now essentially zero." },
    ],

    ctaHeading: "Ready to Power Your Facility?",
    ctaSubtext: "Book a load analysis consultation — free of charge, no obligation.",
    ctaPrimary:   { label: "Book Free Audit", href: "/contact" },
    ctaSecondary: { label: "Call Us Now",     href: "tel:+919876543210" },

    metaTitle:       "Industrial Power Supply & Substation in Odisha | Soumyasi Power",
    metaDescription: "Complete industrial electrical infrastructure — HT/LT substations, switchgear, transformers, and power distribution for factories and commercial complexes in Odisha.",
  },
];
