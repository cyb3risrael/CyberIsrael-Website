export interface Article {
  id: string
  title: string
  languge: string
  excerpt: string
  category: string
  author: string
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
    languge: 'Hebrew/עברית',
    excerpt: 'An in-depth roadmap for aspiring software developers and professionals, covering essential programming languages, frameworks, tools, and best practices to build a successful career in software development.',
    category: 'Software Development',
    author: 'Ido Gutman',
    date: '2026-05-21',
    readTime: 13.5,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    tags: ['RoadMap', 'Software Development', 'Self-Learning', 'Project-Based Learning'],
    href: 'software-development-roadmap',
    featured: true,
  },
  {
    id: '2',
    title: 'How to get accepted for technological positions in the IDF',
    languge: 'Hebrew/עברית',
    excerpt: 'A guide on how to prepare for and succeed in technological positions within the IDF.',
    category: 'Guides',
    author: 'Omer Slavkin',
    date: '2026-05-21',
    readTime: 6.5,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
    tags: ['Military', 'Technological Positions&Opportunities', 'Technological Units'],
    href: 'get-accepted-for-technological-positions',
  },
  {
    id: '3',
    title: 'What is Cybersecurity? Why Study It and How to Get Started',
    languge: 'Hebrew/עברית',
    excerpt: 'An introductory article explaining the fundamentals of cybersecurity, its importance in today’s digital world, and practical steps for beginners to start learning and building a career in cybersecurity.',
    category: 'cybersecurity',
    author: 'Ido Gutman',
    date: '2026-05-21',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    tags: ['Cybersecurity', 'Introduction', 'Career Paths', 'Getting Started'],
    featured: true,
    href: 'what-is-cyber-why-study-it-and-how',
  },
  {
    id: '4',
    title: 'OSINT for Bug Hunters: Uncovering Hidden Attack Surfaces',
    languge: 'Hebrew/עברית',
    excerpt: 'A practical guide to using open-source intelligence tools and techniques to discover forgotten subdomains, leaked credentials, and exposed services.',
    category: 'osint',
    author: 'Shira Bar',
    date: '2025-04-28',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    tags: ['OSINT', 'Bug Bounty', 'Recon', 'Attack Surface'],
    href: '#',
  },
  {
    id: '5',
    title: 'Reverse Engineering Modern Malware: Dissecting AsyncRAT',
    languge: 'Hebrew/עברית',
    excerpt: 'A step-by-step reverse engineering walkthrough of a popular open-source RAT, covering obfuscation techniques and C2 communication patterns.',
    category: 'malware',
    author: 'Avi Stern',
    date: '2025-04-20',
    readTime: 18,
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
    tags: ['Malware', 'Reverse Engineering', 'RAT', 'C2'],
    href: '#',
  },
  {
    id: '6',
    title: 'Memory Forensics with Volatility 3: A Practical Approach',
    languge: 'Hebrew/עברית',
    excerpt: 'Learn how to extract critical artifacts from memory dumps using Volatility 3, covering process injection, network artifacts, and credential harvesting.',
    category: 'forensics',
    author: 'Tal Katz',
    date: '2025-04-15',
    readTime: 9,
    image: 'https://images.unsplash.com/photo-1573164713619-24a3c4b6f860?w=600&q=80',
    tags: ['Forensics', 'Volatility', 'Memory Analysis', 'DFIR'],
    href: '#',
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
  return articles.find((article) => {
    const lastPart = article.href.split('/').pop() // "roadmap.html"
    if (!lastPart) return false

    const articleSlug = lastPart.replace('.html', '')
    return articleSlug === slug
  })
}