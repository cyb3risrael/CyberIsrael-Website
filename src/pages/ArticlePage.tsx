import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'

type ArticleType = 'html' | 'md' | 'pdf' | null

const ArticlePage: React.FC = () => {
    const { slug } = useParams()

    const [type, setType] = useState<ArticleType>(null)
    const [markdown, setMarkdown] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!slug) return

        const checkFiles = async () => {
            setLoading(true)

            const htmlPath = `/articles/${slug}/index.html`
            const mdPath = `/articles/${slug}/index.md`
            const pdfPath = `/articles/${slug}.pdf`

            console.log(`slug is ${slug}`)

            try {
                // ---- CHECK MARKDOWN FIRST ----
                const mdRes = await fetch(mdPath)

                const mdType = mdRes.headers.get('content-type') || ''

                if (
                    mdRes.ok &&
                    (
                        mdType.includes('text/markdown') ||
                        mdType.includes('text/plain')
                    )
                ) {
                    const mdContent = await mdRes.text()

                    setMarkdown(mdContent)
                    setType('md')
                    return
                }

                // ---- HTML ----
                const htmlRes = await fetch(htmlPath, { method: 'HEAD' })

                const htmlType = htmlRes.headers.get('content-type') || ''

                if (htmlRes.ok && htmlType.includes('text/html')) {
                    setType('html')
                    return
                }

                // ---- PDF ----
                const pdfRes = await fetch(pdfPath, { method: 'HEAD' })

                const pdfType = pdfRes.headers.get('content-type') || ''

                if (pdfRes.ok && pdfType.includes('pdf')) {
                    setType('pdf')
                    return
                }

                setType(null)

            } catch (err) {
                console.error(err)
                setType(null)
            } finally {
                setLoading(false)
            }
        }

        checkFiles()
    }, [slug])

    return (
        <div className="min-h-screen pt-24 pb-20">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">

                {loading && (
                    <div className="text-center text-white text-xl">
                        Loading...
                    </div>
                )}

                {!loading && type === 'html' && (
                    <iframe
                        src={`/articles/${slug}/index.html`}
                        className="w-full h-[calc(100vh-160px)] border-0 rounded-xl"
                    />
                )}

                {!loading && type === 'pdf' && (
                    <iframe
                        src={`/articles/${slug}.pdf`}
                        className="w-full h-[calc(100vh-160px)] border-0 rounded-xl"
                    />
                )}

                {!loading && type === 'md' && (
                    <article className="prose prose-invert max-w-none">
                        <ReactMarkdown>
                            {markdown}
                        </ReactMarkdown>
                    </article>
                )}

                {!loading && type === null && (
                    <div className="text-center text-white text-xl">
                        Article not found
                    </div>
                )}

            </div>
        </div>
    )
}

export default ArticlePage

