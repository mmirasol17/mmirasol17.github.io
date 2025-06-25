import { useTechnologyStack } from "../../../hooks/useTechnologyStack";
import { TechnologyType } from "../../../types/TechnologyType";
import { TechnologyStackItem } from "./TechnologyStackItem";

export function TechnologyStackGrid() {
  const { technologyStack } = useTechnologyStack();

  return (
    <div className='mb-8'>
      <h3 className='text-3xl font-bold mb-4 text-center text-blue-400'>My Tech Stack</h3>
      <div className='grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3 text-xs font-bold justify-center'>
        {technologyStack.map((technology: TechnologyType) => (
          <TechnologyStackItem
            key={technology}
            technology={technology}
          />
        ))}
      </div>
    </div>
  );
}
