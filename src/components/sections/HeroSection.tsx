import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaDiscord, FaChevronDown } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'
import Logo from '@/components/ui/Logo'

const HeroSection: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const terminalRef = useRef<HTMLSpanElement>(null)

  // Typing effect for terminal text
  useEffect(() => {
    const texts = [
      'root@cyberisrael:~# ./join_community',
      'root@cyberisrael:~# ls events/',
      'root@cyberisrael:~# cat mission.txt',
      'root@cyberisrael:~# ./hack_the_world',
    ]
    let textIndex = 0
    let charIndex = 0
    let isDeleting = false
    let timeout: ReturnType<typeof setTimeout>

    const type = () => {
      const el = terminalRef.current
      if (!el) return
      const current = texts[textIndex]

      if (isDeleting) {
        el.textContent = current.substring(0, charIndex - 1)
        charIndex--
        if (charIndex === 0) {
          isDeleting = false
          textIndex = (textIndex + 1) % texts.length
          timeout = setTimeout(type, 500)
          return
        }
      } else {
        el.textContent = current.substring(0, charIndex + 1)
        charIndex++
        if (charIndex === current.length) {
          isDeleting = true
          timeout = setTimeout(type, 2000)
          return
        }
      }
      timeout = setTimeout(type, isDeleting ? 40 : 65)
    }

    timeout = setTimeout(type, 1000)
    return () => clearTimeout(timeout)
  }, [])

  const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16">
      {/* Animated SVG background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <radialGradient id="heroGrad1" cx="50%" cy="50%" r="80%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#0A1628' : '#E8F0FF'} stopOpacity="1" />
              <stop offset="100%" stopColor={theme === 'dark' ? '#050A0F' : '#F0F4FF'} stopOpacity="1" />
            </radialGradient>
            <radialGradient id="heroGlow1" cx="30%" cy="40%" r="40%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#00FF88' : '#2563EB'} stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="heroGlow2" cx="70%" cy="60%" r="40%">
              <stop offset="0%" stopColor={theme === 'dark' ? '#8B5CF6' : '#7C3AED'} stopOpacity="0.08" />
              <stop offset="100%" stopColor="transparent" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGrad1)" />
          <rect width="100%" height="100%" fill="url(#heroGlow1)" />
          <rect width="100%" height="100%" fill="url(#heroGlow2)" />

          {/* Animated concentric rings */}
          {[200, 340, 480, 620, 760].map((r, i) => (
            <motion.circle
              key={i}
              cx="50%"
              cy="50%"
              r={r}
              fill="none"
              stroke={theme === 'dark' ? '#00D4FF' : '#2563EB'}
              strokeWidth="0.5"
              strokeOpacity="0.08"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.2, duration: 1.5, ease: 'easeOut' }}
            />
          ))}

          {/* Animated circuit lines */}
          <motion.path
            d="M 0 300 L 150 300 L 200 250 L 400 250"
            stroke={theme === 'dark' ? '#00FF88' : '#2563EB'}
            strokeWidth="1"
            strokeOpacity="0.15"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 0.5 }}
          />
          <motion.path
            d="M 100% 200 L calc(100% - 150px) 200 L calc(100% - 200px) 250 L calc(100% - 400px) 250"
            stroke={theme === 'dark' ? '#00D4FF' : '#0891B2'}
            strokeWidth="1"
            strokeOpacity="0.15"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: 'easeInOut', delay: 1 }}
          />

          {/* Floating hexagons */}
          {[
            { x: '15%', y: '20%', size: 60, delay: 0 },
            { x: '85%', y: '15%', size: 40, delay: 0.5 },
            { x: '10%', y: '75%', size: 50, delay: 1 },
            { x: '88%', y: '80%', size: 70, delay: 1.5 },
            { x: '50%', y: '5%', size: 30, delay: 0.8 },
          ].map((hex, i) => (
            <motion.polygon
              key={i}
              points={`${hex.size / 2},0 ${hex.size},${hex.size * 0.25} ${hex.size},${hex.size * 0.75} ${hex.size / 2},${hex.size} 0,${hex.size * 0.75} 0,${hex.size * 0.25}`}
              fill="none"
              stroke={i % 2 === 0
                ? (theme === 'dark' ? '#00FF88' : '#2563EB')
                : (theme === 'dark' ? '#8B5CF6' : '#7C3AED')}
              strokeWidth="1"
              strokeOpacity="0.12"
              transform={`translate(${hex.x === '15%' ? '8%' : hex.x === '85%' ? '82%' : hex.x === '10%' ? '5%' : hex.x === '88%' ? '84%' : '47%'}, ${hex.y})`}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1, rotate: [0, 360] }}
              transition={{
                opacity: { delay: hex.delay, duration: 1 },
                scale: { delay: hex.delay, duration: 1 },
                rotate: { duration: 30 + i * 5, repeat: Infinity, ease: 'linear' },
              }}
            />
          ))}
        </svg>
      </div>

      {/* Main content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 text-center max-w-5xl mx-auto px-4"
      >
        {/* Status badge */}
        <motion.div variants={itemVariants} className="flex justify-center mb-8">
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-display tracking-widest ${theme === 'dark'
            ? 'border-cyber-green/30 bg-cyber-green/5 text-cyber-green'
            : 'border-light-blue/30 bg-light-blue/5 text-light-blue'
            }`}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyber-green' : 'bg-light-blue'}`}
            />
            {t('hero.badge')}
          </div>
        </motion.div>

        {/* Animated Logo */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Logo size={100} showText={false} />
          </motion.div>
        </motion.div>

        {/* Main title */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-7xl md:text-9xl font-black tracking-tighter mb-4 leading-none"
        >
          <span className="gradient-text animate-flicker">CYBER</span>
          <br />
          <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>ISRAEL</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className={`text-xl md:text-2xl font-light mb-3 ${theme === 'dark' ? 'text-slate-300' : 'text-light-text/80'
            }`}
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* Tagline */}
        <motion.p
          variants={itemVariants}
          className={`text-sm md:text-base font-display tracking-widest uppercase mb-8 ${theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
            }`}
        >
          {t('hero.tagline')}
        </motion.p>

        {/* Terminal text */}
        <motion.div
          variants={itemVariants}
          className={`inline-block mb-10 px-4 py-2 rounded-lg font-display text-sm ${theme === 'dark'
            ? 'bg-black/60 border border-cyber-green/20 text-cyber-green'
            : 'bg-white/80 border border-light-blue/20 text-light-blue'
            }`}
        >
          <span ref={terminalRef}></span>
          <motion.span
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.7, repeat: Infinity }}
            className="ml-0.5"
          >
            █
          </motion.span>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="https://discord.com/invite/VumvzWFZs"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <FaDiscord size={18} />
            {t('hero.cta_join')}
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            href="#about"
            className="btn-secondary"
          >
            {t('hero.cta_explore')}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default HeroSection
