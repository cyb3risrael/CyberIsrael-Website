import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import { getArticleBySlug } from '@/services/articlesData'
import ArticleSidebar from '@/components/layout/ArticleSidebar'

type ArticleType = 'md' | null

const ArticlePage: React.FC = () => {
    const { slug } = useParams()

    const [type] = useState<ArticleType>('md')
    const [markdown, setMarkdown] = useState('')
    const [loading, setLoading] = useState(true)

    const article = slug ? getArticleBySlug(slug) : undefined

    useEffect(() => {
        if (!slug) return

        const load = async () => {
            setLoading(true)

            try {
                const mdPath = `/articles/${slug}.md`
                const res = await fetch(mdPath)

                if (!res.ok) throw new Error('MD not found')

                const text = await res.text()
                setMarkdown(text)
            } catch (err) {
                setMarkdown('')
            } finally {
                setLoading(false)
            }
        }

        load()
    }, [slug])

    return (
        <div className="min-h-screen pt-24 pb-20 bg-gradient-to-b from-[#090510] via-[#12081e] to-[#090510]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 flex gap-8 items-start">

                {/* SIDEBAR */}
                <div className="w-72 shrink-0">
                    <ArticleSidebar currentSlug={slug || ''} />
                </div>

                {/* MAIN ARTICLE */}
                <div className="flex-1 min-w-0 max-w-4xl mx-auto">
                    {loading && (
                        <div className="text-center text-purple-200 text-lg">
                            Loading article...
                        </div>
                    )}

                    {!loading && type === 'md' && article && (
                        <div className="w-full rounded-3xl border border-purple-500/20 bg-purple-950/20 backdrop-blur-md shadow-2xl shadow-purple-900/30 p-6 md:p-10">

                            <h1 className="text-3xl md:text-4xl font-bold text-purple-100 mb-6">
                                {article.title}
                            </h1>

                            <div className="text-purple-300 text-sm mb-8 flex gap-4 flex-wrap">
                                <span>{article.author}</span>
                                <span>•</span>
                                <span>{article.date}</span>
                                <span>•</span>
                                <span>{article.readTime} min read</span>
                            </div>

                            <article className="prose prose-invert max-w-none w-full
                                
                                prose-headings:text-purple-100
                                prose-p:text-purple-50/90
                                prose-a:text-violet-300 hover:prose-a:text-violet-200
                                prose-code:text-violet-200
                                prose-pre:bg-purple-950
                                prose-blockquote:border-purple-500
                                prose-strong:text-purple-100
                                prose-li:text-purple-50/90
                            ">
                                <ReactMarkdown>
                                    {markdown}
                                </ReactMarkdown>
                            </article>
                        </div>
                    )}

                    {!loading && !article && (
                        <div className="text-center text-red-300 text-xl">
                            Article not found
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default ArticlePage