import { SocialMediaMetadataMapping } from "../../types/SocialMediaMetadataMapping";
import { SocialMediaType } from "../../types/SocialMediaType";

interface SocialMediaIconProps {
  icon: SocialMediaType;
  className?: string;
}

export function SocialMediaIcon(props: Readonly<SocialMediaIconProps>) {
  return (
    <a
      href={SocialMediaMetadataMapping[props.icon].url}
      target='_blank'
      rel='noopener noreferrer'
      className={`${props.className} hover:scale-110 transition-transform`}
    >
      <img
        src={`./icons/socials/${props.icon}.svg`}
        alt={SocialMediaMetadataMapping[props.icon].name ?? undefined}
        loading='lazy'
      />
    </a>
  );
}
