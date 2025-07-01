import { AnimatedSection } from "../../AnimatedSection";
import { AboutHeader } from "./AboutHeader";
import { AboutAchievements } from "./AboutAchievements";
import { AboutResume } from "./AboutResume";
import { AboutFooter } from "./AboutFooter";

export function AboutSection() {
  return (
    <AnimatedSection
      id='about'
      className='py-16 px-4 bg-gray-800'
    >
      <div className='mx-auto text-white md:max-w-5xl flex flex-col h-full'>
        <div className='flex flex-col items-center'>
          <div className='flex flex-col gap-12 max-w-[800px]'>
            <AboutHeader />
            <AboutAchievements />
            <AboutResume />
            <AboutFooter />
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
