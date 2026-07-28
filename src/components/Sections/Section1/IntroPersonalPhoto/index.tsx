import { CSSProperties } from "react";
import { SocialMediaMetadataMapping } from "../../../../types/SocialMediaMetadataMapping";
import { SocialMediaType } from "../../../../types/SocialMediaType";

// Where each social button rests, as an offset from the photo center scaled by
// the --orbit radius (x right, y down), plus its reveal delay. Deliberately
// irregular - uneven angles, varied radii, and staggered timing - so the ring
// reads as scattered rather than mechanically symmetric. The straight-down zone
// stays button-free and the lower two sit within the photo's height, so nothing
// crowds the name below.
const ORBIT_SOCIALS: ReadonlyArray<{ id: SocialMediaType; dx: number; dy: number; delay: number }> = [
  { id: "linkedin", dx: 0.36, dy: -0.89, delay: 0.28 }, // high, just right of top
  { id: "github", dx: -0.94, dy: -0.61, delay: 0.2 }, // upper-left, pushed out
  { id: "instagram", dx: 0.86, dy: 0.6, delay: 0.44 }, // lower-right
  { id: "discord", dx: -0.85, dy: 0.49, delay: 0.36 }, // left, lower-middle
];

export function IntroPersonalPhoto() {
  return (
    <div className='mt-28 mb-4 flex justify-center items-center'>
      <div className='orbit-scene relative w-48 h-48 sm:w-64 sm:h-64'>
        <div className='absolute inset-0 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
          <img
            alt='Marin Mirasol'
            src='./images/MarinMirasol.jpg'
            className='w-full h-full object-cover'
            width={512}
            height={512}
          />
        </div>

        {ORBIT_SOCIALS.map((social) => {
          const meta = SocialMediaMetadataMapping[social.id];
          return (
            <a
              key={social.id}
              href={meta.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={meta.name}
              title={meta.name}
              className='orbit-item group'
              style={
                {
                  "--dx": `calc(var(--orbit) * ${social.dx})`,
                  "--dy": `calc(var(--orbit) * ${social.dy})`,
                  "--delay": `${social.delay}s`,
                } as CSSProperties
              }
            >
              <span className='flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg ring-1 ring-black/5 transition duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-xl group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-blue-400'>
                <img
                  src={`./icons/socials/${social.id}.svg`}
                  alt=''
                  className='w-6 h-6 sm:w-7 sm:h-7'
                />
              </span>
            </a>
          );
        })}
      </div>
    </div>
  );
}
