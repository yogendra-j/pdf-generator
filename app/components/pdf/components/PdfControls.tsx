import PdfNavigationControls from '@/app/components/pdf/components/PdfNavigationControls';
import PdfZoomControls from '@/app/components/pdf/components/PdfZoomControls';

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
  <div className="p-2 sm:p-4 border-t border-border flex flex-wrap justify-center sm:flex-nowrap sm:justify-between items-center gap-2 bg-card">
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
