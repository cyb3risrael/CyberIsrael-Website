import React from 'react'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ValuesSection from '@/components/sections/ValuesSection'
import EventsSection from '@/components/sections/EventsSection'
import SocialSection from '@/components/sections/SocialSection'
import JoinSection from '@/components/sections/JoinSection'

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ValuesSection />
      <EventsSection />
      <SocialSection />
      <JoinSection />
    </>
  )
}

export default HomePage
