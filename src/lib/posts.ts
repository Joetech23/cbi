// CBI blog posts data — shared between listing and detail pages

export interface Post {
  id:       number
  slug:     string
  category: string
  title:    string
  date:     string
  read:     string
  color:    string
  excerpt:  string
  author:   string
  authorRole: string
  program?: string
  image:    string
  content:  string[]   // paragraphs
  tags:     string[]
}

export const POSTS: Post[] = [
  {
    id:         1,
    slug:       '1-5-million-lives-touched-our-2024-in-review',
    category:   'Impact',
    title:      '1,500,000 lives touched — our 2024 in review',
    date:       'Dec 18, 2024',
    read:       '6 min',
    color:      '#0102F1',
    author:     'Rejoice Mark',
    authorRole: 'Executive Director',
    program:    undefined,
    image:      '/images/cbi-community-1.jpg',
    tags:       ['Annual Review', '2024', 'Impact'],
    excerpt:    "A year of integrated programs across 10 Nigerian states. Here's what your support made possible.",
    content: [
      'As we close out 2024, Care Best Initiative pauses to reflect on a year of relentless service, renewed commitment, and hard-won progress across some of Nigeria\'s most challenging humanitarian contexts. From the sun-baked communities of Borno to the flood-affected villages of Zamfara, our teams were there — delivering healthcare, clean water, education, and protection to families who had nowhere else to turn.',
      'This year, we crossed a milestone that once felt distant: 1,500,000 lives reached since our founding in 2019. That number is not an abstraction. It is 1.5 million individual stories — a mother who gave birth safely because a trained health worker arrived on time, a child who returned to the classroom after two years of displacement, a family that no longer walks 5 kilometres for clean water.',
      'Our Health programme conducted over 70,000 consultations in 2024, with mobile clinics extending services to communities beyond the reach of fixed health facilities. The Nutrition programme managed over 8,000 cases of severe acute malnutrition, with a treatment success rate exceeding 90%. In education, we supported the re-enrolment of more than 12,000 children across conflict-affected schools, distributing learning materials and training teachers in child-friendly pedagogy.',
      'The WASH programme rehabilitated 24 boreholes and constructed 80 sanitation facilities, providing over 30,000 individuals with sustainable access to safe water. Our Protection teams managed more than 5,000 cases of gender-based violence and child protection concerns, providing survivor-centred psychosocial support, legal referrals, and dignity kits.',
      'None of this was possible without the trust of our partners — UNICEF, WFP, USAID, and over 35 civil society organisations — nor without the courage of our 200+ field staff who work in difficult and often dangerous conditions. To every donor, partner, and community member who stood with us in 2024: thank you. The work continues.',
    ],
  },
  {
    id:         2,
    slug:       'fatimas-return-to-school-after-two-lost-years',
    category:   'Stories',
    title:      "Fatima's return to school after two lost years",
    date:       'Nov 12, 2024',
    read:       '4 min',
    color:      '#0102F1',
    author:     'Umazayi Thomas Dayo',
    authorRole: 'Head of Office & Programmes Manager',
    program:    'Education',
    image:      '/images/cbi-child-uniform.jpg',
    tags:       ['Education', 'Children', 'Borno State'],
    excerpt:    "How CBI's Education programme reopened a future for one displaced 8-year-old.",
    content: [
      'Fatima was six years old when conflict swept through her village in Borno State. Her school — a two-room block building on the edge of the market — was shuttered within days. Her family fled. For two years, she lived in a displacement camp on the outskirts of Maiduguri with her mother and four siblings, watching other children play while the days passed without learning, without books, without the rhythm of school.',
      'When CBI\'s Education in Emergencies team set up a Temporary Learning Space inside the camp in early 2023, Fatima was among the first children enrolled. She was placed in a catch-up class designed to help out-of-school children recover foundational literacy and numeracy skills. Within three months, her teacher — a community volunteer trained by CBI — reported that Fatima could read simple sentences and solve basic arithmetic with growing confidence.',
      '"Before CBI came, I had not been to school for two years. Now I go every day, and I can read," Fatima told our team during a monitoring visit in October. She clutched a notebook — one of 2,400 distributed by CBI this quarter — with the kind of care that told us she knew exactly what it was worth.',
      'In 2024, CBI\'s Education programme supported 12,000+ children like Fatima across 10 states. We trained 340 teachers in inclusive pedagogy, established 18 child-friendly learning spaces, and distributed over 14,000 sets of teaching and learning materials. For every Fatima, there are thousands of stories we haven\'t told yet. We are committed to continuing until every child is back in a safe classroom.',
    ],
  },
  {
    id:         3,
    slug:       'borno-borehole-rehabilitation-8000-lives-reached',
    category:   'Programs',
    title:      'Borno borehole rehabilitation — 8,000 lives reached',
    date:       'Oct 25, 2024',
    read:       '5 min',
    color:      '#0102F1',
    author:     'Muhammad Alhaji Muhammad',
    authorRole: 'Information Management Officer',
    program:    'WASH',
    image:      '/images/cbi-wash-program.jpg',
    tags:       ['WASH', 'Clean Water', 'Borno State'],
    excerpt:    'Twelve new boreholes brought clean water to communities that walked 5km each day.',
    content: [
      'Water scarcity is one of the most persistent humanitarian challenges across Nigeria\'s northeast. In several communities in Borno State, residents — predominantly women and girls — spent up to three hours each day walking to distant water sources, often rivers or unprotected wells that posed significant health risks. This cycle of effort drained time from school, work, and rest.',
      'In 2024, CBI\'s WASH programme completed the rehabilitation of 12 boreholes across six local government areas in Borno State, reaching an estimated 8,000 individuals with reliable, clean water access. The project included solar-powered pumping systems to ensure functionality even during power outages, and the construction of elevated storage tanks to serve larger households.',
      'Beyond the infrastructure, CBI established Water, Sanitation and Hygiene (WASH) committees in each community — trained volunteer groups responsible for the ongoing maintenance, fee collection, and minor repairs of the systems. "We own this borehole," said Aisha, chair of the WASH committee in Jere LGA. "We know how to fix it, and we will keep it running."',
      'Hygiene promotion sessions reached over 3,600 community members, covering handwashing, safe water storage, menstrual hygiene management, and household sanitation. In communities where our teams conducted before-and-after assessments, rates of reported diarrhoeal illness among children under five dropped by 38% within six months of the intervention.',
      'This project was implemented with support from our humanitarian partners and demonstrates the power of combining hard infrastructure with community capacity — a model CBI is scaling across seven states in 2025.',
    ],
  },
  {
    id:         4,
    slug:       'how-we-trained-50-community-health-workers-in-one-year',
    category:   'Impact',
    title:      'How we trained 50+ community health workers in one year',
    date:       'Sep 30, 2024',
    read:       '7 min',
    color:      '#0102F1',
    author:     'Rejoice Mark',
    authorRole: 'Executive Director',
    program:    'Health',
    image:      '/images/cbi-medical-outreach.jpg',
    tags:       ['Health', 'Capacity Building', 'Community'],
    excerpt:    'A model that places medical knowledge in the hands of the communities themselves.',
    content: [
      'The primary healthcare system in Nigeria\'s northeast operates under enormous strain. Facility-to-population ratios are among the lowest in the country, staff retention is challenged by insecurity, and supply chains are disrupted by conflict. In this environment, waiting for a formal health worker to arrive is not always an option.',
      'CBI\'s community health worker (CHW) programme takes a different approach: train trusted community members — mothers, teachers, religious leaders — to identify danger signs, provide basic first aid, refer cases, and promote health-seeking behaviour within their own neighbourhoods. In 2024, we trained 54 community health workers across Borno, Adamawa, and Yobe States.',
      'The training covers a standardised 12-day curriculum developed with support from national health authorities. Topics include integrated management of childhood illness (IMCI), maternal danger signs, malnutrition screening using MUAC tape, oral rehydration therapy, malaria prevention, and basic wound care. Each CHW receives a community health kit and regular supportive supervision from CBI clinical staff.',
      'The results have been measurable. In communities where CBI CHWs are active, referral rates to primary health facilities increased by 62%, and the average time between symptom onset and treatment-seeking dropped from 4.8 days to 1.9 days. Crucially, CHWs identified and referred 214 severe acute malnutrition cases that may otherwise have gone undetected.',
      '"When a child is sick in the night, I go," said Hauwa, a CHW in Maiduguri. "I don\'t wait for the clinic to open. I check the child, I call the family, I write it down, and if it is serious, we go together." This is the kind of frontline presence no health system can buy — it grows from community trust, and CBI is committed to nurturing it.',
    ],
  },
  {
    id:         5,
    slug:       'cbi-joins-unicef-nutrition-summit-in-abuja',
    category:   'Events',
    title:      'CBI joins UNICEF nutrition summit in Abuja',
    date:       'Aug 14, 2024',
    read:       '3 min',
    color:      '#0102F1',
    author:     'Umazayi Thomas Dayo',
    authorRole: 'Head of Office & Programmes Manager',
    program:    'Nutrition',
    image:      '/images/programs/IMG_9297-nutrition.jpg',
    tags:       ['Nutrition', 'UNICEF', 'Events', 'Abuja'],
    excerpt:    'Our learnings from the field shared with national stakeholders.',
    content: [
      'In August 2024, Care Best Initiative participated in the National Nutrition Stakeholders Summit convened by UNICEF Nigeria in Abuja. The gathering brought together over 120 representatives from government ministries, UN agencies, international and national NGOs, academia, and private sector partners — all committed to accelerating Nigeria\'s progress on nutrition outcomes.',
      'CBI presented key findings from our Integrated Management of Acute Malnutrition (IMAM) programme in Borno and Yobe States, including our community-based outpatient therapeutic programme (OTP) which has treated over 8,000 SAM cases since 2019 with a recovery rate above 90%. Our presentation highlighted the role of community health workers in early identification, the integration of nutrition with WASH and health programming, and challenges related to RUTF supply chain disruptions.',
      'The summit produced a joint communiqué calling for increased domestic financing for nutrition, strengthened coordination between sectors, and the expansion of community-based management approaches — all areas where CBI\'s field experience contributed to the conversation. We also held bilateral discussions with UNICEF nutrition specialists about expanding our geographic coverage in 2025.',
      'Events like this matter because policy and practice must speak to each other. The data our teams collect in Maiduguri should inform decisions made in Abuja. CBI remains committed to bridging that gap — not just through programme delivery, but through advocacy, evidence-sharing, and constructive engagement with the systems that shape humanitarian response.',
    ],
  },
  {
    id:         6,
    slug:       'aminas-safe-delivery-in-a-village-without-a-clinic',
    category:   'Stories',
    title:      "Amina's safe delivery in a village without a clinic",
    date:       'Jul 22, 2024',
    read:       '5 min',
    color:      '#0102F1',
    author:     'Rejoice Mark',
    authorRole: 'Executive Director',
    program:    'Health',
    image:      '/images/cbi-mother-baby.jpg',
    tags:       ['Health', 'Maternal Care', 'Adamawa State'],
    excerpt:    'Sometimes the difference between life and loss is one trained worker who arrives on time.',
    content: [
      'Amina is 24 years old and lives in a small village in Adamawa State where the nearest health facility is 38 kilometres away on an unpaved road. Like most women in her community, she had given birth to her first child at home, attended by a traditional birth attendant with no formal training. That birth was difficult. Her second pregnancy brought new fears.',
      'Through CBI\'s community health worker network, Amina was registered for antenatal care in her second trimester. A trained CBI midwife visited her village monthly, conducting blood pressure checks, iron supplementation, malaria prophylaxis, and birth preparedness counselling. When Amina showed signs of pre-eclampsia at 34 weeks, her CHW — who had been trained to recognise danger signs — arranged an emergency referral to the state hospital within hours.',
      'Amina delivered a healthy baby girl by caesarean section. She named her Zara. When our monitoring team visited three months later, both mother and baby were thriving. "The health worker came to my village," Amina said. "Without her, I don\'t know if my baby would be here today."',
      'In 2024, CBI\'s Maternal and Newborn Health programme conducted over 10,000 antenatal care consultations, supported 1,800 supervised deliveries, and provided postnatal care follow-ups to more than 3,400 mother-infant pairs. Behind each of these numbers is a story like Amina\'s — a life balanced on the edge of access, and a system that reached just in time.',
      'We share Amina\'s story with her full permission. Protecting the dignity of the people we serve is central to how we work — and how we tell the world about what is happening in these communities.',
    ],
  },
]

export function getPost(slug: string): Post | undefined {
  return POSTS.find(p => p.slug === slug)
}

export function getRelatedPosts(post: Post, limit = 3): Post[] {
  return POSTS
    .filter(p => p.slug !== post.slug && (p.category === post.category || p.program === post.program))
    .slice(0, limit)
    .concat(
      POSTS.filter(p => p.slug !== post.slug && !POSTS.slice(0, limit).find(r => r.slug === p.slug))
    )
    .slice(0, limit)
}
