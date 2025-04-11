import { ArrowLeft, ArrowRight } from "lucide-react";

interface PdfNavigationControlsProps {
  pageNumber: number;
  numPages: number;
  previousPage: () => void;
  nextPage: () => void;
}

const PdfNavigationControls = ({
  pageNumber,
  numPages,
  previousPage,
  nextPage,
}: PdfNavigationControlsProps) => (
  <div className="flex items-center gap-2">
    <button
      onClick={previousPage}
      disabled={pageNumber <= 1}
      className="p-2 rounded-md hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Previous Page"
    >
      <ArrowLeft size={18} />
    </button>
    <span className="text-sm text-gray-700">
      Page {pageNumber} of {numPages}
    </span>
    <button
      onClick={nextPage}
      disabled={pageNumber >= numPages}
      className="p-2 rounded-md hover:bg-gray-200 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      aria-label="Next Page"
    >
      <ArrowRight size={18} />
    </button>
  </div>
);

export default PdfNavigationControls;
