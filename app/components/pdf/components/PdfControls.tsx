import PdfNavigationControls from "./PdfNavigationControls";
import PdfZoomControls from "./PdfZoomControls";

interface PdfControlsProps {
  pageNumber: number;
  numPages: number;
  scale: number;
  previousPage: () => void;
  nextPage: () => void;
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const PdfControls = ({
  pageNumber,
  numPages,
  scale,
  previousPage,
  nextPage,
  zoomIn,
  zoomOut,
  resetZoom,
}: PdfControlsProps) => (
  <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
    <PdfNavigationControls
      pageNumber={pageNumber}
      numPages={numPages}
      previousPage={previousPage}
      nextPage={nextPage}
    />
    <PdfZoomControls
      scale={scale}
      zoomIn={zoomIn}
      zoomOut={zoomOut}
      resetZoom={resetZoom}
    />
  </div>
);

export default PdfControls;
