import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaWhatsapp, FaInstagram, FaTiktok, FaEnvelope, FaGoogleDrive } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

const socialData = [
  {
    icon: FaDiscord,
    label: 'Discord',
    handle: '@CyberIsrael',
    href: 'https://discord.com/invite/VumvzWFZs',
    color: '#5865F2',
    bg: 'rgba(168,85,247,0.10)',
    border: 'rgba(168,85,247,0.28)',
    glow: 'rgba(168,85,247,0.5)',
    desc: 'Join our growing Discord server',
  },
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    handle: 'CyberIsrael Group',
    href: 'https://chat.whatsapp.com/IOpf245lzQx3FgUDNvSUZ2?mode=ems_wa_t',
    color: '#25D366',
    bg: 'rgba(37,211,102,0.1)',
    border: 'rgba(37,211,102,0.3)',
    glow: 'rgba(37,211,102,0.4)',
    desc: 'Real-time discussions and alerts',
  },
  {
    icon: FaGoogleDrive,
    label: 'Drive',
    handle: '@cyb3r.israel',
    href: 'https://drive.google.com/drive/folders/1FpbtSTb0ztKClrIKZT1HdlGbLENTj_hj?usp=sharing',
    color: '#4285F4',
    bg: 'rgba(66,133,244,0.10)',
    border: 'rgba(66,133,244,0.28)',
    glow: 'rgba(66,133,244,0.35)',
    desc: 'Community Drive With Resources for you!',
  },
  {
    icon: FaInstagram,
    label: 'Instagram',
    handle: '@cyb3r.israel',
    href: 'https://www.instagram.com/cyb3r.israel?igsh=Mjh0aGZqOHhoOXFi',
    color: '#C13584',
    bg: 'rgba(193,53,132,0.10)',
    border: 'rgba(193,53,132,0.28)',
    glow: 'rgba(193,53,132,0.35)',
    desc: 'Behind the scenes, highlights & educational content',
  },
  {
    icon: FaTiktok,
    label: 'TikTok',
    handle: '@cyb3r.israel',
    href: 'https://www.tiktok.com/@cyb3r.israel',
    color: '#00F5D4',
    bg: 'rgba(0,245,212,0.10)',
    border: 'rgba(0,245,212,0.28)',
    glow: 'rgba(0,245,212,0.35)',
    desc: 'Short-form cyber content',
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    handle: 'cyb3risrael@gmail.com',
    href: 'mailto:cyb3risrael@gmail.com',
    color: '#00D4FF',
    bg: 'rgba(0,212,255,0.1)',
    border: 'rgba(0,212,255,0.3)',
    glow: 'rgba(0,212,255,0.4)',
    desc: 'Reach us directly',
  },
]

const SocialSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

  return (
    <section id="social" className="py-24 relative z-10">
      <div className={`absolute inset-0 ${theme === 'dark'
        ? 'bg-gradient-to-b from-transparent via-cyber-dark/30 to-transparent'
        : 'bg-gradient-to-b from-transparent via-blue-50/50 to-transparent'
        }`} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className={`font-display text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cyber-teal' : 'text-light-teal'
            }`}>
            {t('social.subtitle')}
          </span>
          <h2 className="section-title mt-2">
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
              {t('social.title')}
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {socialData.map((s, i) => (
            <motion.a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.6 }}
              whileHover={{ y: -6, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`group relative p-6 rounded-2xl border transition-all duration-300 overflow-hidden ${theme === 'dark'
                ? 'bg-cyber-card border-cyber-border/40'
                : 'bg-white border-light-border shadow-sm'
                }`}
              style={{
                ['--social-color' as string]: s.color,
              }}
              onMouseEnter={e => {
                const el = e.currentTarget
                el.style.borderColor = s.border
                el.style.boxShadow = `0 0 30px ${s.glow}, 0 8px 30px rgba(0,0,0,0.2)`
                el.style.background = theme === 'dark' ? s.bg : s.bg
              }}
              onMouseLeave={e => {
                const el = e.currentTarget
                el.style.borderColor = ''
                el.style.boxShadow = ''
                el.style.background = ''
              }}
            >
              <div className="flex items-start gap-4">
                <motion.div
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  className="p-3 rounded-xl flex-shrink-0"
                  style={{ background: s.bg, color: s.color }}
                >
                  <s.icon size={24} />
                </motion.div>
                <div>
                  <div className="font-display font-bold text-sm mb-0.5" style={{ color: s.color }}>
                    {s.label}
                  </div>
                  <div className={`text-xs font-display mb-2 ${theme === 'dark' ? 'text-slate-300' : 'text-light-text'
                    }`}>
                    {s.handle}
                  </div>
                  <div className={`text-xs ${theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
                    }`}>
                    {s.desc}
                  </div>
                </div>
              </div>

              {/* Animated arrow */}
              <motion.div
                initial={{ x: -5, opacity: 0 }}
                whileHover={{ x: 0, opacity: 1 }}
                className="absolute bottom-4 right-4 text-xs font-display tracking-widest"
                style={{ color: s.color }}
              >
                JOIN →
              </motion.div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SocialSection
