import { Fragment } from "react";
import { Navbar } from "../Navbar";
import { IntroSection } from "../Sections/Section1/IntroSection";
import { AboutSection } from "../Sections/Section2/AboutSection";
import { ProjectsSection } from "../Sections/Section3/ProjectsSection";
import { ContactSection } from "../Sections/Section4/ContactSection";
import { FunFactSection } from "../Sections/Section5/FunFactSection";
import { Footer } from "../Footer";

export function Page() {
  return (
    <Fragment>
      <Navbar />
      <IntroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <FunFactSection />
      <Footer />
    </Fragment>
  );
}
