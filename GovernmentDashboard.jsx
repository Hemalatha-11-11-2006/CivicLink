import React, { useState, useMemo } from "react";
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell
} from "recharts";
// npm install react-simple-maps — renders the real India outline (from the
// public world-atlas topojson) so hotspot markers sit at true lat/lng.
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import {
  Home, Building2, Factory, Users, Bell, Search, MapPin, Star,
  TrendingUp, AlertTriangle, CheckCircle2, Clock, ShieldAlert,
  GraduationCap, Award, ChevronRight, Droplets, HeartPulse, Sprout,
  Zap, Building, Waves, ArrowUpRight, Radio
} from "lucide-react";

/* ---------------------------------------------------------------
   CivicLink brand tokens
--------------------------------------------------------------- */
const C = {
  navy: "#193456",
  navyDark: "#122845",
  teal: "#248F8C",
  tealLight: "#DDF1EF",
  green: "#82B686",
  bg: "#F4F8FA",
  card: "#FFFFFF",
  textPrimary: "#182545",
  textSecondary: "#617085",
  amber: "#F2A93B",
  red: "#E4574A",
  border: "#E4EAEE",
};

const FONT = { fontFamily: "Manrope, sans-serif" };

/* ---------------------------------------------------------------
   Mock data — all data below is placeholder for prototype/demo
--------------------------------------------------------------- */

const recentProjects = [
  {
    id: "PJ-1042",
    title: "Solar-powered borewell monitoring for arsenic detection",
    sectors: ["Water", "Health"],
    university: "IIT (ISM) Dhanbad",
    industries: ["Tata Water Mission", "Cipla Foundation"],
    students: 6,
    status: "Pilot deployed",
    district: "Sahibganj",
    impact: "14 villages covered",
  },
  {
    id: "PJ-1039",
    title: "Flood-plain early-warning sensor network",
    sectors: ["Disaster Mgmt"],
    university: "BIT Mesra",
    industries: ["L&T Construction"],
    students: 8,
    status: "In progress",
    district: "Sahibganj",
    impact: "Fast-lane escalation",
  },
  {
    id: "PJ-1031",
    title: "Soil-health advisory app for smallholder farmers",
    sectors: ["Agriculture"],
    university: "BAU Ranchi",
    industries: ["Mahindra Agri", "ITC Agribusiness"],
    students: 5,
    status: "Completed",
    district: "Gumla",
    impact: "3,200 farmers reached",
  },
  {
    id: "PJ-1028",
    title: "Low-literacy voice kiosk for grievance filing",
    sectors: ["Accessibility", "Public Admin"],
    university: "XISS Ranchi",
    industries: ["Adani Foundation"],
    students: 4,
    status: "In progress",
    district: "Khunti",
    impact: "5 dialects supported",
  },
];

const universities = [
  {
    name: "IIT (ISM) Dhanbad",
    rating: 4.8,
    completed: 12,
    active: 5,
    strengths: ["Water", "Energy", "Disaster Mgmt"],
    faculty: 34,
    recent: "Arsenic-detection borewell monitor — pilot deployed",
    responseTime: "1.8 days",
  },
  {
    name: "BIT Mesra",
    rating: 4.6,
    completed: 9,
    active: 7,
    strengths: ["Disaster Mgmt", "Urban Infra", "Accessibility"],
    faculty: 28,
    recent: "Flood-plain sensor network — in progress",
    responseTime: "2.1 days",
  },
  {
    name: "NIT Jamshedpur",
    rating: 4.4,
    completed: 10,
    active: 4,
    strengths: ["Energy", "Industry 4.0", "Urban Infra"],
    faculty: 25,
    recent: "Smart-grid load balancer for tribal belts — proposal stage",
    responseTime: "2.6 days",
  },
  {
    name: "BAU Ranchi",
    rating: 4.7,
    completed: 15,
    active: 3,
    strengths: ["Agriculture", "Rural Livelihoods"],
    faculty: 19,
    recent: "Soil-health advisory app — completed, 3,200 farmers reached",
    responseTime: "1.5 days",
  },
  {
    name: "XISS Ranchi",
    rating: 4.3,
    completed: 6,
    active: 4,
    strengths: ["Public Admin", "Accessibility", "Social Work"],
    faculty: 16,
    recent: "Voice-kiosk grievance filing — in progress",
    responseTime: "3.0 days",
  },
  {
    name: "Central University of Jharkhand",
    rating: 4.1,
    completed: 5,
    active: 2,
    strengths: ["Education", "Environment"],
    faculty: 14,
    recent: "School dropout early-warning model — proposal stage",
    responseTime: "3.4 days",
  },
];

