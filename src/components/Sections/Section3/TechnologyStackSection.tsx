import { TechnologyStackFooter } from "./TechnologStackFooter";
import { TechnologyStackGrid } from "./TechnologyStackGrid";

export function TechnologyStackSection() {
  return (
    <div
      id='technologies'
      className='py-16 px-8 md:px-16 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900'
    >
      <TechnologyStackGrid />
      <TechnologyStackFooter />
    </div>
  );
}
