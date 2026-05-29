import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaTrophy, FaUsers, FaCalendarCheck, FaStar } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

const useCountUp = (end: number, duration = 2000, startWhen = false) => {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!startWhen) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) {
        setCount(end)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [end, duration, startWhen])
  return count
}

interface StatCardProps {
  value: number
  suffix?: string
  label: string
  icon: React.ReactNode
  color: string
  delay: number
  started: boolean
}

const StatCard: React.FC<StatCardProps> = ({ value, suffix = '+', label, icon, color, delay, started }) => {
  const { theme } = useTheme()
  const count = useCountUp(value, 1800, started)
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="card-cyber text-center group"
    >
      <div className="flex justify-center mb-3">
        <div
          className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
          style={{ background: `${color}15`, color }}
        >
          {icon}
        </div>
      </div>
      <div className="font-display text-4xl font-black mb-1" style={{ color }}>
        {count}{suffix}
      </div>
      <div className={`text-sm font-display tracking-widest uppercase ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
        }`}>
        {label}
      </div>
    </motion.div>
  )
}

const AboutSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const stats = [
    { value: 2000, label: t('about.stat_members'), icon: <FaUsers size={22} />, color: '#00FF88', delay: 0 },
    { value: 50, label: t('about.stat_ctfs'), icon: <FaTrophy size={22} />, color: '#00D4FF', delay: 0.1 },
    { value: 30, label: t('about.stat_events'), icon: <FaCalendarCheck size={22} />, color: '#8B5CF6', delay: 0.2 },
    { value: 3, label: t('about.stat_years'), suffix: '', icon: <FaStar size={22} />, color: '#FFD700', delay: 0.3 },
  ]

  return (
    <section id="about" className="pt-10 relative z-10" ref={ref}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className={`font-display text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cyber-teal' : 'text-light-teal'
            }`}>
            {t('about.subtitle')}
          </span>
          <h2 className="section-title mt-2">
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
              {t('about.title')}
            </span>
          </h2>
          <p className={`max-w-2xl mx-auto text-lg leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
            }`}>
            {t('about.description')}
          </p>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <StatCard key={i} {...stat} started={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
