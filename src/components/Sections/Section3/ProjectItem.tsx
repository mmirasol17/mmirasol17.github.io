import { IProject } from "../../../hooks/useProjects";
import { TechnologyType } from "../../../types/TechnologyType";
import { TechnologyIcon } from "../../Icons/TechnologyIcon";

interface ProjectItemProps {
  project: IProject;
}

export function ProjectItem(props: Readonly<ProjectItemProps>) {
  return (
    <div className='text-center bg-gray-600 rounded-2xl p-4 shadow-2xl bg-gradient-to-br from-gray-400 to-gray-700 flex flex-col justify-between'>
      <div>
        <h3 className='text-2xl font-bold text-white mb-2'>{props.project.title}</h3>
        <p className='text-white font-light mb-2'>{props.project.description}</p>
        <div className='flex flex-wrap items-center gap-2 justify-center mb-2'>
          {props.project.technologies.map((technology: TechnologyType, technologyIndex) => (
            <TechnologyIcon
              key={technologyIndex + technology}
              className='w-10 h-10'
              icon={technology}
              enableTechnologyLink
            />
          ))}
        </div>
      </div>
      {props.project.isPublic && props.project.link ? (
        <a
          href={props.project.link}
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-400 underline text-lg transition hover:scale-110'
        >
          View Project
        </a>
      ) : (
        <span className='text-blue-400 text-lg'>Not Open-Sourced / Publicly Available</span>
      )}
    </div>
  );
}
