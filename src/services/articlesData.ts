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
    title: 'מפת דרכים לעולם פיתוח התוכנה',
    language: 'Hebrew/עברית',
    excerpt: 'מפת דרכים עמוקה למפתחי תוכנה שאפתנים ולמקצוענים, המכסה שפות תכנות חיוניות. פריימוורקים, כלים, ושיטות עבודה נכונות על מנת לבנות קריירה מצליחה בפיתוח תוכנה.',
    category: 'software_development',
    date: '2026-05-21',
    readTime: 13.5,
    image: '/articles/ArticleImage/RoadMapForTheSoftwareDevelopmentWorld.webp',
    tags: ['RoadMap', 'Software Development', 'Self-Learning', 'Project-Based Learning'],
    href: 'software-development-roadmap',
    featured: true,
  },
  {
    id: '2',
    title: 'איך להתקבל לתפקידים טכנולוגיים בצה"ל',
    language: 'Hebrew/עברית',
    excerpt: 'מדריך על איך להתכונן ולהצליח במיונים לתפקידים טכנולוגיים בצה"ל.',
    category: 'guides',
    date: '2026-05-21',
    readTime: 6.5,
    image: '/articles/ArticleImage/GetAcceptedForTechnologicalPositions.webp',
    tags: ['Military', 'Technological Positions&Opportunities', 'Technological Units'],
    href: 'get-accepted-for-technological-positions',
  },
  {
    id: '3',
    title: 'מה זה אבטחת סייבר? למה ללמוד את זה ואיך להתחיל',
    language: 'Hebrew/עברית',
    excerpt: 'כתבה המציגה ומסבירה את היסודות של אבטחת סייבר, החשיבות שלה בעולם הדיגיטלי של היום וצעדים פרקטיים למתחילים כדי להתחיל ללמוד ולבנות קריירה באבטחת סייבר. ',
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