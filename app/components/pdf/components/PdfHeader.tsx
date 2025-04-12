import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@radix-ui/react-tooltip';
import { Download } from 'lucide-react';

interface PdfHeaderProps {
  filename: string;
  onDownload: () => void;
}

const PdfHeader = ({ filename, onDownload }: PdfHeaderProps) => (
  <div className="p-4 border-b border-border flex items-center justify-between bg-card">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="text-foreground font-medium truncate w-50">
            {filename}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-background text-foreground">
          {filename}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Button onClick={onDownload} variant="default" className="gap-1">
      <Download size={18} />
      Download
    </Button>
  </div>
);

export default PdfHeader;
