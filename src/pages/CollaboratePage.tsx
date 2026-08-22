import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/context/ThemeContext'
import Logo from '@/components/ui/Logo'
import { socialLinks } from '@/services/socialLinks'


const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
}

const CollaboratePage: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()

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
          <p className={`text-lg max-w-2xl mx-auto leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
            }`}>
            {t('collaborate.description')}
          </p>
        </motion.div>

        { /* Decorative animated logo */}
        <motion.div variants={itemVariants} className="flex justify-center mb-6">
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Logo size={100} showText={true} />
          </motion.div>
        </motion.div>

        {/* Two-column layout: form + embed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Google Form Embed */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col"
          >
            <h2 className={`font-display text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-light-text'
              }`}>
              Partnership Application
            </h2>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
              }`}>
              For Collaborations, please fill out our detailed form:
            </p>

            <div className={`rounded-2xl overflow-hidden border ${theme === 'dark'
              ? 'border-cyber-border/40 bg-cyber-card'
              : 'border-light-border bg-white shadow-sm'
              }`}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLScO9P0ekHQmAnCpFShlLQtUkKw29AvzJG8OpoGs2oIS7GmXkA/viewform?embedded=true"
                className="w-full min-h-[700px]">
                Loading…
              </iframe>
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
            <h2 className={`font-display text-2xl font-bold mb-2 ${theme === 'dark' ? 'text-white' : 'text-light-text'
              }`}>
              Guest Speaker Submission Form:
            </h2>
            <p className={`text-sm mb-6 ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
              }`}>
              For featured Guest Speakers, please fill out our detailed form:
            </p>

            <div className={`flex-1 rounded-2xl overflow-hidden border ${theme === 'dark'
              ? 'border-cyber-border/40 bg-cyber-card'
              : 'border-light-border bg-white shadow-sm'
              }`}>
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSfLfg8TA19BDj2K9nIvkBtnCTojoKdvoO83cc_3hStB6M-XKQ/viewform?embedded=true"
                className="w-full min-h-[700px]">
                Loading…
              </iframe>
            </div>

            {/* Contact alternative */}
            <div className={`mt-6 p-4 rounded-xl border text-sm ${theme === 'dark'
              ? 'border-cyber-green/20 bg-cyber-green/5 text-cyber-green'
              : 'border-light-blue/20 bg-light-blue/5 text-light-blue'
              }`}>
              <p className="font-display text-xs tracking-widest uppercase mb-1">Direct Contact</p>
              <a href={socialLinks.email} className="font-bold underline underline-offset-2">
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
