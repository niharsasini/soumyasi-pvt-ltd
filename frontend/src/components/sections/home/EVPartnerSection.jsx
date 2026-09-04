"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap, Check, Phone, PhoneCall, MapPin, FileText, Wrench, MessageCircle,
  CheckCircle, Loader2, User, Mail, Building2, Map, Building, Maximize2,
  MessageSquare, Shield, ChevronDown, X, File as FileIcon, AlertCircle, ArrowRight,
} from "lucide-react";
import { useScrollReveal, VARIANTS } from "@/lib/hooks/useScrollReveal";
import { CONTACT } from "@/lib/config/site.config";
import { STATS as SITE_STATS } from "@/lib/config/stats.config";
import FormFallback, { FORM_ERROR_MESSAGE } from "@/components/forms/FormFallback";

/* ── Data ───────────────────────────────────────────────── */

const PARTNER_TYPES = [
  { icon: "🏨", title: "Hotels & Resorts", sub: "Guests charge overnight" },
  { icon: "⛽", title: "Petrol Pumps", sub: "Future-proof your station" },
  { icon: "🏬", title: "Shopping Malls", sub: "Shoppers stay longer" },
  { icon: "🛣️", title: "Highway Stops", sub: "Be the charging hub" },
  { icon: "🏢", title: "Office Complexes", sub: "Employee + visitor charging" },
  { icon: "🏭", title: "Industrial Parks", sub: "Fleet & logistics charging" },
];

const BENEFITS = [
  { title: "Complete Hardware Supply", sub: "60kW DC charger — fully supplied" },
  { title: "Full Installation", sub: "Civil, electrical, earthing — all done" },
  { title: "OCPP Network Setup", sub: "Connected to central management" },
  { title: "Payment Gateway", sub: "UPI, card, app — all configured" },
  { title: "24/7 Monitoring", sub: "Remote fault detection & support" },
  { title: "Monthly Revenue Report", sub: "Transparent earnings every month" },
];

const STATS = [
  { value: "₹8K–15K", label: "Monthly Revenue" },
  { value: "60kW", label: "Charger Output" },
  { value: `${SITE_STATS.evStations}+`, label: "Active Stations", countTo: SITE_STATS.evStations, suffix: "+" },
  { value: "6 Weeks", label: "Survey to Live" },
];

const STEPS = [
  { n: "01", icon: Phone, title: "Initial Enquiry", time: "Day 1", desc: "Call or WhatsApp us. Tell us your location." },
  { n: "02", icon: MapPin, title: "Site Survey", time: "Week 1", desc: "Our engineer assesses your space and electrical setup." },
  { n: "03", icon: FileText, title: "Agreement", time: "Week 2", desc: "Technical drawing and revenue-share agreement." },
  { n: "04", icon: Wrench, title: "Installation", time: "Week 3–5", desc: "Full setup by our certified team. Zero hassle." },
  { n: "05", icon: Zap, title: "Go Live & Earn", time: "Week 6", desc: "Charger live on network. Monthly revenue credited." },
];

/* ── Small helpers ──────────────────────────────────────── */

function CountUpStat({ to, suffix = "", active }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const start = performance.now();
    const dur = 1600;
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      setN(Math.floor((1 - Math.pow(1 - p, 3)) * to));
      if (p < 1) requestAnimationFrame(tick);
      else setN(to);
    };
    requestAnimationFrame(tick);
  }, [to, active]);
  return <>{n}{suffix}</>;
}

function WordHeading({ isInView, lines, className }) {
  return (
    <motion.h2 className={className} variants={VARIANTS.container} initial="hidden" animate={isInView ? "visible" : "hidden"}>
      {lines.map((line, li) => (
        <span key={li} className="block">
          {line.text.split(" ").map((w, i) => (
            <motion.span key={i} variants={VARIANTS.word} className={`inline-block mr-[0.25em] ${line.emerald ? "text-emerald-600" : ""}`}>
              {w}
            </motion.span>
          ))}
        </span>
      ))}
    </motion.h2>
  );
}

function StepCard({ step }) {
  const Icon = step.icon;
  return (
    <div className="bg-white rounded-2xl p-5 border border-[#e8d5b0] border-t-4 border-t-emerald-500 shadow-warm hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] transition-all duration-300 relative overflow-hidden h-full">
      <span className="absolute top-1 right-3 font-black text-5xl text-emerald-100 leading-none select-none">{step.n}</span>
      <Icon size={22} className="text-emerald-500 relative" />
      <h3 className="font-bold text-[#1a1208] text-sm mt-2 relative">{step.title}</h3>
      <p className="text-[#78614a] text-xs leading-relaxed mt-1 relative">{step.desc}</p>
      <span className="inline-block bg-emerald-50 text-emerald-700 rounded-full px-3 py-1 text-[10px] font-bold mt-3 relative">{step.time}</span>
    </div>
  );
}

/* ── Partner Enquiry Form (center column) ───────────────── */

const LOCATION_TYPE_OPTIONS = [
  { value: "hotel_resort", label: "Hotel / Resort", icon: "🏨" },
  { value: "petrol_pump", label: "Petrol Pump / CNG Station", icon: "⛽" },
  { value: "shopping_mall", label: "Shopping Mall / Complex", icon: "🏬" },
  { value: "highway_dhaba", label: "Highway Dhaba / Rest Stop", icon: "🛣️" },
  { value: "office_complex", label: "Office Complex / IT Park", icon: "🏢" },
  { value: "industrial", label: "Industrial / Factory", icon: "🏭" },
  { value: "parking_lot", label: "Parking Lot / Basement", icon: "🅿️" },
  { value: "residential", label: "Residential Complex", icon: "🏠" },
  { value: "hospital", label: "Hospital / Healthcare", icon: "🏥" },
  { value: "educational", label: "Educational Institution", icon: "🎓" },
  { value: "warehouse", label: "Warehouse / Logistics Hub", icon: "📦" },
  { value: "other", label: "Other", icon: "🔧" },
];

const MAX_FILE_BYTES = 5 * 1024 * 1024;

const sectionVariants = {
  hidden: { opacity: 0, y: 15 },
  visible: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.1 } }),
};

function SectionHeadingLabel({ children }) {
  return <h4 className="text-xs font-bold text-[#a8917a] tracking-widest uppercase mb-4">{children}</h4>;
}

/* Generic labeled input/textarea with icon, validity + error states */
function FormField({
  as = "input", icon: Icon, label, required, name, value, onChange, onBlur,
  placeholder, error, valid, shake, helper, rows, ...rest
}) {
  const Tag = as === "textarea" ? motion.textarea : motion.input;
  return (
    <div className="relative flex flex-col gap-1">
      <label htmlFor={name} className="text-[#1a1208] text-xs font-semibold mb-1">
        {label} {required && <span className="text-red-400">*</span>}
      </label>
      <div className="relative group">
        <Icon
          className={`w-4 h-4 text-[#a8917a] group-focus-within:text-emerald-500 transition absolute left-3 pointer-events-none ${
            as === "textarea" ? "top-3.5" : "top-1/2 -translate-y-1/2"
          }`}
        />
        <Tag
          whileFocus={{ scale: 1.01 }}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          rows={as === "textarea" ? rows : undefined}
          {...rest}
          className={`w-full rounded-xl border bg-white pl-10 ${valid && !error ? "pr-10" : "pr-4"} py-3 text-sm text-[#1a1208] placeholder:text-[#a8917a] focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 transition-all duration-200 min-h-[48px] ${
            as === "textarea" ? "resize-none" : ""
          } ${error ? "border-red-300 bg-red-50" : valid ? "border-emerald-300" : "border-[#e8d5b0]"} ${
            shake ? "animate-shake" : ""
          }`}
        />
        {valid && !error && (
          <CheckCircle
            className={`w-4 h-4 text-emerald-500 absolute right-3 pointer-events-none ${
              as === "textarea" ? "top-3.5" : "top-1/2 -translate-y-1/2"
            }`}
          />
        )}
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
      {helper && !error && <p className="text-[#a8917a] text-[10px] mt-1">{helper}</p>}
    </div>
  );
}

