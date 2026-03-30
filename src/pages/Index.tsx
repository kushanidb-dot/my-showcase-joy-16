import { useState, useEffect } from "react";
import { getPortfolioData, PortfolioData } from "@/lib/portfolio-data";
import HeroSection from "@/components/HeroSection";
import ProjectGrid from "@/components/ProjectGrid";
import WritingsSection from "@/components/WritingsSection";
import FooterSection from "@/components/FooterSection";

const Index = () => {
  const [data, setData] = useState<PortfolioData>(getPortfolioData());

  useEffect(() => {
    setData(getPortfolioData());
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection data={data} />
      <ProjectGrid projects={data.projects} />
      <WritingsSection writings={data.writings} />
      <FooterSection data={data} />
    </div>
  );
};

export default Index;
