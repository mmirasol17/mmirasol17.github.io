import { handleScrollToElementById } from "../../../../utils";

export function IntroPersonalMessage() {
  return (
    <div className='text-center mb-10 sm:mb-16'>
      <div className='flex flex-col sm:flex-row mb-1 justify-center'>
        <h1 className='text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl'>Hello, my name is&nbsp;</h1>
        <h1 className='text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl'>
          <button
            onClick={() => handleScrollToElementById("about")}
            className='text-blue-400 font-bold underline transition duration-200 hover:text-blue-300'
          >
            Marin Mirasol
          </button>
          .&nbsp;
        </h1>
      </div>
      <h1 className='text-3xl lg:text-5xl font-bold text-white'>I'm a software engineer!</h1>
    </div>
  );
}
