import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';

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
  <div className="flex items-center gap-1 sm:gap-2">
    <Button
      onClick={previousPage}
      disabled={pageNumber <= 1}
      variant="ghost"
      size="icon"
      className="h-8 w-8 sm:h-9 sm:w-9"
      aria-label="Previous Page"
    >
      <ArrowLeft size={16} className="sm:size-[18px]" />
    </Button>
    <span className="text-xs sm:text-sm text-foreground">
      Page {pageNumber} of {numPages}
    </span>
    <Button
      onClick={nextPage}
      disabled={pageNumber >= numPages}
      variant="ghost"
      size="icon"
      className="h-8 w-8 sm:h-9 sm:w-9"
      aria-label="Next Page"
    >
      <ArrowRight size={16} className="sm:size-[18px]" />
    </Button>
  </div>
);

export default PdfNavigationControls;
