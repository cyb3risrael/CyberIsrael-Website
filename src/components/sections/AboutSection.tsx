import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/context/ThemeContext'
import AboutStats from './subSections/AboutStats'

const AboutSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const ref = useRef<HTMLDivElement>(null)

  const inView = useInView(ref, {
    once: true,
    margin: '-100px'
  })

  return (
    <section
      id="about"
      className="pt-10 relative z-10"
      ref={ref}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span
            className={`font-display text-xs tracking-widest uppercase ${theme === 'dark'
              ? 'text-cyber-teal'
              : 'text-light-teal'
              }`}
          >
            {t('about.subtitle')}
          </span>

          <h2 className="section-title mt-2">
            <span
              className={
                theme === 'dark'
                  ? 'text-white'
                  : 'text-light-text'
              }
            >
              {t('about.title')}
            </span>
          </h2>

          <p
            className={`max-w-2xl mx-auto text-lg leading-relaxed ${theme === 'dark'
              ? 'text-slate-400'
              : 'text-light-muted'
              }`}
          >
            {t('about.description')}
          </p>
        </motion.div>

        {/* Stats */}
        <AboutStats started={inView} />
      </div>
    </section>
  )
}

export default AboutSection