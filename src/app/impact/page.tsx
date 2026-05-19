'use client'

import PageHero      from '@/components/layout/PageHero'
import ImpactNumbers from '@/components/sections/ImpactNumbers'
import Timeline      from '@/components/sections/Timeline'
import Testimonials  from '@/components/sections/Testimonials'
import DonationCTA   from '@/components/sections/DonationCTA'

export default function ImpactPage() {
  return (
    <>
      <PageHero
        tag="Our Impact"
        headline="Six years of evidence-based"
        emph="change."
        sub="From 500 people in 2019 to over 1,500,000 across 10 states — every number represents a real person whose life we touched."
      />
      <ImpactNumbers />
      <Timeline />
      <Testimonials />
      <DonationCTA />
    </>
  )
}
