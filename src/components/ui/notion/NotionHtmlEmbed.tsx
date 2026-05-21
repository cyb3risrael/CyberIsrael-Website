/**
 * NotionHtmlEmbed
 * ─────────────────────────────────────────────────────────────────────────────
 * Fetches a Notion-exported HTML file from /public/articles/<slug>/index.html
 * and renders it inside a strictly scoped <div> so its styles NEVER leak into
 * the rest of the site.
 *
 * The Notion HTML content is injected via dangerouslySetInnerHTML but is fully
 * sandboxed by:
 *   • Shadow DOM (ideal, enabled by default)
 *   • OR a scoped wrapper class (fallback)
 *
 * Notion-exported HTML typically includes inline <style> blocks and absolute
 * asset paths. This component:
 *   1. Fetches the raw HTML string
 *   2. Rewrites relative asset paths to be relative to the article public dir
 *   3. Injects the HTML into a Shadow DOM root so styles are 100% isolated
 *   4. Applies a thin theming bridge so Notion text colors adapt to dark/light mode
 */

import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '@/context/ThemeContext'

interface NotionHtmlEmbedProps {
  /** Path relative to /public, e.g. /articles/my-article/index.html */
  htmlPath: string
  /** The article slug, used to rewrite relative asset URLs */
  slug: string
}

