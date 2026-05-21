import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

const NotFoundPage: React.FC = () => {
  const { theme } = useTheme()

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div className="font-display text-9xl font-black gradient-text mb-4">404</div>
        <h1 className={`font-display text-2xl font-bold mb-4 ${
          theme === 'dark' ? 'text-white' : 'text-light-text'
        }`}>
          Access Denied
        </h1>
        <p className={`mb-8 max-w-md mx-auto font-display text-sm ${
          theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
        }`}>
          <span className={theme === 'dark' ? 'text-cyber-green' : 'text-light-blue'}>
            ERROR 404:
          </span>{' '}
          The page you're looking for has been moved, deleted, or never existed in this sector.
        </p>
        <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
          <Link to="/" className="btn-primary">
            Return to Base
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFoundPage
