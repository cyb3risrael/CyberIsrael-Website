import React, { memo, useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

/* ---------------- SKELETON ---------------- */

const EmbedSkeleton = memo(() => (
  <div className="w-full aspect-square animate-pulse rounded-xl bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800" />
))

/* ---------------- SCRIPT LOADER ---------------- */

let instagramScriptLoaded = false

function loadInstagramScript(): Promise<void> {
  return new Promise((resolve) => {
    if (instagramScriptLoaded) return resolve()

    const script = document.createElement('script')
    script.src = 'https://www.instagram.com/embed.js'
    script.async = true

    script.onload = () => {
      instagramScriptLoaded = true
      resolve()
    }

    document.body.appendChild(script)
  })
}

/* ---------------- COMPONENT ---------------- */

interface Props {
  url: string
  className?: string
}

const InstagramEmbedCard: React.FC<Props> = ({ url, className }) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let alive = true

    async function render() {
      setLoading(true)

      await loadInstagramScript()
      if (!alive || !containerRef.current) return

      const container = containerRef.current

      // ✅ CRITICAL FIX: completely reset DOM before re-embedding
      container.innerHTML = `
        <blockquote
          class="instagram-media"
          data-instgrm-permalink="${url}"
          data-instgrm-version="14"
          style="width:100%;border:0;margin:0;padding:0;background:transparent;"
        ></blockquote>
      `

      // wait for DOM paint
      requestAnimationFrame(() => {
        if (!alive) return

        try {
          window.instgrm?.Embeds?.process()
        } catch (e) {
          // ignore instagram internal errors
        }

        setTimeout(() => {
          if (alive) setLoading(false)
        }, 500)
      })
    }

    render()

    return () => {
      alive = false
    }
  }, [url])

  return (
    <div className={`w-full ${className ?? ''}`}>
      {loading && <EmbedSkeleton />}

      <div
        ref={containerRef}
        className={`instagram-embed-container ${loading ? 'hidden' : 'block'}`}
      />
    </div>
  )
}

export default memo(InstagramEmbedCard)