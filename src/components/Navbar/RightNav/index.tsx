import { RightNavDesktop } from "./RightNavDesktop";
import { RightNavMobile } from "./RightNavMobile";

export function RightNav() {
  return (
    <>
      {/* Desktop Navigation */}
      <div className='hidden sm:block'>
        <RightNavDesktop />
      </div>

      {/* Mobile Navigation */}
      <RightNavMobile />
    </>
  );
}
