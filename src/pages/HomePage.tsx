import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import EventsSection from '@/components/sections/EventsSection'
import SocialSection from '@/components/sections/SocialSection'
import JoinSection from '@/components/sections/JoinSection'
import CultureSection from '@/components/sections/CultureSection'
import ValuesSection from '@/components/sections/ValuesSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <CultureSection />
      <EventsSection />
      <SocialSection />
      <JoinSection />
    </>
  )
}

export default HomePage
