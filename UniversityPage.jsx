import React, { useMemo, useState } from "react";
import {
  GraduationCap,
  Users,
  TrendingUp,
  Award,
  Bell,
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Star,
  CheckCircle2,
  Clock,
  Building2,
  Trophy,
  Sparkles,
  Briefcase,
  Target,
  Handshake,
  X,
  BookOpen,
  Wrench,
  FlaskConical,
  ArrowUpRight,
} from "lucide-react";

/* =========================================================================
   DESIGN TOKENS — pulled from the CivicLink brand sheet
   ========================================================================= */
const C = {
  navy: "#193456",
  navyDeep: "#122540",
  teal: "#248F8C",
  tealSoft: "#2FA6A2",
  green: "#82B66B",
  lightTeal: "#DDF1EF",
  bg: "#F4F8FA",
  card: "#FFFFFF",
  textPrimary: "#1B2B45",
  textSecondary: "#617085",
  border: "#E4EBF0",
  amber: "#D98B3F",
  red: "#D9645F",
};

/* =========================================================================
   MOCK DATA — swap for live Firestore data once modules are wired together
   ========================================================================= */
const SECTORS = [
  "Water",
  "Agriculture",
  "Healthcare",
  "Disaster Management",
  "Urban Infrastructure",
  "Energy",
];

const UNIVERSITIES = [
  {
    id: "u1",
    name: "Agriculture",
    district: "Ranchi",
    established: 2018,
    specializations: ["Disaster Management", "Water", "Urban Infrastructure"],
    resourceTags: ["GIS Lab", "IoT Fabrication Unit", "Structural Testing Bay"],
    rating: 4.7,
    rank: 1,
    score: 942,
    activeTeams: 6,
    activeStudents: 41,
    completedProjects: 18,
    ongoingProjects: 6,
    nepCredits: "6 credits · Project-Based Learning",
    color: C.teal,
    pastProjects: [
      { title: "Flood-level IoT sensor network for Swarnarekha basin", sector: "Disaster Management", year: 2025, status: "Deployed", impact: "Early warning reached 14 villages" },
      { title: "Low-cost borewell water quality kit", sector: "Water", year: 2024, status: "Deployed", impact: "310 borewells tested across 3 blocks" },
      { title: "Pothole & drainage mapping drone survey", sector: "Urban Infrastructure", year: 2024, status: "Completed", impact: "Fed directly into Ranchi Municipal repair queue" },
    ],
    achievements: [
      { title: "Winner — State Innovation Meet 2025", year: 2025 },
      { title: "Patent filed: low-power flood sensor node", year: 2025 },
    ],
    teams: [
      {
        id: "t1",
        name: "Team AquaSense",
        problem: "Borewell water contamination reports (Ranchi rural belt)",
        sector: "Water",
        mentor: "Dr. S. Rao, Dept. of Civil Engg.",
        members: ["Ananya Kujur", "Rohit Mahato", "Priya Singh", "Devesh Oraon"],
        status: "In Progress",
        progress: 65,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Prototype built", done: true },
          { label: "Field pilot (30 borewells)", done: true },
          { label: "Industry co-development", done: false },
          { label: "District rollout", done: false },
        ],
        industryPartner: "Tata Steel Foundation (funding committed)",
        rating: 4.6,
      },
      {
        id: "t2",
        name: "Team FloodWatch",
        problem: "Swarnarekha basin flood early-warning network",
        sector: "Disaster Management",
        mentor: "Dr. M. Iqbal, Dept. of ECE",
        members: ["Kabir Anand", "Sneha Toppo", "Aditya Verma"],
        status: "Deployed",
        progress: 100,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Sensor network prototype", done: true },
          { label: "NDMA-aligned pilot", done: true },
          { label: "District deployment", done: true },
          { label: "Post-deployment impact review", done: true },
        ],
        industryPartner: "L&T Construction (equipment support)",
        rating: 4.9,
      },
      {
        id: "t3",
        name: "Team RoadSight",
        problem: "Drone-based pothole & drainage mapping",
        sector: "Urban Infrastructure",
        mentor: "Dr. A. Kerketta, Dept. of Civil Engg.",
        members: ["Neha Kumari", "Suraj Mahto"],
        status: "Completed",
        progress: 100,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Drone survey pipeline", done: true },
          { label: "Municipal handoff", done: true },
          { label: "Impact review", done: true },
        ],
        industryPartner: "—",
        rating: 4.3,
      },
    ],
  },
  {
    id: "u2",
    name: "HealthCare",
    district: "Dhanbad",
    established: 2006,
    specializations: ["Energy", "Disaster Management", "Urban Infrastructure"],
    resourceTags: ["Mining & Geo-hazard Lab", "Materials Testing", "Remote Sensing Centre"],
    rating: 4.8,
    rank: 2,
    score: 918,
    activeTeams: 5,
    activeStudents: 33,
    completedProjects: 22,
    ongoingProjects: 5,
    nepCredits: "8 credits · Research Internship",
    color: C.navy,
    pastProjects: [
      { title: "Land subsidence early-warning for mining belts", sector: "Disaster Management", year: 2025, status: "Deployed", impact: "Monitoring 4 subsidence-prone zones" },
      { title: "Solar micro-grid for off-grid hamlets", sector: "Energy", year: 2024, status: "Deployed", impact: "3 hamlets electrified" },
    ],
    achievements: [{ title: "Best Industry Collaboration — SIH Alumni Meet", year: 2024 }],
    teams: [
      {
        id: "t4",
        name: "Team TerraGuard",
        problem: "Land subsidence risk in Jharia coalfield settlements",
        sector: "Disaster Management",
        mentor: "Dr. P. Chatterjee, Dept. of Mining Engg.",
        members: ["Ritika Das", "Aman Kujur", "Farhan Ansari", "Ishita Roy"],
        status: "In Progress",
        progress: 55,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Ground sensor prototype", done: true },
          { label: "District alignment", done: false },
          { label: "Pilot deployment", done: false },
        ],
        industryPartner: "Coal India CSR Cell (in discussion)",
        rating: 4.5,
      },
      {
        id: "t5",
        name: "Team SunGrid",
        problem: "Off-grid solar micro-grid for remote hamlets",
        sector: "Energy",
        mentor: "Dr. V. Nanda, Dept. of Electrical Engg.",
        members: ["Karan Mehta", "Simran Kaur"],
        status: "Deployed",
        progress: 100,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Prototype", done: true },
          { label: "Pilot", done: true },
          { label: "Deployment", done: true },
        ],
        industryPartner: "Tata Power (funded)",
        rating: 4.9,
      },
    ],
  },
  {
    id: "u3",
    name: "Water & Sanitation",
    district: "Jamshedpur",
    established:2012,
    specializations: ["Urban Infrastructure", "Energy", "Water"],
    resourceTags: ["Structural Lab", "Robotics Cell", "Water Testing Facility"],
    rating: 4.5,
    rank: 3,
    score: 861,
    activeTeams: 4,
    activeStudents: 27,
    completedProjects: 14,
    ongoingProjects: 4,
    nepCredits: "6 credits · Capstone Project",
    color: C.green,
    pastProjects: [
      { title: "Smart streetlight fault-reporting network", sector: "Urban Infrastructure", year: 2025, status: "Deployed", impact: "Cut repair time from 9 days to 36 hrs" },
      { title: "Community waste segregation tracker", sector: "Urban Infrastructure", year: 2024, status: "Completed", impact: "Piloted in 2 wards" },
    ],
    achievements: [{ title: "Runner-up — National Smart City Hackathon", year: 2025 }],
    teams: [
      {
        id: "t6",
        name: "Team LumenGrid",
        problem: "Streetlight outage reporting & auto-dispatch",
        sector: "Urban Infrastructure",
        mentor: "Dr. R. Sinha, Dept. of Electrical Engg.",
        members: ["Vivek Anand", "Pooja Mahato", "Zara Khan"],
        status: "Deployed",
        progress: 100,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Prototype", done: true },
          { label: "Municipal pilot", done: true },
          { label: "City-wide rollout", done: true },
        ],
        industryPartner: "Tata Steel Utilities",
        rating: 4.7,
      },
      {
        id: "t7",
        name: "Team ReCycle",
        problem: "Community waste segregation & collection tracker",
        sector: "Urban Infrastructure",
        mentor: "Dr. N. Bose, Dept. of Civil Engg.",
        members: ["Ayesha Parveen", "Rahul Toppo"],
        status: "Proposal Review",
        progress: 20,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Proposal submitted", done: true },
          { label: "Faculty & industry review", done: false },
          { label: "Pilot", done: false },
        ],
        industryPartner: "—",
        rating: 4.1,
      },
    ],
  },
  {
    id: "u4",
    name: "Infrastructure & Transport",
    district: "Ranchi",
    established: 2009,
    specializations: ["Agriculture", "Healthcare", "Water"],
    resourceTags: ["Agri-Biotech Lab", "Community Health Unit"],
    rating: 4.3,
    rank: 4,
    score: 795,
    activeTeams: 3,
    activeStudents: 19,
    completedProjects: 9,
    ongoingProjects: 3,
    nepCredits: "4 credits · Field Research",
    color: C.amber,
    pastProjects: [
      { title: "Crop advisory chatbot in Santali & Hindi", sector: "Agriculture", year: 2025, status: "Deployed", impact: "2,400 farmers onboarded" },
    ],
    achievements: [{ title: "Featured — NEP Innovation Showcase 2025", year: 2025 }],
    teams: [
      {
        id: "t8",
        name: "Team KhetiMitra",
        problem: "Regional-language crop advisory for smallholder farmers",
        sector: "Agriculture",
        mentor: "Dr. L. Murmu, Dept. of Agri Sciences",
        members: ["Sonal Baraik", "Manoj Kisku", "Deepa Hansda"],
        status: "Deployed",
        progress: 100,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Prototype (voice + SMS)", done: true },
          { label: "Pilot — 5 villages", done: true },
          { label: "District scale-up", done: true },
        ],
        industryPartner: "ITC Agri-Business Division",
        rating: 4.8,
      },
    ],
  },
  {
    id: "u5",
    name: "Waste Management",
    district: "Ranchi",
    established: 2010,
    specializations: ["Healthcare", "Disaster Management"],
    resourceTags: ["Public Health Data Cell", "Social Innovation Lab"],
    rating: 4.2,
    rank: 5,
    score: 742,
    activeTeams: 2,
    activeStudents: 12,
    completedProjects: 6,
    ongoingProjects: 2,
    nepCredits: "4 credits · Community Practicum",
    color: C.red,
    pastProjects: [
      { title: "Mobile health-camp scheduling for tribal blocks", sector: "Healthcare", year: 2024, status: "Completed", impact: "18 camps scheduled, 2,100 patients" },
    ],
    achievements: [],
    teams: [
      {
        id: "t9",
        name: "Team CareRoute",
        problem: "Mobile health-camp scheduling in tribal blocks",
        sector: "Healthcare",
        mentor: "Dr. T. Ekka, Dept. of Social Work",
        members: ["Aarav Lakra", "Meenal Soren"],
        status: "In Progress",
        progress: 40,
        milestones: [
          { label: "Problem validated", done: true },
          { label: "Scheduling prototype", done: true },
          { label: "Pilot camps", done: false },
          { label: "District handoff", done: false },
        ],
        industryPartner: "—",
        rating: 4.0,
      },
    ],
  },
];

