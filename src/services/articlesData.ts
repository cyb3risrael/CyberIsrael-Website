export interface Article {
  id: string
  title: string
  languge: string
  excerpt: string
  category: string
  author: string
  authorAvatar: string
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
    languge: 'Hebrew',
    excerpt: 'עולם חשוב ועיקרי בהייטק שבעצם הכל מתבסס עליו, סטארטפריסטים, חברות קטנות, חברות גדולות ואפילו מעצמות ה- FAANG, כולם בסוף מסתמכים על ה- “פרודקט” או בעברית המוצר הטכנלוגי.',
    category: 'Software Development',
    author: 'Ido Gutman',
    authorAvatar: 'YL',
    date: '2026-05-21',
    readTime: 12,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    tags: ['CVE', 'Buffer Overflow', 'Pwn', 'Exploit Development'],
    href: '#',
    featured: true,
  },
  {
    id: '2',
    title: 'Web CTF Writeup: Exploiting SSRF in Cloud Environments',
    languge: 'Hebrew',
    excerpt: 'A walkthrough of a tricky SSRF challenge from a recent CTF, abusing AWS metadata endpoints and IAM roles for privilege escalation.',
    category: 'ctf',
    author: 'Noa Cohen',
    authorAvatar: 'NC',
    date: '2025-05-10',
    readTime: 8,
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&q=80',
    tags: ['SSRF', 'Cloud', 'AWS', 'CTF'],
    href: '#',
  },
  {
    id: '3',
    title: 'Cryptography Under the Hood: RSA Side-Channel Attacks',
    languge: 'Hebrew',
    excerpt: 'Understanding timing attacks against RSA implementations and how to detect and prevent them in production cryptographic systems.',
    category: 'crypto',
    author: 'Eyal Mizrahi',
    authorAvatar: 'EM',
    date: '2025-05-05',
    readTime: 15,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=600&q=80',
    tags: ['RSA', 'Side-Channel', 'Cryptography', 'Timing Attack'],
    href: '#',
  },
  {
    id: '4',
    title: 'OSINT for Bug Hunters: Uncovering Hidden Attack Surfaces',
    languge: 'Hebrew',
    excerpt: 'A practical guide to using open-source intelligence tools and techniques to discover forgotten subdomains, leaked credentials, and exposed services.',
    category: 'osint',
    author: 'Shira Bar',
    authorAvatar: 'SB',
    date: '2025-04-28',
    readTime: 10,
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    tags: ['OSINT', 'Bug Bounty', 'Recon', 'Attack Surface'],
    href: '#',
  },
  {
    id: '5',
    title: 'Reverse Engineering Modern Malware: Dissecting AsyncRAT',
    languge: 'Hebrew',
    excerpt: 'A step-by-step reverse engineering walkthrough of a popular open-source RAT, covering obfuscation techniques and C2 communication patterns.',
    category: 'malware',
    author: 'Avi Stern',
    authorAvatar: 'AS',
    date: '2025-04-20',
    readTime: 18,
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=600&q=80',
    tags: ['Malware', 'Reverse Engineering', 'RAT', 'C2'],
    href: '#',
  },
  {
    id: '6',
    title: 'Memory Forensics with Volatility 3: A Practical Approach',
    languge: 'Hebrew',
    excerpt: 'Learn how to extract critical artifacts from memory dumps using Volatility 3, covering process injection, network artifacts, and credential harvesting.',
    category: 'forensics',
    author: 'Tal Katz',
    authorAvatar: 'TK',
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
