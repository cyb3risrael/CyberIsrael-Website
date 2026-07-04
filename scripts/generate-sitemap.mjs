import { SitemapStream, streamToPromise } from 'sitemap'
import { writeFileSync, readFileSync } from 'fs'
import path from 'path'

const SITE_URL = 'https://cyberisrael.net'

// ✅ Read JSON instead of broken require/import chain
const articles = JSON.parse(
    readFileSync('./dist-temp/articles.json', 'utf-8')
)

const staticRoutes = [
    '/',
    '/articles',
    '/impact',
    '/collaborate',
    '/coming-soon',
]

async function generate() {
    const sitemap = new SitemapStream({
        hostname: SITE_URL,
    })

    // static pages
    for (const route of staticRoutes) {
        sitemap.write({
            url: route,
            changefreq: route === '/' ? 'daily' : 'weekly',
            priority: route === '/' ? 1.0 : 0.7,
        })
    }

    // dynamic articles
    for (const article of articles) {
        sitemap.write({
            url: `/articles/${article.href}`,
            changefreq: 'monthly',
            priority: article.featured ? 0.9 : 0.8,
            lastmod: article.date,
        })
    }

    sitemap.end()

    const xml = await streamToPromise(sitemap).then(d => d.toString())

    writeFileSync('./dist/sitemap.xml', xml)

    console.log('✅ Sitemap generated:', './dist/sitemap.xml')
}

generate().catch(err => {
    console.error('❌ Sitemap failed:', err)
    process.exit(1)
})