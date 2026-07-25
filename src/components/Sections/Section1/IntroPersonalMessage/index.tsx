import { handleScrollToElementById } from "../../../../utils";

export function IntroPersonalMessage() {
  return (
    <div className='stagger-text text-center mb-10 sm:mb-16'>
      <div
        className='flex flex-col sm:flex-row mb-1 justify-center'
        style={{ "--i": 0 } as React.CSSProperties}
      >
        <h1 className='text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl'>Hello, my name is&nbsp;</h1>
        <h1 className='text-3xl lg:text-5xl font-bold text-white drop-shadow-2xl'>
          <button
            onClick={() => handleScrollToElementById("about")}
            className='text-shimmer font-bold underline decoration-blue-400/60 underline-offset-4 transition duration-200 hover:decoration-blue-300'
          >
            Marin Mirasol
          </button>
          <span className='text-white'>.&nbsp;</span>
        </h1>
      </div>
      <h1
        className='text-3xl lg:text-5xl font-bold text-white'
        style={{ "--i": 1 } as React.CSSProperties}
      >
        I'm a software engineer!
      </h1>
    </div>
  );
}
