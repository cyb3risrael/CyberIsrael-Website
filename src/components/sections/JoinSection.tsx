import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaCheck } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'
import { socialLinks } from '@/services/socialLinks'

const JoinSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  const features = [
    t('join.feature1'),
    t('join.feature2'),
    t('join.feature3'),
    t('join.feature4'),
  ]

  return (
    <section id="join" className="py-28 relative z-10 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 ${theme === 'dark'
          ? 'bg-gradient-to-br from-cyber-dark via-cyber-black to-cyber-dark'
          : 'bg-gradient-to-br from-blue-50 via-white to-purple-50'
          }`} />
        {/* Animated orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(0,255,136,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(37,99,235,0.08), transparent 70%)',
          }}
        />
        <motion.div
          animate={{ x: [0, -30, 0], y: [0, 20, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{
            background: theme === 'dark'
              ? 'radial-gradient(circle, rgba(139,92,246,0.06), transparent 70%)'
              : 'radial-gradient(circle, rgba(124,58,237,0.08), transparent 70%)',
          }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <span className={`font-display text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cyber-green' : 'text-light-blue'
            }`}>
            {t('join.subtitle')}
          </span>
          <h2 className="section-title mt-3 gradient-text">
            {t('join.title')}
          </h2>
          <p className={`text-lg max-w-2xl mx-auto mb-10 leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
            }`}>
            {t('join.description')}
          </p>

          {/* Feature checklist */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-xl mx-auto mb-12">
            {features.map((f, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm text-left ${theme === 'dark'
                  ? 'bg-cyber-card border border-cyber-border/40'
                  : 'bg-white border border-light-border shadow-sm'
                  }`}
              >
                <div className={`p-1 rounded-full ${theme === 'dark' ? 'bg-cyber-green/20' : 'bg-light-blue/10'
                  }`}>
                  <FaCheck size={10} className={theme === 'dark' ? 'text-cyber-green' : 'text-light-blue'} />
                </div>
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-light-text'}>
                  {f}
                </span>
              </motion.div>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              whileHover={{ scale: 1.04, boxShadow: '0 0 40px rgba(0,255,136,0.4)' }}
              whileTap={{ scale: 0.96 }}
              href={socialLinks.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2 text-base px-10 py-4"
            >
              <FaDiscord size={20} />
              {t('join.discord_cta')}
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              href={socialLinks.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary text-base px-10 py-4"
            >
              {t('social.join_whatsapp')}
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default JoinSection
