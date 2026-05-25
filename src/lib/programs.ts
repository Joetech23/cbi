// CBI programme data — drives the /programs listing and /programs/[slug] detail pages

export interface GalleryImage {
  src: string
  caption: string
  alt: string
}

export interface ProgramStat {
  value: string
  label: string
}

export interface ProgramApproach {
  title: string
  description: string
}

export interface Program {
  slug: string
  name: string
  shortName: string
  tagline: string
  description: string          // one-liner (used on listing card)
  overview: string[]           // paragraphs for the detail page
  accentHex: string            // solid accent colour
  bgLight: string              // light bg chip colour
  heroImage: string
  gallery: GalleryImage[]
  stats: ProgramStat[]
  targetPopulation: string[]
  keyActivities: string[]
  coreAreas?: string[]
  crossCutting?: string[]
  approach?: ProgramApproach[] // numbered strategic pillars (Nutrition uses this)
  sdgs: string[]
  icon: string
  relatedSlugs: string[]
}

/* ─────────────────────────────────────────────────────────────── */

export const PROGRAMS: Program[] = [

  /* ── 1. Health ────────────────────────────────────────────── */
  {
    slug:       'health',
    name:       'Health',
    shortName:  'Health',
    tagline:    'Saving lives through comprehensive, community-driven healthcare.',
    icon:       '🏥',
    accentHex:  '#0102F1',
    bgLight:    '#eef0ff',
    heroImage:  '/images/programs/IMG_8929-health.jpg',

    description:
      'Strengthening communities through accessible healthcare, equipping health workers with the skills and tools to save lives and promote wellness where it matters most.',

    overview: [
      'Care Best Initiative implements a comprehensive health programme that combines immediate emergency response with long-term health system strengthening. The programme is designed to save lives, reduce morbidity, improve well-being, and strengthen healthcare systems in crisis-affected and underserved contexts.',
      'Our health interventions are community-driven and facility-based, utilising mobile clinics, outreach programmes, public health surveillance, and strong coordination with local health authorities, humanitarian agencies, and community structures for maximum impact and sustainability.',
    ],

    gallery: [
      { src: '/images/programs/IMG_8929-health.jpg',        caption: 'CBI health team conducting community consultations',                             alt: 'CBI health programme' },
      { src: '/images/cbi-health-program.jpg',              caption: 'Medical consultation at a CBI-supported facility',                               alt: 'Medical consultation' },
      { src: '/images/cbi-medical-outreach.jpg',            caption: 'Mobile health clinic serving a remote community',                                alt: 'Medical outreach' },
      { src: '/images/cbi-mother-baby.jpg',                 caption: 'Maternal and newborn care — supporting safe pregnancies',                        alt: 'Mother and baby healthcare' },
      { src: '/images/cbi-children-treatment.jpg',          caption: 'Children receiving essential treatment and care',                                alt: 'Children receiving treatment' },
      { src: '/images/cbi-woman-wheelchair.jpg',            caption: 'Inclusive healthcare for persons with disabilities',                             alt: 'Healthcare for PWDs' },
      { src: '/images/cbi-medical-wheelchair-net.jpg',      caption: 'Distribution of protective supplies during outreach',                            alt: 'Mosquito net distribution' },
    ],

    stats: [
      { value: '70,000+', label: 'Health consultations' },
      { value: '10,000+', label: 'Pregnant women supported' },
      { value: '50,000+', label: 'Immunisation & SRH beneficiaries' },
    ],

    targetPopulation: [
      'Women and girls',
      'Children under 5',
      'Adolescents and youth',
      'Pregnant and lactating women (PLW)',
      'Men and boys',
      'Internally displaced persons (IDPs) and returnees',
      'Elderly persons',
      'Persons with disabilities (PWDs)',
    ],

    keyActivities: [
      'Maternal and newborn care',
      'Integrated Management of Childhood Illnesses (IMCI)',
      'Sexual and Reproductive Health — Antenatal Care (ANC), Postnatal Care (PNC), labour and delivery services, family planning',
      'Mobile health clinics and community outreach',
      'Routine immunisation campaigns',
      'Disease prevention and outbreak response',
      'Health system strengthening',
      'Capacity building of frontline healthcare workers',
    ],

    sdgs: ['SDG 3 – Good Health & Well-Being', 'SDG 5 – Gender Equality', 'SDG 10 – Reduced Inequalities'],
    relatedSlugs: ['nutrition', 'wash', 'protection'],
  },

  /* ── 2. Nutrition ─────────────────────────────────────────── */
  {
    slug:       'nutrition',
    name:       'Nutrition',
    shortName:  'Nutrition',
    tagline:    'Protecting the future of children, one child at a time.',
    icon:       '🌱',
    accentHex:  '#0102F1',
    bgLight:    '#eef0ff',
    heroImage:  '/images/programs/IMG_9297-nutrition.jpg',

    description:
      'Early detection and timely treatment of acute malnutrition in children under five, giving every child a healthier start and a greater chance to thrive.',

    overview: [
      'Since 2019, Care Best Initiative has successfully managed over 8,000 Severe Acute Malnutrition (SAM) cases across crisis-affected communities in Nigeria through integrated, community-based nutrition programming. Building on this experience, CBI continues to strengthen its nutrition response through three key inclusion-focused strategic areas.',
      'CBI\'s nutrition interventions are integrated with Health, WASH, Food Security, and Protection programming to address the underlying drivers of malnutrition while enhancing community resilience and sustainable recovery.',
    ],

    approach: [
      {
        title: 'Integrated Management of Acute Malnutrition',
        description: 'CBI expands inclusive community outreach systems for the early identification, referral, and treatment of malnourished children — especially among hard-to-reach, displaced, and underserved populations. Through OTP services, active case finding, MUAC screening, RUTF provision, and caregiver follow-up, the organisation ensures timely and life-saving treatment for vulnerable children under five.',
      },
      {
        title: 'Maternal, Infant, and Young Child Nutrition (MIYCN) Strengthening',
        description: 'CBI prioritises inclusive nutrition support for pregnant women, lactating mothers, infants, and young children through exclusive breastfeeding promotion, complementary feeding support, micronutrient supplementation, and nutrition education and behaviour change communication — empowering caregivers with practical knowledge to improve child survival and dietary diversity.',
      },
      {
        title: 'Integrated Systems Strengthening and Multisectoral Nutrition Response',
        description: 'CBI strengthens local nutrition systems through collaboration with government structures, nutrition sector platforms, and humanitarian partners. Nutrition is integrated with Health, WASH, Food Security, and Protection interventions to address underlying drivers of malnutrition while enhancing community resilience and sustainable recovery.',
      },
    ],

    gallery: [
      { src: '/images/programs/IMG_9297-nutrition.jpg',  caption: 'Nutrition screening and treatment for children under five',    alt: 'Nutrition programme' },
      { src: '/images/cbi-mother-baby.jpg',              caption: 'Maternal nutrition counselling for a lactating mother',        alt: 'Mother and baby nutrition' },
      { src: '/images/cbi-child-health.jpg',             caption: 'Child health and nutrition monitoring',                       alt: 'Child health monitoring' },
      { src: '/images/cbi-children-treatment.jpg',       caption: 'Community-based treatment for acute malnutrition',            alt: 'Treatment for malnutrition' },
      { src: '/images/cbi-medical-outreach.jpg',         caption: 'Outreach team visiting hard-to-reach communities',            alt: 'Community outreach' },
    ],

    stats: [
      { value: '8,000+',  label: 'SAM/MAM cases managed' },
      { value: '40,000+', label: 'Nutrition screenings conducted' },
      { value: '2019',    label: 'Programme since' },
    ],

    targetPopulation: [
      'Children under 5 (SAM & MAM)',
      'Pregnant and lactating women',
      'Infants and young children',
      'Adolescent girls',
      'Caregivers and mothers',
      'Hard-to-reach and displaced communities',
    ],

    keyActivities: [
      'Community-based management of acute malnutrition (CMAM)',
      'MUAC screening and active case finding',
      'OTP services and RUTF provision for SAM cases',
      'Caregiver follow-up and defaulter tracing',
      'Exclusive breastfeeding promotion',
      'Complementary feeding support and Infant and Young Child Feeding (IYCF)',
      'Micronutrient supplementation',
      'Nutrition education and behaviour change communication',
      'Growth monitoring and nutritional surveillance',
      'Multisectoral coordination with Health, WASH, FSL, and Protection',
    ],

    sdgs: ['SDG 2 – Zero Hunger', 'SDG 3 – Good Health & Well-Being', 'SDG 5 – Gender Equality'],
    relatedSlugs: ['health', 'food-security-livelihoods', 'wash'],
  },

  /* ── 3. WASH ──────────────────────────────────────────────── */
  {
    slug:       'wash',
    name:       'WASH',
    shortName:  'WASH',
    tagline:    'Safe water, sanitation, and hygiene for every community.',
    icon:       '💧',
    accentHex:  '#0102F1',
    bgLight:    '#eef0ff',
    heroImage:  '/images/cbi-wash-program.jpg',

    description:
      'Improving well-being and dignity through safe water access, rehabilitated boreholes, and sustainable WASH services that promote healthier communities.',

    overview: [
      'Care Best Initiative implements integrated and resilience-focused WASH interventions that improve access to safe water, sanitation, and hygiene services in underserved, crisis-affected, and development settings. The organisation delivers both humanitarian and development-oriented programming aimed at improving public health, promoting hygiene behaviour change, strengthening community resilience, and ensuring sustainable WASH service delivery.',
      'Using a nexus-based approach, CBI combines emergency response, early recovery, and long-term development strategies in line with national and international humanitarian standards — from borehole drilling and sanitation construction to cholera response and community-led hygiene promotion.',
    ],

    gallery: [
      { src: '/images/cbi-wash-program.jpg',           caption: 'WASH infrastructure serving vulnerable communities',                              alt: 'WASH programme' },
      { src: '/images/cbi-wash-sanitizer.jpg',         caption: 'Hygiene promotion — hand-washing with soap',                                     alt: 'Hand hygiene promotion' },
      { src: '/images/cbi-wash-global.jpg',            caption: 'Safe water access: a fundamental human right',                                   alt: 'Safe water access' },
      { src: '/images/cbi-medical-bicycle.jpg',        caption: 'CBI field team reaching remote communities',                                     alt: 'Community outreach' },
      { src: '/images/cbi-community-1.jpg',            caption: 'Community engagement for sustainable WASH services',                              alt: 'Community engagement' },
    ],

    stats: [
      { value: '30,000+', label: 'Individuals with clean water access' },
      { value: '10',      label: 'States of operation' },
      { value: '100%',    label: 'Community-led implementation' },
    ],

    targetPopulation: [
      'Vulnerable rural and urban communities',
      'Internally displaced persons (IDPs) and returnees',
      'Women, children, and persons with specific needs',
      'Schools and learning institutions',
      'Primary healthcare centres and health facilities',
      'Conflict-affected and climate-vulnerable populations',
    ],

    keyActivities: [
      'Emergency WASH response and rapid needs assessment',
      'Borehole drilling, rehabilitation, and solar-powered water supply systems',
      'Construction and rehabilitation of sanitation facilities',
      'Hygiene promotion and Social and Behaviour Change (SBC) programming',
      'Community-Led Total Sanitation (CLTS) implementation',
      'Water quality surveillance, testing, and treatment',
      'Infection Prevention and Control (IPC) support in healthcare facilities',
      'Cholera/AWD preparedness and response interventions',
      'Environmental sanitation and solid waste management',
      'Operation and maintenance systems strengthening',
      'Capacity development of WASH committees and local governance structures',
      'Institutional WASH support in schools and healthcare facilities',
    ],

    crossCutting: [
      'Protection, Gender, and Inclusion (PGI)',
      'Accountability to Affected Populations (AAP)',
      'Conflict sensitivity and Do-No-Harm principles',
      'Climate resilience and environmental sustainability',
      'Localization and community participation',
      'Safeguarding and risk mitigation',
      'Evidence-based programming (MEAL)',
    ],

    sdgs: ['SDG 6 – Clean Water & Sanitation', 'SDG 3 – Good Health & Well-Being', 'SDG 13 – Climate Action'],
    relatedSlugs: ['health', 'nutrition', 'education'],
  },

  /* ── 4. Protection ────────────────────────────────────────── */
  {
    slug:       'protection',
    name:       'Protection',
    shortName:  'Protection',
    tagline:    'Dignity, safety, and justice for every person we serve.',
    icon:       '🛡️',
    accentHex:  '#0102F1',
    bgLight:    '#eef0ff',
    heroImage:  '/images/cbi-community-2.jpg',

    description:
      'Creating safer communities by strengthening child safeguarding and delivering responsive GBV prevention and support services that protect dignity and restore hope.',

    overview: [
      'Care Best Initiative promotes safer, more resilient communities through integrated humanitarian and development approaches that strengthen child protection and safeguarding systems, prevent and respond to Gender-Based Violence, uphold dignity and human rights, and empower vulnerable individuals and communities to recover, thrive, and build sustainable futures.',
      'CBI\'s protection programming covers General Protection, Child Protection, and Gender-Based Violence (GBV), delivered through survivor-centred approaches that prioritise safety, dignity, and confidentiality at every stage of intervention.',
    ],

    gallery: [
      { src: '/images/cbi-community-2.jpg',            caption: 'Protection services delivered with dignity and care',                             alt: 'Protection programme' },
      { src: '/images/cbi-community-1.jpg',            caption: 'Community sensitisation on protection and rights',                               alt: 'Community engagement' },
      { src: '/images/cbi-events.jpg',                 caption: 'Protection awareness event reaching community members',                          alt: 'Protection awareness event' },
      { src: '/images/cbi-medical-wheelchair-net.jpg', caption: 'Dignity kits and humanitarian support for vulnerable persons',                   alt: 'Dignity kit distribution' },
      { src: '/images/cbi-woman-wheelchair.jpg',       caption: 'Inclusive protection services for persons with disabilities',                    alt: 'Inclusive protection' },
    ],

    stats: [
      { value: '25,000+', label: 'Women, girls & PWDs reached' },
      { value: '5,000+',  label: 'Protection cases managed' },
      { value: '100%',    label: 'Survivor-centred approach' },
    ],

    targetPopulation: [
      'Women and girls',
      'Boys and men',
      'Internally displaced persons (IDPs)',
      'Persons at risk of abuse or violence',
      'Survivors of GBV',
      'Children in need of protection',
      'Female-headed households',
      'Persons with disabilities (PWDs)',
    ],

    keyActivities: [
      'GBV and child protection case management and referrals',
      'Psychosocial support (PSS)',
      'Legal aid facilitation',
      'Community sensitisation on GBV and child protection',
      'Family tracing and reunification',
      'Skills acquisition and economic empowerment',
      'Protection monitoring',
      'Distribution of dignity kits',
      'Medical aid assistance and referrals',
      'Strengthening community-based protection mechanisms',
    ],

    sdgs: ['SDG 5 – Gender Equality', 'SDG 10 – Reduced Inequalities', 'SDG 16 – Peace, Justice & Strong Institutions'],
    relatedSlugs: ['education', 'health', 'food-security-livelihoods'],
  },

  /* ── 5. Food Security & Livelihoods ──────────────────────── */
  {
    slug:       'food-security-livelihoods',
    name:       'Food Security & Livelihoods',
    shortName:  'FSL',
    tagline:    'Resilience, self-reliance, and lasting food security.',
    icon:       '🌾',
    accentHex:  '#0102F1',
    bgLight:    '#eef0ff',
    heroImage:  '/images/cbi-community-1.jpg',

    description:
      'Enhancing household resilience through sustainable livelihood support and improved food access, empowering families to achieve stability and long-term economic well-being.',

    overview: [
      'Care Best Initiative delivers integrated Food Security and Livelihood interventions that address immediate food needs while strengthening long-term resilience, economic recovery, and self-reliance among vulnerable and crisis-affected populations.',
      'CBI combines emergency food assistance, climate-smart agriculture, vocational skills development, and livelihood restoration to improve household well-being and reduce vulnerability — with a strong focus on women-led households, persons with disabilities, and marginalised communities.',
    ],

    gallery: [
      { src: '/images/cbi-community-1.jpg',         caption: 'Livelihood support empowering vulnerable households',                             alt: 'Food security and livelihoods' },
      { src: '/images/cbi-community-2.jpg',         caption: 'Community engagement for food security programming',                             alt: 'Community engagement' },
      { src: '/images/cbi-events.jpg',              caption: 'Programme activities reaching crisis-affected populations',                       alt: 'Programme activities' },
      { src: '/images/branding/Care-Best-3.jpg',    caption: 'CBI field teams delivering integrated FSL interventions',                        alt: 'CBI in action' },
      { src: '/images/cbi-medical-outreach.jpg',    caption: 'Outreach and distribution of agricultural and livelihood inputs',                alt: 'Input distribution' },
    ],

    stats: [
      { value: '1,638+',  label: 'Individuals reached (2023–2025)' },
      { value: '12,000+', label: 'Women & youth empowered' },
      { value: '2',       label: 'States: Yobe & Borno' },
    ],

    targetPopulation: [
      'Women, girls, boys, men, and children',
      'Adolescents and youth',
      'Caregivers of malnourished children',
      'Internally displaced persons (IDPs) and returnees',
      'Survivors of violence and GBV',
      'Female-headed households',
      'Persons with disabilities (PWDs)',
      'Vulnerable and food-insecure households',
    ],

    keyActivities: [
      'Emergency food assistance',
      'Cash and voucher assistance (CVA)',
      'Climate-smart agriculture and kitchen gardening',
      'Agricultural input distribution',
      'Vocational skills training and entrepreneurship development',
      'Climate-resilient livelihood restoration',
      'Startup kits for income-generating activities (IGAs)',
      'Village Savings and Loan Associations (VSLAs) and financial inclusion',
      'Cash-for-work and resilience building',
      'Community capacity strengthening',
      'Market-based solutions and economic linkage',
    ],

    sdgs: ['SDG 1 – No Poverty', 'SDG 2 – Zero Hunger', 'SDG 8 – Decent Work & Economic Growth', 'SDG 13 – Climate Action'],
    relatedSlugs: ['nutrition', 'protection', 'wash'],
  },
  /* ── 6. Education ─────────────────────────────────────────── */
  {
    slug:       'education',
    name:       'Education',
    shortName:  'Education',
    tagline:    'Safe learning spaces for every child, no matter the crisis.',
    icon:       '📚',
    accentHex:  '#0102F1',
    bgLight:    '#eef0ff',
    heroImage:  '/images/programs/IMG_9278-education.jpg',

    description:
      'Delivering safe, inclusive, and resilient learning environments so children keep accessing quality education despite conflict, displacement, or crisis.',

    overview: [
      'Care Best Initiative implements inclusive, safe, and quality education interventions that improve access to learning opportunities for vulnerable and crisis-affected children and communities. CBI delivers integrated humanitarian and development-focused education programming aimed at increasing school enrolment, supporting re-enrolment and retention of out-of-school children, strengthening teaching and learning systems, and improving overall learning outcomes.',
      'The organisation supports schools and learners through the distribution of teaching and learning materials, establishment of child-friendly and inclusive learning spaces, teacher capacity strengthening, STEM and literacy initiatives, psychosocial support activities, and school-based awareness programmes on hygiene, protection, and child well-being.',
    ],

    gallery: [
      { src: '/images/programs/IMG_9278-education.jpg',  caption: 'Children engaging in structured learning at a CBI-supported school',               alt: 'CBI education programme' },
      { src: '/images/cbi-teaching-child.jpg',           caption: 'A CBI educator works one-on-one with a student',                                   alt: 'Teacher and student' },
      { src: '/images/cbi-education-class.jpg',          caption: 'Classroom session in a child-friendly learning space',                              alt: 'Classroom learning' },
      { src: '/images/cbi-child-smiling.jpg',            caption: 'Education transforms lives — one smile at a time',                                  alt: 'Happy child' },
      { src: '/images/cbi-children-books.jpg',           caption: 'Students with distributed teaching and learning materials',                         alt: 'Children with books' },
      { src: '/images/cbi-child-uniform.jpg',            caption: 'A student in school uniform ready to learn',                                        alt: 'Student in uniform' },
    ],

    stats: [
      { value: '12,000+',  label: 'Children enrolled' },
      { value: '35,000+',  label: 'Beneficiaries reached' },
      { value: '10',       label: 'States covered' },
    ],

    targetPopulation: [
      'Out-of-school children and vulnerable learners',
      'Internally Displaced Persons (IDPs) and returnee children',
      'Girls and boys in crisis-affected communities',
      'Children with disabilities and specific learning needs',
      'Teachers, caregivers, and school management committees',
      'Community volunteers and education stakeholders',
      'Schools and non-formal learning centres',
      'Conflict-affected and underserved populations',
    ],

    keyActivities: [
      'School enrolment, retention, and re-enrolment support',
      'Teacher training and capacity strengthening',
      'Inclusive education and child-friendly learning approaches',
      'Distribution of teaching and learning materials',
      'Establishment and support of STEM and literacy programmes',
      'Psychosocial support and recreational learning activities',
      'Community mobilisation and awareness on the importance of education',
      'Digital and innovative learning interventions',
      'Education stakeholder coordination',
      'Integrated education programming linked to Protection, WASH, Health, Nutrition, and Livelihood sectors',
    ],

    sdgs: ['SDG 4 – Quality Education', 'SDG 10 – Reduced Inequalities', 'SDG 16 – Peace, Justice & Strong Institutions'],
    relatedSlugs: ['protection', 'wash', 'health'],
  },
]

/* ─── Helpers ────────────────────────────────────────────────── */

export function getProgram(slug: string): Program | undefined {
  return PROGRAMS.find(p => p.slug === slug)
}

export function getRelated(program: Program): Program[] {
  return program.relatedSlugs
    .map(s => PROGRAMS.find(p => p.slug === s))
    .filter(Boolean) as Program[]
}
