import { TechnologyType } from "../../types/TechnologyType";
import { TechnologyMetadataMapping } from "../../types/TechnologyMetadataMapping";

interface TechnologyIconProps {
  icon: TechnologyType;
  className?: string;
  enableTechnologyLink?: boolean;
}

export function TechnologyIcon(props: Readonly<TechnologyIconProps>) {
  if (props.enableTechnologyLink && TechnologyMetadataMapping[props.icon]?.url) {
    return (
      <a
        href={TechnologyMetadataMapping[props.icon].url}
        target='_blank'
        rel='noopener noreferrer'
        className={`${props.className} hover:scale-110 transition-transform`}
      >
        <img
          src={`./icons/tech-stack/${props.icon}.svg`}
          alt={TechnologyMetadataMapping[props.icon].name ?? undefined}
          loading='lazy'
        />
      </a>
    );
  }

  return (
    <img
      className={`${props.className}`}
      src={`./icons/tech-stack/${props.icon}.svg`}
      alt={TechnologyMetadataMapping[props.icon].name ?? undefined}
      loading='lazy'
    />
  );
}
