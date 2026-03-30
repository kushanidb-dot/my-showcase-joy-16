import { PortfolioData } from "@/lib/portfolio-data";

interface Props {
  writings: PortfolioData["writings"];
}

const WritingsSection = ({ writings }: Props) => {
  if (writings.length === 0) return null;

  return (
    <section className="px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-16 border-t border-border">
      <h2 className="text-2xl md:text-3xl font-light tracking-tight mb-10">Write</h2>
      <div className="space-y-4">
        {writings.map((w) => (
          <a
            key={w.id}
            href={w.url}
            className="flex items-center justify-between py-4 border-b border-border/50 group transition-colors hover:border-primary/40"
          >
            <span className="text-base md:text-lg text-foreground group-hover:text-primary transition-colors">
              {w.title}
            </span>
            <span className="text-sm text-muted-foreground">{w.date}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default WritingsSection;
