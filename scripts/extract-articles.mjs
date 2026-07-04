import { articles } from '../src/services/articlesData.ts'
import { mkdirSync, writeFileSync } from 'fs'

mkdirSync('./dist-temp', { recursive: true })

writeFileSync(
    './dist-temp/articles.json',
    JSON.stringify(articles, null, 2)
)

console.log('✅ Articles extracted for sitemap')