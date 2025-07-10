import { IntroPersonalPhoto } from "./IntroPersonalPhoto";
import { IntroFooter } from "./IntroFooter";
import { IntroPersonalMessage } from "./IntroPersonalMessage";

export function IntroSection() {
  return (
    <header
      id='intro'
      className='min-h-[100svh] px-4 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900'
    >
      <div className='mx-auto flex flex-col justify-between sm:justify-center items-center min-h-screen'>
        <div className='transition-opacity duration-1000 opacity-100'>
          <IntroPersonalPhoto />
          <IntroPersonalMessage />
        </div>

        <IntroFooter />
      </div>
    </header>
  );
}
