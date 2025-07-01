import { AboutResumeButtons } from "./AboutResumeButtons";

export function AboutResume() {
  const documentId = import.meta.env.VITE_GOOGLE_DOC_ID_FOR_RESUME;
  return (
    <div className='text-center'>
      <h3 className='text-3xl font-bold mb-4 text-blue-400'>Resume</h3>
      <p className='text-lg font-light text-white mb-6 max-w-2xl mx-auto'>
        Want to learn more about my professional experience, education, and technical achievements? Download my resume or view it online.
      </p>

      <AboutResumeButtons documentId={documentId} />
    </div>
  );
}