const RECENT_ACHIEVEMENTS = [
  {
    id: "a1",
    team: "Team FloodWatch",
    university: "R.M.K. Engineering College",
    text: "Flood early-warning sensors deployed across the Swarnarekha basin, reaching 14 villages ahead of monsoon.",
    partner: "L&T Construction",
    date: "2 days ago",
    type: "Deployment",
  },
  {
    id: "a2",
    team: "Team SunGrid",
    university: "R.M.K. Engineering College",
    text: "Solar micro-grid fully funded and commissioned for 3 off-grid hamlets near Dhanbad.",
    partner: "Tata Power",
    date: "5 days ago",
    type: "Funding closed",
  },
  {
    id: "a3",
    team: "Team KhetiMitra",
    university: "R.M.K. Engineering College",
    text: "Crop advisory chatbot crossed 2,400 registered farmers, now expanding to two more districts.",
    partner: "ITC Agri-Business Division",
    date: "1 week ago",
    type: "Milestone hit",
  },
  {
    id: "a4",
    team: "Team LumenGrid",
    university: "R.M.K. Engineering College",
    text: "Streetlight fault-reporting network approved for city-wide rollout after successful ward pilot.",
    partner: "Tata Steel Utilities",
    date: "1 week ago",
    type: "Scale-up",
  },
  {
    id: "a5",
    team: "Team AquaSense",
    university: "R.M.K. Engineering College",
    text: "Field pilot across 30 borewells complete — Tata Steel Foundation has committed co-development funding.",
    partner: "Tata Steel Foundation",
    date: "2 weeks ago",
    type: "Funding committed",
  },
];

const NOTIFICATIONS = [
  { id: "n1", text: "New high-severity report routed to your Disaster Management queue.", time: "10m ago", unread: true },
  { id: "n2", text: "Tata Steel Foundation responded to Team AquaSense's funding request.", time: "1h ago", unread: true },
  { id: "n3", text: "NEP credit mapping approved for Team FloodWatch's project.", time: "Yesterday", unread: false },
];

const ASSIGNED_PROBLEMS = [
  {
    id: "p1",
    title: "Riverbank erosion threatening 3 hamlets near Sahibganj",
    sectors: ["Disaster Management", "Urban Infrastructure"],
    leadSector: "Disaster Management",
    district: "Sahibganj",
    severity: "High",
    disasterFastLane: true,
    status: "Unassigned",
    reportedAgo: "40 mins ago",
    reportCount: 27,
    suggestedUniversity: "u1",
    description: "AI clustering merged 27 citizen reports into one confirmed erosion cluster along the Ganga floodplain. Flagged for the disaster fast-lane given proximity to a monsoon-risk zone.",
  },
  {
    id: "p2",
    title: "Recurring borewell contamination, Khunti block",
    sectors: ["Water", "Healthcare"],
    leadSector: "Water",
    district: "Khunti",
    severity: "Medium",
    disasterFastLane: false,
    status: "Team Forming",
    reportedAgo: "3 hrs ago",
    reportCount: 14,
    suggestedUniversity: "u1",
    description: "Multi-sector problem — water quality and reported illness both scored above the 40% confidence threshold. Routed to Water as lead, Healthcare looped in as collaborator.",
  },
  {
    id: "p3",
    title: "Crop advisory gap for millet farmers, Gumla district",
    sectors: ["Agriculture"],
    leadSector: "Agriculture",
    district: "Gumla",
    severity: "Low",
    disasterFastLane: false,
    status: "In Review",
    reportedAgo: "Yesterday",
    reportCount: 6,
    suggestedUniversity: "u4",
    description: "Community organization submission requesting localized, voice-based advisory content — capability match suggests the Agri-Biotech Lab team.",
  },
  {
    id: "p4",
    title: "Streetlight outage cluster, East Jamshedpur",
    sectors: ["Urban Infrastructure"],
    leadSector: "Urban Infrastructure",
    district: "Jamshedpur",
    severity: "Low",
    disasterFastLane: false,
    status: "Unassigned",
    reportedAgo: "2 days ago",
    reportCount: 9,
    suggestedUniversity: "u3",
    description: "Deduplicated from 9 raw reports into a single outage cluster. No safety escalation needed — routed for standard university pipeline.",
  },
  {
    id: "p5",
    title: "Landslide risk near Jharia coalfield settlement",
    sectors: ["Disaster Management"],
    leadSector: "Disaster Management",
    district: "Dhanbad",
    severity: "High",
    disasterFastLane: true,
    status: "Team Forming",
    reportedAgo: "5 hrs ago",
    reportCount: 19,
    suggestedUniversity: "u2",
    description: "Seasonal risk score boosted due to monsoon proximity. District disaster management authority notified in parallel with university routing.",
  },
];

const PROPOSALS = [
  {
    id: "pr1",
    team: "Team AquaSense",
    university: "R.M.K. Engineering College",
    problem: "Borewell water contamination reports (Ranchi rural belt)",
    status: "Under Review",
    budgetAsk: "₹4.2L",
    timeline: "5 months",
    submittedAgo: "3 days ago",
  },
  {
    id: "pr2",
    team: "Team ReCycle",
    university: "R.M.K. Engineering College",
    problem: "Community waste segregation & collection tracker",
    status: "Draft",
    budgetAsk: "₹1.8L",
    timeline: "3 months",
    submittedAgo: "Not yet submitted",
  },
  {
    id: "pr3",
    team: "Team TerraGuard",
    university: "R.M.K. Engineering College",
    problem: "Land subsidence risk in Jharia coalfield settlements",
    status: "Needs Revision",
    budgetAsk: "₹6.5L",
    timeline: "8 months",
    submittedAgo: "1 week ago",
  },
  {
    id: "pr4",
    team: "Team CareRoute",
    university: "R.M.K. Engineering College",
    problem: "Mobile health-camp scheduling in tribal blocks",
    status: "Approved",
    budgetAsk: "₹2.1L",
    timeline: "4 months",
    submittedAgo: "2 weeks ago",
  },
  {
    id: "pr5",
    team: "Team FloodWatch",
    university: "R.M.K. Engineering College",
    problem: "Swarnarekha basin flood early-warning network",
    status: "Approved",
    budgetAsk: "₹9.4L",
    timeline: "6 months",
    submittedAgo: "5 weeks ago",
  },
];

