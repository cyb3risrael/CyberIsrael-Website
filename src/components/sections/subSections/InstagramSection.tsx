import React, { memo } from 'react'
import { motion } from 'framer-motion'
import InstagramEmbedCard from '@/components/ui/instagram/InstagramEmbedCard'
import { useTheme } from '@/context/ThemeContext'

/* ---------------- TYPES ---------------- */

export type InstagramPost = {
    id: string
    url: string
}

/* ---------------- PROPS ---------------- */

interface Props {
    title?: string
    subtitle?: string
    posts: InstagramPost[]
    columns?: 1 | 2 | 3
}

/* ---------------- SECTION ---------------- */

const InstagramSection: React.FC<Props> = ({
    title = 'Community Instagram',
    subtitle = 'Posts from our community',
    posts,
    columns = 3
}) => {
    const { theme } = useTheme()
    const isDark = theme === 'dark'

    const gridClass =
        columns === 1
            ? 'grid-cols-1'
            : columns === 2
                ? 'grid-cols-1 md:grid-cols-2'
                : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'

    return (
        <div className="mt-20">
            <motion.h2
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`text-2xl font-display font-bold mb-2 text-center ${isDark ? 'text-white' : 'text-light-text'
                    }`}
            >
                {title}
            </motion.h2>

            <p
                className={`text-sm text-center mb-8 ${isDark ? 'text-slate-400' : 'text-light-muted'
                    }`}
            >
                {subtitle}
            </p>

            <div className={`grid gap-6 ${gridClass}`}>
                {posts.map((post) => (
                    <InstagramEmbedCard key={post.id} url={post.url} />
                ))}
            </div>
        </div>
    )
}

export default memo(InstagramSection)