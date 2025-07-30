import { LeftNav } from "./LeftNav";
import { RightNav } from "./RightNav";

/**
 * Navbar component that provides navigation links to different sections of the page.
 * It highlights the active section based on the scroll position.
 *
 * @returns {JSX.Element} The rendered Navbar component.
 */
export function Navbar() {
  return (
    <nav className='navbar bg-gray-800 h-16 flex items-center px-4 fixed top-0 w-full z-50 shadow-2xl'>
      <div className='container mx-auto'>
        <div className='justify-between items-center flex'>
          <LeftNav />
          <RightNav />
        </div>
      </div>
    </nav>
  );
}
