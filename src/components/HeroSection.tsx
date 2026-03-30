import { PortfolioData } from "@/lib/portfolio-data";

interface Props {
  data: PortfolioData;
}

const HeroSection = ({ data }: Props) => {
  return (
    <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-5xl mx-auto">
      <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-tight leading-tight">
        {data.greeting}{" "}
        <span className="text-gradient font-medium">{data.name}.</span>
      </h1>
      <p className="mt-8 text-lg md:text-xl text-muted-foreground max-w-2xl leading-relaxed font-light">
        {data.bio}
      </p>
      <div className="mt-10 flex gap-6">
        <a
          href={`mailto:${data.email}`}
          className="text-sm text-primary hover:text-primary/80 transition-colors border-b border-primary/40 pb-0.5"
        >
          → say hello
        </a>
        {data.socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