const INDUSTRY_REQUESTS = [
  {
    id: "ir1",
    direction: "incoming",
    company: "Tata Steel Foundation",
    team: "Team AquaSense",
    university: "R.M.K. Engineering College",
    message: "Interested in co-developing the borewell test kit after the 30-borewell pilot results — proposing partial funding + prototyping support.",
    status: "Pending",
    date: "Today",
  },
  {
    id: "ir2",
    direction: "incoming",
    company: "Coal India CSR Cell",
    team: "Team TerraGuard",
    university: "R.M.K. Engineering College",
    message: "Requesting a joint review call before committing CSR funds to the subsidence sensor rollout.",
    status: "Pending",
    date: "Yesterday",
  },
  {
    id: "ir3",
    direction: "outgoing",
    company: "ITC Agri-Business Division",
    team: "Team KhetiMitra",
    university: "R.M.K. Engineering College",
    message: "Requested mentorship + distribution support for the district-wide scale-up of the crop advisory line.",
    status: "Accepted",
    date: "4 days ago",
  },
  {
    id: "ir4",
    direction: "outgoing",
    company: "L&T Construction",
    team: "Team FloodWatch",
    university: "R.M.K. Engineering College",
    message: "Requested equipment support for the second phase of the sensor network expansion.",
    status: "Accepted",
    date: "1 week ago",
  },
  {
    id: "ir5",
    direction: "incoming",
    company: "Tata Power",
    team: "Team SunGrid",
    university: "R.M.K. Engineering College",
    message: "Proposing full funding for a second micro-grid site after the first hamlet deployment succeeded.",
    status: "Declined",
    date: "2 weeks ago",
  },
];

const NEP_CREDIT_LOG = [
  {
    id: "nc1",
    team: "Team FloodWatch",
    university: "R.M.K. Engineering College",
    project: "Swarnarekha basin flood early-warning network",
    creditType: "Project-Based Learning",
    credits: 6,
    semester: "Odd 2025",
    approver: "Dr. M. Iqbal",
    status: "Approved",
  },
  {
    id: "nc2",
    team: "Team TerraGuard",
    university: "R.M.K. Engineering College",
    project: "Land subsidence risk in Jharia coalfield settlements",
    creditType: "Research Internship",
    credits: 8,
    semester: "Odd 2025",
    approver: "Dr. P. Chatterjee",
    status: "Pending Review",
  },
  {
    id: "nc3",
    team: "Team LumenGrid",
    university: "R.M.K. Engineering College",
    project: "Streetlight outage reporting & auto-dispatch",
    creditType: "Capstone Project",
    credits: 6,
    semester: "Even 2025",
    approver: "Dr. R. Sinha",
    status: "Approved",
  },
  {
    id: "nc4",
    team: "Team KhetiMitra",
    university: "R.M.K. Engineering College",
    project: "Regional-language crop advisory for smallholder farmers",
    creditType: "Field Research",
    credits: 4,
    semester: "Even 2025",
    approver: "Dr. L. Murmu",
    status: "Approved",
  },
  {
    id: "nc5",
    team: "Team CareRoute",
    university: "R.M.K. Engineering College",
    project: "Mobile health-camp scheduling in tribal blocks",
    creditType: "Community Practicum",
    credits: 4,
    semester: "Odd 2025",
    approver: "Dr. T. Ekka",
    status: "Pending Review",
  },
];

/* =========================================================================
   SMALL HELPERS
   ========================================================================= */
function statusColor(status) {
  switch (status) {
    case "Deployed":
      return { bg: "#EAF5EA", fg: "#4C8C3F" };
    case "In Progress":
      return { bg: "#FFF3E4", fg: "#B4711F" };
    case "Completed":
      return { bg: C.lightTeal, fg: C.teal };
    case "Proposal Review":
    case "Under Review":
    case "Pending Review":
      return { bg: "#F1EEFB", fg: "#6C57C4" };
    case "Draft":
    case "Unassigned":
      return { bg: "#EEF1F4", fg: C.textSecondary };
    case "Team Forming":
    case "In Review":
    case "Pending":
      return { bg: "#FFF3E4", fg: "#B4711F" };
    case "Needs Revision":
    case "Declined":
      return { bg: "#FBEAEA", fg: C.red };
    case "Approved":
    case "Accepted":
      return { bg: "#EAF5EA", fg: "#4C8C3F" };
    default:
      return { bg: "#EEE", fg: "#666" };
  }
}

function severityColor(severity) {
  switch (severity) {
    case "High":
      return { bg: "#FBEAEA", fg: C.red };
    case "Medium":
      return { bg: "#FFF3E4", fg: "#B4711F" };
    case "Low":
      return { bg: "#EAF5EA", fg: "#4C8C3F" };
    default:
      return { bg: "#EEE", fg: "#666" };
  }
}

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/* =========================================================================
   MAIN COMPONENT
   ========================================================================= */
