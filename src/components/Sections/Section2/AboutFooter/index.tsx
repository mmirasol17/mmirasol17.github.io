import { handleScrollToElementById } from "../../../../utils";

export function AboutFooter() {
  return (
    <div className='text-center items-center justify-center gap-2 flex flex-col'>
      <button
        onClick={() => handleScrollToElementById("technologies")}
        className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300 text-lg lg:text-3xl'
      >
        Technologies I've worked with
      </button>
      <button
        onClick={() => handleScrollToElementById("technologies")}
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
