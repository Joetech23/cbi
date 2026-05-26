import Hero           from '@/components/sections/Hero'
import Programs       from '@/components/sections/Programs'
import ImpactStatement from '@/components/sections/ImpactStatement'
import PhotoCollage   from '@/components/sections/PhotoCollage'
import ImpactNumbers  from '@/components/sections/ImpactNumbers'
// import Timeline       from '@/components/sections/Timeline'
import Testimonials   from '@/components/sections/Testimonials'
import LatestStories  from '@/components/sections/LatestStories'
import Partners       from '@/components/sections/Partners'
import DonationCTA    from '@/components/sections/DonationCTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Programs />
      <ImpactStatement />
      <PhotoCollage />
      <ImpactNumbers />
      {/* <Timeline /> */}
      <Testimonials />
      <LatestStories />
      <Partners />
      <DonationCTA />
    </>
  )
}
