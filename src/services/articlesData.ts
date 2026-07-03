export interface Article {
  id: string
  title: string
  language: string
  excerpt: string
  category: string
  date: string
  readTime: number
  image: string
  tags: string[]
  href: string
  featured?: boolean
}

export const articles: Article[] = [
  {
    id: '1',
    title: 'RoadMap for the software development world!',
    language: 'Hebrew/עברית',
    excerpt: 'An in-depth roadmap for aspiring software developers and professionals, covering essential programming languages, frameworks, tools, and best practices to build a successful career in software development.',
    category: 'Software Development',
    date: '2026-05-21',
    readTime: 13.5,
    image: '/articles/ArticleImage/RoadMapForTheSoftwareDevelopmentWorld.webp',
    tags: ['RoadMap', 'Software Development', 'Self-Learning', 'Project-Based Learning'],
    href: 'software-development-roadmap',
    featured: true,
  },
  {
    id: '2',
    title: 'How to get accepted for technological positions in the IDF',
    language: 'Hebrew/עברית',
    excerpt: 'A guide on how to prepare for and succeed in technological positions within the IDF.',
    category: 'Guides',
    date: '2026-05-21',
    readTime: 6.5,
    image: '/articles/ArticleImage/GetAcceptedForTechnologicalPositions.webp',
    tags: ['Military', 'Technological Positions&Opportunities', 'Technological Units'],
    href: 'get-accepted-for-technological-positions',
  },
  {
    id: '3',
    title: 'What is Cybersecurity? Why Study It and How to Get Started',
    language: 'Hebrew/עברית',
    excerpt: 'An introductory article explaining the fundamentals of cybersecurity, its importance in todays digital world, and practical steps for beginners to start learning and building a career in cybersecurity.',
    category: 'cybersecurity',
    date: '2026-05-21',
    readTime: 8,
    image: '/articles/ArticleImage/WhatIsCybersecurity.webp',
    tags: ['Cybersecurity', 'Introduction', 'Career Paths', 'Getting Started'],
    featured: true,
    href: 'what-is-cyber-why-study-it-and-how',
  },
]

export const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  web: { bg: 'rgba(0,255,136,0.1)', text: '#00FF88', border: 'rgba(0,255,136,0.3)' },
  pwn: { bg: 'rgba(255,0,80,0.1)', text: '#FF0050', border: 'rgba(255,0,80,0.3)' },
  crypto: { bg: 'rgba(139,92,246,0.1)', text: '#8B5CF6', border: 'rgba(139,92,246,0.3)' },
  forensics: { bg: 'rgba(0,212,255,0.1)', text: '#00D4FF', border: 'rgba(0,212,255,0.3)' },
  malware: { bg: 'rgba(255,165,0,0.1)', text: '#FFA500', border: 'rgba(255,165,0,0.3)' },
  osint: { bg: 'rgba(0,102,255,0.1)', text: '#0066FF', border: 'rgba(0,102,255,0.3)' },
  ctf: { bg: 'rgba(255,215,0,0.1)', text: '#FFD700', border: 'rgba(255,215,0,0.3)' },
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find(a => a.href === slug)
}