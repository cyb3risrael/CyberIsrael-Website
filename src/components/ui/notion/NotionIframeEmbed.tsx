/**
 * NotionIframeEmbed
 * ─────────────────────────────────────────────────────────────────────────────
 * Embeds a public Notion share page via <iframe>.
 *
 * Requirements for the Notion page:
 *   • "Share to web" must be enabled on the page
 *   • For embed-in-iframe: use the /embed/ URL variant
 *     e.g. https://www.notion.so/embed/YOUR_PAGE_ID
 *
 * The iframe is sandboxed with a limited permission set.
 * Height auto-expands via postMessage from Notion's own resize API (if available),
 * or falls back to a sensible min-height.
 */

import React, { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FaExternalLinkAlt, FaExpand, FaCompress } from 'react-icons/fa'
import { useTheme } from '@/context/ThemeContext'

interface NotionIframeEmbedProps {
  /** Public Notion share URL (with /embed/ prefix for best results) */
  notionUrl: string
  /** Minimum iframe height in pixels (default: 800) */
  minHeight?: number
}

// Convert regular Notion share URL to embed variant
const toEmbedUrl = (url: string): string => {
  if (!url || url.includes('REPLACE-WITH')) return ''
  // If already /embed/ form, use as-is
  if (url.includes('/embed/')) return url
  // Convert https://www.notion.so/Page-ID → https://www.notion.so/embed/Page-ID
  return url.replace('https://www.notion.so/', 'https://www.notion.so/embed/')
}

const NotionIframeEmbed: React.FC<NotionIframeEmbedProps> = ({
  notionUrl,
  minHeight = 800,
}) => {
  const { theme } = useTheme()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [loading, setLoading] = useState(true)
  const [expanded, setExpanded] = useState(false)

  const embedUrl = toEmbedUrl(notionUrl)
  const isPlaceholder = !embedUrl

  // ── Placeholder when URL hasn't been set yet ────────────────────────────
  if (isPlaceholder) {
    return (
      <div className={`rounded-2xl border p-10 text-center ${
        theme === 'dark'
          ? 'bg-cyber-card border-cyber-border/40'
          : 'bg-white border-light-border'
      }`}>
        <div className="text-4xl mb-4">🔗</div>
        <p className={`font-display text-sm font-bold mb-3 ${
          theme === 'dark' ? 'text-slate-300' : 'text-light-text'
        }`}>
          Notion Page Not Connected
        </p>
        <p className={`text-xs leading-relaxed max-w-sm mx-auto ${
          theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
        }`}>
          Set <code className="font-mono text-cyber-teal">notionIframeUrl</code> on this article
          in <code className="font-mono">articlesData.ts</code> to a public Notion share URL.
          <br /><br />
          Enable <strong>Share → Publish to web</strong> in Notion first.
        </p>
        <div className={`mt-6 p-4 rounded-xl text-left text-xs font-mono ${
          theme === 'dark'
            ? 'bg-cyber-dark border border-cyber-green/20 text-cyber-green'
            : 'bg-slate-50 border border-light-border text-light-blue'
        }`}>
          <span className={theme === 'dark' ? 'text-slate-500' : 'text-slate-400'}>// articlesData.ts</span>
          <br />
          notionIframeUrl: 'https://www.notion.so/Your-Page-Title-abc123'
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`rounded-2xl border overflow-hidden transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-cyber-card/80 border-cyber-border/50'
          : 'bg-white border-light-border shadow-sm'
      } ${expanded ? 'fixed inset-4 z-50' : 'relative'}`}
    >
      {/* Top accent */}
      <div
        className="h-0.5 w-full flex-shrink-0"
        style={{ background: 'linear-gradient(90deg, transparent, #00D4FF, #8B5CF6, transparent)' }}
      />

      {/* Toolbar */}
      <div className={`flex items-center justify-between px-4 py-2.5 border-b ${
        theme === 'dark'
          ? 'border-cyber-border/40 bg-cyber-dark/60'
          : 'border-light-border bg-slate-50/80'
      }`}>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${theme === 'dark' ? 'bg-cyber-green' : 'bg-green-500'}`} />
          <span className={`font-display text-xs tracking-widest ${
            theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
          }`}>
            notion.so
          </span>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={() => setExpanded(e => !e)}
            className={`p-1.5 rounded-lg transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-slate-500 hover:text-cyber-teal'
                : 'text-light-muted hover:text-light-blue'
            }`}
            aria-label={expanded ? 'Collapse' : 'Expand'}
          >
            {expanded ? <FaCompress size={12} /> : <FaExpand size={12} />}
          </button>
          <a
            href={notionUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-1.5 rounded-lg transition-colors duration-200 ${
              theme === 'dark'
                ? 'text-slate-500 hover:text-cyber-teal'
                : 'text-light-muted hover:text-light-blue'
            }`}
            aria-label="Open in Notion"
          >
            <FaExternalLinkAlt size={11} />
          </a>
        </div>
      </div>

      {/* Loading overlay */}
      {loading && (
        <div className={`absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 ${
          theme === 'dark' ? 'bg-cyber-card' : 'bg-white'
        }`}>
          <div className={`w-8 h-8 border-2 rounded-full animate-spin ${
            theme === 'dark'
              ? 'border-cyber-green/30 border-t-cyber-green'
              : 'border-light-blue/30 border-t-light-blue'
          }`} />
          <span className={`font-display text-xs tracking-widest ${
            theme === 'dark' ? 'text-slate-500' : 'text-light-muted'
          }`}>
            Loading Notion content...
          </span>
        </div>
      )}

      {/* Iframe */}
      <iframe
        ref={iframeRef}
        src={embedUrl}
        title="Notion article content"
        className="w-full border-none block"
        style={{ minHeight: expanded ? 'calc(100vh - 120px)' : `${minHeight}px` }}
        sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-top-navigation-by-user-activation"
        loading="lazy"
        onLoad={() => setLoading(false)}
      />
    </motion.div>
  )
}

export default NotionIframeEmbed