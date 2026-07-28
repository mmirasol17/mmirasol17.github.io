import { cn } from "../../utils/cn";

interface ProjectIconProps {
  /** Path from the project's `icon` field. */
  src: string;
  title: string;
  className?: string;
}

/**
 * A project's app icon. Real marks are pulled from the live apps where they
 * exist and hand-drawn otherwise, but every file in `public/icons/projects/` is
 * a self-contained rounded-square tile, so callers only pick a size. Decorative
 * by default: the project title always sits right next to it.
 */
export function ProjectIcon(props: Readonly<ProjectIconProps>) {
  return (
    <img
      src={props.src}
      alt=''
      aria-hidden='true'
      loading='lazy'
      decoding='async'
      className={cn("rounded-xl object-contain", props.className)}
      title={props.title}
    />
  );
}
