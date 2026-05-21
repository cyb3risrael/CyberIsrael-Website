import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface LogoProps {
  size?: number
  showText?: boolean
  className?: string
}

const Logo: React.FC<LogoProps> = ({ size = 40, showText = true, className = '' }) => {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      <motion.div
        whileHover={{ scale: 1.05, rotate: 5 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="relative"
      >
        <img
          src="/logo.svg"
          alt="CyberIsrael Logo"
          width={size}
          height={size}
          className="drop-shadow-[0_0_8px_rgba(0,255,136,0.6)] group-hover:drop-shadow-[0_0_16px_rgba(0,255,136,0.8)] transition-all duration-300"
        />
      </motion.div>
      {showText && (
        <div className="flex flex-col">
          <span className="font-display text-lg font-bold tracking-widest gradient-text leading-none">
            CYBER
          </span>
          <span className="font-display text-lg font-bold tracking-widest neon-text-teal leading-none">
            ISRAEL
          </span>
        </div>
      )}
    </Link>
  )
}

export default Logo