/* Custom select dropdown for Location Type */
function LocationTypeSelect({ value, onChange, onBlur, error, valid, shake }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        setOpen((wasOpen) => {
          if (wasOpen) onBlur();
          return false;
        });
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onBlur]);

  const selected = LOCATION_TYPE_OPTIONS.find((o) => o.value === value);

  return (
    <div className="relative flex flex-col gap-1" ref={wrapRef}>
      <label className="text-[#1a1208] text-xs font-semibold mb-1">
        Location Type <span className="text-red-400">*</span>
      </label>
      <div className="relative group">
        <Building2
          className={`w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none transition ${
            open ? "text-emerald-500" : "text-[#a8917a]"
          }`}
        />
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className={`w-full rounded-xl border bg-white pl-10 pr-9 py-3 min-h-[48px] text-sm text-left transition-all duration-200 focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/20 ${
            error ? "border-red-300 bg-red-50" : valid ? "border-emerald-300" : "border-[#e8d5b0]"
          } ${selected ? "text-[#1a1208]" : "text-[#a8917a]"} ${shake ? "animate-shake" : ""}`}
        >
          {selected ? `${selected.icon}  ${selected.label}` : "Select your location type"}
        </button>
        <ChevronDown
          className={`w-4 h-4 text-[#a8917a] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
        {valid && !error && !open && (
          <CheckCircle className="w-4 h-4 text-emerald-500 absolute right-9 top-1/2 -translate-y-1/2 pointer-events-none" />
        )}
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.15 }}
              className="absolute z-20 mt-1 w-full max-h-64 overflow-y-auto rounded-xl border border-[#e8d5b0] bg-white shadow-lg py-1"
            >
              {LOCATION_TYPE_OPTIONS.map((opt) => (
                <li key={opt.value}>
                  <button
                    type="button"
                    onClick={() => { onChange(opt.value); onBlur(); setOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 min-h-[44px] text-sm flex items-center gap-2 hover:bg-emerald-50 transition ${
                      opt.value === value ? "bg-emerald-50 text-emerald-700 font-semibold" : "text-[#1a1208]"
                    }`}
                  >
                    <span>{opt.icon}</span> {opt.label}
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
    </div>
  );
}

