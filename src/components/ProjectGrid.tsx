import { Project } from "@/lib/portfolio-data";

interface Props {
  projects: Project[];
}

const ProjectGrid = ({ projects }: Props) => {
  return (
    <section className="px-6 md:px-16 lg:px-24 max-w-5xl mx-auto py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((project, i) => (
          <a
            key={project.id}
            href={project.link}
            className={`group relative block overflow-hidden rounded-2xl bg-card transition-transform duration-500 hover:scale-[1.02] ${
              project.featured && i === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img
                src={project.imageUrl}
                alt={project.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h3 className="text-xl md:text-2xl font-medium tracking-tight">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                {project.subtitle}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
};

export default ProjectGrid;
