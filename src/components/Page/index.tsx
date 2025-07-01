import { Fragment } from "react";
import { Navbar } from "../Navbar";
import { IntroSection } from "../Sections/Section1/IntroSection";
import { AboutSection } from "../Sections/Section2/AboutSection";
import { TechnologyStackSection } from "../Sections/Section3/TechnologyStackSection";
import { ProjectsSection } from "../Sections/Section4/ProjectsSection";
import { ContactSection } from "../Sections/Section6/ContactSection";
import { FunFactSection } from "../Sections/Section5/FunFactSection";
import { Footer } from "../Footer";

export function Page() {
  return (
    <Fragment>
      <Navbar />
      <IntroSection />
      <AboutSection />
      <TechnologyStackSection />
      <ProjectsSection />
      <FunFactSection />
      <ContactSection />
      <Footer />
    </Fragment>
  );
}
