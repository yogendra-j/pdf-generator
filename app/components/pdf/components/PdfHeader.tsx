import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Download } from 'lucide-react';

interface PdfHeaderProps {
  filename: string;
  onDownload: () => void;
}

const PdfHeader = ({ filename, onDownload }: PdfHeaderProps) => (
  <div className="p-3 sm:p-4 pr-10 sm:pr-12 border-b border-border flex items-center justify-between bg-card relative">
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <div className="text-sm sm:text-base text-foreground font-medium truncate max-w-[calc(100%-120px)] sm:max-w-[calc(100%-150px)]">
            {filename}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground p-2 rounded text-xs">
          {filename}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    <Button
      onClick={onDownload}
      variant="default"
      size="sm"
      className="gap-1 h-8 sm:h-9 text-xs sm:text-sm"
    >
      <Download size={14} className="sm:size-[16px]" />
      Download
    </Button>
  </div>
);

export default PdfHeader;
