const PHONE_HREF = "tel:+919876543210";

export const SOLUTIONS = [
  // ──────────────────────────────────────────────────────────────
  // SOLAR ROOFTOP
  // ──────────────────────────────────────────────────────────────
  {
    slug:        "solar-rooftop",
    title:       "Solar Rooftop Installation",
    shortTitle:  "Solar Energy",
    tagline:     "Clean energy for every rooftop in Odisha",
    description: "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Backed by 25-year performance warranties and MNRE-certified installation.",
    heroImage:   "/soumyasi/solar-field-odisha.png",
    accentColor: "amber",
    icon:        "Sun",
    category:    "☀️ Solar",

    eyebrow:         "SOLAR ROOFTOP SOLUTIONS",
    heroHeading:     "Power Your Property with Solar Energy",
    heroGoldWords:   ["Solar", "Energy"],
    heroSubtext:     "We design and install rooftop and ground-mount solar systems for homes, businesses, and industries across Odisha. Cut your electricity bill by up to 90%.",
    heroCTAPrimary:  { label: "Get Free Assessment", href: "/contact" },
    heroCTASecondary:{ label: "View Projects",       href: "/projects" },
    heroStats:       ["500+ Installs", "25yr Warranty", "MNRE Certified"],

    benefits: [
      { icon: "TrendingDown", title: "Cut Bills by 90%",    description: "Most customers eliminate their electricity bill entirely within the first year of installation." },
      { icon: "Shield",       title: "25-Year Warranty",    description: "All panels carry a 25-year performance guarantee backed by tier-1 manufacturers." },
      { icon: "Clock",        title: "1-2 Day Install",     description: "Most residential rooftop systems are fully installed and commissioned within 1-2 days." },
      { icon: "Leaf",         title: "Zero Carbon",         description: "Generate 100% clean energy and reduce your household carbon footprint significantly." },
    ],

    product: {
      eyebrow:     "OUR TECHNOLOGY",
      heading:     "Monocrystalline Solar Panels",
      description: "We use only tier-1 monocrystalline panels — the most efficient solar technology available, engineered to perform in Odisha's tropical climate for 25+ years.",
      image:       "/soumyasi/solar-field-odisha.png",
      specs: [
        { label: "Efficiency",    value: "Up to 22%" },
        { label: "Warranty",      value: "25 Years"   },
        { label: "Weather Rating",value: "IP67"       },
        { label: "Certification", value: "MNRE India" },
        { label: "Cell Type",     value: "Monocrystalline" },
        { label: "Output Range",  value: "400W – 550W"},
      ],
    },

    requirements: [
      {
        title: "🏠 Roof Requirements",
        items: [
          "South or west-facing roof preferred",
          "Minimum 100 sq ft shadow-free area",
          "Roof age under 15 years recommended",
          "Load-bearing capacity assessed before install",
        ],
        checklist: [
          "Roof orientation confirmed",
          "Shadow-free area measured",
          "Structural assessment cleared",
          "Roof age verified",
        ],
      },
      {
        title: "⚡ Electrical Requirements",
        items: [
          "Existing meter board accessible",
          "Main switch capacity ≥ 32A",
          "Earthing connection available",
          "Net metering compatible meter",
        ],
        checklist: [
          "Meter board location confirmed",
          "Main switch capacity verified",
          "Earthing checked",
          "DISCOM net metering application ready",
        ],
      },
      {
        title: "📋 Documentation",
        items: [
          "Electricity bill (last 3 months)",
          "Property ownership documents",
          "DISCOM application for net metering",
          "Building permission if applicable",
        ],
        checklist: [
          "Electricity bills provided",
          "Property documents ready",
          "Net metering application filed",
        ],
      },
    ],

    process: [
      { step: "01", title: "Site Assessment",      description: "We visit your property, analyse roof orientation, shading patterns, and your electricity consumption." },
      { step: "02", title: "Custom System Design", description: "Engineers design the optimal panel layout, inverter sizing, and cable routing for maximum yield." },
      { step: "03", title: "Installation",          description: "Certified technicians install mounting structure, panels, inverter, and wiring in 1-2 days." },
      { step: "04", title: "Grid Commissioning",   description: "System connected to grid, net meter installed, and DISCOM paperwork filed on your behalf." },
      { step: "05", title: "Monitoring & Support", description: "Real-time monitoring app provided. Annual maintenance visits and dedicated helpline included." },
    ],
    processTimings: ["Day 1", "Day 1", "Day 2", "Week 2", "Ongoing"],

    testimonialsIntro: "What our solar customers say",
    testimonials: [
      { name: "Amit Sahu",    location: "Bhubaneswar", rating: 5, text: "Installed a 10kW system on our factory roof. Electricity bill dropped from ₹45,000 to ₹4,000 per month. ROI achieved in under 4 years." },
      { name: "Sunita Mishra",location: "Cuttack",     rating: 5, text: "Our home system has been running for 2 years without a single issue. The monitoring app shows real-time generation — very satisfying!" },
      { name: "Deepak Rath",  location: "Puri",        rating: 5, text: "Professional team, clean installation, zero disruption. They even handled all the DISCOM paperwork. Highly recommended." },
    ],

    ctaHeading:  "Ready to Go Solar?",
    ctaSubtext:  "Get a free rooftop assessment — we'll calculate your exact savings before you commit to anything.",
    ctaPrimary:  { label: "Get Free Assessment", href: "/contact" },
    ctaSecondary:{ label: "Call Us Now",          href: PHONE_HREF },

    metaTitle:       "Solar Rooftop Installation Odisha | Soumyashi Power",
    metaDescription: "Professional solar rooftop installation across Odisha. Homes, businesses, and industries. 25-year warranty, MNRE certified, net metering support.",
  },

  // ──────────────────────────────────────────────────────────────
  // EV CHARGING
  // ──────────────────────────────────────────────────────────────
  {
    slug:        "ev-charging",
    title:       "EV Charging Infrastructure",
    shortTitle:  "EV Charging",
    tagline:     "Powering Odisha's electric vehicle revolution",
    description: "We supply, install, and maintain commercial EV charging stations across Odisha. Turn your parking into a revenue-generating charging hub.",
    heroImage:   "/soumyasi/ev-charger-ultra60.png",
    accentColor: "emerald",
    icon:        "Zap",
    category:    "⚡ EV Charging",

    eyebrow:         "EV CHARGING INFRASTRUCTURE",
    heroHeading:     "Install an EV Charging Station at Your Location",
    heroGoldWords:   ["EV", "Charging"],
    heroSubtext:     "We supply, install, and maintain commercial EV charging stations across Odisha. Turn your parking into a revenue-generating charging hub.",
    heroCTAPrimary:  { label: "Get Free Assessment", href: "/contact" },
    heroCTASecondary:{ label: "View Projects",       href: "/projects" },
    heroStats:       ["60kW Output", "Dual Connector", "CMVR Certified"],

    benefits: [
      { icon: "DollarSign", title: "Generate Revenue",        description: "Earn per kWh charged. A single 60kW station can generate ₹8,000–₹15,000 per month in active locations." },
      { icon: "Users",      title: "Attract EV Customers",    description: "EV drivers specifically choose locations with chargers. Increase dwell time and spend at your business." },
      { icon: "TrendingUp", title: "EV Market Growing Fast",  description: "India sold 1.7 million EVs in 2023. Getting your station live now captures the wave early." },
      { icon: "Award",      title: "FAME II Eligible",         description: "Government subsidies available for eligible commercial charging infrastructure under FAME II scheme." },
    ],

    product: {
      eyebrow:     "FLAGSHIP PRODUCT",
      heading:     "Ultra 60 Thunder Charge",
      description: "Our 60kW DC fast charger — built for Indian commercial conditions. Dual connector, smart RFID, weatherproof, and CMVR certified for highway and urban deployment.",
      image:       "/soumyasi/ev-charger-ultra60.png",
      specs: [
        { label: "Power Output",  value: "60kW DC"          },
        { label: "Connectors",    value: "Dual (CCS2 + CHAdeMO)" },
        { label: "Display",       value: "7\" Touchscreen"   },
        { label: "Access",        value: "RFID + App"        },
        { label: "Weather Rating",value: "IP65"              },
        { label: "Certification", value: "CMVR India"        },
      ],
    },

    requirements: [
      {
        title: "📍 Location & Mounting",
        items: [
          "Dry, well-ventilated location away from heat and dust",
          "Clearance on both sides for ventilation",
          "Front unobstructed for serviceability",
          "Non-combustible surface — concrete, stone, brick, or steel",
          "Shed or canopy recommended for weather protection",
        ],
        checklist: [
          "Concrete base ready per Soumyashi Power drawing",
          "Anchor bolts installed and extending above concrete",
          "Shed/canopy installed",
          "Clearance around base confirmed",
        ],
      },
      {
        title: "⚡ Electrical & Wiring",
        items: [
          "3-Phase supply: L1, L2, L3, Neutral, Earth",
          "Voltage: 415V ±10%, 50Hz",
          "Current: 275A continuous (365A peak)",
          "Transformer: 250 KVA minimum recommended",
          "Cable: 3.5-core 400 sqmm Aluminium OR 240 sqmm Copper armoured",
        ],
        checklist: [
          "Transformer KVA confirmed",
          "3-phase voltages verified",
          "Input breaker ≥500A installed",
          "Correct cable sizing confirmed",
        ],
      },
      {
        title: "🌍 Earthing Requirements",
        items: [
          "Two earth pits required",
          "30×10mm tinned copper bus bars for earthing",
          "Neutral-to-Earth voltage must be <2V",
          "Two M10 mounting bolts provided for earthing connection",
        ],
        checklist: [
          "Two earth pits available",
          "Copper bus bars installed",
          "N-E voltage measured <2V",
        ],
      },
      {
        title: "📶 Internet Connectivity",
        items: [
          "4G SIM with good signal strength (not M2M SIM)",
          "OR Wi-Fi with 100 Mbps minimum, line-of-sight to charger",
          "OR LAN with Cat6 cabling and surge protection",
          "Stable connection required for OCPP and remote monitoring",
        ],
        checklist: [
          "Connectivity type selected",
          "Signal strength verified",
          "Router/SIM installed and tested",
        ],
      },
      {
        title: "🏗️ Safety Infrastructure",
        items: [
          "Safety pipe bollards to protect from vehicle collision",
          "Bollards brightly coloured or with reflective tape",
          "Adequate LED lighting for night usage",
          "Fire suppression system per local regulations",
        ],
        checklist: [
          "Bollards installed",
          "Lighting adequate",
          "Fire safety compliant",
        ],
      },
    ],

    process: [
      { step: "01", title: "Site Survey",         description: "We visit and assess electrical capacity, location suitability, connectivity, and civil work requirements." },
      { step: "02", title: "Technical Design",    description: "Soumyashi Power engineering team provides detailed electrical drawing and civil specification." },
      { step: "03", title: "Site Preparation",   description: "Customer completes civil work — concrete base, earthing, cabling — per our drawings." },
      { step: "04", title: "Charger Installation",description: "Our certified technicians install and commission the charging unit including OCPP setup." },
      { step: "05", title: "Go Live",             description: "Payment gateway activation, network registration, staff training, and handover documentation." },
    ],
    processTimings: ["Week 1", "Week 2", "Weeks 3-4", "Week 5", "Week 6"],

    testimonialsIntro: "From our EV charging partners",
    testimonials: [
      { name: "Rajesh Kumar", location: "Bhubaneswar", rating: 5, text: "Installed at our hotel parking. Guests love it. The charger paid for itself in 8 months from charging fees alone." },
      { name: "Priya Panda",  location: "Cuttack",     rating: 5, text: "Soumyashi handled everything — drawings, installation, even the DISCOM approval. Very professional team." },
      { name: "Vikram Nayak", location: "Rourkela",    rating: 5, text: "The Ultra 60 has been running 24/7 for 14 months without a single fault. Excellent build quality." },
    ],

    ctaHeading:  "Ready to Install an EV Charging Station?",
    ctaSubtext:  "Contact us for a free site assessment. We handle everything from survey to go-live.",
    ctaPrimary:  { label: "Get Free Assessment", href: "/contact" },
    ctaSecondary:{ label: "Call Us Now",          href: PHONE_HREF },

    metaTitle:       "EV Charging Station Installation Odisha | Soumyashi Power",
    metaDescription: "Commercial EV charging station installation across Odisha. 60kW DC fast chargers, complete site assessment and installation. CMVR certified.",
  },

  // ──────────────────────────────────────────────────────────────
  // WIND POWER
  // ──────────────────────────────────────────────────────────────
  {
    slug:        "wind-power",
    title:       "Wind Power Solutions",
    shortTitle:  "Wind Energy",
    tagline:     "Harnessing Odisha's coastal wind for clean power",
    description: "Odisha's coastline and inland corridors offer excellent wind resources. We plan, install, and maintain wind power systems for commercial and industrial use.",
    heroImage:   "/soumyasi/wind-power-plant.png",
    accentColor: "blue",
    icon:        "Wind",
    category:    "💨 Wind Power",

    eyebrow:         "WIND ENERGY SOLUTIONS",
    heroHeading:     "Harness Odisha's Wind for Clean Power",
    heroGoldWords:   ["Wind", "Power"],
    heroSubtext:     "Odisha's coastline and inland corridors offer excellent wind resources. We plan, install, and maintain wind power systems for commercial and industrial use.",
    heroCTAPrimary:  { label: "Get Site Assessment", href: "/contact" },
    heroCTASecondary:{ label: "View Projects",       href: "/projects" },
    heroStats:       ["50kW–2MW Range", "20yr Design Life", "OPTCL Approved"],

    benefits: [
      { icon: "Wind",    title: "Consistent Generation", description: "Wind generates power round the clock — complementing solar which only produces during daylight hours." },
      { icon: "Factory", title: "Large Scale Output",    description: "Wind turbines generate significantly more power per unit than solar for large industrial consumers." },
      { icon: "Settings",title: "Low Maintenance",       description: "Modern wind turbines are engineered for 20+ years with minimal maintenance requirements." },
      { icon: "Leaf",    title: "Carbon Credits",        description: "Wind power generation qualifies for carbon credits under India's carbon trading framework." },
    ],

    product: {
      eyebrow:     "WIND TECHNOLOGY",
      heading:     "Commercial Wind Turbines",
      description: "We deploy proven horizontal-axis wind turbines optimised for Odisha's wind profile — coastal and inland sites. From 50kW community turbines to multi-MW utility installations.",
      image:       "/soumyasi/wind-power-plant.png",
      specs: [
        { label: "Capacity Range",  value: "50kW – 2MW"  },
        { label: "Hub Height",      value: "40m – 120m"   },
        { label: "Rotor Diameter",  value: "15m – 90m"    },
        { label: "Cut-in Speed",    value: "3 m/s"        },
        { label: "Rated Speed",     value: "12–14 m/s"    },
        { label: "Design Life",     value: "20+ Years"    },
      ],
    },

    requirements: [
      {
        title: "🌬️ Wind Resource",
        items: [
          "Minimum average wind speed of 5 m/s at hub height",
          "Wind resource assessment (minimum 12 months data preferred)",
          "No major obstructions within 10× rotor diameter upwind",
          "Coastal or elevated inland sites preferred in Odisha",
        ],
        checklist: [
          "Wind speed data collected",
          "Wind rose analysis completed",
          "Obstruction survey done",
          "Site shortlisted",
        ],
      },
      {
        title: "🏗️ Civil & Land",
        items: [
          "Land ownership or lease documentation",
          "Minimum 5 acres for single turbine (safety exclusion zone)",
          "Soil investigation for foundation design",
          "Access road for construction equipment and maintenance",
        ],
        checklist: [
          "Land documents verified",
          "Soil investigation completed",
          "Access route confirmed",
          "Local authority clearance obtained",
        ],
      },
      {
        title: "⚡ Grid Connection",
        items: [
          "Proximity to 33kV or 132kV grid substation",
          "Grid interconnection application to OPTCL/DISCOM",
          "Power evacuation agreement",
          "Metering arrangement for export",
        ],
        checklist: [
          "Nearest substation identified",
          "Grid interconnection applied",
          "Evacuation agreement signed",
          "Export meter type confirmed",
        ],
      },
    ],

    process: [
      { step: "01", title: "Wind Study",            description: "We conduct a detailed wind resource assessment using mast data and modelling tools for your site." },
      { step: "02", title: "Feasibility & Design",  description: "Turbine selection, layout optimisation, shadow flicker analysis, and detailed electrical design." },
      { step: "03", title: "Approvals & Civil Work",description: "We manage environmental clearances, grid application, and oversee foundation and civil construction." },
      { step: "04", title: "Turbine Installation",  description: "Crane mobilisation, tower erection, nacelle and rotor installation by certified wind technicians." },
      { step: "05", title: "Commissioning",         description: "Grid synchronisation, SCADA setup, performance testing, and handover with O&M training." },
    ],
    processTimings: ["Months 1-2", "Month 3", "Months 4-6", "Months 7-8", "Month 9"],

    testimonialsIntro: "Feedback from wind project clients",
    testimonials: [
      { name: "Suresh Patnaik", location: "Paradip",  rating: 5, text: "The wind assessment was thorough and the yield prediction was accurate within 5%. Excellent technical team." },
      { name: "Anita Behera",   location: "Gopalpur", rating: 5, text: "Our 500kW installation has been running for 3 years generating above P50 estimates consistently." },
      { name: "Manoj Das",      location: "Chilika",  rating: 5, text: "Soumyashi managed all the OPTCL approvals and grid connection. Saved us months of bureaucracy." },
    ],

    ctaHeading:  "Explore Wind Power for Your Site",
    ctaSubtext:  "Our engineers will assess your site's wind potential and design the right system for your energy needs.",
    ctaPrimary:  { label: "Get Site Assessment", href: "/contact" },
    ctaSecondary:{ label: "Call Us Now",          href: PHONE_HREF },

    metaTitle:       "Wind Power Installation Odisha | Soumyashi Power",
    metaDescription: "Commercial wind turbine installation across Odisha. Site assessment, design, installation and O&M. Coastal and inland wind energy solutions.",
  },

  // ──────────────────────────────────────────────────────────────
  // INDUSTRIAL POWER
  // ──────────────────────────────────────────────────────────────
  {
    slug:        "industrial-power",
    title:       "Industrial Power Infrastructure",
    shortTitle:  "Industrial Power",
    tagline:     "Zero-downtime power infrastructure for Odisha's industries",
    description: "Transformers, switchgear, substations, and full electrical infrastructure for factories, plants, and commercial complexes across Odisha. Engineered for zero downtime.",
    heroImage:   "/soumyasi/industrial-power.png",
    accentColor: "orange",
    icon:        "Factory",
    category:    "🏭 Industrial",

    eyebrow:         "INDUSTRIAL POWER INFRASTRUCTURE",
    heroHeading:     "Complete Power Supply for Industrial Operations",
    heroGoldWords:   ["Power", "Supply"],
    heroSubtext:     "Transformers, switchgear, substations, and full electrical infrastructure for factories, plants, and commercial complexes across Odisha. Engineered for zero downtime.",
    heroCTAPrimary:  { label: "Get Engineering Consultation", href: "/contact" },
    heroCTASecondary:{ label: "View Projects",                href: "/projects" },
    heroStats:       ["Up to 10MVA", "IE Rules Compliant", "2yr Warranty"],

    benefits: [
      { icon: "Zap",        title: "Zero Downtime Design",  description: "Redundant systems and automatic changeover ensure your operations never stop due to power failure." },
      { icon: "Settings",   title: "Custom Engineered",     description: "Every system is designed specifically for your load profile, expansion plans, and compliance requirements." },
      { icon: "Award",      title: "Certified Engineers",   description: "All designs are stamped by licensed electrical engineers and comply with IE Rules and NBC standards." },
      { icon: "Headphones", title: "24/7 Support",          description: "Round-the-clock emergency response team for critical industrial power infrastructure." },
    ],

    product: {
      eyebrow:     "POWER INFRASTRUCTURE",
      heading:     "End-to-End Industrial Electrical Systems",
      description: "From 11kV receiving substations to LT distribution boards — we design, supply, install, and commission complete electrical infrastructure for industrial and commercial facilities.",
      image:       "/soumyasi/industrial-power.png",
      specs: [
        { label: "Transformer",   value: "Up to 10 MVA"  },
        { label: "Voltage Levels",value: "11kV / 33kV / LT" },
        { label: "Switchgear",    value: "VCB / ACB / MCCB" },
        { label: "Protection",    value: "Relay & SCADA"  },
        { label: "Standards",     value: "IE Rules / NBC" },
        { label: "Warranty",      value: "2 Years"        },
      ],
    },

    requirements: [
      {
        title: "📊 Load Analysis",
        items: [
          "Complete equipment list with ratings",
          "Demand factor and diversity factor data",
          "Future expansion load estimates",
          "Power quality requirements (harmonics, PF)",
        ],
        checklist: [
          "Equipment list provided",
          "Load schedule prepared",
          "Expansion plans documented",
          "Power quality spec agreed",
        ],
      },
      {
        title: "🏗️ Civil & Space",
        items: [
          "Dedicated electrical room or substation yard",
          "Minimum clearances as per IE Rules",
          "Cable trench routes identified",
          "Transformer oil soak pit provision",
        ],
        checklist: [
          "Electrical room dimensions confirmed",
          "Clearances verified",
          "Cable routes mapped",
          "Oil containment planned",
        ],
      },
      {
        title: "⚡ Utility Connection",
        items: [
          "Utility (SOUTHCO/NESCO/WESCO/CESU) service agreement",
          "Sanction letter for required load",
          "Metering type: TOD/TOU as applicable",
          "HT/LT connection type confirmed",
        ],
        checklist: [
          "Utility sanction obtained",
          "Metering type confirmed",
          "Connection agreement signed",
          "Inspection schedule agreed",
        ],
      },
    ],

    process: [
      { step: "01", title: "Load Analysis",             description: "Detailed load schedule, demand calculations, and power quality study for your facility." },
      { step: "02", title: "System Design",             description: "Single line diagram, equipment specifications, cable sizing, protection coordination, and layout drawings." },
      { step: "03", title: "Equipment Supply",          description: "Procurement of transformers, switchgear, panels, cables, and accessories from approved vendors." },
      { step: "04", title: "Installation & Testing",    description: "Installation by certified electricians, followed by SAT (Site Acceptance Testing) for all equipment." },
      { step: "05", title: "Commissioning & Handover",  description: "Live commissioning with utility, as-built drawings, O&M manuals, and staff training." },
    ],
    processTimings: ["Week 1", "Week 2", "Weeks 3-6", "Weeks 7-8", "Week 9"],

    testimonialsIntro: "Trusted by industrial clients across Odisha",
    testimonials: [
      { name: "Prakash Mohanty", location: "Kalinganagar", rating: 5, text: "Soumyashi designed and installed our entire 2MVA substation. On time, within budget, zero punch items at handover." },
      { name: "Ritu Nanda",      location: "Paradeep",     rating: 5, text: "Their protection relay settings and SCADA integration work was first class. The system has been fault-free for 18 months." },
      { name: "Arun Kumar",      location: "Jharsuguda",   rating: 5, text: "They handled everything including SOUTHCO approvals. Excellent project management and very responsive team." },
    ],

    ctaHeading:  "Power Your Industrial Facility Right",
    ctaSubtext:  "Talk to our engineers about your electrical infrastructure requirements. We'll design the right solution for your operations.",
    ctaPrimary:  { label: "Get Engineering Consultation", href: "/contact" },
    ctaSecondary:{ label: "Call Us Now",                   href: PHONE_HREF },

    metaTitle:       "Industrial Power Supply Solutions Odisha | Soumyashi Power",
    metaDescription: "Complete industrial electrical infrastructure — transformers, switchgear, substations for factories and commercial complexes across Odisha.",
  },
];
