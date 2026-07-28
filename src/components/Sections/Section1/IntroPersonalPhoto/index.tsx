import { CSSProperties } from "react";
import { FileText } from "lucide-react";
import { SocialMediaMetadataMapping } from "../../../../types/SocialMediaMetadataMapping";
import { SocialMediaType } from "../../../../types/SocialMediaType";
import { OPEN_RESUME_VIEWER_EVENT } from "../../../../utils/events";

// Five buttons evenly spaced around the photo (regular pentagon, 72deg apart,
// point-up) so the ring reads as deliberate and balanced. Offsets are the unit
// vector (x right, y down) at radius 0.95 - just inside --orbit so every button
// straddles the photo edge - and the reveal delays cascade clockwise from the
// top. The bottom-center gap between the two lower buttons keeps the name clear.
type OrbitButton = {
  key: string;
  dx: number;
  dy: number;
  delay: number;
  social?: SocialMediaType;
  resume?: boolean;
};

const ORBIT_BUTTONS: ReadonlyArray<OrbitButton> = [
  { key: "resume", resume: true, dx: 0.0, dy: -0.95, delay: 0.22 }, // top
  { key: "linkedin", social: "linkedin", dx: 0.904, dy: -0.294, delay: 0.29 }, // upper-right
  { key: "instagram", social: "instagram", dx: 0.559, dy: 0.769, delay: 0.36 }, // lower-right
  { key: "discord", social: "discord", dx: -0.559, dy: 0.769, delay: 0.43 }, // lower-left
  { key: "github", social: "github", dx: -0.904, dy: -0.294, delay: 0.5 }, // upper-left
];

const BUTTON_FACE =
  "flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white shadow-lg ring-1 ring-black/5 transition duration-300 group-hover:scale-110 group-hover:-translate-y-1 group-hover:shadow-xl group-focus-visible:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-blue-400";

function openResumeViewer() {
  window.dispatchEvent(new CustomEvent(OPEN_RESUME_VIEWER_EVENT));
}

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

        {ORBIT_BUTTONS.map((button) => {
          const style = {
            "--dx": `calc(var(--orbit) * ${button.dx})`,
            "--dy": `calc(var(--orbit) * ${button.dy})`,
            "--delay": `${button.delay}s`,
          } as CSSProperties;

          if (button.resume) {
            return (
              <button
                key={button.key}
                type='button'
                onClick={openResumeViewer}
                aria-label='View resume'
                title='Resume'
                className='orbit-item group'
                style={style}
              >
                <span className={BUTTON_FACE}>
                  <FileText className='w-5 h-5 sm:w-6 sm:h-6 text-blue-600' />
                </span>
              </button>
            );
          }

          const meta = SocialMediaMetadataMapping[button.social!];
          return (
            <a
              key={button.key}
              href={meta.url}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={meta.name}
              title={meta.name}
              className='orbit-item group'
              style={style}
            >
              <span className={BUTTON_FACE}>
                <img
                  src={`./icons/socials/${button.social}.svg`}
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
