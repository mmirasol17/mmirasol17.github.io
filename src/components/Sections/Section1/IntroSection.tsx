import React, { useCallback } from "react";

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
          <div className='mt-28 mb-4 flex justify-center items-center'>
            <div className='sm:max-w-sm w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center'>
              <div className='text-6xl'>
                <img
                  alt='Marin Mirasol'
                  src='./images/MarinMirasol.jpg'
                  loading='lazy'
                />
              </div>
            </div>
          </div>

          <div className='text-center mb-10 sm:mb-16'>
            <div className='flex flex-col sm:flex-row mb-1 justify-center'>
              <h1 className='text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl'>Hello, my name is&nbsp;</h1>
              <h1 className='text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl'>
                <button
                  onClick={scrollToAbout}
                  className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300'
                >
                  Marin Mirasol
                </button>
                .&nbsp;
              </h1>
            </div>
            <h1 className='text-3xl lg:text-5xl font-bold text-white'>I'm a software engineer!</h1>
          </div>
        </div>

        <div className='mt-auto sm:mt-0 text-center items-center gap-2 mb-8 flex flex-col'>
          <button
            onClick={scrollToAbout}
            className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300 text-lg lg:text-3xl'
          >
            Learn more about me!
          </button>
          <button
            onClick={scrollToAbout}
            className='animate-bounce w-14 h-14 p-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full cursor-pointer flex items-center justify-center transition duration-200 hover:scale-110 mt-4'
          >
            <img
              className='w-6 h-6'
              src='./icons/ui/arrowdown.svg'
              alt='Arrow Down'
              loading='lazy'
            />
          </button>
        </div>
      </div>
    </header>
  );
}
