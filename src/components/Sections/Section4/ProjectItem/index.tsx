import { useMemo } from "react";
import { IProject } from "../../../../hooks/useProjects";
import { TechnologyType } from "../../../../types/TechnologyType";
import { TechnologyIcon } from "../../../Icons/TechnologyIcon";
import { ExternalLink, GitBranchIcon, Github } from "lucide-react";
import { TechnologyMetadataMapping } from "../../../../types/TechnologyMetadataMapping";

interface ProjectItemProps {
  project: IProject;
}

export function ProjectItem(props: Readonly<ProjectItemProps>) {
  const projectStatusInfo = useMemo(() => {
    if (props.project.link) {
      if (props.project.link.includes("github.com")) {
        return { status: "Open Source", color: "bg-purple-500" };
      } else {
        return { status: "Live Production", color: "bg-green-500" };
      }
    } else if (props.project.isPublic) {
      return { status: "Public", color: "bg-blue-500" };
    } else {
      return { status: "Private/Academic", color: "bg-gray-500" };
    }
  }, [props.project]);

  const projectType = useMemo(() => {
    if (props.project.technologies.includes("react") || props.project.technologies.includes("javascript") || props.project.technologies.includes("html")) {
      return "Web Application";
    } else if (props.project.technologies.includes("kotlin") || (props.project.technologies.includes("java") && props.project.technologies.includes("androidstudio"))) {
      return "Mobile App";
    } else if (props.project.technologies.includes("python") && props.project.technologies.includes("pyqt")) {
      return "Desktop App";
    } else if (props.project.technologies.includes("cpp") || props.project.technologies.includes("bash")) {
      return "CLI Tool";
    } else {
      return "Application";
    }
  }, [props.project.technologies]);

  return (
    <div className='bg-gradient-to-br from-gray-400 to-gray-700 rounded-2xl p-6 shadow-2xl hover:scale-[101%] transition-transform duration-300'>
      <div className='flex justify-between items-start mb-3'>
        <div>
          <h4 className='text-xl font-bold text-white mb-1'>{props.project.title}</h4>
          <span className='text-blue-300 text-sm font-medium'>{projectType}</span>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium text-white ${projectStatusInfo.color}`}>{projectStatusInfo.status}</span>
      </div>

      <p className='text-white text-sm mb-4 leading-relaxed'>{props.project.description}</p>

      {/* Conditional highlights section */}
      {/* {props.project.highlights && props.project.highlights.length > 0 && (
        <div className='mb-4'>
          <h5 className='text-white font-semibold mb-2 text-sm'>Key Features & Achievements:</h5>
          <ul className='list-disc list-inside text-gray-200 text-xs space-y-1'>
            {props.project.highlights.map((highlight) => (
              <li
                key={highlight}
                className='leading-relaxed'
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>
      )} */}

      <div className='mb-4'>
        <div className='flex flex-wrap gap-2'>
          {props.project.technologies.map((tech, index) => (
            <div
              key={index + tech}
              className='flex items-center gap-1 bg-blue-600/80 text-white px-2 py-1 rounded-full text-xs cursor-pointer hover:scale-105 transition-transform duration-300'
              onClick={() => {
                const url = TechnologyMetadataMapping[tech].url || "";
                if (url) {
                  window.open(url, "_blank", "noopener,noreferrer");
                }
              }}
            >
              <span>
                <TechnologyIcon
                  className='w-4 h-4 flex-shrink-0'
                  icon={tech}
                />
              </span>
              <span className='truncate'>{TechnologyMetadataMapping[tech].name}</span>
            </div>
          ))}
        </div>
      </div>

      {props.project.link && (
        <div className='flex gap-3'>
          <a
            href={props.project.link}
            target='_blank'
            rel='noopener noreferrer'
            className={`inline-flex items-center gap-2 text-white px-3 py-2 rounded-lg transition text-sm hover:scale-105 duration-300 ${
              props.project.link.includes("github.com") ? "bg-gray-700 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {props.project.link.includes("github.com") ? (
              <>
                <Github className='w-4 h-4' />
                View Source
              </>
            ) : (
              <>
                <ExternalLink className='w-4 h-4' />
                Live Demo
              </>
            )}
          </a>
        </div>
      )}
    </div>
  );
}
