import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/context/ThemeContext'

const valuesData = [
  { key: 'v1', icon: '📖', gradient: 'from-cyber-green to-cyber-teal', lightGrad: 'from-blue-500 to-teal-500' },
  { key: 'v2', icon: '⚔️', gradient: 'from-cyber-teal to-cyber-blue', lightGrad: 'from-teal-500 to-blue-600' },
  { key: 'v3', icon: '🤝', gradient: 'from-cyber-purple to-cyber-pink', lightGrad: 'from-purple-500 to-indigo-600' },
  { key: 'v4', icon: '💪', gradient: 'from-cyber-yellow to-cyber-green', lightGrad: 'from-amber-500 to-green-500' },
]

const ValuesSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <section id="values" className="py-24 relative z-10">
      {/* Background accent */}
      <div className={`absolute inset-0 ${
        theme === 'dark'
          ? 'bg-gradient-to-b from-transparent via-cyber-dark/40 to-transparent'
          : 'bg-gradient-to-b from-transparent via-blue-50/60 to-transparent'
      }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className={`font-display text-xs tracking-widest uppercase ${
            theme === 'dark' ? 'text-cyber-green' : 'text-light-blue'
          }`}>
            {t('values.subtitle')}
          </span>
          <h2 className="section-title mt-2">
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
              {t('values.title')}
            </span>
          </h2>
        </motion.div>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {valuesData.map((v, i) => (
            <motion.div
              key={v.key}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -8 }}
              className={`relative p-6 rounded-2xl overflow-hidden group cursor-default ${
                theme === 'dark'
                  ? 'bg-cyber-card border border-cyber-border/50'
                  : 'bg-white border border-light-border shadow-glass-light'
              }`}
            >
              {/* Gradient accent bar */}
              <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${
                theme === 'dark' ? v.gradient : v.lightGrad
              } opacity-80 group-hover:opacity-100 transition-opacity`} />

              {/* Icon with glow */}
              <motion.div
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="text-5xl mb-5 block"
              >
                {v.icon}
              </motion.div>

              <h3 className={`font-display font-bold text-lg mb-3 ${
                theme === 'dark' ? 'text-white' : 'text-light-text'
              }`}>
                {t(`values.${v.key}_title`)}
              </h3>

              <p className={`text-sm leading-relaxed ${
                theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
              }`}>
                {t(`values.${v.key}_desc`)}
              </p>

              {/* Subtle background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                theme === 'dark' ? v.gradient : v.lightGrad
              } opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ValuesSection
