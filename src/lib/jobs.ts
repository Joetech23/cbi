// CBI open roles — drives the careers listing, each advert page and its application form.

export interface JobFact {
  /** Icon key resolved in the page component. */
  icon:  'briefcase' | 'project' | 'reports' | 'location' | 'clock' | 'deadline' | 'department'
  label: string
  value: string
}

export interface QualificationGroup {
  heading: string
  items:   string[]
}

/** A role-specific screening question rendered as a chip group on the apply form. */
export interface ScreeningQuestion {
  key:      string
  label:    string
  hint?:    string
  options:  string[]
  required: boolean
  /** Shows an amber advisory when the applicant picks this answer. */
  warnOn?:  string
  warning?: string
}

export interface Job {
  slug:        string
  title:       string
  /** Italic orange tail of the advert headline. */
  titleTail?:  string
  /** One-line summary for the careers listing card. */
  summary:     string
  location:    string
  duration:    string
  deadline:    string
  facts:       JobFact[]
  purpose:     string
  responsibilities: string[]
  qualifications:   QualificationGroup[]
  coreRequirement?: string
  /** The advert asks for CV + cover letter merged into one PDF. */
  singlePdf:   boolean
  screening:   ScreeningQuestion[]
}

const DEADLINE = '4th November 2026'

const YES_NO  = ['Yes', 'No']
const FLUENCY = ['Fluent', 'Conversational', 'None']

