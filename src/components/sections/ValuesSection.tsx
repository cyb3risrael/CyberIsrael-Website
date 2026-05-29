import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useTheme } from '@/context/ThemeContext'

const valuesData = [
    {
        key: 'val1',
        icon: '🤝',
        gradient: 'from-cyber-green to-cyber-teal',
        lightGrad: 'from-blue-500 to-teal-500',
    },
    {
        key: 'val2',
        icon: '📈',
        gradient: 'from-cyber-teal to-cyber-blue',
        lightGrad: 'from-teal-500 to-blue-600',
    },
    {
        key: 'val3',
        icon: '🚪',
        gradient: 'from-cyber-purple to-cyber-pink',
        lightGrad: 'from-purple-500 to-indigo-600',
    },
]

const ValuesSection: React.FC = () => {
    const { t } = useTranslation()
    const { theme } = useTheme()

    return (
        <section id="values" className="py-10 relative z-10">
            {/* Background accent */}
            <div
                className={`absolute inset-0 ${theme === 'dark'
                    ? 'bg-gradient-to-b from-transparent via-cyber-dark/40 to-transparent'
                    : 'bg-gradient-to-b from-transparent via-blue-50/60 to-transparent'
                    }`}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 relative">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="text-center mb-16"
                >
                    <span
                        className={`font-display text-xs tracking-widest uppercase ${theme === 'dark' ? 'text-cyber-green' : 'text-light-blue'
                            }`}
                    >
                        {t('values.subtitle')}
                    </span>

                    <h2 className="section-title mt-2">
                        <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>
                            {t('values.title')}
                        </span>
                    </h2>
                </motion.div>

                {/* Values grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {valuesData.map((v, i) => (
                        <motion.div
                            key={v.key}
                            initial={{ opacity: 0, y: 100 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.6 }}
                            whileHover={{ y: -8 }}
                            className={`relative p-8 rounded-2xl overflow-hidden group cursor-default transition-all duration-500
    ${theme === 'dark'
                                    ? `
            bg-cyber-card
            border border-purple-500/60

            shadow-[0_0_18px_4px_rgba(239,68,68,0.32),0_0_36px_8px_rgba(128,0,128,0.18)]
            hover:shadow-[0_0_40px_12px_rgba(168,85,247,0.45),0_0_80px_20px_rgba(236,72,153,0.25)]

            hover:border-cyber-purple/60
            `
                                    : `
            bg-white
            border border-light-border
            shadow-[0_0_15px_rgba(59,130,246,0.12)]
            hover:shadow-[0_0_25px_rgba(168,85,247,0.25),0_0_45px_rgba(236,72,153,0.12)]

            hover:border-purple-300
            `
                                }`}
                        >
                            {/* Gradient accent bar */}
                            <div
                                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${theme === 'dark' ? v.gradient : v.lightGrad
                                    } opacity-80 group-hover:opacity-100 transition-opacity`}
                            />

                            {/* Icon */}
                            <motion.div
                                whileHover={{ scale: 1.15, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 400 }}
                                className="text-5xl mb-5"
                            >
                                {v.icon}
                            </motion.div>

                            {/* Title */}
                            <h3
                                className={`font-display font-bold text-xl mb-4 ${theme === 'dark' ? 'text-white' : 'text-light-text'
                                    }`}
                            >
                                {t(`values.${v.key}_title`)}
                            </h3>

                            {/* Description */}
                            <p
                                className={`text-sm leading-relaxed ${theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
                                    }`}
                            >
                                {t(`values.${v.key}_desc`)}
                            </p>

                            {/* Hover glow */}
                            <div
                                className={`absolute inset-0 bg-gradient-to-br ${theme === 'dark' ? v.gradient : v.lightGrad
                                    } opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default ValuesSection
