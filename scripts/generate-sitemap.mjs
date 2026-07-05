import { SitemapStream, streamToPromise } from 'sitemap'
import { writeFileSync, readFileSync } from 'fs'

const SITE_URL = 'https://cyberisrael.net'

// ❌ NEVER import src/
// ✅ ONLY read generated file
const articles = JSON.parse(
    readFileSync('./dist-temp/articles.json', 'utf-8')
)

const staticRoutes = ['/', '/articles', '/impact', '/collaborate', '/coming-soon']

async function generate() {
    const sitemap = new SitemapStream({ hostname: SITE_URL })

    staticRoutes.forEach(route => {
        sitemap.write({
            url: route,
            priority: route === '/' ? 1 : 0.7
        })
    })

    articles.forEach(article => {
        sitemap.write({
            url: `/articles/${article.href}`,
            lastmod: article.date,
            priority: article.featured ? 0.9 : 0.8
        })
    })

    sitemap.end()

    const xml = await streamToPromise(sitemap).then(r => r.toString())

    writeFileSync('./dist/sitemap.xml', xml)

    console.log('✅ sitemap generated')
}

generate()