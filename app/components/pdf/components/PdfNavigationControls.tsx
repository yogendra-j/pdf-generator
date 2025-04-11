import { Button } from "@/components/ui/button";
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
    <Button
      onClick={previousPage}
      disabled={pageNumber <= 1}
      variant="ghost"
      size="icon"
      aria-label="Previous Page"
    >
      <ArrowLeft size={18} />
    </Button>
    <span className="text-sm text-foreground">
      Page {pageNumber} of {numPages}
    </span>
    <Button
      onClick={nextPage}
      disabled={pageNumber >= numPages}
      variant="ghost"
      size="icon"
      aria-label="Next Page"
    >
      <ArrowRight size={18} />
    </Button>
  </div>
);

export default PdfNavigationControls;
