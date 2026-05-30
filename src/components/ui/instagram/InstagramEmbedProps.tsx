import { useEffect } from 'react'

interface InstagramEmbedProps {
    url: string
    className?: string
}

declare global {
    interface Window {
        instgrm?: {
            Embeds: {
                process: () => void
            }
        }
    }
}

export default function InstagramEmbed({
    url,
    className = '',
}: InstagramEmbedProps) {
    useEffect(() => {
        const existingScript = document.querySelector(
            'script[src="https://www.instagram.com/embed.js"]'
        )

        const processEmbeds = () => {
            window.instgrm?.Embeds?.process()
        }

        if (!existingScript) {
            const script = document.createElement('script')
            script.src = 'https://www.instagram.com/embed.js'
            script.async = true
            script.onload = processEmbeds
            document.body.appendChild(script)
        } else {
            processEmbeds()
        }
    }, [url])

    return (
        <blockquote
            className={`instagram-media ${className}`}
            data-instgrm-permalink={url}
            data-instgrm-version="14"
            data-instgrm-captioned
            style={{
                background: '#fff',
                border: 0,
                borderRadius: '8px',
                margin: '0 auto',
                maxWidth: '540px',
                width: '100%',
            }}
        />
    )
}