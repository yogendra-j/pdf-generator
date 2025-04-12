import { Button } from '@/components/ui/button';
import { ZoomIn, ZoomOut } from 'lucide-react';

interface PdfZoomControlsProps {
  scale: number;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const PdfZoomControls = ({
  scale,
  zoomIn,
  zoomOut,
  resetZoom,
}: PdfZoomControlsProps) => (
  <div className="flex items-center gap-1 sm:gap-2">
    <Button
      onClick={zoomOut}
      variant="ghost"
      size="icon"
      className="h-8 w-8 sm:h-9 sm:w-9"
      title="Zoom Out"
      aria-label="Zoom Out"
    >
      <ZoomOut size={16} className="sm:size-[18px]" />
    </Button>
    <Button
      onClick={resetZoom}
      variant="ghost"
      size="sm"
      className="h-8 text-xs sm:text-sm px-2 sm:px-3"
      title="Reset Zoom"
      aria-label="Reset Zoom"
    >
      {Math.round(scale * 100)}%
    </Button>
    <Button
      onClick={zoomIn}
      variant="ghost"
      size="icon"
      className="h-8 w-8 sm:h-9 sm:w-9"
      title="Zoom In"
      aria-label="Zoom In"
    >
      <ZoomIn size={16} className="sm:size-[18px]" />
    </Button>
  </div>
);

export default PdfZoomControls;
