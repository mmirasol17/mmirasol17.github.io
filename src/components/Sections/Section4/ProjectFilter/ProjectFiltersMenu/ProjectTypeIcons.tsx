import { FileTerminal, Monitor, PanelTop, Smartphone } from "lucide-react";

export const PROJECT_TYPE_ICONS: Record<string, React.ReactNode> = {
  "CLI Tool": <FileTerminal className='w-4 h-4' />,
  "Desktop App": <Monitor className='w-4 h-4' />,
  "Mobile App": <Smartphone className='w-4 h-4' />,
  "Web Application": <PanelTop className='w-4 h-4' />,
};
