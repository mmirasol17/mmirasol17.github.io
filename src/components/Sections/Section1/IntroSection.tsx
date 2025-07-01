import { useCallback } from "react";
import { IntroPersonalPhoto } from "./IntroPersonalPhoto";
import { IntroFooter } from "./IntroFooter";
import { IntroPersonalMessage } from "./IntroPersonalMessage";

export function IntroSection() {
  const scrollToAbout = useCallback(() => {
    const aboutSection = document.getElementById("about");
    if (aboutSection) {
      const navbar = document.querySelector(".navbar");
      const offset = navbar ? navbar.clientHeight : 64;
      window.scrollTo({
        top: aboutSection.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, []);

  return (
    <header
      id='intro'
      className='min-h-screen px-4 bg-gradient-to-b from-blue-800 via-blue-900 to-gray-900'
    >
      <div className='mx-auto flex flex-col justify-between sm:justify-center items-center min-h-screen'>
        <div className='transition-opacity duration-1000 opacity-100'>
          <IntroPersonalPhoto />
          <IntroPersonalMessage scrollToAbout={scrollToAbout} />
        </div>

        <IntroFooter scrollToAbout={scrollToAbout} />
      </div>
    </header>
  );
}