/* Custom file upload field */
function FileUploadField({ label, description, file, error, onChange, onRemove }) {
  const inputId = `file-${label.replace(/\s+/g, "-").toLowerCase()}`;
  return (
    <div className="flex flex-col gap-1">
      <label className="text-[#1a1208] text-xs font-semibold mb-1">{label}</label>
      {!file ? (
        <label
          htmlFor={inputId}
          className="border-2 border-dashed border-[#e8d5b0] rounded-xl p-3 sm:p-4 hover:border-amber-400 transition cursor-pointer flex flex-col items-center justify-center text-center gap-1 min-h-[110px]"
        >
          <FileText className="w-8 h-8 text-[#a8917a]" />
          <span className="text-[#78614a] text-sm">{description}</span>
          <span className="text-[#a8917a] text-xs">PDF, JPG, PNG up to 5MB</span>
          <input
            id={inputId}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            className="hidden"
            onChange={(e) => onChange(e.target.files?.[0] || null)}
          />
        </label>
      ) : (
        <div className="relative bg-amber-50 border-2 border-amber-300 rounded-xl p-3 sm:p-4 flex items-center gap-3 min-h-[110px]">
          <FileIcon className="w-6 h-6 text-amber-600 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            <p className="text-[#1a1208] text-sm font-medium truncate">{file.name}</p>
            <p className="text-[#a8917a] text-xs">{(file.size / 1024).toFixed(0)} KB</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            aria-label={`Remove ${label}`}
            className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-white border border-[#e8d5b0] flex items-center justify-center text-[#78614a] hover:text-red-500 hover:border-red-300 transition shadow"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
      {error && <p className="text-red-500 text-[10px] mt-1">{error}</p>}
    </div>
  );
}

const EMPTY_FIELDS = {
  name: "", phone: "", email: "", locationType: "", address: "",
  googleMapsLink: "", city: "", availableSpace: "", electricalConnection: "", message: "",
};

function validatePartnerForm(f) {
  const e = {};
  if (!f.name.trim() || f.name.trim().length < 2) e.name = "Enter your full name (min 2 characters)";
  if (f.phone.replace(/\D/g, "").length !== 10) e.phone = "Enter a valid 10-digit phone number";
  if (!f.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "Enter a valid email address";
  if (!f.locationType) e.locationType = "Please select a location type";
  if (!f.address.trim()) e.address = "Property address is required";
  if (!f.city.trim()) e.city = "City / district is required";
  if (f.googleMapsLink.trim() && !/^https?:\/\//i.test(f.googleMapsLink.trim())) {
    e.googleMapsLink = "Enter a valid link (starting with http:// or https://)";
  }
  return e;
}

function PartnerEnquiryForm() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [files, setFiles] = useState({ revenuePatta: null, revenueMap: null, landPapers: null });
  const [fileErrors, setFileErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [shakeFields, setShakeFields] = useState([]);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [refNumber, setRefNumber] = useState(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const errors = validatePartnerForm(fields);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((f) => ({ ...f, [name]: value }));
  };
  const handleBlur = (name) => setTouched((t) => ({ ...t, [name]: true }));

  const handleFileChange = (key, label, file) => {
    if (file && file.size > MAX_FILE_BYTES) {
      setFileErrors((e) => ({ ...e, [key]: `${label} is too large — max 5MB` }));
      return;
    }
    setFileErrors((e) => ({ ...e, [key]: undefined }));
    setFiles((f) => ({ ...f, [key]: file }));
  };

  const validateForm = () => {
    const errs = validatePartnerForm(fields);
    if (Object.keys(errs).length > 0) {
      setTouched((t) => ({ ...t, ...Object.fromEntries(Object.keys(errs).map((k) => [k, true])) }));
      setShakeFields(Object.keys(errs));
      setTimeout(() => setShakeFields([]), 600);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    if (!validateForm()) return;
    setStatus("loading");

    try {
      const filesUploaded = [
        files.revenuePatta ? "Revenue Patta" : "",
        files.revenueMap ? "Revenue Map" : "",
        files.landPapers ? "Land Papers" : "",
      ].filter(Boolean).join(", ") || "None";

      const payload = {
        name: fields.name,
        phone: fields.phone,
        email: fields.email,
        locationType: fields.locationType,
        address: fields.address,
        googleMapsLink: fields.googleMapsLink,
        city: fields.city,
        space: fields.availableSpace,
        electrical: fields.electricalConnection,
        message: fields.message,
        files_uploaded: filesUploaded,
      };

      const response = await fetch("/api/ev-partner", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
        setRefNumber(Math.floor(100000 + Math.random() * 900000));
      } else {
        throw new Error("ev-partner api error");
      }
    } catch {
      setStatus("error");
    }
  };

  const fieldState = (name) => ({
    error: touched[name] ? errors[name] : undefined,
    valid: touched[name] && !errors[name] && String(fields[name]).trim() !== "",
    shake: shakeFields.includes(name),
  });

  if (status === "success") {
    return (
      <div
        className="bg-emerald-50 rounded-2xl p-8 border-2 border-emerald-300 shadow-[0_20px_60px_rgba(16,185,129,0.12)] flex flex-col items-center justify-center text-center min-h-[420px]"
      >
        <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
        <h3 className="font-black text-xl text-emerald-700">Application Received!</h3>
        <p className="text-emerald-600 text-sm mt-2">We&apos;ll call you within 48 hours for a free site assessment.</p>
        <p className="text-[#a8917a] text-xs mt-3">Reference: SP-{refNumber}</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
      className="bg-white rounded-3xl p-6 sm:p-10 border border-[#e8d5b0] shadow-[0_8px_40px_rgba(120,80,20,0.10)]"
    >
      <h3 className="text-xl font-bold text-[#1a1208] mb-2">Apply as EV Partner</h3>
      <p className="text-[#78614a] text-sm mb-6">Get a free site assessment within 48 hours</p>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Section A — Personal Details */}
        <motion.div custom={0} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4">
          <SectionHeadingLabel>Personal Information</SectionHeadingLabel>
          <FormField
            icon={User} label="Full Name" required name="name" value={fields.name}
            onChange={handleChange} onBlur={() => handleBlur("name")} placeholder="Your full name"
            {...fieldState("name")}
          />
          <FormField
            icon={Phone} label="Phone Number" required name="phone" type="tel" value={fields.phone}
            onChange={handleChange} onBlur={() => handleBlur("phone")} placeholder="+91 XXXXX XXXXX"
            {...fieldState("phone")}
          />
          <FormField
            icon={Mail} label="Email Address" required name="email" type="email" value={fields.email}
            onChange={handleChange} onBlur={() => handleBlur("email")} placeholder="your@email.com"
            {...fieldState("email")}
          />
        </motion.div>

        {/* Section B — Location Details */}
        <motion.div custom={1} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 mt-6">
          <SectionHeadingLabel>Location Information</SectionHeadingLabel>
          <LocationTypeSelect
            value={fields.locationType}
            onChange={(v) => setFields((f) => ({ ...f, locationType: v }))}
            onBlur={() => handleBlur("locationType")}
            {...fieldState("locationType")}
          />
          <FormField
            icon={MapPin} label="Property Address" required name="address" value={fields.address}
            onChange={handleChange} onBlur={() => handleBlur("address")} placeholder="Street, Area, City"
            {...fieldState("address")}
          />
          <FormField
            icon={Map} label="Google Maps Link" name="googleMapsLink" type="url" value={fields.googleMapsLink}
            onChange={handleChange} onBlur={() => handleBlur("googleMapsLink")}
            placeholder="Paste your Google Maps location link"
            helper="Share your location → Open Google Maps → Long press your location → Share → Copy link"
            {...fieldState("googleMapsLink")}
          />
          <FormField
            icon={Building} label="City / District" required name="city" value={fields.city}
            onChange={handleChange} onBlur={() => handleBlur("city")} placeholder="Bhubaneswar, Cuttack, Puri..."
            {...fieldState("city")}
          />
        </motion.div>

        {/* Section C — Land Documents */}
        <motion.div custom={2} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 mt-6">
          <div>
            <SectionHeadingLabel>Land Documents</SectionHeadingLabel>
            <p className="text-[#78614a] text-xs mb-4">
              Upload relevant documents to speed up your application process. All files are secure and confidential.
            </p>
          </div>
          <FileUploadField
            label="Revenue Patta" description="Upload Revenue Patta"
            file={files.revenuePatta} error={fileErrors.revenuePatta}
            onChange={(file) => handleFileChange("revenuePatta", "Revenue Patta", file)}
            onRemove={() => setFiles((f) => ({ ...f, revenuePatta: null }))}
          />
          <FileUploadField
            label="Revenue Map" description="Upload Revenue Map / Survey Map"
            file={files.revenueMap} error={fileErrors.revenueMap}
            onChange={(file) => handleFileChange("revenueMap", "Revenue Map", file)}
            onRemove={() => setFiles((f) => ({ ...f, revenueMap: null }))}
          />
          <FileUploadField
            label="Land Papers" description="Upload Land Title / Registry Papers"
            file={files.landPapers} error={fileErrors.landPapers}
            onChange={(file) => handleFileChange("landPapers", "Land Papers", file)}
            onRemove={() => setFiles((f) => ({ ...f, landPapers: null }))}
          />
          <div className="bg-amber-50 rounded-xl p-3 flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
            <p className="text-[#78614a] text-xs">
              Your documents are encrypted and stored securely. We will never share them with third parties.
            </p>
          </div>
        </motion.div>

        {/* Section D — Additional Info */}
        <motion.div custom={3} variants={sectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true }} className="space-y-4 mt-6">
          <SectionHeadingLabel>Additional Information</SectionHeadingLabel>
          <FormField
            icon={Maximize2} label="Available Space (sq ft)" name="availableSpace" type="number"
            value={fields.availableSpace} onChange={handleChange} onBlur={() => handleBlur("availableSpace")}
            placeholder="e.g. 500" helper="Minimum 100 sq ft required for installation"
            {...fieldState("availableSpace")}
          />
          <div className="flex flex-col gap-1">
            <label className="text-[#1a1208] text-xs font-semibold mb-1">Electrical Connection Available?</label>
            <div className="flex gap-2 flex-wrap">
              {[
                { value: "yes", label: "Yes, 3-Phase Available" },
                { value: "no", label: "No / Not Sure" },
              ].map((opt) => {
                const selected = fields.electricalConnection === opt.value;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setFields((f) => ({ ...f, electricalConnection: opt.value }))}
                    className={`rounded-full px-4 py-2 min-h-[44px] text-sm font-medium border cursor-pointer transition ${
                      selected
                        ? opt.value === "yes"
                          ? "bg-emerald-500 text-white border-emerald-500"
                          : "bg-amber-500 text-white border-amber-500"
                        : "bg-white text-[#78614a] border-[#e8d5b0]"
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>
          <FormField
            as="textarea" icon={MessageSquare} label="Message / Additional Notes" name="message" rows={3}
            value={fields.message} onChange={handleChange} onBlur={() => handleBlur("message")}
            placeholder="Tell us anything else about your location, current power setup, or questions"
            {...fieldState("message")}
          />
        </motion.div>

        {hasSubmitted && status === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
            <p className="text-red-600 text-xs font-medium mb-2 flex items-center gap-1.5">
              <AlertCircle size={14} className="flex-shrink-0" /> {FORM_ERROR_MESSAGE}
            </p>
            <FormFallback />
          </div>
        )}

        <button
          type="submit"
          disabled={status === "loading"}
          className="btn-shimmer bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full py-4 w-full font-bold text-sm mt-6 hover:scale-105 transition-all duration-300 shadow-lg shadow-emerald-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {status === "loading" ? (
            <><Loader2 size={16} className="animate-spin" /> Submitting...</>
          ) : status === "error" ? (
            <><AlertCircle size={16} /> Failed — Call Us Instead</>
          ) : (
            <>Submit Partnership Application <ArrowRight size={16} /></>
          )}
        </button>
      </form>

      <p className="text-[#a8917a] text-xs text-center mt-3">
        🔒 Your information is confidential. We&apos;ll call you within 48 hours.
      </p>
    </motion.div>
  );
}

/* ── Revenue Calculator (full-width, below the 3-column grid) ───────── */

function RevenueCalculator() {
  const { ref, isInView } = useScrollReveal();
  const [sessions, setSessions] = useState(15);
  const [duration, setDuration] = useState(30);
  // Revenue basis: average utilized draw per session (~5kW across ramp-up/taper),
  // not the 60kW charger's peak nameplate rating — sessions rarely sustain peak power throughout.
  const AVG_SESSION_KW = 5;
  const kwhDelivered = (duration / 60) * AVG_SESSION_KW * 0.85; // 85% efficiency
  const revenuePerSession = kwhDelivered * 12; // ₹12/kWh standard rate
  const monthlyRevenue = Math.round(sessions * 30 * revenuePerSession);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-2xl border border-[#e8d5b0] shadow-warm p-5 sm:p-8 mt-8 grid md:grid-cols-2 gap-6 md:gap-8 items-center"
    >
      {/* Left: sliders */}
      <div>
        <h3 className="text-base sm:text-lg font-bold text-[#1a1208] mb-4">Estimate Your Revenue Potential</h3>
        <div className="mb-6">
          <label htmlFor="ev-sessions" className="flex items-center justify-between text-sm font-medium text-[#1a1208] mb-3">
            <span>Daily charging sessions</span>
            <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold tabular-nums">{sessions}</span>
          </label>
          <input
            id="ev-sessions"
            type="range"
            min={5}
            max={50}
            value={sessions}
            onChange={(e) => setSessions(Number(e.target.value))}
            aria-label="Daily charging sessions"
            className="w-full accent-emerald-600"
          />
        </div>
        <div>
          <label htmlFor="ev-duration" className="flex items-center justify-between text-sm font-medium text-[#1a1208] mb-3">
            <span>Avg. session duration (min)</span>
            <span className="bg-emerald-100 text-emerald-700 rounded-full px-3 py-1 text-xs font-bold tabular-nums">{duration}</span>
          </label>
          <input
            id="ev-duration"
            type="range"
            min={15}
            max={60}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            aria-label="Average session duration in minutes"
            className="w-full accent-emerald-600"
          />
        </div>
      </div>

      {/* Right: result */}
      <div className="text-center md:border-l md:border-emerald-100 md:pl-8">
        <p className="text-3xl sm:text-4xl lg:text-5xl font-black text-emerald-600 tabular-nums">₹{monthlyRevenue.toLocaleString("en-IN")}</p>
        <p className="text-[#78614a] text-sm mt-1">estimated monthly revenue</p>
        <p className="text-[#a8917a] text-xs mt-2">
          at ₹12/kWh · Based on {sessions} sessions/day
        </p>
        <a
          href="#partner-application"
          className="btn-shimmer mt-6 inline-flex items-center justify-center bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-full px-8 py-3 font-bold hover:scale-105 transition-transform duration-300"
        >
          Apply Now
        </a>
      </div>
    </motion.div>
  );
}

/* ── Revenue Potential Card (center column) ─────────────── */

function RevenuePotentialCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-3xl p-6 sm:p-8
        border-2 border-emerald-200
        shadow-[0_20px_60px_rgba(16,185,129,0.12)]"
    >
      {/* Heading */}
      <h3 className="text-xl font-bold text-[#1a1208] mb-1">
        Your Revenue Potential
      </h3>
      <p className="text-[#78614a] text-sm mb-6">
        Estimated monthly earnings by location type
      </p>

      {/* Revenue Tiers */}
      <div className="space-y-3 mb-6">
        {[
          {
            label: 'High Traffic',
            sublabel: 'Malls, Highways, Tourist Spots',
            range: '₹12,000 – ₹18,000',
            color: 'emerald',
            bg: 'bg-emerald-50',
            border: 'border-emerald-200',
            text: 'text-emerald-600',
          },
          {
            label: 'Medium Traffic',
            sublabel: 'Hotels, Office Complexes',
            range: '₹8,000 – ₹12,000',
            color: 'amber',
            bg: 'bg-amber-50',
            border: 'border-amber-200',
            text: 'text-amber-600',
          },
          {
            label: 'Standard',
            sublabel: 'Petrol Pumps, Residential',
            range: '₹4,000 – ₹8,000',
            color: 'gray',
            bg: 'bg-[#FFFBF0]',
            border: 'border-[#e8d5b0]',
            text: 'text-[#78614a]',
          },
        ].map((tier, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className={`${tier.bg} ${tier.border}
              border rounded-2xl p-4`}
          >
            <div className="flex items-center
              justify-between">
              <div>
                <p className="font-bold text-[#1a1208]
                  text-sm">{tier.label}</p>
                <p className="text-[#a8917a] text-[10px]
                  mt-0.5">{tier.sublabel}</p>
              </div>
              <div className="text-right">
                <p className={`font-black text-lg
                  ${tier.text}`}>{tier.range}</p>
                <p className="text-[#a8917a]
                  text-[10px]">/month</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#e8d5b0] mb-5" />

      {/* 4 Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {[
          { value: '60kW', label: 'Charger Output' },
          { value: '30min', label: 'Avg Charge Time' },
          { value: '50+', label: 'Active Stations' },
          { value: '6wks', label: 'Survey to Live' },
        ].map((stat, i) => (
          <div key={i} className="text-center bg-[#FFFBF0]
            rounded-xl p-3 border border-[#e8d5b0]">
            <p className="font-black text-xl
              text-emerald-600">{stat.value}</p>
            <p className="text-[#a8917a] text-[10px]
              mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* CTA — scrolls to form */}
      <button
        onClick={() => document.getElementById(
          'partner-application'
        )?.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })}
        className="w-full bg-gradient-to-r
          from-emerald-500 to-emerald-600
          text-white rounded-full py-3.5
          font-bold text-sm
          hover:scale-105 transition-all
          shadow-lg shadow-emerald-500/20
          flex items-center justify-center gap-2"
      >
        Apply as Partner
        <ChevronDown className="w-4 h-4" />
      </button>

      {/* Trust note */}
      <p className="text-center text-[#a8917a]
        text-[10px] mt-3">
        No upfront cost · Free site assessment ·
        48hr response
      </p>
    </motion.div>
  )
}

/* ── Section 1: Become an EV Partner ────────────────────── */

function BecomePartnerSection() {
  const { ref, isInView } = useScrollReveal();

  return (
    <section className="w-full bg-[#FFF8E7] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        {/* Intro */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="w-8 h-1 bg-amber-500 rounded-full mb-3 mx-auto sm:hidden" />
          <span className="inline-flex items-center gap-2 bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 text-xs font-bold tracking-[0.2em] uppercase text-emerald-700 mb-4">
            <Zap size={14} className="text-emerald-600" />
            EV Charging Partner Programme
          </span>
          <WordHeading
            isInView={isInView}
            lines={[{ text: "Own a Charging Station." }, { text: "Earn Every Month.", emerald: true }]}
            className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-[#1a1208] leading-tight"
          />
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-5 text-[#78614a] text-sm sm:text-base max-w-2xl mx-auto leading-relaxed"
          >
            No technical expertise. No upfront equipment cost. Just your location — we handle everything else.
          </motion.p>
        </div>
        {/* 3-column grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-start">
          {/* Who Can Partner */}
          <motion.div
            variants={VARIANTS.slideRight}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-2 lg:order-1"
          >
            <h3 className="text-lg font-bold text-[#1a1208] mb-4">Perfect Locations</h3>
            {PARTNER_TYPES.map((p) => (
              <div key={p.title} className="flex items-center gap-3 py-3 border-b border-[#e8d5b0] last:border-0">
                <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{p.icon}</div>
                <div>
                  <div className="font-semibold text-[#1a1208] text-sm">{p.title}</div>
                  <div className="text-[#a8917a] text-xs">{p.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Revenue Potential */}
          <div className="order-1 lg:order-2">
            <RevenuePotentialCard />
          </div>

          {/* What We Provide */}
          <motion.div
            variants={VARIANTS.slideLeft}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="order-3"
          >
            <h3 className="text-lg font-bold text-[#1a1208] mb-4">We Handle Everything</h3>
            {BENEFITS.map((b) => (
              <div key={b.title} className="flex items-start gap-3 py-3 border-b border-[#e8d5b0] last:border-0">
                <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check size={12} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-[#1a1208] text-sm">{b.title}</div>
                  <div className="text-[#a8917a] text-xs">{b.sub}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Revenue calculator — full width, below the 3-column grid */}
        <RevenueCalculator />

        {/* Stats row */}
        <motion.div
          variants={VARIANTS.cardGrid}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mt-8 sm:mt-12 bg-white rounded-2xl border border-[#e8d5b0] shadow-warm p-4 sm:p-6 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6"
        >
          {STATS.map((s) => (
            <motion.div key={s.label} variants={VARIANTS.card} className="text-center">
              <span className="block text-2xl sm:text-3xl font-black text-emerald-600 tabular-nums">
                {s.countTo ? <CountUpStat to={s.countTo} suffix={s.suffix} active={isInView} /> : s.value}
              </span>
              <span className="block text-[#78614a] text-xs sm:text-sm mt-1">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section 2: How It Works ────────────────────────────── */

function HowItWorksSection() {
  const { ref, isInView } = useScrollReveal();
  const waHref = CONTACT.whatsapp;

  return (
    <section className="w-full bg-[#FFFBF0] py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={ref}>
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="w-8 h-1 bg-amber-500 rounded-full mb-3 mx-auto sm:hidden" />
          <WordHeading
            isInView={isInView}
            lines={[{ text: "From First Call to First Charge" }]}
            className="text-2xl sm:text-4xl font-black font-display text-[#1a1208] leading-tight"
          />
          <motion.p
            variants={VARIANTS.para}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="mt-4 text-[#78614a] text-sm sm:text-base"
          >
            We make it simple. Here&rsquo;s exactly what happens when you partner with us.
          </motion.p>
        </div>
        {/* Mobile: vertical timeline */}
        <div className="lg:hidden relative pl-8">
          <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-emerald-200" />
          <motion.div
            variants={VARIANTS.cardGrid}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="space-y-6"
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={VARIANTS.card} whileTap={{ scale: 0.98 }} className="relative">
                <span className="absolute -left-8 top-2 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow" />
                <StepCard step={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Desktop: horizontal timeline */}
        <div className="hidden lg:block relative">
          <div className="absolute top-10 left-10 right-10 border-t-2 border-dashed border-emerald-200" />
          <motion.div
            variants={VARIANTS.cardGrid}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="grid grid-cols-5 gap-5 relative"
          >
            {STEPS.map((s) => (
              <motion.div key={s.n} variants={VARIANTS.card}>
                <StepCard step={s} />
              </motion.div>
            ))}
          </motion.div>
        </div>
        {/* Partner Application Form */}
        <div
          id="partner-application"
          className="mt-16 scroll-mt-24"
        >
          {/* Section intro */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2
              bg-emerald-100 border border-emerald-200
              rounded-full px-4 py-2 mb-4">
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              <span className="text-emerald-700 text-xs
                font-bold tracking-widest">
                PARTNERSHIP APPLICATION
              </span>
            </div>
            <h2 className="font-display font-black
              text-[#1a1208] text-2xl sm:text-3xl lg:text-4xl">
              Apply as an EV Charging Partner
            </h2>
            <p className="text-[#78614a] text-sm sm:text-base
              mt-3 max-w-xl mx-auto">
              Fill in your details and we&apos;ll contact you
              within 48 hours with a free site assessment.
              No commitment required.
            </p>
          </div>

          {/* The existing form component */}
          <div className="max-w-3xl mx-auto">
            <PartnerEnquiryForm />
          </div>
        </div>

        {/* CTA banner */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 sm:mt-16 bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-3xl p-6 sm:p-8 lg:p-12 text-center lg:text-left"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 lg:gap-8">
            <div>
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black font-display text-white">Ready to Get Started?</h3>
              <p className="text-white/80 mt-2 max-w-md mx-auto lg:mx-0 text-sm sm:text-base">No upfront cost. No technical knowledge needed. We earn only when you earn.</p>
            </div>
            <div className="flex flex-col items-center lg:items-end gap-3">
              <Link
                href="/contact"
                className="btn-shimmer w-full sm:w-auto inline-flex items-center justify-center bg-white text-emerald-700 font-bold rounded-full px-8 py-3.5 hover:scale-105 transition-transform duration-300"
              >
                Apply as Partner
              </Link>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm">
                <a href={CONTACT.phoneHref} className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                  <PhoneCall size={14} /> {CONTACT.phone}
                </a>
                <a href={CONTACT.phone2Href} className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                  <PhoneCall size={14} /> {CONTACT.phone2Display}
                </a>
                <a href={waHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-white/80 hover:text-white transition-colors">
                  <MessageCircle size={14} /> WhatsApp
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ── Section export ─────────────────────────────────────── */

export default function EVPartnerSection() {
  return (
    <>
      <BecomePartnerSection />
      <HowItWorksSection />
    </>
  );
}
