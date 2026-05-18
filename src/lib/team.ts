// CBI team member data — drives both the team list and individual profile pages

export type TeamLevel = 'leadership' | 'staff'

export interface TeamMember {
  slug:        string
  name:        string
  role:        string
  email:       string
  photo:       string
  accent:      string
  level:       TeamLevel
  bio:         string            // long-form bio for profile page
  shortBio?:   string            // truncated bio for the card grid
  quote:       string
  yearsAtCBI:  number
  location:    string
  expertise:   string[]
  languages:   string[]
  education?:  string[]
  achievements?: string[]
  linkedin?:   string
}

export const TEAM: TeamMember[] = [
  /* ─── LEADERSHIP ─────────────────────────────────────────── */
  {
    slug:       'rejoice-mark',
    name:       'Rejoice Mark',
    role:       'Executive Director',
    email:      'rejoice@cbi.ngo',
    photo:      '/images/team/rejoice.jpg',
    accent:     '#0102F1',
    level:      'leadership',
    location:   'Abuja, Nigeria',
    yearsAtCBI: 7,
    bio:        "Rejoice founded Care Best Initiative in 2019 with a vision to deliver integrated humanitarian care to Nigeria's most vulnerable communities. She brings over 15 years of NGO leadership experience across the North-East and North-West regions, and has led CBI from a 7-person team to a national organisation serving 150,000+ beneficiaries across 10 states. Under her leadership, CBI has built partnerships with UNICEF, WFP, USAID, FCDO, and 35+ international humanitarian organisations. She is a frequent speaker at humanitarian convenings on community-led programming and women's leadership in NGOs.",
    shortBio:   "Founded CBI in 2019. Brings over 15 years of NGO leadership across North-East and North-West Nigeria.",
    quote:      'We started with seven people and a mission. Today we reach 150,000.',
    expertise:  ['Humanitarian Strategy', 'Organisational Leadership', 'Partnership Development', 'Programme Design', 'Women\'s Leadership'],
    languages:  ['English', 'Hausa', 'Pidgin English'],
    education:  ['MSc Public Health, University of Ibadan', 'BSc Sociology, University of Maiduguri'],
    achievements: [
      'Founded CBI and scaled to 150,000+ beneficiaries',
      'Built partnerships with UNICEF, WFP, USAID, FCDO and 35+ orgs',
      'Expanded from 1 to 10 Nigerian states in 6 years',
      'Selected as humanitarian leadership speaker at 2024 UNICEF Summit',
    ],
    linkedin:   '#',
  },
  {
    slug:       'thomas-dayo',
    name:       'Thomas Umazayi Dayo',
    role:       'Program Manager',
    email:      'thomas@cbi.ngo',
    photo:      '/images/team/thomas.jpg',
    accent:     '#0891b2',
    level:      'leadership',
    location:   'Abuja, Nigeria',
    yearsAtCBI: 5,
    bio:        "Thomas oversees CBI's program portfolio across all six thematic areas — Education in Emergency, Health & Primary Care, Nutrition, WASH, Protection & GBV, and Food Security & Livelihoods. He ensures quality delivery and alignment with international humanitarian standards (Sphere, CHS), and coordinates daily with UNICEF, WFP, and 35+ partner organisations on programme design, implementation, and reporting. His background in MEAL gives him a sharp focus on evidence-based programming.",
    shortBio:   "Oversees CBI's portfolio across all six thematic areas. Coordinates with 35+ partner organisations.",
    quote:      'Programs are only as good as the field officers who deliver them.',
    expertise:  ['Programme Management', 'MEAL', 'Sphere Standards', 'Partnership Coordination', 'Field Operations'],
    languages:  ['English', 'Hausa', 'Kanuri'],
    education:  ['MSc Development Studies, University of Jos', 'BSc Public Administration, ABU Zaria'],
    achievements: [
      'Manages 6 programmes across 10 states',
      'Coordinates 35+ partner relationships',
      'Led roll-out of CBI MEAL framework',
    ],
    linkedin:   '#',
  },
  {
    slug:       'sarauniya-elbuba',
    name:       'Sarauniya Esther Elbuba',
    role:       'Human Resource Coordinator',
    email:      'sarauniya@cbi.ngo',
    photo:      '/images/team/sarauniya.jpg',
    accent:     '#7c3aed',
    level:      'leadership',
    location:   'Abuja, Nigeria',
    yearsAtCBI: 4,
    bio:        "Sarauniya manages CBI's human resources, staff welfare, and organisational capacity development. She ensures a safe, inclusive, and high-performing workplace culture across all CBI offices in Nigeria — from Abuja HQ to field locations in Borno, Adamawa, Yobe, and beyond. She leads staff safeguarding, PSEA training, and the annual learning & development programme.",
    shortBio:   "Manages CBI's HR, staff welfare, and capacity development. Ensures a safe, inclusive workplace.",
    quote:      'People are at the heart of every program we run.',
    expertise:  ['Human Resources', 'Staff Welfare', 'PSEA & Safeguarding', 'Capacity Building', 'Workplace Culture'],
    languages:  ['English', 'Hausa', 'Yoruba'],
    education:  ['MA Human Resource Management, University of Lagos', 'BSc Psychology, Bayero University Kano'],
    achievements: [
      'Built CBI staff safeguarding framework',
      'Led annual L&D programme covering all 9 team members',
      'Rolled out PSEA training across all 7 field offices',
    ],
    linkedin:   '#',
  },

  /* ─── STAFF ──────────────────────────────────────────────── */
  {
    slug:       'isaiah-yakubu',
    name:       'Isaiah Yakubu',
    role:       'Program Coordinator',
    email:      'isaiah@cbi.ngo',
    photo:      '/images/team/isaiah.jpg',
    accent:     '#16a34a',
    level:      'staff',
    location:   'Maiduguri, Borno',
    yearsAtCBI: 3,
    bio:        "Isaiah coordinates CBI's field programmes in Borno and Adamawa states. He works directly with community leaders, host families, and IDP camp committees to design and deliver programmes that meet real local needs. He has overseen Education in Emergency rollouts that returned 900+ children to school across Borno.",
    quote:      'The community always knows what it needs. Our job is to listen first.',
    expertise:  ['Field Coordination', 'Community Mobilisation', 'Education in Emergency'],
    languages:  ['English', 'Hausa', 'Kanuri'],
    achievements: ['Coordinated Borno Education in Emergency rollout (900+ children)'],
  },
  {
    slug:       'daniel-okafor',
    name:       'Daniel Okafor',
    role:       'ICT Coordinator',
    email:      'daniel@cbi.ngo',
    photo:      '/images/team/daniel.jpg',
    accent:     '#0102F1',
    level:      'staff',
    location:   'Abuja, Nigeria',
    yearsAtCBI: 2,
    bio:        "Daniel manages CBI's information technology, digital infrastructure, and data systems. He ensures secure, reliable connectivity across all 7 CBI offices and leads the migration to cloud-based MEAL data collection.",
    quote:      'Good data systems make better programmes.',
    expertise:  ['IT Infrastructure', 'Data Systems', 'Cloud Migration', 'Cybersecurity'],
    languages:  ['English', 'Igbo'],
    achievements: ['Migrated CBI MEAL data to secure cloud platform'],
  },
  {
    slug:       'emmanuel-bello',
    name:       'Emmanuel Bello',
    role:       'Logistics Coordinator',
    email:      'emmanuel@cbi.ngo',
    photo:      '/images/team/emmanuel.jpg',
    accent:     '#0891b2',
    level:      'staff',
    location:   'Abuja, Nigeria',
    yearsAtCBI: 3,
    bio:        "Emmanuel runs CBI's supply chain, procurement, and field logistics. He coordinates the movement of food parcels, hygiene kits, school supplies, and health commodities across CBI's 10-state operating footprint.",
    quote:      'The last mile is where humanitarian aid succeeds or fails.',
    expertise:  ['Supply Chain', 'Procurement', 'Fleet Management', 'Warehousing'],
    languages:  ['English', 'Hausa', 'Yoruba'],
    achievements: ['Coordinated logistics for 150,000+ beneficiaries across 10 states'],
  },
  {
    slug:       'aisha-mohammed',
    name:       'Aisha Mohammed',
    role:       'MEAL Coordinator',
    email:      'aisha@cbi.ngo',
    photo:      '/images/girl-portrait.jpg',
    accent:     '#d97706',
    level:      'staff',
    location:   'Yola, Adamawa',
    yearsAtCBI: 2,
    bio:        "Aisha leads Monitoring, Evaluation, Accountability & Learning across all CBI programmes. She designs theory of change frameworks, runs baseline and endline surveys, and produces the quarterly impact reports sent to all CBI donors.",
    quote:      'Measure what matters. Report what changes.',
    expertise:  ['Monitoring & Evaluation', 'Accountability Frameworks', 'Survey Design', 'Theory of Change'],
    languages:  ['English', 'Hausa', 'Fulfulde'],
    achievements: ['Designed CBI baseline survey framework for 10-state operations'],
  },
  {
    slug:       'fatima-usman',
    name:       'Fatima Usman',
    role:       'Finance Coordinator',
    email:      'fatima@cbi.ngo',
    photo:      '/images/girl-water.jpg',
    accent:     '#e11d48',
    level:      'staff',
    location:   'Abuja, Nigeria',
    yearsAtCBI: 4,
    bio:        "Fatima manages CBI's finance, donor reporting, and audit compliance. She ensures every naira and dollar received is tracked, reported, and accounted for in line with international donor standards (USAID, FCDO, UN).",
    quote:      'Donor trust is built one financial report at a time.',
    expertise:  ['Financial Management', 'Donor Reporting', 'Audit Compliance', 'Grant Management'],
    languages:  ['English', 'Hausa'],
    achievements: ['Clean audit opinion for 5 consecutive years'],
  },
  {
    slug:       'grace-adamu',
    name:       'Grace Adamu',
    role:       'Field Officer',
    email:      'grace@cbi.ngo',
    photo:      '/images/family-lush.jpg',
    accent:     '#7c3aed',
    level:      'staff',
    location:   'Damaturu, Yobe',
    yearsAtCBI: 2,
    bio:        "Grace works directly with women and girls in CBI's Protection and Nutrition programmes in Yobe State. She runs safe-space sessions, conducts community awareness on SGBV, and trains community health workers on growth monitoring.",
    quote:      'Every safe-space session is a small act of justice.',
    expertise:  ['GBV Response', 'Community Health', 'Safe Spaces Facilitation'],
    languages:  ['English', 'Hausa', 'Kanuri'],
    achievements: ['Facilitated 300+ safe-space sessions for women and girls in Yobe'],
  },
]

export const LEADERSHIP = TEAM.filter(m => m.level === 'leadership')
export const STAFF      = TEAM.filter(m => m.level === 'staff')

export function getMember(slug: string): TeamMember | undefined {
  return TEAM.find(m => m.slug === slug)
}
