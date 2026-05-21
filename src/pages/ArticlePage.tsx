import { useParams } from 'react-router-dom'

const ArticlePage: React.FC = () => {
  const { slug } = useParams()

  return (
    <div className="min-h-screen pt-24 pb-20">
      {/* Navbar already comes from RootLayout */}

      <div className="max-w-6xl mx-auto px-4">
        <iframe
          src={`/articles/${slug}/index.html`}
          className="w-full h-[calc(100vh-160px)] border-0 rounded-xl"
        />
      </div>

      {/* Footer already comes from RootLayout */}
    </div>
  )
}

export default ArticlePage