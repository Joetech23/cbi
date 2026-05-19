import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE = {
  name: 'Care Best Initiative',
  tagline: "Lifesaving Care for Nigeria's Most Vulnerable Communities",
  email: 'info@cbi.ngo',
  phone: '+234 (0) 800 000 0000',
  address: 'No. 139, Aero Gardens Estate, Kyami, Airport Road, Abuja, Nigeria',
  founded: 2019,
  socials: {
    facebook: 'https://facebook.com/carebestinitiative',
    twitter: 'https://twitter.com/BestInitiative',
    linkedin: 'https://linkedin.com/company/carebestinitiative',
    instagram: 'https://instagram.com/carebestinitiative',
  },
}

export const NAV_LINKS = [
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Our History', href: '/about#history' },
      { label: 'Our Team', href: '/team' },
      { label: 'Mission & Values', href: '/about#mission' },
    ],
  },
  {
    label: 'Programs',
    href: '/programs',
    children: [
      { label: 'Education in Emergency', href: '/programs/education' },
      { label: 'Health & Nutrition', href: '/programs/health' },
      { label: 'WASH', href: '/programs/wash' },
      { label: 'Protection & GBV', href: '/programs/protection' },
      { label: 'Food Security', href: '/programs/food-security' },
    ],
  },
  { label: 'Impact', href: '/impact' },
  {
    label: 'Media',
    href: '/blog',
    children: [
      { label: 'News & Stories', href: '/blog' },
      { label: 'Gallery', href: '/gallery' },
      { label: 'Events', href: '/events' },
      { label: 'Publications', href: '/publications' },
    ],
  },
  { label: 'Contact', href: '/contact' },
]

export const STATS = [
  { value: 1500000, label: 'Beneficiaries Reached', suffix: '+' },
  { value: 10,     label: 'States Covered',        suffix: '' },
  { value: 35,     label: 'Global Partners',        suffix: '+' },
  { value: 6,      label: 'Core Programs',          suffix: '' },
]

export const PROGRAMS = [
  {
    id: 'education',
    title: 'Education in Emergency',
    description: 'Safe learning spaces ensuring access to quality education during crises and conflict.',
    icon: 'BookOpen',
    color: 'from-blue-50 to-blue-100',
    href: '/programs/education',
    stat: '900+ children back in school',
  },
  {
    id: 'health',
    title: 'Health & Primary Care',
    description: 'Primary healthcare services and training for health workers and caregivers across 10 states.',
    icon: 'Heart',
    color: 'from-rose-50 to-rose-100',
    href: '/programs/health',
    stat: '50+ health workers trained',
  },
  {
    id: 'nutrition',
    title: 'Nutrition',
    description: 'Early identification and treatment of acute malnutrition in children under five.',
    icon: 'Apple',
    color: 'from-green-50 to-green-100',
    href: '/programs/nutrition',
    stat: '8,000+ children treated',
  },
  {
    id: 'wash',
    title: 'WASH',
    description: 'Safe water access and rehabilitated boreholes for vulnerable communities in 12 LGAs.',
    icon: 'Droplets',
    color: 'from-cyan-50 to-cyan-100',
    href: '/programs/wash',
    stat: '8,000+ beneficiaries',
  },
  {
    id: 'protection',
    title: 'Protection & GBV',
    description: 'Child safeguarding and Gender-Based Violence prevention and response services.',
    icon: 'Shield',
    color: 'from-purple-50 to-purple-100',
    href: '/programs/protection',
    stat: 'Community-led prevention',
  },
  {
    id: 'food',
    title: 'Food Security & Livelihoods',
    description: 'Livelihood support programs building economic resilience and sustainable food access.',
    icon: 'Wheat',
    color: 'from-amber-50 to-amber-100',
    href: '/programs/food-security',
    stat: '3,265+ projects funded',
  },
]

export const TESTIMONIALS = [
  {
    name: 'Fatima Umar',
    role: 'Beneficiary, Borno State',
    quote: 'For the past four years, my parents struggled to support me. When CBI gave me a big bag filled with hygiene kits, it was the first time I had ever received such support. I felt seen and valued.',
    image: '/images/testimonial-1.jpg',
  },
  {
    name: 'Musa Adamu',
    role: 'Community Leader, Adamawa State',
    quote: 'Before CBI came to our community, we walked over 5 kilometres every day for water. Today we have a functioning borehole and our children no longer miss school to fetch water.',
    image: '/images/testimonial-2.jpg',
  },
  {
    name: 'Aisha Ibrahim',
    role: 'Mother, Yobe State',
    quote: 'My son was severely malnourished. The CBI nutrition team enrolled him in the program, and within weeks he was recovering. I am forever grateful for what they did.',
    image: '/images/testimonial-3.jpg',
  },
  {
    name: 'John Bitrus',
    role: 'Community Health Worker, Plateau State',
    quote: 'CBI trained me as a community health worker and now I serve over 200 families in my village. The knowledge they gave me is a gift I can share for years to come.',
    image: '/images/testimonial-4.jpg',
  },
]

export const PARTNERS = [
  'UNICEF', 'WFP', 'UNFPA', 'IOM', 'USAID', 'FCDO',
  'UN CERF', 'DRC', 'Caritas', 'CAFOD', 'NHF',
  'Sterling One Foundation', 'AHI', 'JDF', 'RAAI',
]

export const TIMELINE = [
  { year: 2019, title: 'Founded', description: 'Care Best Initiative founded by a team of 7. Launched "Stand Against Rape: Say No to Violence" — impacting 500+ youths and adults in Northeast Nigeria.', stat: '500+ impacted' },
  { year: 2020, title: 'Nutrition Scale-Up', description: 'Expanded to Borno State delivering nutrition services; managed food distribution and COVID-19 prevention across vulnerable communities.', stat: '25,000+ served' },
  { year: 2021, title: 'New Partnerships', description: 'Partnered with UNICEF. Launched cholera prevention campaigns and distributed hygiene kits to households across the North-East.', stat: '100,000+ reached' },
  { year: 2022, title: 'Broadened Impact', description: 'Extended to multiple Northern states. Enabled acute malnutrition response and emergency WASH services.', stat: '1,500,000+ individuals' },
  { year: 2023, title: 'Humanitarian Commitment', description: 'Partnered with UNICEF and Solidarites International for WASH assistance. Collaborated on education and GBV prevention campaigns.', stat: '8 LGAs covered' },
  { year: 2024, title: 'Girl-Child Empowerment', description: 'Launched school-based learning and girl-child empowerment. Focus on safe learning spaces and leadership skills development.', stat: '12 communities' },
  { year: 2025, title: 'Community Health Outreach', description: 'Delivering medical outreach and primary healthcare at grassroots level. Empowering community health workers across 10 states.', stat: '10 states active' },
]

export const DONATION_TIERS = [
  { amount: 25,  label: 'Feed a family for a week — all seven of them.', icon: 'UtensilsCrossed' },
  { amount: 50,  label: 'Put school supplies in the hands of 5 children who have none.', icon: 'BookOpen' },
  { amount: 100, label: 'Give a household clean, safe water for an entire season.', icon: 'Droplets' },
  { amount: 250, label: 'Equip 10 beneficiaries with a full healthcare kit.', icon: 'Heart' },
]
