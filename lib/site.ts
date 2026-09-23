/**
 * Central site metadata — single source of truth for SEO/JSON-LD facts, so every
 * page and the structured-data block stay in sync instead of re-typing the same
 * strings. Verified facts only (name, registration numbers, address) come from
 * reference/registration-certificate.pdf per README.md's content-integrity rule —
 * nothing here should be invented.
 */

const rawSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.mastersleadershipacademy.com";
// Normalise: no trailing slash, so callers can always do `${SITE_URL}/path`.
export const SITE_URL = rawSiteUrl.replace(/\/+$/, "");

export const SITE_NAME = "Masters Leadership Academy";

export const SITE_DESCRIPTION =
  "Masters Leadership Academy equips leaders and institutions with strategic insight and practical tools through seminars, symposiums, conferences, technical advisory and thought leadership. Abuja, Nigeria.";

export const ORG_FACTS = {
  legalName: "Masters Leadership Academy",
  businessNumber: "BN 2357164",
  crbn: "CRBN 635769",
  streetAddress: "36 Moses Majekodunmi Street, Utako",
  addressLocality: "Abuja",
  addressRegion: "FCT",
  addressCountry: "NG",
  phone: "+234 811 464 6340",
  email: "mastersleadershipacademy@gmail.com",
  registeredHeadOffice: "Plot 4Y2K Crescent, off Tony Okocha Road, New Rumuigbo, Port Harcourt, Rivers State",
};

export const CORE_PHILOSOPHY = {
  vision: "Building a leadership lifestyle with lasting impact across generations.",
  mission:
    "Exists to equip leaders and institutions with the strategic insight and practical tools to translate ambition into measurable outcomes — through seminars, symposiums, conferences, technical advisory and thought leadership that bridge the boardroom, the classroom and the public square.",
  coreValues: [
    {
      title: "Integrity",
      description: "Every engagement is conducted with transparency and accountability.",
      icon: "shield",
    },
    {
      title: "Excellence",
      description: "Advice and delivery held to the same rigour as the institutions we serve.",
      icon: "award",
    },
    {
      title: "Partnership",
      description: "We build capacity in the organisations we work with, not dependence on us.",
      icon: "users",
    },
    {
      title: "Impact",
      description: "Success is measured by outcomes our partners actually achieve, not activity.",
      icon: "target",
    },
  ],
};

export const LEADERSHIP_TEAM = [
  {
    name: "Dr. Orovwiroro O. Godwin",
    credentials: "FIMC, CMC",
    role: "Founder & Chairman",
    organization: "Masters Leadership Academy / Winman Nigeria Limited",
    bio: "Fellow of the Institute of Management Consultants and Certified Management Consultant. Former Regional Head at Port Harcourt Electricity Distribution Company (PHEDC). Visiting Lecturer in Strategic Leadership and Project Management at the University of Port Harcourt Business School and Garden City Premier Business School.",
    expertise: ["Strategic Leadership", "Corporate Governance", "Executive Mentoring", "Project Management"],
    image: "/chairman.jpg",
  },
  {
    name: "Engr. Festus Ediae",
    credentials: "FNSE",
    role: "Technical Director & Senior Facilitator",
    organization: "Ace International Training Center / Partner, Winman & MLA",
    bio: "CEO and Managing Director of Ace International Training Center. Over 22 years of senior technical and managerial leadership at Total Exploration & Production Nigeria Limited (TotalEnergies). Holds a B.Sc. in Industrial Engineering and M.Sc. in Mechanical Engineering, specializing in operational excellence, safety systems, and organizational capacity.",
    expertise: ["Industrial Operations", "Technical Safety Systems", "Executive Capacity Building", "Engineering Management"],
    image: "/team-festus-ediae.jpg",
  },
  {
    name: "Engr. Joseph Aikowe",
    credentials: "MNSE, COREN",
    role: "Director of Technical Advisory & Commercial Operations",
    organization: "Winman Nigeria Limited / Masters Leadership Academy",
    bio: "Registered Engineer with COREN and the Nigerian Society of Engineers. Former General Manager (Commercial) at the Port Harcourt Electricity Distribution Company (PHEDC). Extensive career leading complex utility transformations, revenue assurance, stakeholder negotiations, and large-scale public-private infrastructure initiatives.",
    expertise: ["Utility Transformation", "Commercial Strategy", "Public-Private Partnerships", "Regulatory Compliance"],
    image: "/team-joseph-aikowe.jpg",
  },
  {
    name: "Dr. Thomas Chinye Okoisama",
    credentials: "FIMC, CMC, DBA",
    role: "Director of Research & Executive Advisory",
    organization: "Garden City Premier Business School / Chitoms Synergies Ltd",
    bio: "Holds a Doctor of Business Administration (DBA) in Management from the University of Port Harcourt. Fellow of the Institute of Management Consultants and Certified Management Consultant. Senior Facilitator at Garden City Premier Business School and prolific researcher in organizational resilience, corporate risk mitigation, and energy servicing governance.",
    expertise: ["Organizational Resilience", "Enterprise Risk Mitigation", "Applied Research", "Corporate Finance"],
    image: "/team-thomas-okoisama.jpg",
  },
];

/** Builds an absolute URL from a site-relative path. */
export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}


