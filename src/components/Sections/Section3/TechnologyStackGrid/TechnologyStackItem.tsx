import { TechnologyMetadataMapping } from "../../../../types/TechnologyMetadataMapping";
import { TechnologyType } from "../../../../types/TechnologyType";
import { TechnologyIcon } from "../../../Icons/TechnologyIcon";

interface TechnologyStackItemProps {
  technology: TechnologyType;
}

export function TechnologyStackItem(props: Readonly<TechnologyStackItemProps>) {
  return (
    <a
      key={props.technology}
      href={TechnologyMetadataMapping[props.technology]?.url || "#"}
      target='_blank'
      rel='noopener noreferrer'
      className='flex flex-col rounded-2xl bg-gradient-to-br from-gray-400 to-gray-700 p-4 transition hover:scale-105 justify-center items-center text-center text-white'
    >
      <div className='text-3xl mb-2'>
        <TechnologyIcon
          className='w-12 h-12'
          icon={props.technology}
        />
      </div>
      {TechnologyMetadataMapping[props.technology]?.name || props.technology}
    </a>
  );
}
