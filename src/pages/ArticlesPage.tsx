import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FaClock, FaUser, FaArrowRight, FaBookOpen } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'
import { articles, categoryColors, type Article } from '@/services/articlesData'

const categories = ['all', 'web', 'pwn', 'crypto', 'forensics', 'malware', 'osint', 'ctf']

const ArticleCard: React.FC<{ article: Article; index: number }> = ({ article, index }) => {
  const { theme } = useTheme()
  const { t } = useTranslation()
  const catColor = categoryColors[article.category] || categoryColors.ctf

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      whileHover={{ y: -6 }}
      className={`group rounded-2xl overflow-hidden border transition-all duration-300 cursor-pointer ${
        theme === 'dark'
          ? 'bg-cyber-card border-cyber-border/40 hover:border-cyber-teal/30 hover:shadow-neon-teal'
          : 'bg-white border-light-border shadow-sm hover:shadow-lg hover:border-light-teal/40'
      } ${article.featured ? 'md:col-span-2' : ''}`}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className="px-2.5 py-1 rounded-full text-xs font-display tracking-widest uppercase"
            style={{ background: catColor.bg, color: catColor.text, border: `1px solid ${catColor.border}` }}
          >
            {t(`articles.categories.${article.category}`)}
          </span>
        </div>

        {article.featured && (
          <div className="absolute top-3 right-3">
            <span className={`px-2.5 py-1 rounded-full text-xs font-display tracking-widest uppercase ${
              theme === 'dark'
                ? 'bg-cyber-green/20 text-cyber-green border border-cyber-green/30'
                : 'bg-light-blue/10 text-light-blue border border-light-blue/30'
            }`}>
              FEATURED
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Meta */}
        <div className={`flex items-center gap-4 text-xs mb-3 font-display ${
          theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
        }`}>
          <span className="flex items-center gap-1.5">
            <FaUser size={10} />
            {article.author}
          </span>
          <span className="flex items-center gap-1.5">
            <FaClock size={10} />
            {article.readTime} {t('articles.min_read')}
          </span>
          <span>{new Date(article.date).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h3 className={`font-display font-bold text-base mb-2 leading-snug group-hover:transition-colors duration-200 ${
          theme === 'dark'
            ? 'text-white group-hover:text-cyber-teal'
            : 'text-light-text group-hover:text-light-blue'
        }`}>
          {article.title}
        </h3>

        {/* Excerpt */}
        <p className={`text-sm leading-relaxed mb-4 line-clamp-2 ${
          theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
        }`}>
          {article.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {article.tags.slice(0, 3).map(tag => (
            <span
              key={tag}
              className={`text-xs px-2 py-0.5 rounded-full font-display ${
                theme === 'dark'
                  ? 'bg-slate-800 text-slate-400 border border-slate-700'
                  : 'bg-slate-100 text-light-muted border border-slate-200'
              }`}
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Read more */}
        <a
          href={article.href}
          className={`flex items-center gap-2 text-xs font-display tracking-widest uppercase transition-all duration-200 ${
            theme === 'dark'
              ? 'text-cyber-green hover:text-cyber-teal'
              : 'text-light-blue hover:text-light-teal'
          }`}
        >
          {t('articles.read_more')}
          <FaArrowRight size={10} className="group-hover:translate-x-1 transition-transform duration-200" />
        </a>
      </div>
    </motion.article>
  )
}

const ArticlesPage: React.FC = () => {
  const { t } = useTranslation()
  const { theme } = useTheme()
  const [activeCategory, setActiveCategory] = useState('all')

  const filtered = activeCategory === 'all'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Hero */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <div className="flex justify-center mb-4">
            <div className={`p-3 rounded-xl ${
              theme === 'dark' ? 'bg-cyber-teal/10' : 'bg-light-teal/10'
            }`}>
              <FaBookOpen size={28} className={theme === 'dark' ? 'text-cyber-teal' : 'text-light-teal'} />
            </div>
          </div>
          <h1 className="section-title">
            <span className={theme === 'dark' ? 'text-white' : 'text-light-text'}>{t('articles.title')}</span>
          </h1>
          <p className={`text-lg max-w-xl mx-auto ${
            theme === 'dark' ? 'text-slate-400' : 'text-light-muted'
          }`}>
            {t('articles.subtitle')}
          </p>
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-wrap justify-center gap-2 mt-8"
        >
          {categories.map(cat => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-display tracking-widest uppercase transition-all duration-200 ${
                activeCategory === cat
                  ? theme === 'dark'
                    ? 'bg-cyber-teal/20 text-cyber-teal border border-cyber-teal/40'
                    : 'bg-light-teal/10 text-light-teal border border-light-teal/40'
                  : theme === 'dark'
                  ? 'border border-cyber-border/40 text-slate-400 hover:text-slate-200'
                  : 'border border-light-border text-light-muted hover:text-light-text'
              }`}
            >
              {t(`articles.categories.${cat}`)}
            </motion.button>
          ))}
        </motion.div>
      </div>

      {/* Articles grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filtered.map((article, i) => (
              <ArticleCard key={article.id} article={article} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className={theme === 'dark' ? 'text-slate-500' : 'text-light-muted'}>
              No articles in this category yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default ArticlesPage
