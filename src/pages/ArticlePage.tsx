import { useParams } from 'react-router-dom'

const ArticlePage: React.FC = () => {
    const { slug } = useParams()

    return (
        <div className="min-h-screen pt-24 pb-20">

            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                <iframe
                    src={`/articles/${slug}/index.html`}
                    className="w-full h-[calc(100vh-160px)] border-0 rounded-xl"
                />
            </div>

        </div>
    )
}

export default ArticlePage