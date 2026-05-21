import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaTrophy, FaTools, FaMicrophone, FaVideo, FaArrowRight } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

const eventTypes = {
  ctf: { icon: FaTrophy, color: '#00FF88' },
  workshop: { icon: FaTools, color: '#00D4FF' },
  conference: { icon: FaMicrophone, color: '#8B5CF6' },
  webinar: { icon: FaVideo, color: '#FFD700' },
}

interface EventCardProps {
  type: keyof typeof eventTypes
  title: string
  desc: string
  date: string
  upcoming?: boolean
  delay: number
}

const EventCard: React.FC<EventCardProps> = ({ type, title, desc, date, upcoming, delay }) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const { icon: Icon, color } = eventTypes[type]

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ x: 4 }}
      className={`relative p-5 rounded-xl border group cursor-default transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-cyber-card border-cyber-border/40 hover:border-cyber-teal/30'
          : 'bg-white border-light-border shadow-sm hover:shadow-md'
      }`}
    >
      {upcoming && (
        <div className="absolute -top-2.5 right-4">
          <span className="px-2 py-0.5 rounded-full text-xs font-display tracking-widest"
            style={{ background: `${color}20`, color, border: `1px solid ${color}40` }}>
            UPCOMING
          </span>
        </div>
      )}
      <div className="flex items-start gap-4">
        <div className="p-2.5 rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, color }}>
          <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className={`font-display font-bold text-sm ${
              theme === 'dark' ? 'text-white' : 'text-light-text'
            }`}>{title}</h3>
            <span className={`text-xs flex-shrink-0 font-display ${
              theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
            }`}>{date}</span>
          </div>
          <p className={`text-xs leading-relaxed mb-2 ${
            theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
          }`}>{desc}</p>
          <span className="text-xs font-display tracking-widest uppercase" style={{ color }}>
            {t(`events.${type}`)}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

const EventsSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <section id="events" className="py-24 relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className={`font-display text-xs tracking-widest uppercase ${
            theme === 'dark' ? 'text-cyber-purple' : 'text-purple-500'
          }`}>
            {t('events.subtitle')}
          </span>
          <h2 className="section-title mt-2">
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
              {t('events.title')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upcoming */}
          <div>
            <h3 className={`font-display text-xs tracking-widest uppercase mb-5 flex items-center gap-2 ${
              theme === 'dark' ? 'text-cyber-green' : 'text-light-blue'
            }`}>
              <motion.span
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-current"
              />
              {t('events.upcoming')}
            </h3>
            <div className="space-y-4">
              <EventCard
                type="ctf"
                title={t('events.event1_title')}
                desc={t('events.event1_desc')}
                date="Q3 2025"
                upcoming
                delay={0}
              />
              <EventCard
                type="workshop"
                title={t('events.event2_title')}
                desc={t('events.event2_desc')}
                date="Aug 2025"
                upcoming
                delay={0.1}
              />
            </div>
          </div>

          {/* Past */}
          <div>
            <h3 className={`font-display text-xs tracking-widest uppercase mb-5 ${
              theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
            }`}>
              {t('events.past')}
            </h3>
            <div className="space-y-4">
              <EventCard
                type="conference"
                title={t('events.event3_title')}
                desc={t('events.event3_desc')}
                date="Mar 2025"
                delay={0.15}
              />
              <EventCard
                type="workshop"
                title="Malware Analysis Bootcamp"
                desc="Intensive 2-day workshop on static and dynamic malware analysis techniques."
                date="Jan 2025"
                delay={0.2}
              />
              <EventCard
                type="ctf"
                title="HackTheBox University CTF"
                desc="Community team competed internationally, placing in the top 15%."
                date="Dec 2024"
                delay={0.25}
              />
            </div>
          </div>
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-secondary inline-flex items-center gap-2"
          >
            {t('events.view_all')}
            <FaArrowRight size={12} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}

export default EventsSection
