import { ZoomIn, ZoomOut } from "lucide-react";

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
    <button
      onClick={zoomOut}
      className="p-1 rounded-md hover:bg-gray-200 text-gray-700"
      title="Zoom Out"
      aria-label="Zoom Out"
    >
      <ZoomOut size={18} />
    </button>
    <button
      onClick={resetZoom}
      className="p-1 rounded-md hover:bg-gray-200 text-gray-700 text-sm"
      title="Reset Zoom"
      aria-label="Reset Zoom"
    >
      {Math.round(scale * 100)}%
    </button>
    <button
      onClick={zoomIn}
      className="p-1 rounded-md hover:bg-gray-200 text-gray-700"
      title="Zoom In"
      aria-label="Zoom In"
    >
      <ZoomIn size={18} />
    </button>
  </div>
);

export default PdfZoomControls;