const sectorMeta = {
  Water: { icon: Droplets, color: C.teal },
  Health: { icon: HeartPulse, color: C.red },
  Agriculture: { icon: Sprout, color: C.green },
  Energy: { icon: Zap, color: C.amber },
  "Urban Infra": { icon: Building, color: C.navy },
  "Disaster Mgmt": { icon: Waves, color: C.red },
};

const industries = [
  { name: "Tata Water Mission", sector: "Water", rating: 4.9, funded: 6, csr: "₹42L", badge: "Top CSR contributor" },
  { name: "VA Tech Wabag", sector: "Water", rating: 4.5, funded: 3, csr: "₹18L" },
  { name: "Cipla Foundation", sector: "Health", rating: 4.7, funded: 4, csr: "₹26L" },
  { name: "Apollo Foundation", sector: "Health", rating: 4.4, funded: 2, csr: "₹11L" },
  { name: "Mahindra Agri", sector: "Agriculture", rating: 4.8, funded: 5, csr: "₹31L", badge: "Most projects funded" },
  { name: "ITC Agribusiness", sector: "Agriculture", rating: 4.3, funded: 3, csr: "₹15L" },
  { name: "Tata Power", sector: "Energy", rating: 4.6, funded: 3, csr: "₹22L" },
  { name: "Adani Foundation", sector: "Energy", rating: 4.2, funded: 2, csr: "₹9L" },
  { name: "L&T Construction", sector: "Urban Infra", rating: 4.5, funded: 4, csr: "₹28L" },
  { name: "SDMA-linked CSR Pool", sector: "Disaster Mgmt", rating: 4.9, funded: 7, csr: "₹51L", badge: "Fast-lane responder" },
];

const monthlyUsers = [
  { month: "Mar", users: 4200, reports: 980 },
  { month: "Apr", users: 6100, reports: 1450 },
  { month: "May", users: 8900, reports: 2100 },
  { month: "Jun", users: 12400, reports: 3050 },
  { month: "Jul", users: 16800, reports: 4300 },
  { month: "Aug", users: 21500, reports: 5600 },
];

// state-wise app footprint — heavy in Jharkhand (home state), light pilot elsewhere
const stateUsers = [
  { state: "Jharkhand", users: 18650, tier: 5 },
  { state: "Bihar", users: 1120, tier: 2 },
  { state: "West Bengal", users: 890, tier: 2 },
  { state: "Odisha", users: 540, tier: 1 },
  { state: "Chhattisgarh", users: 310, tier: 1 },
  { state: "Uttar Pradesh", users: 0, tier: 0 },
  { state: "Madhya Pradesh", users: 0, tier: 0 },
  { state: "Maharashtra", users: 0, tier: 0 },
  { state: "Assam", users: 0, tier: 0 },
  { state: "Delhi", users: 0, tier: 0 },
  { state: "Rajasthan", users: 0, tier: 0 },
  { state: "Gujarat", users: 0, tier: 0 },
  { state: "Karnataka", users: 0, tier: 0 },
  { state: "Tamil Nadu", users: 0, tier: 0 },
  { state: "Telangana", users: 0, tier: 0 },
];

const jharkhandDistricts = [
  { district: "Ranchi", users: 5210, reports: 1240 },
  { district: "Dhanbad", users: 3120, reports: 890 },
  { district: "Jamshedpur (E. Singhbhum)", users: 2870, reports: 760 },
  { district: "Sahibganj", users: 1640, reports: 610 },
  { district: "Gumla", users: 980, reports: 340 },
];

// Real-world city coordinates for the heatmap — home districts (Jharkhand)
// plus early cross-border pilot signups in neighbouring states. Numbers are
// in plain thousands, since this is a recently-launched app, not a
// nationwide one yet.
const heatmapHotspots = [
  { city: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, users: 5210 },
  { city: "Dhanbad", state: "Jharkhand", lat: 23.7957, lng: 86.4304, users: 3120 },
  { city: "Jamshedpur", state: "Jharkhand", lat: 22.8046, lng: 86.2029, users: 2870 },
  { city: "Sahibganj", state: "Jharkhand", lat: 25.2425, lng: 87.6392, users: 1640 },
  { city: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, users: 1120 },
  { city: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, users: 890 },
  { city: "Gumla", state: "Jharkhand", lat: 23.0435, lng: 84.5449, users: 980 },
  { city: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, users: 540 },
  { city: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, users: 310 },
];

