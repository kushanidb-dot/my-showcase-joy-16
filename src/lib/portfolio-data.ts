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
  bio: "I'm a designer, video editor & visual storyteller — crafting compelling narratives through motion, visuals, and thoughtful design.",
  email: "hello@example.com",
  projects: [
    {
      id: "1",
      title: "Brand Film",
      subtitle: "Video Production & Editing",
      imageUrl: "https://images.unsplash.com/photo-1536240478700-b869070f9279?w=600&h=400&fit=crop",
      link: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Visual Identity",
      subtitle: "Brand Design",
      imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=400&fit=crop",
      link: "#",
      featured: true,
    },
    {
      id: "3",
      title: "Motion Reel",
      subtitle: "Motion Graphics",
      imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=400&fit=crop",
      link: "#",
      featured: false,
    },
    {
      id: "4",
      title: "Documentary Short",
      subtitle: "Storytelling & Direction",
      imageUrl: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=600&h=400&fit=crop",
      link: "#",
      featured: false,
    },
  ],
  writings: [
    { id: "1", title: "The art of visual storytelling", url: "#", date: "2025" },
    { id: "2", title: "Color grading as emotion", url: "#", date: "2024" },
  ],
  socialLinks: [
    { label: "Instagram", url: "https://instagram.com" },
    { label: "Behance", url: "https://behance.net" },
    { label: "Vimeo", url: "https://vimeo.com" },
    { label: "LinkedIn", url: "https://linkedin.com" },
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
