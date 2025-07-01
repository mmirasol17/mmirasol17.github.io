import { Download, Eye, FileText } from "lucide-react";
import { useCallback, useState } from "react";
import { AboutResumeViewerModal } from "./AboutResumeViewerModal";

interface AboutResumeDownloaderProps {
  documentId: string;
}

interface INotification {
  message: string;
  type: "success" | "error";
}

export function AboutResumeButtons(props: Readonly<AboutResumeDownloaderProps>) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<INotification | null>(null);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const showNotification = useCallback((message: string, type: "success" | "error") => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const handleDownload = useCallback(
    async (format: "pdf" | "docx") => {
      setIsLoading(true);

      try {
        const exportUrl = `https://docs.google.com/document/d/${props.documentId}/export?format=${format}`;
        const filename = `Marin_Mirasol_Resume.${format}`;

        const link = document.createElement("a");
        link.href = exportUrl;
        link.download = filename;
        link.target = "_blank";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        showNotification("Resume downloaded successfully!", "success");
        await new Promise((resolve) => setTimeout(resolve, 800));
      } catch (error) {
        console.error("Download failed:", error);
        showNotification("Download failed. Please try again.", "error");
      } finally {
        setIsLoading(false);
      }
    },
    [props.documentId, showNotification]
  );

  const handleViewResume = useCallback(() => {
    setIsViewerOpen(true);
  }, []);

  return (
    <>
      <div className='relative'>
        {/* Action Buttons */}
        <div className='flex flex-col md:flex-row gap-3 justify-center items-center mb-4'>
          {/* View Resume Button - Primary Action */}
          <button
            onClick={handleViewResume}
            className='group inline-flex items-center justify-center gap-2 bg-blue-400 text-white font-bold rounded-2xl py-3 px-6 transition-all duration-200 hover:scale-105 hover:bg-blue-600 shadow-lg hover:shadow-xl w-full md:w-auto'
          >
            <Eye className='w-5 h-5 group-hover:animate-pulse' />
            <span>View Resume</span>
          </button>

          {/* Download PDF Button */}
          <button
            onClick={() => handleDownload("pdf")}
            disabled={isLoading}
            className='group inline-flex items-center justify-center gap-2 bg-green-500 text-white font-bold rounded-2xl py-3 px-6 transition-all duration-200 hover:scale-105 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl w-full md:w-auto'
          >
            {isLoading ? (
              <>
                <div className='w-5 h-5 animate-spin rounded-full border-2 border-white border-t-transparent' />
                <span>Downloading...</span>
              </>
            ) : (
              <>
                <Download className='w-5 h-5 group-hover:animate-bounce' />
                <span>Download PDF</span>
              </>
            )}
          </button>

          {/* Download DOCX Button */}
          <button
            onClick={() => handleDownload("docx")}
            disabled={isLoading}
            className='group inline-flex items-center justify-center gap-2 bg-gray-600 text-white font-bold rounded-2xl py-3 px-6 transition-all duration-200 hover:scale-105 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg hover:shadow-xl w-full md:w-auto'
          >
            <FileText className='w-5 h-5 group-hover:animate-pulse' />
            <span>Download DOCX</span>
          </button>
        </div>

        {/* Inline Preview Option */}
        <div className='text-center'>
          <p className='text-sm text-gray-400 mb-2'>Click "View Resume" to see it instantly in your browser</p>
        </div>

        {/* Success/Error Notifications */}
        {notification && (
          <div
            className={`fixed top-4 right-4 z-40 p-4 rounded-lg text-white shadow-lg transition-all duration-300 ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <div className='flex items-center gap-2'>
              {notification.type === "success" ? (
                <div className='w-5 h-5 rounded-full bg-white text-green-500 flex items-center justify-center'>✓</div>
              ) : (
                <div className='w-5 h-5 rounded-full bg-white text-red-500 flex items-center justify-center'>✕</div>
              )}
              <span>{notification.message}</span>
            </div>
          </div>
        )}
      </div>

      {/* Resume Viewer Modal */}
      <AboutResumeViewerModal
        isOpen={isViewerOpen}
        onClose={() => setIsViewerOpen(false)}
        documentId={props.documentId}
      />
    </>
  );
}
