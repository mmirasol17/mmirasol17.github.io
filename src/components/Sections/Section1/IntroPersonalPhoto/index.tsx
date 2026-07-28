import { CSSProperties } from "react";
import { SocialMediaMetadataMapping } from "../../../../types/SocialMediaMetadataMapping";
import { SocialMediaType } from "../../../../types/SocialMediaType";

// Where each social button rests, as a unit vector (x right, y down) scaled by
// the --orbit radius, plus its reveal order. The diagonals keep the top and
// bottom center of the photo clear (name/headshot stay unobstructed).
const ORBIT_SOCIALS: ReadonlyArray<{ id: SocialMediaType; dx: number; dy: number }> = [
  { id: "linkedin", dx: 0.766, dy: -0.643 }, // top-right
  { id: "github", dx: -0.766, dy: -0.643 }, // top-left
  { id: "instagram", dx: 0.766, dy: 0.643 }, // bottom-right
  { id: "discord", dx: -0.766, dy: 0.643 }, // bottom-left
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

        {ORBIT_SOCIALS.map((social, index) => {
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
                  "--delay": `${0.25 + index * 0.09}s`,
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
