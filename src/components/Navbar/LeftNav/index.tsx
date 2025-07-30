import { handleScrollToElementById } from "../../../utils";

export function LeftNav() {
  return (
    <button
      onClick={() => handleScrollToElementById("intro")}
      className='w-12 h-12 p-2 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full transition hover:scale-110'
    >
      <img
        src='./icons/ui/mm.svg'
        alt='MM'
        loading='lazy'
      />
    </button>
  );
}
