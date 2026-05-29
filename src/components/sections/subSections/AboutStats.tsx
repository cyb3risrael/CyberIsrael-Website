import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaTrophy, FaUsers, FaCalendarCheck, FaStar } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

const useCountUp = (end: number, duration = 2000, startWhen = false) => {
    const [count, setCount] = useState(0)

    useEffect(() => {
        if (!startWhen) return

        let start = 0
        const increment = end / (duration / 16)

        const timer = setInterval(() => {
            start += increment

            if (start >= end) {
                setCount(end)
                clearInterval(timer)
            } else {
                setCount(Math.floor(start))
            }
        }, 16)

        return () => clearInterval(timer)
    }, [end, duration, startWhen])

    return count
}

interface StatCardProps {
    value: number
    suffix?: string
    label: string
    icon: React.ReactNode
    color: string
    delay: number
    started: boolean
}

const StatCard: React.FC<StatCardProps> = ({
    value,
    suffix = '+',
    label,
    icon,
    color,
    delay,
    started
}) => {
    const { theme } = useTheme()
    const count = useCountUp(value, 1800, started)

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay, duration: 0.5 }}
            className="card-cyber text-center group"
        >
            <div className="flex justify-center mb-3">
                <div
                    className="p-3 rounded-xl transition-all duration-300 group-hover:scale-110"
                    style={{ background: `${color}15`, color }}
                >
                    {icon}
                </div>
            </div>

            <div
                className="font-display text-4xl font-black mb-1"
                style={{ color }}
            >
                {count}
                {suffix}
            </div>

            <div
                className={`text-sm font-display tracking-widest uppercase ${theme === 'dark'
                        ? 'text-slate-400'
                        : 'text-light-muted'
                    }`}
            >
                {label}
            </div>
        </motion.div>
    )
}

interface AboutStatsProps {
    started: boolean
}

const AboutStats: React.FC<AboutStatsProps> = ({ started }) => {
    const { t } = useTranslation()

    const stats = [
        {
            value: 2000,
            label: t('about.stat_members'),
            icon: <FaUsers size={22} />,
            color: '#00FF88',
            delay: 0
        },
        {
            value: 50,
            label: t('about.stat_ctfs'),
            icon: <FaTrophy size={22} />,
            color: '#00D4FF',
            delay: 0.1
        },
        {
            value: 10,
            label: t('about.stat_events'),
            icon: <FaCalendarCheck size={22} />,
            color: '#8B5CF6',
            delay: 0.2
        },
        {
            value: 2,
            label: t('about.stat_years'),
            suffix: '',
            icon: <FaStar size={22} />,
            color: '#FFD700',
            delay: 0.3
        }
    ]

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
            {stats.map((stat, i) => (
                <StatCard
                    key={i}
                    {...stat}
                    started={started}
                />
            ))}
        </div>
    )
}

export default AboutStats