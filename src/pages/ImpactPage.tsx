import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaStar } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'
import AboutStats from '@/components/sections/subSections/AboutStats'
/*import InstagramEmbed from '@/components/ui/instagram/InstagramEmbedProps'*/


const timelineEvents = [
  { year: '2022', title: 'Community Founded', desc: 'CyberIsrael was established by a group of passionate hackers and security researchers.', icon: '🚀', color: '#00FF88' },
  { year: '2022', title: 'First CTF Team', desc: 'Assembled our first competitive CTF team, competing in PicoCTF and national competitions.', icon: '🏁', color: '#00D4FF' },
  { year: '2023', title: '500 Members', desc: 'Reached our first major community milestone with 500 active members.', icon: '👥', color: '#8B5CF6' },
  { year: '2023', title: 'First Workshop Series', desc: 'Launched our recurring workshop program covering web exploitation, pwn, and reversing.', icon: '🔧', color: '#FFD700' },
  { year: '2024', title: 'Physical Conference', desc: 'Hosted our first in-person community conference with 200+ attendees.', icon: '🎤', color: '#FF0080' },
  { year: '2024', title: '1000 Members', desc: 'Doubled our community to over 1,000 active members across Israel.', icon: '🎯', color: '#00FF88' },
  { year: '2025', title: 'National Recognition', desc: 'Partnered with leading Israeli cybersecurity organizations and universities.', icon: '🌟', color: '#00D4FF' },
  { year: '2025', title: '2000+ Members', desc: 'Growing stronger every day. The future of Israeli cyber is here.', icon: '💎', color: '#8B5CF6' },
]

const galleryImages = [
  { src: '/media/images/image1.webp', caption: 'CyberIsrael Conference 2024', type: 'conference' },
  { src: '/media/images/image2.webp', caption: 'CyberIsrael Conference 2024', type: 'conference' },
  { src: '/media/images/image3.webp', caption: 'CyberIsrael Conference 2024', type: 'conference' },
  { src: '/media/images/image4.webp', caption: 'CyberIsrael Conference 2024', type: 'conference' },
  { src: '/media/images/image9.webp', caption: 'CyberIsrael Conference 2024', type: 'conference' },
  { src: '/media/images/image6.webp', caption: 'CyberIsrael Conference 2024', type: 'conference' },
]

const ImpactPage: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const timelineRef = useRef<HTMLDivElement>(null)
  const timelineInView = useInView(timelineRef, { once: true })


  return (
    <div className="min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="section-title">
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>{t('impact.title')}</span>
          </h1>
          <p className={`text-lg ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'}`}>
            {t('impact.subtitle')}
          </p>
        </motion.div>

        <AboutStats started={true} />

        { /* Instagram Posts */}
        { /* <InstagramEmbed url="https://www.instagram.com/p/DXuiFBEiLtQ/" */}

        {/* Photo Gallery */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <h2 className={`font-display text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-light-text'}`}>
            {t('impact.conferences_section')}
          </h2>
          <p className={`text-sm mb-8 ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'}`}>
            {t('impact.conferences_desc')}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((img, i) => (
              <motion.div
                key={i}
                className="relative group overflow-hidden rounded-xl aspect-video"
              >
                <img
                  src={img.src}
                  alt={img.caption}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                  <span className="text-white text-xs font-display">{img.caption}</span>
                </div>
                <div className={`absolute top-2 left-2 px-2 py-0.5 rounded-full text-xs font-display tracking-widest uppercase ${theme === 'dark'
                  ? 'bg-cyber-card/80 text-cyber-teal border border-cyber-teal/30'
                  : 'bg-white/80 text-light-teal border border-light-teal/30'
                  }`}>
                  {img.type}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Featured Video */}
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="relative group overflow-hidden rounded-xl aspect-video flex justify-center items-center"
        >
          <div
            className={`relative w-fit rounded-3xl overflow-hidden border ${theme === 'dark'
              ? 'bg-cyber-card border-cyber-green/30'
              : 'bg-white border-light-blue/20 shadow-sm'
              }`}
          >
            <div className="aspect-video w-[800px] max-w-full">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/1t7jHD319DE"
                title={t('impact.video_title')}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="p-6">
              <h3
                className={`font-display text-xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-light-text'
                  }`}
              >
                {t('impact.video_title')}
              </h3>

              <p
                className={`text-sm ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                  }`}
              >
                {t('impact.video_desc')}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          ref={timelineRef}
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className={`font-display text-2xl font-bold mb-2 text-center ${theme === 'dark' ? 'text-white' : 'text-light-text'}`}>
            {t('impact.timeline_title')}
          </h2>
          <div className="relative mt-10">
            {/* Center line */}
            <div className={`absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 ${theme === 'dark' ? 'bg-cyber-border/50' : 'bg-light-border'
              }`} />

            <div className="space-y-10">
              {timelineEvents.map((event, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className={`relative flex items-center ${i % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-0`}
                >
                  {/* Content */}
                  <div className={`w-5/12 ${i % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8'}`}>
                    <div className="font-display text-xs tracking-widest" style={{ color: event.color }}>
                      {event.year}
                    </div>
                    <div className={`font-display font-bold text-sm mt-1 ${theme === 'dark' ? 'text-white' : 'text-light-text'
                      }`}>
                      {event.title}
                    </div>
                    <div className={`text-xs mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                      }`}>
                      {event.desc}
                    </div>
                  </div>

                  {/* Center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 + 0.2 }}
                      className="w-10 h-10 rounded-full flex items-center justify-center text-lg z-10"
                      style={{ background: `${event.color}20`, border: `2px solid ${event.color}60` }}
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                  <div className="w-5/12" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Growth Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <h2 className={`font-display text-2xl font-bold mb-4 ${theme === 'dark' ? 'text-white' : 'text-light-text'}`}>
            {t('impact.growth_section')}
          </h2>
          <div className={`p-8 rounded-2xl border ${theme === 'dark'
            ? 'bg-cyber-card border-cyber-green/20'
            : 'bg-white border-light-blue/20 shadow-sm'
            }`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <FaStar className="text-yellow-400" />
              <span className="font-display text-5xl font-black gradient-text">2,000+</span>
              <FaStar className="text-yellow-400" />
            </div>
            <p className={`text-sm font-display tracking-widest uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
              }`}>
              Active Community Members & Growing
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default ImpactPage