// CSS injected into the Shadow DOM to bridge Notion styles with our themes
const NOTION_THEME_BRIDGE = (isDark: boolean) => `
  /* ── CyberIsrael Notion theme bridge ── */
  :host {
    display: block;
    font-family: 'Exo 2', 'Rubik', ui-sans-serif, system-ui, sans-serif;
    line-height: 1.7;
    color: ${isDark ? '#CBD5E1' : '#1A2540'};
  }

  /* Strip Notion's root background so our page bg shows through */
  html, body, .notion-body, [class*="notion-body"] {
    background: transparent !important;
    color: inherit !important;
    margin: 0 !important;
    padding: 0 !important;
    min-height: unset !important;
    font-family: inherit !important;
  }

  /* Page container */
  .notion-page, [class*="notion-page"] {
    max-width: 100% !important;
    padding: 0 !important;
    margin: 0 !important;
    background: transparent !important;
  }

  /* Headings */
  h1, h2, h3, h4, h5, h6,
  [class*="notion-header"], [class*="notion-sub_header"] {
    font-family: 'Share Tech Mono', 'Exo 2', monospace !important;
    font-weight: 700 !important;
    color: ${isDark ? '#F1F5F9' : '#0F172A'} !important;
    margin-top: 2rem !important;
    margin-bottom: 0.75rem !important;
    line-height: 1.3 !important;
  }

  h1, [class*="notion-header-block"] { font-size: 1.75rem !important; }
  h2, [class*="notion-sub_header-block"] { font-size: 1.35rem !important; }
  h3, [class*="notion-sub_sub_header-block"] { font-size: 1.1rem !important; }

  /* Body text */
  p, [class*="notion-text"] {
    color: ${isDark ? '#94A3B8' : '#475569'} !important;
    margin-bottom: 1rem !important;
    font-size: 0.9375rem !important;
  }

  /* Code blocks */
  pre, [class*="notion-code"] {
    background: ${isDark ? 'rgba(10, 22, 40, 0.9)' : 'rgba(241,245,249,1)'} !important;
    border: 1px solid ${isDark ? 'rgba(0,255,136,0.15)' : 'rgba(203,213,232,0.8)'} !important;
    border-radius: 0.75rem !important;
    padding: 1.25rem 1.5rem !important;
    overflow-x: auto !important;
    margin: 1.5rem 0 !important;
    box-shadow: ${isDark ? '0 0 20px rgba(0,255,136,0.05)' : 'none'} !important;
  }

  code, [class*="notion-inline-code"] {
    font-family: 'Share Tech Mono', 'Courier New', monospace !important;
    font-size: 0.875rem !important;
    color: ${isDark ? '#00FF88' : '#2563EB'} !important;
    background: ${isDark ? 'rgba(0,255,136,0.08)' : 'rgba(37,99,235,0.06)'} !important;
    padding: 0.15em 0.45em !important;
    border-radius: 0.3em !important;
  }

  pre code {
    background: transparent !important;
    color: ${isDark ? '#94A3B8' : '#475569'} !important;
    padding: 0 !important;
  }

  /* Blockquotes */
  blockquote, [class*="notion-quote"] {
    border-left: 3px solid ${isDark ? '#00D4FF' : '#2563EB'} !important;
    background: ${isDark ? 'rgba(0,212,255,0.05)' : 'rgba(37,99,235,0.04)'} !important;
    padding: 1rem 1.25rem !important;
    border-radius: 0 0.75rem 0.75rem 0 !important;
    margin: 1.5rem 0 !important;
    color: ${isDark ? '#94A3B8' : '#64748B'} !important;
    font-style: italic !important;
  }

  /* Links */
  a {
    color: ${isDark ? '#00D4FF' : '#2563EB'} !important;
    text-decoration: none !important;
    border-bottom: 1px solid ${isDark ? 'rgba(0,212,255,0.3)' : 'rgba(37,99,235,0.3)'} !important;
    transition: color 0.2s, border-color 0.2s !important;
  }
  a:hover {
    color: ${isDark ? '#00FF88' : '#0891B2'} !important;
    border-color: ${isDark ? 'rgba(0,255,136,0.5)' : 'rgba(8,145,178,0.5)'} !important;
  }

  /* Images */
  img, [class*="notion-image"] {
    max-width: 100% !important;
    height: auto !important;
    border-radius: 0.75rem !important;
    margin: 1.5rem auto !important;
    display: block !important;
    border: 1px solid ${isDark ? 'rgba(0,212,255,0.12)' : 'rgba(203,213,232,0.6)'} !important;
  }

  /* Lists */
  ul, ol {
    padding-left: 1.5rem !important;
    margin-bottom: 1rem !important;
    color: ${isDark ? '#94A3B8' : '#475569'} !important;
  }

  li {
    margin-bottom: 0.4rem !important;
  }

  /* Tables */
  table, [class*="notion-table"] {
    width: 100% !important;
    border-collapse: collapse !important;
    margin: 1.5rem 0 !important;
    font-size: 0.875rem !important;
  }

  th {
    background: ${isDark ? 'rgba(0,212,255,0.1)' : 'rgba(37,99,235,0.06)'} !important;
    color: ${isDark ? '#00D4FF' : '#2563EB'} !important;
    font-family: 'Share Tech Mono', monospace !important;
    font-size: 0.75rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.08em !important;
    padding: 0.75rem 1rem !important;
    border: 1px solid ${isDark ? 'rgba(0,212,255,0.15)' : 'rgba(203,213,232,0.8)'} !important;
  }

  td {
    padding: 0.65rem 1rem !important;
    border: 1px solid ${isDark ? 'rgba(26,58,92,0.6)' : 'rgba(203,213,232,0.6)'} !important;
    color: ${isDark ? '#94A3B8' : '#475569'} !important;
    vertical-align: top !important;
  }

  tr:hover td {
    background: ${isDark ? 'rgba(0,212,255,0.03)' : 'rgba(37,99,235,0.02)'} !important;
  }

  /* Callout / toggle blocks */
  [class*="notion-callout"], [class*="notion-toggle"] {
    background: ${isDark ? 'rgba(13,31,53,0.7)' : 'rgba(241,245,249,0.8)'} !important;
    border: 1px solid ${isDark ? 'rgba(26,58,92,0.7)' : 'rgba(203,213,232,0.7)'} !important;
    border-radius: 0.75rem !important;
    padding: 1rem 1.25rem !important;
    margin: 1rem 0 !important;
  }

  /* Dividers */
  hr {
    border: none !important;
    border-top: 1px solid ${isDark ? 'rgba(26,58,92,0.6)' : 'rgba(203,213,232,0.6)'} !important;
    margin: 2rem 0 !important;
  }

  /* Hide Notion branding / duplicate title if present */
  .notion-app, [data-block-id]:first-child > [class*="notion-header-block"]:first-child {
    display: none !important;
  }
`

