import { AnimatedSection } from "../../AnimatedSection";
import { TechnologyIcon } from "../../Icons/TechnologyIcon";
import { TechnologyType } from "../../../types/TechnologyType";
import { Fragment } from "react/jsx-runtime";
import { TechnologyMetadataMapping } from "../../../types/TechnologyMetadataMapping";

const TOOLS: TechnologyType[] = ["react", "typescript", "tailwind", "vite", "githubpages"];

export function FunFactSection() {
  return (
    <AnimatedSection
      id='fact'
      className='py-16 px-8 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900'
    >
      <div className=' mx-auto max-w-4xl'>
        <div className='rounded-3xl p-8 shadow-2xl bg-gradient-to-br from-gray-400 to-gray-700'>
          <div>
            <h2 className='text-4xl font-bold mb-4 text-white text-center'>Fun Fact!</h2>
            <p className='text-white font-light md:text-lg mb-8 text-center'>
              I built this portfolio using {TechnologyMetadataMapping["react"].name}, {TechnologyMetadataMapping["typescript"].name}, {TechnologyMetadataMapping["tailwind"].name},{" "}
              {TechnologyMetadataMapping["vite"].name}, and {TechnologyMetadataMapping["githubpages"].name}! I used React to handle component logic and state management, TypeScript
              for type safety, and TailwindCSS for styling. I also used Vite for bundling, and GitHub Pages to host this portfolio website.
            </p>
            <p className='text-white font-light md:text-lg mb-8 text-center'>
              If you are building a website, I highly recommend trying out some of these tools, as they are very easy to use, make development much more efficient, and are very
              powerful!
            </p>
            <p className='text-white font-light md:text-lg mb-8 text-center'>
              Feel free to <span className='underline'>click</span> on any of the icons of these tools below to learn more about them!
            </p>
          </div>

          <div className='flex items-center gap-3 justify-center text-white text-sm leading-relaxed'>
            {TOOLS.map((tool, index) => (
              <Fragment key={tool}>
                {index > 0 && <span className='text-2xl hidden md:block'>×</span>}
                <TechnologyIcon
                  icon={tool}
                  className='animate-pulse w-12 h-12'
                  enableTechnologyLink
                />
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
}
