import { TechnologyStackFooter } from "./TechnologStackFooter";
import { TechnologyCategories } from "./TechnologyCategories";

export function TechnologyStackSection() {
  return (
    <section
      className='py-16 md:px-4 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900 flex flex-col items-center justify-center gap-8'
      id='technologies'
    >
      <TechnologyCategories />
      <TechnologyStackFooter />
    </section>
  );
}
