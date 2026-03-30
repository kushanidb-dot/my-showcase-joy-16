export interface Project {
  id: string;
  title: string;
  subtitle: string;
  imageUrl: string;
  link: string;
  featured: boolean;
}

export interface SocialLink {
  label: string;
  url: string;
}

export interface PortfolioData {
  name: string;
  greeting: string;
  bio: string;
  email: string;
  projects: Project[];
  writings: { id: string; title: string; url: string; date: string }[];
  socialLinks: SocialLink[];
}

const DEFAULT_DATA: PortfolioData = {
  name: "Your Name",
  greeting: "hi. i'm",
  bio: "I'm a designer & developer passionate about creating emotional experiences at the intersection of art, design, and technology.",
  email: "hello@example.com",
  projects: [
    {
      id: "1",
      title: "Project Alpha",
      subtitle: "Brand Design",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      link: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Creative Studio",
      subtitle: "Web Experience",
      imageUrl: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=600&h=400&fit=crop",
      link: "#",
      featured: true,
    },
    {
      id: "3",
      title: "Mobile App",
      subtitle: "UI/UX Design",
      imageUrl: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=600&h=400&fit=crop",
      link: "#",
      featured: false,
    },
    {
      id: "4",
      title: "Experiments",
      subtitle: "Creative Coding",
      imageUrl: "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop",
      link: "#",
      featured: false,
    },
  ],
  writings: [
    { id: "1", title: "Design is about intent", url: "#", date: "2025" },
    { id: "2", title: "The future of interfaces", url: "#", date: "2024" },
  ],
  socialLinks: [
    { label: "Twitter", url: "https://twitter.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
    { label: "Dribbble", url: "https://dribbble.com" },
  ],
};

const STORAGE_KEY = "portfolio-data";

export function getPortfolioData(): PortfolioData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {}
  return DEFAULT_DATA;
}

export function savePortfolioData(data: PortfolioData) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}
