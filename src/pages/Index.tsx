import Navbar from "@/components/portfolio/Navbar";
import Hero from "@/components/portfolio/Hero";
import About from "@/components/portfolio/About";
import Experience from "@/components/portfolio/Experience";
import TechStack from "@/components/portfolio/TechStack";
import Projects from "@/components/portfolio/Projects";
import CTA from "@/components/portfolio/CTA";
import Footer from "@/components/portfolio/Footer";
import WorkflowStack from "@/components/portfolio/Workflow";
import WorkStyle from "@/components/portfolio/WorkStyle";


const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <WorkStyle />
        <Projects />
        {/*<FAQ />*/}
        <TechStack />
        <WorkflowStack />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;