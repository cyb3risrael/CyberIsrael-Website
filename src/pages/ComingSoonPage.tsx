import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'
import Logo from '@/components/ui/Logo'

const ComingSoonPage: React.FC = () => {
    const { theme } = useTheme()
    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <motion.div variants={itemVariants} className="flex justify-center mb-6">
                    <motion.div
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <Logo size={100} showText={true} />
                    </motion.div>
                </motion.div>

                {/* Construction Emoji */}
                <motion.div
                    className="text-8xl mb-6"
                    animate={{ rotate: [-2, 2, -2] }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    🚧
                </motion.div>

                {/* Title */}
                <h1
                    className={`font-display text-4xl md:text-5xl font-black mb-4 ${theme === 'dark' ? 'text-white' : 'text-light-text'
                        }`}
                >
                    Under Construction
                </h1>

                {/* Subtitle */}
                <p
                    className={`max-w-xl mx-auto mb-8 font-display text-sm md:text-base ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                        }`}
                >
                    <span
                        className={
                            theme === 'dark'
                                ? 'text-cyber-green font-bold'
                                : 'text-light-blue font-bold'
                        }
                    >
                        STATUS:
                    </span>{' '}
                    This page is currently being developed and will be available soon.
                    We're working on adding high-quality content, tutorials, and resources.
                    Check back later!
                </p>

                {/* Small decorative emojis */}
                <div className="flex justify-center gap-4 text-3xl mb-8">
                    <span>🏗️</span>
                    <span>⚙️</span>
                    <span>💻</span>
                </div>

                {/* Button */}
                <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                    <Link to="/" className="btn-primary">
                        Return Home
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default ComingSoonPage