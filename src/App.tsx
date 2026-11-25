import { PhotoPreviewProvider } from './context/PhotoPreviewContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { ExpertiseSection } from './components/ExpertiseSection';
import { ExperienceSection } from './components/ExperienceSection';
import { DigitalProductsSection } from './components/DigitalProductsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { SessionsSection } from './components/SessionsSection';
import { ToolkitSection } from './components/ToolkitSection';
import { CollaborationSection } from './components/CollaborationSection';
import { ApproachSection } from './components/ApproachSection';
import { ContactFooter } from './components/ContactFooter';

export default function App() {
  return (
    <PhotoPreviewProvider>
      <div className="paper-grain min-h-screen bg-[#F5F5F0] text-[#303E50]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-xl focus:bg-[#303E50] focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content">
          <HeroSection />
          <AboutSection />
          <ExpertiseSection />
          <ExperienceSection />
          <DigitalProductsSection />
          <ProjectsSection />
          <SessionsSection />
          <ToolkitSection />
          <CollaborationSection />
          <ApproachSection />
        </main>

        <ContactFooter />
      </div>
    </PhotoPreviewProvider>
  );
}
