import { useCallback, useMemo } from "react";

export function Footer() {
  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  const buildNumber = useMemo(() => {
    return import.meta.env.VITE_BUILD_NUMBER;
  }, []);

  const commitSha = useMemo(() => {
    return import.meta.env.VITE_COMMIT_SHA;
  }, []);

  return (
    <footer className='bg-gray-800 py-4'>
      <div className='mx-auto text-center font-bold text-white flex flex-col gap-2'>
        <div className='flex mt-2 justify-center'>
          <button
            onClick={scrollToTop}
            className='animate-bounce w-14 h-14 p-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full cursor-pointer flex items-center justify-center transition duration-200 hover:scale-110'
          >
            <img
              className='w-6 h-6'
              src='./icons/ui/arrowup.svg'
              alt='Arrow Down'
              loading='lazy'
            />
          </button>
        </div>
        <span>&copy; 2023 Marin Mirasol. All rights reserved.</span>

        {/* Build info */}
        {(buildNumber || commitSha) && (
          <div className='text-xs text-gray-400 font-normal'>
            {buildNumber && <span>Build #{buildNumber}</span>}
            {buildNumber && commitSha && <span> • </span>}
            {commitSha && <span>{commitSha.slice(0, 7)}</span>}
          </div>
        )}
      </div>
    </footer>
  );
}