export const JOBS: Job[] = [
  /* ─── 1. Project Officer ──────────────────────────────────── */
  {
    slug:      'project-officer',
    title:     'Project Officer',
    titleTail: '(Contract Role)',
    summary:   'Day-to-day field leadership combining project management with practical agricultural knowledge.',
    location:  'Yobe State (Bade/Jakusko)',
    duration:  '11 months',
    deadline:  DEADLINE,
    facts: [
      { icon: 'briefcase',  label: 'Job Title',    value: 'Project Officer (Contract Role)' },
      { icon: 'project',    label: 'Project',      value: 'WPHF Climate-Resilient Peacebuilding (Yobe)' },
      { icon: 'reports',    label: 'Reporting To', value: 'Program Manager; coordinates with the Grants & Compliance Officer' },
      { icon: 'location',   label: 'Duty Station', value: 'Yobe State (Bade/Jakusko)' },
      { icon: 'clock',      label: 'Duration',     value: '11 months' },
      { icon: 'deadline',   label: 'Deadline',     value: `${DEADLINE} (rolling basis)` },
    ],
    purpose: 'Provide day-to-day field leadership and oversight of the project, combining strong project management with practical agricultural knowledge.',
    responsibilities: [
      'Oversee implementation of all field activities in Bade and Jakusko',
      'Supervise Agronomists and Technical Assistants',
      'Ensure quality delivery of FFS, hubs, technical clinics and starter packages',
      'Coordinate with Consortium Team, LGAs, traditional leaders and Hub Committees',
      'Monitor progress, support reporting and ensure accountability',
      'Maintain work plans and support adaptive management',
      'Prepare donor reports and respond to donor feedback through to donor project closure',
    ],
    qualifications: [
      {
        heading: 'Required Qualifications',
        items: [
          'Bachelor’s degree in Agriculture, Agricultural Extension, Agronomy or related field',
          'Minimum 3 years’ experience in project management or field coordination of agricultural/livelihoods projects',
          'Strong project management skills (compulsory)',
          'Practical agricultural knowledge, especially climate-smart / vegetable production (compulsory)',
          'Experience supervising field staff',
          'Fluency in English and Hausa',
          'Must be resident in Yobe State',
        ],
      },
    ],
    coreRequirement: 'Management skills + Agricultural skills.',
    singlePdf: true,
    screening: [
      {
        key: 'residentYobe', label: 'Are you currently resident in Yobe State?',
        hint: 'Residency in Yobe State is a requirement for this role.',
        options: YES_NO, required: true, warnOn: 'No',
        warning: 'The advert requires residency in Yobe State. You may still apply, but please explain your situation in your cover letter.',
      },
      { key: 'relocate',        label: 'Willing to be based in Bade / Jakusko?', options: YES_NO, required: true },
      { key: 'englishFluency',  label: 'English fluency', options: FLUENCY, required: true },
      { key: 'hausaFluency',    label: 'Hausa fluency',   options: FLUENCY, required: true },
      {
        key: 'agricKnowledge', label: 'Do you have practical agricultural knowledge?',
        hint: 'Especially climate-smart or vegetable production.',
        options: YES_NO, required: true,
      },
      { key: 'supervisedStaff', label: 'Have you supervised field staff before?', options: YES_NO, required: true },
    ],
  },

  /* ─── 2. Agronomist / CSA Specialist ──────────────────────── */
  {
    slug:      'agronomist-csa-specialist',
    title:     'Agronomist / CSA Specialist',
    titleTail: '(2 positions)',
    summary:   'Practical climate-smart agriculture and vegetable production training for farmers, especially women, in Bade or Jakusko.',
    location:  'Yobe State (Bade or Jakusko LGA)',
    duration:  '2 months (Jan–Feb 2027) + 3 months (Jul–Sep 2027)',
    deadline:  DEADLINE,
    facts: [
      { icon: 'briefcase',  label: 'Job Title',    value: 'Agronomist / CSA Specialist (2 positions: 1 per LGA, Bade and Jakusko)' },
      { icon: 'project',    label: 'Project',      value: 'WPHF Climate-Resilient Peacebuilding (Yobe)' },
      { icon: 'reports',    label: 'Reporting To', value: 'Project Officer' },
      { icon: 'location',   label: 'Duty Station', value: 'Yobe State (Bade or Jakusko LGA preferred)' },
      { icon: 'clock',      label: 'Duration',     value: 'January–February 2027 (2 months) and July–September 2027 (3 months)' },
      { icon: 'deadline',   label: 'Deadline',     value: `${DEADLINE} (rolling basis)` },
    ],
    purpose: 'The Agronomist / CSA Specialist delivers practical climate-smart agriculture and vegetable production training and technical support to farmers, especially women, in the assigned LGA, supporting the delivery of FFS, hubs, technical clinics and starter packages under the project.',
    responsibilities: [
      'Facilitate practical Farmer Field School (FFS) sessions and demonstrations on climate-smart agriculture and vegetable production for farmers in the assigned LGA',
      'Deliver technical clinics and provide practical, on-the-spot technical advice to farmers',
      'Support the set-up and day-to-day running of hubs, working with Hub Committees and community groups',
      'Support the distribution of starter packages and guide beneficiaries on their proper use',
      'Explain technical content simply to farmers, with particular attention to women farmers and inclusion of vulnerable groups',
      'Travel frequently between hubs within the assigned LGA to follow up on farmers and activities',
      'Coordinate with Technical Assistants, the Project Officer, LGA officials and traditional leaders',
      'Collect field data, keep attendance and activity records, and prepare basic activity reports',
      'Uphold safeguarding, do-no-harm and gender and inclusion standards in all field activities',
      'Perform other duties assigned by the direct line manager',
    ],
    qualifications: [
      {
        heading: 'Education',
        items: ['Bachelor’s degree in Agronomy, Crop Science, Agricultural Extension, Horticulture, or related field'],
      },
      {
        heading: 'Experience',
        items: [
          'Minimum of 2 years practical experience in agricultural extension, climate-smart agriculture, or farmer training',
          'Experience facilitating practical farmer trainings or Farmer Field School-style sessions is highly desirable',
          'Experience working with women farmers or community groups in Yobe or the BAY states (Borno, Adamawa and Yobe) is a strong advantage',
          'Knowledge of vegetable production (tomato, pepper, onion, leafy vegetables, etc.) preferred',
        ],
      },
      {
        heading: 'Skills & Competencies',
        items: [
          'Good practical facilitation and demonstration skills',
          'Ability to explain technical content simply to farmers',
          'Willingness to travel frequently between hubs within the assigned LGA',
          'Basic reporting skills',
          'Gender and inclusion awareness',
        ],
      },
      {
        heading: 'Language',
        items: [
          'Fluency in Hausa (spoken and written)',
          'English (working knowledge)',
          'Kanuri is an added advantage',
        ],
      },
      {
        heading: 'Other',
        items: ['Must be based in / willing to be fully resident in Yobe State for the duration of the engagement'],
      },
    ],
    singlePdf: false,
    screening: [
      { key: 'preferredLga', label: 'Which LGA are you applying for?', options: ['Bade', 'Jakusko', 'Either'], required: true },
      {
        key: 'residentYobe', label: 'Are you resident in — or willing to fully relocate to — Yobe State?',
        hint: 'Full residency in Yobe State is required for the duration of the engagement.',
        options: YES_NO, required: true, warnOn: 'No',
        warning: 'This role requires full residency in Yobe State for the engagement. You may still apply, but please explain your situation in your cover letter.',
      },
      { key: 'hausaFluency',   label: 'Hausa fluency (spoken and written)', options: FLUENCY, required: true },
      { key: 'englishFluency', label: 'English (working knowledge)',        options: FLUENCY, required: true },
      { key: 'kanuri',         label: 'Do you speak Kanuri?', hint: 'An added advantage, not required.', options: YES_NO, required: false },
      { key: 'ffsExperience',  label: 'Have you facilitated Farmer Field School-style sessions?', options: YES_NO, required: true },
      { key: 'vegetableKnowledge', label: 'Knowledge of vegetable production (tomato, pepper, onion, leafy vegetables)?', options: YES_NO, required: true },
      { key: 'bayExperience',  label: 'Worked with women farmers or community groups in Yobe or the BAY states?', options: YES_NO, required: false },
    ],
  },

  /* ─── 3. Communications Officer ───────────────────────────── */
  {
    slug:      'communications-officer',
    title:     'Communications Officer',
    summary:   'Lead external and internal communications — social media, press releases and beneficiary stories that amplify humanitarian impact.',
    location:  'Yobe State',
    duration:  '11 months',
    deadline:  DEADLINE,
    facts: [
      { icon: 'briefcase',  label: 'Job Title',    value: 'Communications Officer' },
      { icon: 'department', label: 'Department',   value: 'Communications' },
      { icon: 'reports',    label: 'Reporting To', value: 'ICT/Media Coordinator' },
      { icon: 'location',   label: 'Duty Station', value: 'Yobe State' },
      { icon: 'clock',      label: 'Duration',     value: '11 months' },
      { icon: 'deadline',   label: 'Deadline',     value: `${DEADLINE} (rolling basis)` },
    ],
    purpose: 'The Communications Officer leads the organisation’s external and internal communications, managing social media, press releases and beneficiary stories to amplify humanitarian impact and meet donor visibility requirements.',
    responsibilities: [
      'Develop and implement the organisation’s communications and visibility strategy, aligned with organisational priorities and donor requirements',
      'Manage the organisation’s social media, website and other digital platforms, and plan and oversee content calendars',
      'Draft, edit and approve press releases, newsletters, case studies, beneficiary stories, impact stories, donor updates, factsheets and website content',
      'Amplify humanitarian impact through strong, ethical storytelling, and ensure donor visibility, branding, acknowledgement and marking requirements are met across all materials, events and project sites',
      'Obtain informed consent for stories, photos and videos, and protect the dignity, safety and privacy of the people featured',
      'Build and maintain relationships with journalists, media houses and communication partners, and lead media engagements and event coverage',
      'Coordinate with programme, MEAL, grants and field teams to gather accurate information, data and testimonies, and to feature programme results in reports and proposals',
      'Monitor social media engagement, reach and media coverage, and prepare periodic communications analytics reports with recommendations',
      'Maintain brand guidelines, templates and the repository of approved communication materials, ensuring consistent quality and branding',
      'Lead internal communications, advocacy campaigns and awareness-raising events',
      'Guide and support communications and media assistants on content production and quality',
      'Develop crisis and sensitive-issue communication guidelines, and help manage the organisation’s reputation',
      'Perform other duties assigned by the direct line manager',
    ],
    qualifications: [
      {
        heading: 'Education',
        items: ['Bachelor’s degree in Mass Communication, Journalism, Public Relations, Media Studies or a related field'],
      },
      {
        heading: 'Experience',
        items: [
          'Minimum 3 years’ experience in communications, public relations or media, preferably with an NGO or humanitarian organisation',
          'Proven experience managing social media and digital content',
        ],
      },
      {
        heading: 'Skills & Competencies',
        items: [
          'Excellent writing, editing and storytelling skills in English',
          'Proficiency in graphic design and visual content creation',
          'Knowledge of donor visibility, branding and marking requirements',
          'Understanding of ethical storytelling, safeguarding and consent in communications',
          'Ability to work under pressure, meet tight deadlines and travel to field locations when required',
        ],
      },
    ],
    singlePdf: true,
    screening: [
      {
        key: 'residentYobe', label: 'Are you resident in — or willing to relocate to — Yobe State?',
        options: YES_NO, required: true, warnOn: 'No',
        warning: 'The duty station is Yobe State. You may still apply, but please explain your situation in your cover letter.',
      },
      { key: 'socialMedia',   label: 'Experience managing social media and digital content?', options: YES_NO, required: true },
      { key: 'ngoExperience', label: 'Have you worked with an NGO or humanitarian organisation?', options: YES_NO, required: true },
      { key: 'graphicDesign', label: 'Proficiency in graphic design and visual content creation?', options: YES_NO, required: true },
      {
        key: 'donorVisibility', label: 'Familiar with donor visibility, branding and marking requirements?',
        options: YES_NO, required: false,
      },
    ],
  },
]

export function getJob(slug: string): Job | undefined {
  return JOBS.find(j => j.slug === slug)
}

export const OPEN_ROLE_COUNT = JOBS.length
