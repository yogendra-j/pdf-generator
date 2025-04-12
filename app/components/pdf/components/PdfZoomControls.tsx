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
  <div className="flex items-center gap-2">
    <Button
      onClick={zoomOut}
      variant="ghost"
      size="icon"
      title="Zoom Out"
      aria-label="Zoom Out"
    >
      <ZoomOut size={18} />
    </Button>
    <Button
      onClick={resetZoom}
      variant="ghost"
      size="sm"
      title="Reset Zoom"
      aria-label="Reset Zoom"
    >
      {Math.round(scale * 100)}%
    </Button>
    <Button
      onClick={zoomIn}
      variant="ghost"
      size="icon"
      title="Zoom In"
      aria-label="Zoom In"
    >
      <ZoomIn size={18} />
    </Button>
  </div>
);

export default PdfZoomControls;
