import { useMemo } from "react";
import { handleScrollToElementById } from "../../utils";

export function Footer() {
  const githubBuildNumber = useMemo(() => {
    return import.meta.env.VITE_GITHUB_BUILD_NUMBER;
  }, []);

  const githubBuildId = useMemo(() => {
    return import.meta.env.VITE_GITHUB_BUILD_ID;
  }, []);

  const githubCommitSha = useMemo(() => {
    return import.meta.env.VITE_GITHUB_COMMIT_SHA;
  }, []);

  const githubRepoUrl = useMemo(() => {
    return import.meta.env.VITE_GITHUB_REPO_URL;
  }, []);

  return (
    <footer className='bg-gray-800 py-4'>
      <div className='mx-auto text-center font-bold text-white flex flex-col gap-2'>
        <div className='flex mt-2 justify-center'>
          <button
            onClick={() => handleScrollToElementById("intro")}
            className='animate-bounce w-14 h-14 p-2 bg-gradient-to-br from-gray-400 to-gray-700 rounded-full cursor-pointer flex items-center justify-center transition duration-200 hover:scale-110'
          >
            <img
              className='w-6 h-6'
              src='./icons/ui/arrowup.svg'
              alt='Arrow Down'
              loading='lazy'
            />
          </button>
        </div>
        <span>&copy; 2023 Marin Mirasol. All rights reserved.</span>

        {/* Build info with links */}
        {(githubBuildNumber || githubCommitSha) && (
          <div className='text-xs text-gray-400 font-normal flex items-center justify-center gap-1'>
            {githubBuildNumber && (
              <a
                href={`${githubRepoUrl}/actions/runs/${githubBuildId}`}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline transition-colors'
              >
                Build #{githubBuildNumber}
              </a>
            )}
            {githubBuildNumber && githubCommitSha && <span> • </span>}
            {githubCommitSha && (
              <a
                href={`${githubRepoUrl}/commit/${githubCommitSha}`}
                target='_blank'
                rel='noopener noreferrer'
                className='hover:underline transition-colors'
              >
                {githubCommitSha.slice(0, 7)}
              </a>
            )}
          </div>
        )}
      </div>
    </footer>
  );
}
