import { handleScrollToElementById } from "../../../../utils";

export function IntroFooter() {
  return (
    <div className='mt-auto sm:mt-0 text-center items-center gap-2 mb-8 flex flex-col'>
      <button
        onClick={() => handleScrollToElementById("about")}
        className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300 text-lg lg:text-3xl'
      >
        Learn more about me!
      </button>
      <button
        onClick={() => handleScrollToElementById("about")}
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
  );
}