const INDIA_TOPOJSON_URL =
  "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

function hotspotTier(users) {
  if (users >= 4000) return 5;
  if (users >= 2000) return 4;
  if (users >= 1000) return 3;
  if (users >= 500) return 2;
  return 1;
}

function hotspotColor(tier) {
  const ramp = ["#EAF0F4", "#B9E2DD", "#7FC9C0", "#43A99E", "#248F8C", "#0F5D57"];
  return ramp[tier] ?? ramp[1];
}

const disasterFastLane = [
  { id: "DL-221", issue: "Embankment crack near Ganga tributary", district: "Sahibganj", severity: "Critical", age: "18 min ago" },
  { id: "DL-219", issue: "Rapid water rise, Subarnarekha basin", district: "E. Singhbhum", severity: "High", age: "52 min ago" },
];

/* ---------------------------------------------------------------
   Small shared UI atoms
--------------------------------------------------------------- */

function Card({ children, style, className = "" }) {
  return (
    <div
      className={`rounded-2xl ${className}`}
      style={{ background: C.card, border: `1px solid ${C.border}`, ...style }}
    >
      {children}
    </div>
  );
}

function StatCard({ label, value, sub, accent }) {
  return (
    <Card className="p-4 flex-1 min-w-[150px]">
      <p className="text-xs font-medium" style={{ color: C.textSecondary }}>{label}</p>
      <p className="text-2xl font-bold mt-1" style={{ color: C.textPrimary }}>{value}</p>
      {sub && (
        <p className="text-xs mt-1 flex items-center gap-1" style={{ color: accent || C.green }}>
          <TrendingUp size={12} /> {sub}
        </p>
      )}
    </Card>
  );
}

function RatingStars({ rating }) {
  return (
    <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: C.amber }}>
      <Star size={14} fill={C.amber} strokeWidth={0} /> {rating.toFixed(1)}
    </span>
  );
}

function StatusPill({ status }) {
  const map = {
    "Pilot deployed": { bg: C.tealLight, fg: C.teal },
    "In progress": { bg: "#FDF1DC", fg: C.amber },
    "Completed": { bg: "#E7F3E8", fg: "#3F7A45" },
  };
  const s = map[status] || { bg: C.border, fg: C.textSecondary };
  return (
    <span
      className="text-xs font-semibold px-2.5 py-1 rounded-full"
      style={{ background: s.bg, color: s.fg }}
    >
      {status}
    </span>
  );
}

function SectorTag({ sector }) {
  const meta = sectorMeta[sector] || { icon: Building, color: C.textSecondary };
  const Icon = meta.icon;
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full"
      style={{ background: `${meta.color}14`, color: meta.color }}
    >
      <Icon size={12} /> {sector}
    </span>
  );
}

/* ---------------------------------------------------------------
   Sidebar
--------------------------------------------------------------- */

