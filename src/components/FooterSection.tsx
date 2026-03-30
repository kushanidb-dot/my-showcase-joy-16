import { PortfolioData } from "@/lib/portfolio-data";

interface Props {
  data: PortfolioData;
}

const FooterSection = ({ data }: Props) => {
  return (
    <footer className="px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-16 border-t border-border">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {data.name}
        </p>
        <div className="flex gap-6">
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
      </div>
    </footer>
  );
};

export default FooterSection;