export default function UniversityPage() {
  const [view, setView] = useState("home"); // home | directory | detail | team | problems | proposals | industry | nepcredits
  const [selectedUniId, setSelectedUniId] = useState(null);
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [detailTab, setDetailTab] = useState("overview"); // overview | teams | history | achievements
  const [search, setSearch] = useState("");
  const [sectorFilter, setSectorFilter] = useState("All");
  const [notifOpen, setNotifOpen] = useState(false);

  const selectedUni = useMemo(
    () => UNIVERSITIES.find((u) => u.id === selectedUniId) || null,
    [selectedUniId]
  );
  const selectedTeam = useMemo(
    () => selectedUni?.teams.find((t) => t.id === selectedTeamId) || null,
    [selectedUni, selectedTeamId]
  );

  const filteredUniversities = useMemo(() => {
    return UNIVERSITIES.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.district.toLowerCase().includes(search.toLowerCase());
      const matchesSector =
        sectorFilter === "All" || u.specializations.includes(sectorFilter);
      return matchesSearch && matchesSector;
    }).sort((a, b) => a.rank - b.rank);
  }, [search, sectorFilter]);

  const totalActiveStudents = UNIVERSITIES.reduce((s, u) => s + u.activeStudents, 0);
  const totalActiveTeams = UNIVERSITIES.reduce((s, u) => s + u.activeTeams, 0);

  function openUniversity(id) {
    setSelectedUniId(id);
    setDetailTab("overview");
    setView("detail");
  }
  function openTeam(id) {
    setSelectedTeamId(id);
    setView("team");
  }
  function backFromTeam() {
    setSelectedTeamId(null);
    setView("detail");
    setDetailTab("teams");
  }
  function backFromDetail() {
    setSelectedUniId(null);
    setView("directory");
  }

  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;

  return (
    <div style={styles.shell}>
      <style>{css}</style>

      {/* ---------------- SIDEBAR ---------------- */}
      <aside style={styles.sidebar}>
        <div style={styles.brandRow}>
          <div style={styles.logoMark}>CL</div>
          <div>
            <div style={styles.brandName}>CivicLink</div>
            <div style={styles.brandSub}>University Console</div>
          </div>
        </div>

        <nav style={styles.nav}>
          <NavItem
            icon={<Sparkles size={17} />}
            label="Dashboard"
            active={view === "home"}
            onClick={() => setView("home")}
          />
          <NavItem
            icon={<Building2 size={17} />}
            label="University Directory"
            active={view === "directory" || view === "detail" || view === "team"}
            onClick={() => setView("directory")}
          />
          <NavItem
            icon={<Target size={17} />}
            label="Assigned Problems"
            active={view === "problems"}
            onClick={() => setView("problems")}
          />
          <NavItem
            icon={<Briefcase size={17} />}
            label="Proposals"
            active={view === "proposals"}
            onClick={() => setView("proposals")}
          />
          <NavItem
            icon={<Handshake size={17} />}
            label="Industry Requests"
            active={view === "industry"}
            onClick={() => setView("industry")}
          />
          <NavItem
            icon={<BookOpen size={17} />}
            label="NEP Credit Log"
            active={view === "nepcredits"}
            onClick={() => setView("nepcredits")}
          />
        </nav>

        <div style={styles.sidebarFooter}>
          <div style={styles.footerNote}>
            Prototype module — wiring to shared Firestore backend happens after
            merge.
          </div>
        </div>
      </aside>

      {/* ---------------- MAIN ---------------- */}
      <div style={styles.main}>
        {/* TOP BAR */}
        <header style={styles.topbar}>
          <div>
            <Breadcrumb
              view={view}
              uni={selectedUni}
              team={selectedTeam}
              onHome={() => setView("home")}
              onDirectory={() => setView("directory")}
              onUni={() => setView("detail")}
            />
          </div>
          <div style={styles.topbarRight}>
            <div style={styles.searchBox}>
              <Search size={15} color={C.textSecondary} />
              <input
                placeholder="Search universities, teams, districts…"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={styles.searchInput}
              />
            </div>
            <div style={{ position: "relative" }}>
              <button
                style={styles.bellBtn}
                onClick={() => setNotifOpen((v) => !v)}
                aria-label="Notifications"
              >
                <Bell size={18} color={C.navy} />
                {unreadCount > 0 && <span style={styles.bellDot}>{unreadCount}</span>}
              </button>
              {notifOpen && (
                <div style={styles.notifPanel}>
                  <div style={styles.notifHeader}>
                    <span style={{ fontWeight: 700, fontSize: 13 }}>Notifications</span>
                    <X size={14} style={{ cursor: "pointer" }} onClick={() => setNotifOpen(false)} />
                  </div>
                  {NOTIFICATIONS.map((n) => (
                    <div key={n.id} style={styles.notifItem}>
                      <div style={{ ...styles.notifDot, opacity: n.unread ? 1 : 0.15 }} />
                      <div>
                        <div style={{ fontSize: 12.5, color: C.textPrimary, lineHeight: 1.4 }}>{n.text}</div>
                        <div style={{ fontSize: 11, color: C.textSecondary, marginTop: 2 }}>{n.time}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div style={styles.avatar}>MU</div>
          </div>
        </header>

        {/* CONTENT */}
        <main style={styles.content}>
          {view === "home" && (
            <HomeView
              onOpenDirectory={() => setView("directory")}
              onOpenUniversity={openUniversity}
              totalActiveStudents={totalActiveStudents}
              totalActiveTeams={totalActiveTeams}
            />
          )}

          {view === "directory" && (
            <DirectoryView
              universities={filteredUniversities}
              search={search}
              setSearch={setSearch}
              sectorFilter={sectorFilter}
              setSectorFilter={setSectorFilter}
              onOpen={openUniversity}
            />
          )}

          {view === "detail" && selectedUni && (
            <UniversityDetailView
              uni={selectedUni}
              tab={detailTab}
              setTab={setDetailTab}
              onBack={backFromDetail}
              onOpenTeam={openTeam}
            />
          )}

          {view === "team" && selectedTeam && selectedUni && (
            <TeamDetailView team={selectedTeam} uni={selectedUni} onBack={backFromTeam} />
          )}

          {view === "problems" && <AssignedProblemsView />}

          {view === "proposals" && <ProposalsView />}

          {view === "industry" && <IndustryRequestsView />}

          {view === "nepcredits" && <NepCreditLogView />}
        </main>
      </div>
    </div>
  );
}

/* =========================================================================
   NAV / BREADCRUMB
   ========================================================================= */
function NavItem({ icon, label, active, onClick, disabled }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      style={{
        ...styles.navItem,
        ...(active ? styles.navItemActive : {}),
        ...(disabled ? styles.navItemDisabled : {}),
      }}
    >
      {icon}
      <span>{label}</span>
      {disabled && <span style={styles.soonTag}>soon</span>}
    </button>
  );
}

const STANDALONE_VIEW_LABELS = {
  problems: "Assigned Problems",
  proposals: "Proposals",
  industry: "Industry Requests",
  nepcredits: "NEP Credit Log",
};

function Breadcrumb({ view, uni, team, onHome, onDirectory, onUni }) {
  const crumbs = [{ label: "Dashboard", onClick: onHome }];
  if (STANDALONE_VIEW_LABELS[view]) {
    crumbs.push({ label: STANDALONE_VIEW_LABELS[view] });
    return renderCrumbs(crumbs);
  }
  if (view !== "home") crumbs.push({ label: "Universities", onClick: onDirectory });
  if (uni && (view === "detail" || view === "team")) crumbs.push({ label: uni.name, onClick: onUni });
  if (team && view === "team") crumbs.push({ label: team.name });

  return renderCrumbs(crumbs);
}

function renderCrumbs(crumbs) {
  return (
    <div style={styles.breadcrumb}>
      {crumbs.map((c, i) => (
        <span key={i} style={{ display: "flex", alignItems: "center" }}>
          {i > 0 && <ChevronRight size={13} color={C.textSecondary} style={{ margin: "0 6px" }} />}
          {c.onClick ? (
            <span style={styles.crumbLink} onClick={c.onClick}>
              {c.label}
            </span>
          ) : (
            <span style={styles.crumbCurrent}>{c.label}</span>
          )}
        </span>
      ))}
    </div>
  );
}

/* =========================================================================
   HOME / DASHBOARD VIEW
   ========================================================================= */
function HomeView({ onOpenDirectory, onOpenUniversity, totalActiveStudents, totalActiveTeams }) {
  const leaderboard = [...UNIVERSITIES].sort((a, b) => a.rank - b.rank).slice(0, 5);

  return (
    <div>
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.h1}>Welcome Back R.M.K. Engineering College👋</h1>
          <p style={styles.subhead}>Here's how the university network is moving this week.</p>
        </div>
        <button style={styles.primaryBtn} onClick={onOpenDirectory}>
          <Building2 size={15} /> Browse university directory
        </button>
      </div>

      {/* STAT STRIP */}
      <div style={styles.statGrid}>
        <StatCard icon={<Building2 size={17} />} label="Patents Recognized" value={UNIVERSITIES.length} accent={C.navy} />
        <StatCard icon={<Users size={17} />} label="Active students" value={totalActiveStudents} delta="+6 this week" accent={C.teal} />
        <StatCard icon={<Target size={17} />} label="Active teams" value={totalActiveTeams} delta="+2 this week" accent={C.green} />
        <StatCard icon={<Trophy size={17} />} label="Projects deployed" value={UNIVERSITIES.reduce((s, u) => s + u.completedProjects, 0)} accent={C.amber} />
      </div>

      <div style={styles.twoCol}>
        {/* LEFT: Recent achievements feed */}
        <section style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Award size={16} color={C.teal} />
              <h2 style={styles.panelTitle}>Recent student achievements in industry</h2>
            </div>
            <span style={styles.panelHint}>Live from project milestone updates</span>
          </div>

          <div style={styles.achievementList}>
            {RECENT_ACHIEVEMENTS.map((a) => (
              <div key={a.id} style={styles.achievementCard}>
                <div style={styles.achievementIcon}>
                  <Sparkles size={15} color={C.teal} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={styles.achievementTopRow}>
                    <span style={styles.achievementTeam}>{a.team}</span>
                    <span style={styles.achievementUni}>· {a.university}</span>
                    <span style={styles.achievementTypeTag}>{a.type}</span>
                  </div>
                  <p style={styles.achievementText}>{a.text}</p>
                  <div style={styles.achievementMeta}>
                    <Handshake size={12} color={C.textSecondary} />
                    <span>{a.partner}</span>
                    <span style={{ margin: "0 6px" }}>·</span>
                    <span>{a.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT: Active Teams + leaderboard */}
        <section style={styles.rightCol}>
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div style={styles.panelTitleRow}>
                <Users size={16} color={C.teal} />
                <h2 style={styles.panelTitle}>Active Teams</h2>
              </div>
            </div>
            <div style={styles.activeList}>
              {UNIVERSITIES.map((u) => (
                <div key={u.id} style={styles.activeRow} onClick={() => onOpenUniversity(u.id)}>
                  <div style={{ ...styles.uniBadge, background: u.color }}>{initials(u.name)}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={styles.activeRowTitle}>{u.name}</div>
                    <div style={styles.activeRowSub}>
                      {u.activeTeams} active teams · {u.activeStudents} students
                    </div>
                  </div>
                  <ArrowUpRight size={14} color={C.textSecondary} />
                </div>
              ))}
            </div>
          </div>

         
        </section>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, delta, accent }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: `${accent}1A`, color: accent }}>{icon}</div>
      <div>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statLabel}>{label}</div>
        {delta && <div style={styles.statDelta}>{delta}</div>}
      </div>
    </div>
  );
}

/* =========================================================================
   DIRECTORY VIEW
   ========================================================================= */
function DirectoryView({ universities, search, setSearch, sectorFilter, setSectorFilter, onOpen }) {
  return (
    <div>
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.h1}>University directory</h1>
          <p style={styles.subhead}>{universities.length} institutions matched · tap a card for the full profile</p>
        </div>
      </div>

      <div style={styles.filterRow}>
        <div style={styles.searchBoxLarge}>
          <Search size={15} color={C.textSecondary} />
          <input
            placeholder="Search by university or district…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>
        <div style={styles.chipRow}>
          <Chip label="All sectors" active={sectorFilter === "All"} onClick={() => setSectorFilter("All")} />
          {SECTORS.map((s) => (
            <Chip key={s} label={s} active={sectorFilter === s} onClick={() => setSectorFilter(s)} />
          ))}
        </div>
      </div>

      <div style={styles.uniGrid}>
        {universities.map((u) => (
          <div key={u.id} style={styles.uniCard} onClick={() => onOpen(u.id)}>
            <div style={styles.uniCardTop}>
              <div style={{ ...styles.uniBadge, background: u.color, width: 46, height: 46, fontSize: 15 }}>
                {initials(u.name)}
              </div>
              <div style={styles.rankPill}>Rank #{u.rank}</div>
            </div>
            <div style={styles.uniCardName}>{u.name}</div>
            <div style={styles.uniCardMeta}>
              <MapPin size={12} /> {u.district}, Jharkhand · est. {u.established}
            </div>
            <div style={styles.tagRow}>
              {u.specializations.map((s) => (
                <span key={s} style={styles.sectorTag}>{s}</span>
              ))}
            </div>
            <div style={styles.uniCardFooter}>
              <span style={styles.footerStat}>
                <Star size={13} color={C.amber} /> {u.rating}
              </span>
              <span style={styles.footerStat}>
                <Users size={13} /> {u.activeStudents} students
              </span>
              <span style={styles.footerStat}>
                <Target size={13} /> {u.activeTeams} teams
              </span>
            </div>
          </div>
        ))}
        {universities.length === 0 && (
          <div style={styles.emptyState}>No universities match that search — try a different district or sector.</div>
        )}
      </div>
    </div>
  );
}

