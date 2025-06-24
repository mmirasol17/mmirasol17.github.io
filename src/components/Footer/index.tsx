import React, { useCallback } from "react";

export function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <footer className='bg-gray-800 py-4'>
      <div className='container mx-auto text-center font-bold text-white flex flex-col gap-2'>
        <div className='flex mt-2 justify-center'>
          <button
            onClick={scrollToTop}
            className='animate-bounce w-14 h-14 p-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full cursor-pointer flex items-center justify-center transition duration-200 hover:scale-110'
          >
            <svg
              className='w-6 h-6 text-white'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M5 10l7-7m0 0l7 7m-7-7v18'
              />
            </svg>
          </button>
        </div>
        <span>&copy; 2023 Marin Mirasol. All rights reserved.</span>
      </div>
    </footer>
  );
}