function Sidebar({ active, setActive }) {
  const items = [
    { id: "home", label: "Overview", icon: Home },
    { id: "universities", label: "Universities", icon: GraduationCap },
    { id: "industry", label: "Industry", icon: Factory },
    { id: "users", label: "Reports", icon: Users },
  ];
  return (
    <div
      className="w-60 shrink-0 flex flex-col justify-between py-6"
      style={{ background: C.navy, minHeight: "100vh" }}
    >
      <div>
        <div className="flex items-center gap-2 px-6 mb-8">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm"
            style={{ background: C.teal, color: "white" }}
          >
            CL
          </div>
          <div>
            <p className="text-white font-bold leading-tight">CivicLink</p>
            <p className="text-[11px] leading-tight" style={{ color: "#93A6C2" }}>Government console</p>
          </div>
        </div>
        <nav className="flex flex-col gap-1 px-3">
          {items.map((it) => {
            const Icon = it.icon;
            const isActive = active === it.id;
            return (
              <button
                key={it.id}
                onClick={() => setActive(it.id)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left"
                style={{
                  background: isActive ? "rgba(255,255,255,0.08)" : "transparent",
                  color: isActive ? "white" : "#93A6C2",
                }}
              >
                <Icon size={17} />
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>
      <div className="px-6">
        <div
          className="rounded-xl p-3 text-xs"
          style={{ background: "rgba(130,182,134,0.15)", color: "#B7D9BA" }}
        >
          <div className="flex items-center gap-1.5 font-semibold mb-1">
            <Radio size={12} /> Live sync
          </div>
          Reports stream in real time from the citizen app.
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Top bar
--------------------------------------------------------------- */

function TopBar({ title, subtitle }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-xl font-bold" style={{ color: C.textPrimary }}>{title}</h1>
        {subtitle && <p className="text-sm mt-0.5" style={{ color: C.textSecondary }}>{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-lg"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <Search size={15} style={{ color: C.textSecondary }} />
          <input
            placeholder="Search projects, universities, industries..."
            className="text-sm outline-none bg-transparent w-56"
            style={{ color: C.textPrimary }}
          />
        </div>
        <button
          className="w-9 h-9 rounded-lg flex items-center justify-center relative"
          style={{ background: C.card, border: `1px solid ${C.border}` }}
        >
          <Bell size={16} style={{ color: C.textSecondary }} />
          <span
            className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] flex items-center justify-center text-white font-bold"
            style={{ background: C.red }}
          >
            2
          </span>
        </button>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{ background: C.navy }}
        >
          GJ
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   HOME
--------------------------------------------------------------- */

function HomeSection() {
  const uniLeaderboard = [...universities].sort((a, b) => b.rating - a.rating).slice(0, 5);
  const indLeaderboard = [...industries].sort((a, b) => b.rating - a.rating).slice(0, 5);

  return (
    <div>
      <TopBar title="Overview" subtitle="Government of Jharkhand · Higher & Technical Education" />

      {/* Disaster fast-lane banner */}
      <Card
        className="p-4 mb-6 flex items-center justify-between"
        style={{ background: "#FDECEA", border: `1px solid ${C.red}33` }}
      >
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ background: C.red }}
          >
            <ShieldAlert size={18} color="white" />
          </div>
          <div>
            <p className="text-sm font-bold" style={{ color: "#7A1F16" }}>
              Disaster fast-lane · {disasterFastLane.length} active cases need attention
            </p>
            <p className="text-xs" style={{ color: "#9B4A3F" }}>
              High-severity reports bypass the university pipeline and route here directly.
            </p>
          </div>
        </div>
        <button
          className="text-xs font-semibold px-4 py-2 rounded-lg text-white shrink-0"
          style={{ background: C.red }}
        >
          View queue
        </button>
      </Card>

      {/* Stat row */}
      <div className="flex gap-4 mb-6 flex-wrap">
        <StatCard label="Total reports" value="1,248" sub="12% vs last week" />
        <StatCard label="Active projects" value="23" sub="4 new this month" />
        <StatCard label="Universities engaged" value="6" sub="all districts" />
        <StatCard label="Industry partners" value="10" sub="₹2.53Cr CSR committed" />
        <StatCard label="Disaster fast-lane" value={disasterFastLane.length} sub="needs dispatch" accent={C.red} />
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Recent collaborative projects */}
        <Card className="p-5 col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>
              Recent collaborative projects
            </h3>
            <button className="text-xs font-semibold flex items-center gap-1" style={{ color: C.teal }}>
              View all <ChevronRight size={13} />
            </button>
          </div>
          <div className="flex flex-col gap-3">
            {recentProjects.map((p) => (
              <div
                key={p.id}
                className="p-3 rounded-xl flex items-start justify-between gap-3"
                style={{ background: C.bg }}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    {p.sectors.map((s) => <SectorTag key={s} sector={s} />)}
                    <span className="text-[11px]" style={{ color: C.textSecondary }}>{p.id}</span>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: C.textPrimary }}>{p.title}</p>
                  <p className="text-xs mt-1" style={{ color: C.textSecondary }}>
                    <GraduationCap size={12} className="inline mr-1 -mt-0.5" />{p.university}
                    <span className="mx-1.5">·</span>
                    <Factory size={12} className="inline mr-1 -mt-0.5" />{p.industries.join(", ")}
                    <span className="mx-1.5">·</span>
                    <Users size={12} className="inline mr-1 -mt-0.5" />{p.students} students
                  </p>
                  <p className="text-[11px] mt-1 font-medium" style={{ color: C.green }}>
                    {p.impact} · {p.district}
                  </p>
                </div>
                <StatusPill status={p.status} />
              </div>
            ))}
          </div>
        </Card>

        {/* Leaderboards */}
        <div className="flex flex-col gap-6">
          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award size={15} style={{ color: C.teal }} />
              <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>University ratings</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {uniLeaderboard.map((u, i) => (
                <div key={u.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: C.tealLight, color: C.teal }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{u.name}</span>
                  </div>
                  <RatingStars rating={u.rating} />
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center gap-2 mb-3">
              <Award size={15} style={{ color: C.amber }} />
              <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>Industry ratings</h3>
            </div>
            <div className="flex flex-col gap-2.5">
              {indLeaderboard.map((ind, i) => (
                <div key={ind.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center"
                      style={{ background: "#FDF1DC", color: C.amber }}
                    >
                      {i + 1}
                    </span>
                    <span className="text-xs font-medium" style={{ color: C.textPrimary }}>{ind.name}</span>
                  </div>
                  <RatingStars rating={ind.rating} />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   UNIVERSITIES
--------------------------------------------------------------- */

function UniversitiesSection() {
  const [sortBy, setSortBy] = useState("rating");

  const sorted = useMemo(() => {
    return [...universities].sort((a, b) =>
      sortBy === "rating" ? b.rating - a.rating : b.completed - a.completed
    );
  }, [sortBy]);

  return (
    <div>
      <TopBar title="Universities" subtitle="Academic partners across Jharkhand" />

      <div className="flex items-center gap-2 mb-5">
        {["rating", "completed"].map((k) => (
          <button
            key={k}
            onClick={() => setSortBy(k)}
            className="text-xs font-semibold px-3 py-1.5 rounded-full"
            style={{
              background: sortBy === k ? C.navy : C.card,
              color: sortBy === k ? "white" : C.textSecondary,
              border: `1px solid ${sortBy === k ? C.navy : C.border}`,
            }}
          >
            Sort by {k === "rating" ? "rating" : "projects completed"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {sorted.map((u) => (
          <Card key={u.name} className="p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: C.tealLight }}
                >
                  <GraduationCap size={20} style={{ color: C.teal }} />
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: C.textPrimary }}>{u.name}</p>
                  <p className="text-xs" style={{ color: C.textSecondary }}>{u.faculty} faculty enrolled</p>
                </div>
              </div>
              <RatingStars rating={u.rating} />
            </div>

            <div className="flex items-center gap-2 flex-wrap mb-3">
              {u.strengths.map((s) => <SectorTag key={s} sector={s} />)}
            </div>

            <div className="grid grid-cols-3 gap-2 mb-3">
              <div className="p-2 rounded-lg text-center" style={{ background: C.bg }}>
                <p className="text-base font-bold" style={{ color: C.textPrimary }}>{u.completed}</p>
                <p className="text-[10px]" style={{ color: C.textSecondary }}>Completed</p>
              </div>
              <div className="p-2 rounded-lg text-center" style={{ background: C.bg }}>
                <p className="text-base font-bold" style={{ color: C.textPrimary }}>{u.active}</p>
                <p className="text-[10px]" style={{ color: C.textSecondary }}>Active</p>
              </div>
              <div className="p-2 rounded-lg text-center" style={{ background: C.bg }}>
                <p className="text-base font-bold" style={{ color: C.textPrimary }}>{u.responseTime}</p>
                <p className="text-[10px]" style={{ color: C.textSecondary }}>Avg response</p>
              </div>
            </div>

            <div
              className="text-xs p-2.5 rounded-lg flex items-start gap-2"
              style={{ background: "#F3F9F3", color: "#3F7A45" }}
            >
              <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
              <span>Latest: {u.recent}</span>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   INDUSTRY
--------------------------------------------------------------- */

function IndustrySection() {
  const sectors = Object.keys(sectorMeta);
  const [activeSector, setActiveSector] = useState("All");

  const filtered = activeSector === "All"
    ? industries
    : industries.filter((i) => i.sector === activeSector);

  return (
    <div>
      <TopBar title="Industry" subtitle="Corporate and CSR partners, grouped by sector" />

      <div className="flex items-center gap-2 mb-5 flex-wrap">
        <button
          onClick={() => setActiveSector("All")}
          className="text-xs font-semibold px-3 py-1.5 rounded-full"
          style={{
            background: activeSector === "All" ? C.navy : C.card,
            color: activeSector === "All" ? "white" : C.textSecondary,
            border: `1px solid ${activeSector === "All" ? C.navy : C.border}`,
          }}
        >
          All sectors
        </button>
        {sectors.map((s) => {
          const meta = sectorMeta[s];
          const Icon = meta.icon;
          const isActive = activeSector === s;
          return (
            <button
              key={s}
              onClick={() => setActiveSector(s)}
              className="text-xs font-semibold px-3 py-1.5 rounded-full flex items-center gap-1.5"
              style={{
                background: isActive ? meta.color : C.card,
                color: isActive ? "white" : C.textSecondary,
                border: `1px solid ${isActive ? meta.color : C.border}`,
              }}
            >
              <Icon size={12} /> {s}
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-2 gap-5">
        {filtered.map((ind) => {
          const meta = sectorMeta[ind.sector];
          const Icon = meta.icon;
          return (
            <Card key={ind.name} className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: `${meta.color}18` }}
                  >
                    <Icon size={20} style={{ color: meta.color }} />
                  </div>
                  <div>
                    <p className="text-sm font-bold" style={{ color: C.textPrimary }}>{ind.name}</p>
                    <SectorTag sector={ind.sector} />
                  </div>
                </div>
                <RatingStars rating={ind.rating} />
              </div>

              {ind.badge && (
                <div
                  className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-full mb-3"
                  style={{ background: "#FDF1DC", color: "#8A5A0B" }}
                >
                  <Award size={11} /> {ind.badge}
                </div>
              )}

              <div className="grid grid-cols-2 gap-2">
                <div className="p-2 rounded-lg text-center" style={{ background: C.bg }}>
                  <p className="text-base font-bold" style={{ color: C.textPrimary }}>{ind.funded}</p>
                  <p className="text-[10px]" style={{ color: C.textSecondary }}>Projects funded</p>
                </div>
                <div className="p-2 rounded-lg text-center" style={{ background: C.bg }}>
                  <p className="text-base font-bold" style={{ color: C.textPrimary }}>{ind.csr}</p>
                  <p className="text-[10px]" style={{ color: C.textSecondary }}>CSR committed</p>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   Reports — heatmap of India + growth + district breakdown
--------------------------------------------------------------- */

function IndiaHeatmap() {
  const maxUsers = Math.max(...heatmapHotspots.map((h) => h.users));
  const radiusFor = (users) => 5 + Math.sqrt(users / maxUsers) * 22;

  return (
    <ComposableMap
      projection="geoMercator"
      projectionConfig={{ center: [82.5, 22.5], scale: 950 }}
      width={520}
      height={520}
      style={{ width: "100%", height: "auto" }}
    >
      <Geographies geography={INDIA_TOPOJSON_URL}>
        {({ geographies }) =>
          geographies
            .filter((geo) => geo.properties.name === "India")
            .map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                style={{
                  default: { fill: "#F4F8FA", stroke: C.teal, strokeWidth: 0.8, outline: "none" },
                  hover: { fill: "#F4F8FA", stroke: C.teal, strokeWidth: 0.8, outline: "none" },
                  pressed: { fill: "#F4F8FA", stroke: C.teal, strokeWidth: 0.8, outline: "none" },
                }}
              />
            ))
        }
      </Geographies>

      {heatmapHotspots.map((h) => {
        const tier = hotspotTier(h.users);
        const r = radiusFor(h.users);
        return (
          <Marker key={h.city} coordinates={[h.lng, h.lat]}>
            {/* soft outer glow */}
            <circle r={r * 1.7} fill={hotspotColor(tier)} opacity={0.18} />
            {/* solid hotspot core */}
            <circle r={r} fill={hotspotColor(tier)} opacity={0.8} stroke="white" strokeWidth={0.6} />
            {h.users >= 1000 && (
              <text
                textAnchor="middle"
                y={-r - 5}
                style={{ fontSize: 8, fontWeight: 700, fill: C.textPrimary, fontFamily: "Manrope, sans-serif" }}
              >
                {h.city}
              </text>
            )}
          </Marker>
        );
      })}
    </ComposableMap>
  );
}

function UsersSection() {
  const totalUsers = stateUsers.reduce((a, s) => a + s.users, 0);

  return (
    <div>
      <TopBar title="Reports" subtitle="People who reported issues via the citizen app — live from Firestore" />

      <div className="flex gap-4 mb-6 flex-wrap">
        <StatCard label="Total registered users" value={totalUsers.toLocaleString()} sub="28% vs last month" />
        <StatCard label="Active this month" value="14,920" sub="70% of base" />
        <StatCard label="Reports today" value="187" sub="42 pending AI triage" />
        <StatCard label="Avg AI response time" value="2.4 sec" />
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <Card className="p-5 col-span-2">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-sm font-bold" style={{ color: C.textPrimary }}>Reporting Activity</h3>
            <span className="text-[11px]" style={{ color: C.textSecondary }}>Last 6 months</span>
          </div>
          <div style={{ height: 220 }}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyUsers} margin={{ left: -20, top: 10 }}>
                <CartesianGrid stroke={C.border} vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: C.textSecondary }} axisLine={false} tickLine={false} />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke={C.teal} strokeWidth={2.5} dot={false} name="Reports" />
                <Line type="monotone" dataKey="reports" stroke={C.amber} strokeWidth={2.5} dot={false} name="Reports filed" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-5">
          <h3 className="text-sm font-bold mb-3" style={{ color: C.textPrimary }}>Top districts (Jharkhand)</h3>
          <div className="flex flex-col gap-3">
            {jharkhandDistricts.map((d) => (
              <div key={d.district}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-medium" style={{ color: C.textPrimary }}>{d.district}</span>
                  <span style={{ color: C.textSecondary }}>{d.users.toLocaleString()}</span>
                </div>
                <div className="w-full h-1.5 rounded-full" style={{ background: C.border }}>
                  <div
                    className="h-1.5 rounded-full"
                    style={{
                      width: `${(d.users / jharkhandDistricts[0].users) * 100}%`,
                      background: C.teal,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Heatmap */}
      <Card className="p-6">
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-base font-bold" style={{ color: C.textPrimary }}>Report distribution heatmap</h3>
            <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>
              Geographical spread of CivicLink users — Jharkhand is the home rollout, with early
              cross-border pilot signups in neighbouring states.
            </p>
          </div>
          <div
            className="flex items-center gap-2 px-3 py-2 rounded-xl shrink-0"
            style={{ background: C.tealLight }}
          >
          
            <div>
             
             
            </div>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 items-center">
          {/* Legend */}
          <div className="col-span-1 flex flex-col gap-3">
            <div className="p-3 rounded-xl" style={{ background: C.bg }}>
              <p className="text-[10px] font-bold tracking-wide mb-2" style={{ color: C.textSecondary }}>
                REPORTS PER CITY
              </p>
              <div className="flex flex-col gap-1.5">
                {[
                  { label: "4,000+", tier: 5 },
                  { label: "2,000 – 4,000", tier: 4 },
                  { label: "1,000 – 2,000", tier: 3 },
                  { label: "500 – 1,000", tier: 2 },
                  { label: "< 500", tier: 1 },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ background: hotspotColor(row.tier) }}
                    />
                    <span className="text-[11px]" style={{ color: C.textPrimary }}>{row.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3 rounded-xl" style={{ background: C.bg }}>
              <p className="text-[10px] font-bold tracking-wide mb-2" style={{ color: C.textSecondary }}>
                TOP HOTSPOTS
              </p>
              <div className="flex flex-col gap-2">
                {[...heatmapHotspots]
                  .sort((a, b) => b.users - a.users)
                  .slice(0, 5)
                  .map((h) => (
                    <div key={h.city} className="flex items-start gap-1.5">
                      <MapPin size={12} className="mt-0.5 shrink-0" style={{ color: C.teal }} />
                      <div>
                        <p className="text-[11px] font-semibold leading-tight" style={{ color: C.textPrimary }}>
                          {h.city}
                        </p>
                        <p className="text-[10px] leading-tight" style={{ color: C.textSecondary }}>
                          {h.users.toLocaleString()} users
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>

          {/* Map */}
          <div className="col-span-3">
            <IndiaHeatmap />
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------
   ROOT
--------------------------------------------------------------- */

export default function GovernmentDashboard() {
  const [active, setActive] = useState("home");

  return (
    <div className="flex w-full min-h-screen" style={{ background: C.bg, ...FONT }}>
      <Sidebar active={active} setActive={setActive} />
      <div className="flex-1 p-8 max-w-[1400px]">
        {active === "home" && <HomeSection />}
        {active === "universities" && <UniversitiesSection />}
        {active === "industry" && <IndustrySection />}
        {active === "users" && <UsersSection />}
      </div>
    </div>
  );
}