function Chip({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{ ...styles.chip, ...(active ? styles.chipActive : {}) }}>
      {label}
    </button>
  );
}

/* =========================================================================
   UNIVERSITY DETAIL VIEW
   ========================================================================= */
function UniversityDetailView({ uni, tab, setTab, onBack, onOpenTeam }) {
  return (
    <div>
      <button style={styles.backBtn} onClick={onBack}>
        <ChevronLeft size={15} /> Back to directory
      </button>

      {/* PROFILE HEADER */}
      <div style={styles.profileHeader}>
        <div style={{ ...styles.uniBadge, background: uni.color, width: 64, height: 64, fontSize: 20, borderRadius: 16 }}>
          {initials(uni.name)}
        </div>
        <div style={{ flex: 1 }}>
          <div style={styles.profileTitleRow}>
            <h1 style={styles.h1}>{uni.name}</h1>
            <div style={styles.rankPillLg}>
              <Trophy size={13} /> Rank #{uni.rank} network-wide
            </div>
          </div>
          <div style={styles.profileMetaRow}>
            <span><MapPin size={13} /> {uni.district}, Jharkhand</span>
            <span>Established {uni.established}</span>
            <span><Star size={13} color={C.amber} /> {uni.rating} rating</span>
          </div>
          <div style={styles.tagRow}>
            {uni.specializations.map((s) => (
              <span key={s} style={styles.sectorTag}>{s}</span>
            ))}
          </div>
        </div>
      </div>

      {/* QUICK STATS */}
      <div style={styles.statGrid}>
        <StatCard icon={<Target size={17} />} label="Active teams" value={uni.activeTeams} accent={C.teal} />
        <StatCard icon={<Users size={17} />} label="Active students" value={uni.activeStudents} accent={C.navy} />
        <StatCard icon={<CheckCircle2 size={17} />} label="Projects deployed" value={uni.completedProjects} accent={C.green} />
        <StatCard icon={<BookOpen size={17} />} label="NEP credit track" value={uni.nepCredits} accent={C.amber} small />
      </div>

      {/* TABS */}
      <div style={styles.tabRow}>
        {[
          { id: "overview", label: "Overview" },
          { id: "teams", label: `Teams (${uni.teams.length})` },
          { id: "history", label: "Past projects & history" },
          { id: "achievements", label: "Achievements" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            style={{ ...styles.tabBtn, ...(tab === t.id ? styles.tabBtnActive : {}) }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Wrench size={16} color={C.teal} />
              <h2 style={styles.panelTitle}>Resources & capability tags</h2>
            </div>
            <span style={styles.panelHint}>Used for capability-based problem routing</span>
          </div>
          <div style={styles.tagRow}>
            {uni.resourceTags.map((r) => (
              <span key={r} style={styles.resourceTag}>
                <FlaskConical size={12} /> {r}
              </span>
            ))}
          </div>
          <div style={{ marginTop: 18 }}>
            <button style={styles.primaryBtnGhost}>
              <Handshake size={14} /> Request industry partnership
            </button>
          </div>
        </div>
      )}

      {tab === "teams" && (
        <div style={styles.teamGrid}>
          {uni.teams.map((t) => {
            const sc = statusColor(t.status);
            return (
              <div key={t.id} style={styles.teamCard} onClick={() => onOpenTeam(t.id)}>
                <div style={styles.teamCardTop}>
                  <div style={styles.teamName}>{t.name}</div>
                  <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{t.status}</span>
                </div>
                <p style={styles.teamProblem}>{t.problem}</p>
                <div style={styles.progressTrack}>
                  <div style={{ ...styles.progressFill, width: `${t.progress}%`, background: uni.color }} />
                </div>
                <div style={styles.teamCardFooter}>
                  <span style={styles.footerStat}><Users size={12} /> {t.members.length} members</span>
                  <span style={styles.footerStat}><Star size={12} color={C.amber} /> {t.rating}</span>
                  <span style={styles.sectorTagSmall}>{t.sector}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {tab === "history" && (
        <div style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Clock size={16} color={C.teal} />
              <h2 style={styles.panelTitle}>Past project history</h2>
            </div>
          </div>
          <div style={styles.timeline}>
            {uni.pastProjects.map((p, i) => {
              const sc = statusColor(p.status);
              return (
                <div key={i} style={styles.timelineRow}>
                  <div style={styles.timelineDot} />
                  <div style={{ flex: 1 }}>
                    <div style={styles.timelineTopRow}>
                      <span style={styles.timelineTitle}>{p.title}</span>
                      <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{p.status}</span>
                    </div>
                    <div style={styles.timelineMeta}>{p.sector} · {p.year}</div>
                    <div style={styles.timelineImpact}>{p.impact}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {tab === "achievements" && (
        <div style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Award size={16} color={C.amber} />
              <h2 style={styles.panelTitle}>Institutional achievements</h2>
            </div>
          </div>
          {uni.achievements.length === 0 ? (
            <div style={styles.emptyState}>No institution-level awards logged yet — team achievements still count toward network ranking.</div>
          ) : (
            <div style={styles.achievementList}>
              {uni.achievements.map((a, i) => (
                <div key={i} style={styles.achievementCard}>
                  <div style={styles.achievementIcon}><Trophy size={15} color={C.amber} /></div>
                  <div>
                    <div style={styles.achievementText}>{a.title}</div>
                    <div style={styles.achievementMeta}>{a.year}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* =========================================================================
   TEAM DETAIL VIEW
   ========================================================================= */
function TeamDetailView({ team, uni, onBack }) {
  const sc = statusColor(team.status);
  return (
    <div>
      <button style={styles.backBtn} onClick={onBack}>
        <ChevronLeft size={15} /> Back to {uni.name} teams
      </button>

      <div style={styles.teamHeader}>
        <div>
          <div style={styles.teamHeaderTopRow}>
            <h1 style={styles.h1}>{team.name}</h1>
            <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{team.status}</span>
          </div>
          <p style={styles.subhead}>{team.problem}</p>
          <div style={styles.tagRow}>
            <span style={styles.sectorTag}>{team.sector}</span>
            <span style={styles.sectorTagOutline}>{uni.name}</span>
          </div>
        </div>
        <div style={styles.teamRatingBox}>
          <Star size={16} color={C.amber} />
          <span style={styles.teamRatingValue}>{team.rating}</span>
          <span style={styles.teamRatingLabel}>team rating</span>
        </div>
      </div>

      <div style={styles.twoCol}>
        <section style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Target size={16} color={C.teal} />
              <h2 style={styles.panelTitle}>Milestone tracker</h2>
            </div>
            <span style={styles.panelHint}>{team.progress}% complete</span>
          </div>
          <div style={styles.progressTrack}>
            <div style={{ ...styles.progressFill, width: `${team.progress}%`, background: uni.color }} />
          </div>
          <div style={styles.milestoneList}>
            {team.milestones.map((m, i) => (
              <div key={i} style={styles.milestoneRow}>
                <CheckCircle2 size={16} color={m.done ? C.green : C.border} fill={m.done ? "none" : "none"} />
                <span style={{ color: m.done ? C.textPrimary : C.textSecondary, textDecoration: m.done ? "none" : "none" }}>
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          <div style={styles.actionRow}>
            <button style={styles.primaryBtnGhost}><Briefcase size={14} /> Update proposal</button>
            <button style={styles.primaryBtn}><Handshake size={14} /> Request industry support</button>
          </div>
        </section>

        <section style={styles.rightCol}>
          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div style={styles.panelTitleRow}>
                <Users size={16} color={C.teal} />
                <h2 style={styles.panelTitle}>Team & mentor</h2>
              </div>
            </div>
            <div style={styles.mentorRow}>
              <div style={{ ...styles.uniBadge, background: uni.color }}>{initials(team.mentor.split(",")[0].replace("Dr. ", ""))}</div>
              <div>
                <div style={styles.activeRowTitle}>{team.mentor}</div>
                <div style={styles.activeRowSub}>Faculty mentor</div>
              </div>
            </div>
            <div style={styles.memberGrid}>
              {team.members.map((m) => (
                <div key={m} style={styles.memberChip}>
                  <div style={styles.memberAvatar}>{initials(m)}</div>
                  <span>{m}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={styles.panel}>
            <div style={styles.panelHead}>
              <div style={styles.panelTitleRow}>
                <Handshake size={16} color={C.green} />
                <h2 style={styles.panelTitle}>Industry partner</h2>
              </div>
            </div>
            <p style={{ fontSize: 13.5, color: C.textPrimary, margin: 0 }}>{team.industryPartner}</p>
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================================
   ASSIGNED PROBLEMS VIEW
   ========================================================================= */
function AssignedProblemsView() {
  const [severityFilter, setSeverityFilter] = useState("All");
  const filtered = ASSIGNED_PROBLEMS.filter(
    (p) => severityFilter === "All" || p.severity === severityFilter
  );
  const fastLaneCount = ASSIGNED_PROBLEMS.filter((p) => p.disasterFastLane).length;

  return (
    <div>
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.h1}>Assigned problems</h1>
          <p style={styles.subhead}>
            AI-triaged citizen reports routed to your network by category and capability match
          </p>
        </div>
      </div>

      <div style={styles.statGrid}>
        <StatCard icon={<Target size={17} />} label="Total assigned" value={ASSIGNED_PROBLEMS.length} accent={C.teal} />
        <StatCard icon={<Clock size={17} />} label="Awaiting a team" value={ASSIGNED_PROBLEMS.filter((p) => p.status === "Unassigned").length} accent={C.amber} />
        <StatCard icon={<Users size={17} />} label="Teams forming" value={ASSIGNED_PROBLEMS.filter((p) => p.status === "Team Forming").length} accent={C.navy} />
        <StatCard icon={<Sparkles size={17} />} label="Disaster fast-lane" value={fastLaneCount} accent={C.red} />
      </div>

      <div style={styles.chipRow}>
        {["All", "High", "Medium", "Low"].map((s) => (
          <Chip key={s} label={s === "All" ? "All severities" : s} active={severityFilter === s} onClick={() => setSeverityFilter(s)} />
        ))}
      </div>

      <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 14 }}>
        {filtered.map((p) => {
          const sc = severityColor(p.severity);
          const stc = statusColor(p.status);
          const suggestedUni = UNIVERSITIES.find((u) => u.id === p.suggestedUniversity);
          return (
            <div key={p.id} style={styles.problemCard}>
              {p.disasterFastLane && (
                <div style={styles.fastLaneBanner}>
                  <Sparkles size={13} /> Disaster fast-lane — escalated to district authorities in parallel
                </div>
              )}
              <div style={styles.problemTopRow}>
                <div style={{ flex: 1, minWidth: 220 }}>
                  <div style={styles.problemTitleRow}>
                    <span style={styles.teamName}>{p.title}</span>
                  </div>
                  <div style={styles.uniCardMeta}>
                    <MapPin size={12} /> {p.district}, Jharkhand · {p.reportedAgo} · {p.reportCount} reports clustered
                  </div>
                </div>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{p.severity} severity</span>
                  <span style={{ ...styles.statusTag, background: stc.bg, color: stc.fg }}>{p.status}</span>
                </div>
              </div>
              <p style={styles.teamProblem}>{p.description}</p>
              <div style={styles.tagRow}>
                {p.sectors.map((s) => (
                  <span key={s} style={s === p.leadSector ? styles.sectorTag : styles.sectorTagOutline}>
                    {s === p.leadSector ? `${s} · lead` : s}
                  </span>
                ))}
              </div>
              <div style={styles.problemFooter}>
                <span style={styles.footerStat}>
                  <GraduationCap size={13} /> Suggested match: {suggestedUni ? suggestedUni.name : "—"}
                </span>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={styles.primaryBtnGhostSmall}>View report cluster</button>
                  <button style={styles.primaryBtnSmall}>
                    <Users size={13} /> Form team
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div style={styles.emptyState}>No problems at this severity right now.</div>}
      </div>
    </div>
  );
}

/* =========================================================================
   PROPOSALS VIEW
   ========================================================================= */
function ProposalsView() {
  const [statusFilter, setStatusFilter] = useState("All");
  const statuses = ["All", "Draft", "Under Review", "Needs Revision", "Approved"];
  const filtered = PROPOSALS.filter((p) => statusFilter === "All" || p.status === statusFilter);

  return (
    <div>
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.h1}>Proposals</h1>
          <p style={styles.subhead}>Solution proposals submitted by student teams, tracked from draft to approval</p>
        </div>
        <button style={styles.primaryBtn}>
          <Briefcase size={15} /> Start new proposal
        </button>
      </div>

      <div style={styles.chipRow}>
        {statuses.map((s) => (
          <Chip key={s} label={s} active={statusFilter === s} onClick={() => setStatusFilter(s)} />
        ))}
      </div>

      <div style={styles.tableWrap}>
        <div style={styles.tableHeaderRow}>
          <span style={{ flex: 2 }}>Proposal</span>
          <span style={{ flex: 1 }}>University</span>
          <span style={{ width: 100 }}>Budget</span>
          <span style={{ width: 100 }}>Timeline</span>
          <span style={{ width: 140 }}>Status</span>
        </div>
        {filtered.map((p) => {
          const sc = statusColor(p.status);
          return (
            <div key={p.id} style={styles.tableRow}>
              <div style={{ flex: 2, minWidth: 200 }}>
                <div style={styles.activeRowTitle}>{p.team}</div>
                <div style={styles.activeRowSub}>{p.problem}</div>
              </div>
              <div style={{ flex: 1, fontSize: 12.5, color: C.textSecondary }}>{p.university}</div>
              <div style={{ width: 100, fontSize: 12.5, fontWeight: 700 }}>{p.budgetAsk}</div>
              <div style={{ width: 100, fontSize: 12.5, color: C.textSecondary }}>{p.timeline}</div>
              <div style={{ width: 140 }}>
                <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{p.status}</span>
                <div style={{ fontSize: 10.5, color: C.textSecondary, marginTop: 4 }}>{p.submittedAgo}</div>
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && <div style={styles.emptyState}>No proposals with that status.</div>}
      </div>
    </div>
  );
}

/* =========================================================================
   INDUSTRY REQUESTS VIEW
   ========================================================================= */
function IndustryRequestsView() {
  const incoming = INDUSTRY_REQUESTS.filter((r) => r.direction === "incoming");
  const outgoing = INDUSTRY_REQUESTS.filter((r) => r.direction === "outgoing");

  return (
    <div>
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.h1}>Industry requests</h1>
          <p style={styles.subhead}>Partnership requests between your teams and industry / CSR partners</p>
        </div>
      </div>

      <div style={styles.twoCol}>
        <section style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Handshake size={16} color={C.teal} />
              <h2 style={styles.panelTitle}>Incoming — from industry</h2>
            </div>
            <span style={styles.panelHint}>{incoming.filter((r) => r.status === "Pending").length} awaiting response</span>
          </div>
          <div style={styles.requestList}>
            {incoming.map((r) => {
              const sc = statusColor(r.status);
              return (
                <div key={r.id} style={styles.requestCard}>
                  <div style={styles.problemTopRow}>
                    <div>
                      <div style={styles.activeRowTitle}>{r.company}</div>
                      <div style={styles.activeRowSub}>{r.team} · {r.university}</div>
                    </div>
                    <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{r.status}</span>
                  </div>
                  <p style={styles.teamProblem}>{r.message}</p>
                  <div style={styles.problemFooter}>
                    <span style={styles.footerStat}>{r.date}</span>
                    {r.status === "Pending" && (
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={styles.primaryBtnGhostSmall}>Decline</button>
                        <button style={styles.primaryBtnSmall}>Accept</button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section style={styles.panel}>
          <div style={styles.panelHead}>
            <div style={styles.panelTitleRow}>
              <Briefcase size={16} color={C.navy} />
              <h2 style={styles.panelTitle}>Outgoing — from your teams</h2>
            </div>
          </div>
          <div style={styles.requestList}>
            {outgoing.map((r) => {
              const sc = statusColor(r.status);
              return (
                <div key={r.id} style={styles.requestCard}>
                  <div style={styles.problemTopRow}>
                    <div>
                      <div style={styles.activeRowTitle}>{r.company}</div>
                      <div style={styles.activeRowSub}>{r.team} · {r.university}</div>
                    </div>
                    <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{r.status}</span>
                  </div>
                  <p style={styles.teamProblem}>{r.message}</p>
                  <div style={styles.problemFooter}>
                    <span style={styles.footerStat}>{r.date}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}

/* =========================================================================
   NEP CREDIT LOG VIEW
   ========================================================================= */
function NepCreditLogView() {
  const totalCredits = NEP_CREDIT_LOG.reduce((s, n) => s + n.credits, 0);
  const approvedCount = NEP_CREDIT_LOG.filter((n) => n.status === "Approved").length;

  return (
    <div>
      <div style={styles.pageHead}>
        <div>
          <h1 style={styles.h1}>NEP credit log</h1>
          <p style={styles.subhead}>Academic credit mapping so faculty can count platform projects as coursework</p>
        </div>
      </div>

      <div style={styles.statGrid}>
        <StatCard icon={<BookOpen size={17} />} label="Total credits logged" value={totalCredits} accent={C.teal} />
        <StatCard icon={<CheckCircle2 size={17} />} label="Approved entries" value={approvedCount} accent={C.green} />
        <StatCard icon={<Clock size={17} />} label="Pending review" value={NEP_CREDIT_LOG.length - approvedCount} accent={C.amber} />
        <StatCard icon={<GraduationCap size={17} />} label="Teams credited" value={NEP_CREDIT_LOG.length} accent={C.navy} />
      </div>

      <div style={styles.tableWrap}>
        <div style={styles.tableHeaderRow}>
          <span style={{ flex: 2 }}>Team & project</span>
          <span style={{ flex: 1 }}>Credit type</span>
          <span style={{ width: 70 }}>Credits</span>
          <span style={{ width: 100 }}>Semester</span>
          <span style={{ width: 140 }}>Status</span>
        </div>
        {NEP_CREDIT_LOG.map((n) => {
          const sc = statusColor(n.status);
          return (
            <div key={n.id} style={styles.tableRow}>
              <div style={{ flex: 2, minWidth: 200 }}>
                <div style={styles.activeRowTitle}>{n.team}</div>
                <div style={styles.activeRowSub}>{n.project}</div>
              </div>
              <div style={{ flex: 1, fontSize: 12.5, color: C.textSecondary }}>{n.creditType}</div>
              <div style={{ width: 70, fontSize: 13, fontWeight: 800 }}>{n.credits}</div>
              <div style={{ width: 100, fontSize: 12.5, color: C.textSecondary }}>{n.semester}</div>
              <div style={{ width: 140 }}>
                <span style={{ ...styles.statusTag, background: sc.bg, color: sc.fg }}>{n.status}</span>
                <div style={{ fontSize: 10.5, color: C.textSecondary, marginTop: 4 }}>{n.approver}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================================
   STYLES
   ========================================================================= */
const styles = {
  shell: {
    display: "flex",
    minHeight: "100vh",
    background: C.bg,
    fontFamily: "'Manrope', 'Segoe UI', sans-serif",
    color: C.textPrimary,
  },
  sidebar: {
    width: 240,
    background: C.navy,
    color: "#fff",
    display: "flex",
    flexDirection: "column",
    padding: "22px 16px",
    flexShrink: 0,
  },
  brandRow: { display: "flex", alignItems: "center", gap: 10, padding: "0 6px 22px" },
  logoMark: {
    width: 34, height: 34, borderRadius: 10, background: C.teal,
    display: "flex", alignItems: "center", justifyContent: "center",
    fontWeight: 800, fontSize: 13,
  },
  brandName: { fontWeight: 800, fontSize: 15.5, letterSpacing: 0.2 },
  brandSub: { fontSize: 11, color: "#B7C4D6" },
  nav: { display: "flex", flexDirection: "column", gap: 3, marginTop: 6 },
  navItem: {
    display: "flex", alignItems: "center", gap: 10,
    padding: "10px 12px", borderRadius: 10, border: "none",
    background: "transparent", color: "#CBD6E4", fontSize: 13.5,
    cursor: "pointer", textAlign: "left", fontFamily: "inherit", fontWeight: 600,
  },
  navItemActive: { background: "rgba(255,255,255,0.12)", color: "#fff" },
  navItemDisabled: { opacity: 0.4, cursor: "default" },
  soonTag: { marginLeft: "auto", fontSize: 9.5, background: "rgba(255,255,255,0.12)", padding: "2px 6px", borderRadius: 6 },
  sidebarFooter: { marginTop: "auto", paddingTop: 20 },
  footerNote: { fontSize: 11, color: "#8FA0B8", lineHeight: 1.5, borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: 14 },

  main: { flex: 1, display: "flex", flexDirection: "column", minWidth: 0 },
  topbar: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    padding: "16px 28px", background: C.card, borderBottom: `1px solid ${C.border}`,
  },
  topbarRight: { display: "flex", alignItems: "center", gap: 14 },
  searchBox: {
    display: "flex", alignItems: "center", gap: 8, background: C.bg,
    border: `1px solid ${C.border}`, borderRadius: 10, padding: "8px 12px", width: 280,
  },
  searchBoxLarge: {
    display: "flex", alignItems: "center", gap: 8, background: C.card,
    border: `1px solid ${C.border}`, borderRadius: 10, padding: "10px 14px", flex: 1, maxWidth: 420,
  },
  searchInput: { border: "none", outline: "none", background: "transparent", fontSize: 13, width: "100%", fontFamily: "inherit" },
  bellBtn: {
    position: "relative", width: 36, height: 36, borderRadius: 10, border: `1px solid ${C.border}`,
    background: C.card, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer",
  },
  bellDot: {
    position: "absolute", top: -4, right: -4, background: C.red, color: "#fff",
    fontSize: 9.5, fontWeight: 700, borderRadius: 20, minWidth: 15, height: 15,
    display: "flex", alignItems: "center", justifyContent: "center", padding: "0 3px",
  },
  notifPanel: {
    position: "absolute", right: 0, top: 44, width: 300, background: C.card,
    border: `1px solid ${C.border}`, borderRadius: 12, boxShadow: "0 12px 30px rgba(20,40,70,0.14)",
    padding: 10, zIndex: 20,
  },
  notifHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "4px 6px 8px", borderBottom: `1px solid ${C.border}` },
  notifItem: { display: "flex", gap: 8, padding: "10px 6px", borderBottom: `1px solid ${C.border}` },
  notifDot: { width: 7, height: 7, borderRadius: 10, background: C.teal, marginTop: 5, flexShrink: 0 },
  avatar: {
    width: 34, height: 34, borderRadius: 10, background: C.lightTeal, color: C.teal,
    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12,
  },

  content: { padding: "26px 28px 60px", overflowY: "auto" },
  pageHead: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20, gap: 16, flexWrap: "wrap" },
  h1: { fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.2 },
  subhead: { fontSize: 13.5, color: C.textSecondary, margin: "4px 0 0" },

  breadcrumb: { display: "flex", alignItems: "center", fontSize: 12.5 },
  crumbLink: { color: C.textSecondary, cursor: "pointer", fontWeight: 600 },
  crumbCurrent: { color: C.textPrimary, fontWeight: 700 },

  primaryBtn: {
    display: "flex", alignItems: "center", gap: 8, background: C.navy, color: "#fff",
    border: "none", borderRadius: 10, padding: "11px 18px", fontSize: 13, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },
  primaryBtnGhost: {
    display: "flex", alignItems: "center", gap: 8, background: C.lightTeal, color: C.teal,
    border: "none", borderRadius: 10, padding: "11px 18px", fontSize: 13, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },

  statGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 22 },
  statCard: {
    background: C.card, border: `1px solid ${C.border}`, borderRadius: 14,
    padding: "16px 16px", display: "flex", gap: 12, alignItems: "flex-start",
  },
  statIcon: { width: 36, height: 36, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  statValue: { fontSize: 19, fontWeight: 800 },
  statLabel: { fontSize: 12, color: C.textSecondary, marginTop: 2 },
  statDelta: { fontSize: 11, color: C.green, marginTop: 3, fontWeight: 700 },

  twoCol: { display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 18, alignItems: "start" },
  rightCol: { display: "flex", flexDirection: "column", gap: 18 },

  panel: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 20, marginBottom: 18 },
  panelHead: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, flexWrap: "wrap", gap: 6 },
  panelTitleRow: { display: "flex", alignItems: "center", gap: 8 },
  panelTitle: { fontSize: 14.5, fontWeight: 800, margin: 0 },
  panelHint: { fontSize: 11, color: C.textSecondary },

  achievementList: { display: "flex", flexDirection: "column", gap: 12 },
  achievementCard: { display: "flex", gap: 12, padding: "12px", borderRadius: 12, background: C.bg },
  achievementIcon: { width: 30, height: 30, borderRadius: 9, background: C.lightTeal, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  achievementTopRow: { display: "flex", alignItems: "center", gap: 5, flexWrap: "wrap" },
  achievementTeam: { fontWeight: 800, fontSize: 13 },
  achievementUni: { fontSize: 12, color: C.textSecondary },
  achievementTypeTag: { marginLeft: "auto", fontSize: 10.5, fontWeight: 700, color: C.teal, background: C.lightTeal, padding: "2px 8px", borderRadius: 20 },
  achievementText: { fontSize: 12.8, color: C.textPrimary, margin: "5px 0 6px", lineHeight: 1.5 },
  achievementMeta: { display: "flex", alignItems: "center", gap: 4, fontSize: 11.5, color: C.textSecondary },

  activeList: { display: "flex", flexDirection: "column", gap: 4 },
  activeRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 6px", borderRadius: 10, cursor: "pointer" },
  activeRowTitle: { fontSize: 13, fontWeight: 700 },
  activeRowSub: { fontSize: 11.5, color: C.textSecondary },
  uniBadge: { width: 34, height: 34, borderRadius: 10, color: "#fff", fontWeight: 800, fontSize: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },

  leaderList: { display: "flex", flexDirection: "column", gap: 4 },
  leaderRow: { display: "flex", alignItems: "center", gap: 10, padding: "9px 6px", borderRadius: 10, cursor: "pointer" },
  rankBubble: (rank) => ({
    width: 26, height: 26, borderRadius: "50%", flexShrink: 0,
    background: rank === 1 ? "#F4D35E" : rank === 2 ? "#D6DCE5" : rank === 3 ? "#E3B08A" : C.bg,
    color: rank <= 3 ? "#5A4620" : C.textSecondary,
    display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: 12,
  }),

  filterRow: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 },
  chipRow: { display: "flex", gap: 8, flexWrap: "wrap" },
  chip: {
    border: `1px solid ${C.border}`, background: C.card, color: C.textSecondary,
    borderRadius: 20, padding: "7px 14px", fontSize: 12.5, cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
  },
  chipActive: { background: C.navy, color: "#fff", border: `1px solid ${C.navy}` },

  uniGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 },
  uniCard: {
    background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18,
    cursor: "pointer", transition: "box-shadow 0.15s ease",
  },
  uniCardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  rankPill: { fontSize: 11, fontWeight: 700, color: C.navy, background: C.lightTeal, padding: "4px 10px", borderRadius: 20 },
  rankPillLg: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, color: C.navy, background: C.lightTeal, padding: "6px 12px", borderRadius: 20 },
  uniCardName: { fontSize: 15.5, fontWeight: 800, marginBottom: 4 },
  uniCardMeta: { fontSize: 12, color: C.textSecondary, display: "flex", alignItems: "center", gap: 4, marginBottom: 12 },
  tagRow: { display: "flex", flexWrap: "wrap", gap: 6, margin: "8px 0" },
  sectorTag: { fontSize: 11, fontWeight: 700, color: C.teal, background: C.lightTeal, padding: "4px 10px", borderRadius: 20 },
  sectorTagOutline: { fontSize: 11, fontWeight: 700, color: C.textSecondary, border: `1px solid ${C.border}`, padding: "4px 10px", borderRadius: 20 },
  sectorTagSmall: { fontSize: 10.5, fontWeight: 700, color: C.teal, background: C.lightTeal, padding: "3px 8px", borderRadius: 20, marginLeft: "auto" },
  resourceTag: { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 600, color: C.textPrimary, background: C.bg, border: `1px solid ${C.border}`, padding: "6px 12px", borderRadius: 20 },
  uniCardFooter: { display: "flex", gap: 14, marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.border}` },
  footerStat: { display: "flex", alignItems: "center", gap: 4, fontSize: 12, color: C.textSecondary, fontWeight: 600 },
  emptyState: { padding: 30, textAlign: "center", color: C.textSecondary, fontSize: 13, gridColumn: "1 / -1" },

  backBtn: {
    display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none",
    color: C.textSecondary, fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 18, padding: 0, fontFamily: "inherit",
  },
  profileHeader: { display: "flex", gap: 18, marginBottom: 20, alignItems: "flex-start" },
  profileTitleRow: { display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" },
  profileMetaRow: { display: "flex", gap: 16, fontSize: 12.5, color: C.textSecondary, margin: "6px 0", flexWrap: "wrap", alignItems: "center" },

  tabRow: { display: "flex", gap: 6, borderBottom: `1px solid ${C.border}`, marginBottom: 20 },
  tabBtn: {
    border: "none", background: "transparent", padding: "10px 4px", marginRight: 18,
    fontSize: 13, fontWeight: 700, color: C.textSecondary, cursor: "pointer", borderBottom: "2px solid transparent", fontFamily: "inherit",
  },
  tabBtnActive: { color: C.navy, borderBottom: `2px solid ${C.teal}` },

  teamGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 16 },
  teamCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18, cursor: "pointer" },
  teamCardTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 },
  teamName: { fontSize: 14.5, fontWeight: 800 },
  teamProblem: { fontSize: 12.5, color: C.textSecondary, margin: "0 0 12px", lineHeight: 1.5 },
  statusTag: { fontSize: 10.5, fontWeight: 700, padding: "4px 10px", borderRadius: 20, whiteSpace: "nowrap" },
  progressTrack: { height: 7, background: C.bg, borderRadius: 20, overflow: "hidden", margin: "6px 0 14px" },
  progressFill: { height: "100%", borderRadius: 20 },
  teamCardFooter: { display: "flex", alignItems: "center", gap: 12 },

  timeline: { display: "flex", flexDirection: "column", gap: 18 },
  timelineRow: { display: "flex", gap: 12 },
  timelineDot: { width: 10, height: 10, borderRadius: "50%", background: C.teal, marginTop: 5, flexShrink: 0 },
  timelineTopRow: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 10, flexWrap: "wrap" },
  timelineTitle: { fontSize: 13.5, fontWeight: 700 },
  timelineMeta: { fontSize: 11.5, color: C.textSecondary, margin: "3px 0" },
  timelineImpact: { fontSize: 12.5, color: C.textPrimary },

  teamHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22, gap: 16, flexWrap: "wrap" },
  teamHeaderTopRow: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" },
  teamRatingBox: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 14, padding: "14px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 2, minWidth: 110 },
  teamRatingValue: { fontSize: 18, fontWeight: 800 },
  teamRatingLabel: { fontSize: 10.5, color: C.textSecondary },

  milestoneList: { display: "flex", flexDirection: "column", gap: 11, marginBottom: 18 },
  milestoneRow: { display: "flex", alignItems: "center", gap: 10, fontSize: 13 },
  actionRow: { display: "flex", gap: 10, flexWrap: "wrap" },

  mentorRow: { display: "flex", alignItems: "center", gap: 10, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${C.border}` },
  memberGrid: { display: "flex", flexDirection: "column", gap: 8 },
  memberChip: { display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600 },
  memberAvatar: { width: 28, height: 28, borderRadius: "50%", background: C.lightTeal, color: C.teal, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10.5, fontWeight: 800, flexShrink: 0 },

  problemCard: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, padding: 18 },
  problemTopRow: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" },
  problemTitleRow: { display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" },
  problemFooter: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12, marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.border}`, flexWrap: "wrap" },
  fastLaneBanner: {
    display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, fontWeight: 700, color: C.red,
    background: "#FBEAEA", padding: "7px 12px", borderRadius: 10, marginBottom: 12, width: "fit-content",
  },

  primaryBtnSmall: {
    display: "flex", alignItems: "center", gap: 6, background: C.navy, color: "#fff",
    border: "none", borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },
  primaryBtnGhostSmall: {
    display: "flex", alignItems: "center", gap: 6, background: C.bg, color: C.textSecondary,
    border: `1px solid ${C.border}`, borderRadius: 9, padding: "8px 14px", fontSize: 12, fontWeight: 700,
    cursor: "pointer", fontFamily: "inherit",
  },

  tableWrap: { background: C.card, border: `1px solid ${C.border}`, borderRadius: 16, overflow: "hidden", marginTop: 16 },
  tableHeaderRow: {
    display: "flex", gap: 12, padding: "12px 20px", background: C.bg,
    fontSize: 11, fontWeight: 700, color: C.textSecondary, textTransform: "uppercase", letterSpacing: 0.3,
  },
  tableRow: {
    display: "flex", gap: 12, padding: "16px 20px", borderTop: `1px solid ${C.border}`, alignItems: "center", flexWrap: "wrap",
  },

  requestList: { display: "flex", flexDirection: "column", gap: 12 },
  requestCard: { background: C.bg, borderRadius: 12, padding: 14 },
};

const css = `
  * { box-sizing: border-box; }
  button:focus-visible, input:focus-visible, div[tabindex]:focus-visible {
    outline: 2px solid ${C.teal};
    outline-offset: 2px;
  }
  input::placeholder { color: ${C.textSecondary}; opacity: 0.8; }
  @media (max-width: 980px) {
    .stat-grid { grid-template-columns: repeat(2, 1fr) !important; }
  }
`;
