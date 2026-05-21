import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaUniversity, FaBuilding, FaHandshake, FaGlobe, FaCheckCircle } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

const partnerTypes = [
  { key: 'type1', icon: FaUniversity, color: '#00FF88' },
  { key: 'type2', icon: FaBuilding, color: '#00D4FF' },
  { key: 'type3', icon: FaHandshake, color: '#8B5CF6' },
  { key: 'type4', icon: FaGlobe, color: '#FFD700' },
]

const CollaboratePage: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [formState, setFormState] = useState({ name: '', org: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault()
    // Future: POST to backend API
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setFormState({ name: '', org: '', email: '', message: '' })
  }

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
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
              {t('collaborate.title')}
            </span>
          </h1>
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${
            theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
          }`}>
            {t('collaborate.description')}
          </p>
        </motion.div>

        {/* Partnership types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <h2 className={`font-display text-xl font-bold text-center mb-10 ${
            theme === 'dark' ? 'text-white' : 'text-light-text'
          }`}>
            {t('collaborate.types_title')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {partnerTypes.map(({ key, icon: Icon, color }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -6 }}
                className={`relative p-6 rounded-2xl border text-center group overflow-hidden transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-cyber-card border-cyber-border/40 hover:border-opacity-60'
                    : 'bg-white border-light-border shadow-sm hover:shadow-md'
                }`}
                style={{ ['--card-color' as string]: color }}
                onMouseEnter={e => {
                  const el = e.currentTarget
                  el.style.borderColor = `${color}40`
                  el.style.boxShadow = `0 0 30px ${color}20`
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget
                  el.style.borderColor = ''
                  el.style.boxShadow = ''
                }}
              >
                <div
                  className="absolute top-0 left-0 right-0 h-1 transition-all duration-300"
                  style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)`, opacity: 0.7 }}
                />
                <motion.div
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="inline-flex p-4 rounded-2xl mb-4"
                  style={{ background: `${color}15`, color }}
                >
                  <Icon size={28} />
                </motion.div>
                <h3 className={`font-display font-bold text-sm mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-light-text'
                }`}>
                  {t(`collaborate.${key}_title`)}
                </h3>
                <p className={`text-xs leading-relaxed ${
                  theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                }`}>
                  {t(`collaborate.${key}_desc`)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Two-column layout: form + embed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h2 className={`font-display text-2xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-light-text'
            }`}>
              {t('collaborate.form_title')}
            </h2>
            <p className={`text-sm mb-8 ${
              theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
            }`}>
              {t('collaborate.form_subtitle')}
            </p>

            <div className="space-y-4">
              {[
                { name: 'name', label: t('collaborate.name'), type: 'text' },
                { name: 'org', label: t('collaborate.org'), type: 'text' },
                { name: 'email', label: t('collaborate.email'), type: 'email' },
              ].map(field => (
                <div key={field.name}>
                  <label className={`block text-xs font-display tracking-widest uppercase mb-2 ${
                    theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                  }`}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={formState[field.name as keyof typeof formState]}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 font-body ${
                      theme === 'dark'
                        ? 'bg-cyber-dark border border-cyber-border/50 text-slate-200 placeholder-slate-600 focus:border-cyber-teal/60 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                        : 'bg-slate-50 border border-light-border text-light-text placeholder-slate-400 focus:border-light-blue/60 focus:shadow-[0_0_10px_rgba(37,99,235,0.1)]'
                    }`}
                    placeholder={field.label}
                  />
                </div>
              ))}

              <div>
                <label className={`block text-xs font-display tracking-widest uppercase mb-2 ${
                  theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                }`}>
                  {t('collaborate.message')}
                </label>
                <textarea
                  name="message"
                  rows={5}
                  value={formState.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none font-body ${
                    theme === 'dark'
                      ? 'bg-cyber-dark border border-cyber-border/50 text-slate-200 placeholder-slate-600 focus:border-cyber-teal/60 focus:shadow-[0_0_20px_rgba(0,212,255,0.1)]'
                      : 'bg-slate-50 border border-light-border text-light-text placeholder-slate-400 focus:border-light-blue/60 focus:shadow-[0_0_10px_rgba(37,99,235,0.1)]'
                  }`}
                  placeholder={t('collaborate.message')}
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSubmit}
                className="btn-primary w-full justify-center text-sm py-3.5"
              >
                {submitted ? (
                  <span className="flex items-center justify-center gap-2">
                    <FaCheckCircle />
                    Message Sent!
                  </span>
                ) : (
                  t('collaborate.send')
                )}
              </motion.button>
            </div>
          </motion.div>

          {/* Google Form Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <h2 className={`font-display text-2xl font-bold mb-2 ${
              theme === 'dark' ? 'text-white' : 'text-light-text'
            }`}>
              Partnership Application
            </h2>
            <p className={`text-sm mb-6 ${
              theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
            }`}>
              For formal partnership applications, please fill out our detailed form:
            </p>

            <div className={`flex-1 rounded-2xl overflow-hidden border ${
              theme === 'dark'
                ? 'border-cyber-border/40 bg-cyber-card'
                : 'border-light-border bg-white shadow-sm'
            }`}>
              {/* Google Form iframe placeholder — replace src with real form URL */}
              <div className={`w-full h-full min-h-[500px] flex flex-col items-center justify-center gap-4 p-8 text-center ${
                theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
              }`}>
                <div className={`p-4 rounded-2xl ${
                  theme === 'dark' ? 'bg-cyber-dark' : 'bg-slate-50'
                }`}>
                  <FaHandshake size={40} className={theme === 'dark' ? 'text-cyber-teal/40' : 'text-light-teal/40'} />
                </div>
                <div>
                  <p className="font-display text-sm font-semibold mb-2">Google Form Integration</p>
                  <p className="text-xs max-w-xs leading-relaxed">
                    Replace this block with your Google Form iframe embed. The form will display natively here.
                  </p>
                </div>
                <a
                  href="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-xs py-2 px-6"
                >
                  Open Application Form
                </a>
                {/* 
                  TO EMBED GOOGLE FORM:
                  <iframe
                    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    marginHeight={0}
                    marginWidth={0}
                    title="Partnership Application"
                  >
                    Loading…
                  </iframe>
                */}
              </div>
            </div>

            {/* Contact alternative */}
            <div className={`mt-6 p-4 rounded-xl border text-sm ${
              theme === 'dark'
                ? 'border-cyber-green/20 bg-cyber-green/5 text-cyber-green'
                : 'border-light-blue/20 bg-light-blue/5 text-light-blue'
            }`}>
              <p className="font-display text-xs tracking-widest uppercase mb-1">Direct Contact</p>
              <a href="mailto:cyb3risrael@gmail.com" className="font-bold underline underline-offset-2">
                cyb3risrael@gmail.com
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CollaboratePage