const NotionHtmlEmbed: React.FC<NotionHtmlEmbedProps> = ({ htmlPath, slug }) => {
  const { theme } = useTheme()
  const [html, setHtml] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const shadowHostRef = useRef<HTMLDivElement>(null)
  const shadowRootRef = useRef<ShadowRoot | null>(null)

  // Fetch the HTML file
  useEffect(() => {
    setLoading(true)
    setError(null)

    fetch(htmlPath)
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        return res.text()
      })
      .then(raw => {
        // Rewrite relative asset paths (Notion exports reference images relatively)
        const baseDir = `/articles/${slug}/`
        const rewritten = raw
          // src="image.png" → src="/articles/slug/image.png"
          .replace(/src="(?!https?:\/\/|\/|data:)([^"]+)"/gi, `src="${baseDir}$1"`)
          // href="file.css" → href="/articles/slug/file.css" (skip # and http)
          .replace(/href="(?!https?:\/\/|\/|#)([^"]+\.css[^"]*)"/gi, `href="${baseDir}$1"`)
        setHtml(rewritten)
      })
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [htmlPath, slug])

  // Mount into Shadow DOM whenever html or theme changes
  useEffect(() => {
    const host = shadowHostRef.current
    if (!host || html === null) return

    // Create shadow root once
    if (!shadowRootRef.current) {
      shadowRootRef.current = host.attachShadow({ mode: 'open' })
    }

    const shadow = shadowRootRef.current
    const isDark = theme === 'dark'

    shadow.innerHTML = `
      <style>${NOTION_THEME_BRIDGE(isDark)}</style>
      <div class="notion-shadow-content">${html}</div>
    `

    // Make all links in shadow DOM open in new tab safely
    shadow.querySelectorAll('a[href]').forEach(a => {
      const href = (a as HTMLAnchorElement).href
      if (href.startsWith('http')) {
        a.setAttribute('target', '_blank')
        a.setAttribute('rel', 'noopener noreferrer')
      }
    })
  }, [html, theme])

  // ── Loading skeleton ───────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className={`rounded-2xl border p-8 animate-pulse ${
        theme === 'dark'
          ? 'bg-cyber-card border-cyber-border/40'
          : 'bg-white border-light-border'
      }`}>
        <div className="space-y-4">
          {[80, 60, 90, 50, 70].map((w, i) => (
            <div
              key={i}
              className={`h-3 rounded-full ${theme === 'dark' ? 'bg-cyber-border/50' : 'bg-slate-200'}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
        <div className="mt-8 space-y-3">
          {[100, 100, 75].map((w, i) => (
            <div
              key={i}
              className={`h-2.5 rounded-full ${theme === 'dark' ? 'bg-cyber-border/30' : 'bg-slate-100'}`}
              style={{ width: `${w}%` }}
            />
          ))}
        </div>
      </div>
    )
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className={`rounded-2xl border p-8 text-center ${
        theme === 'dark'
          ? 'bg-cyber-card border-cyber-border/40'
          : 'bg-white border-light-border'
      }`}>
        <div className={`text-4xl mb-4`}>⚠️</div>
        <p className={`font-display text-sm font-bold mb-2 ${
          theme === 'dark' ? 'text-red-400' : 'text-red-500'
        }`}>
          Content Not Found
        </p>
        <p className={`text-xs font-display leading-relaxed max-w-sm mx-auto ${
          theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
        }`}>
          The Notion HTML export was not found at{' '}
          <code className="font-mono">{htmlPath}</code>.
          <br /><br />
          Export your Notion page as <strong>HTML</strong> and place the files at
          <br />
          <code className="font-mono">/public/articles/{slug}/index.html</code>
        </p>
      </div>
    )
  }

  // ── Rendered Notion content ────────────────────────────────────────────────
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border overflow-hidden ${
        theme === 'dark'
          ? 'bg-cyber-card/80 border-cyber-border/50'
          : 'bg-white border-light-border shadow-sm'
      }`}
    >
      {/* Top accent line */}
      <div
        className="h-0.5 w-full"
        style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #8B5CF6, transparent)' }}
      />

      {/* Shadow DOM host — Notion HTML renders here, fully isolated */}
      <div
        ref={shadowHostRef}
        className="p-6 md:p-10 notion-shadow-host"
        style={{ minHeight: '200px' }}
        aria-label="Article content"
      />
    </motion.div>
  )
}

export default NotionHtmlEmbed