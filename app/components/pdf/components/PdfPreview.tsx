"use client";

import PdfControls from "@/app/components/pdf/components/PdfControls";
import PdfHeader from "@/app/components/pdf/components/PdfHeader";
import PdfViewer from "@/app/components/pdf/components/PdfViewer";
import usePdfNavigation from "@/app/components/pdf/hooks/usePdfNavigation";
import usePdfUrl from "@/app/components/pdf/hooks/usePdfUrl";
import usePdfZoom from "@/app/components/pdf/hooks/usePdfZoom";
import "@/app/components/pdf/pdfjs-config";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";

interface PdfPreviewProps {
  pdfBlob: Blob;
  onDownload: () => void;
  filename?: string;
}

const PdfPreview = ({
  pdfBlob,
  onDownload,
  filename = "document.pdf",
}: PdfPreviewProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  const previewUrl = usePdfUrl(pdfBlob);
  const { scale, zoomIn, zoomOut, resetZoom } = usePdfZoom();
  const { pageNumber, previousPage, nextPage, resetPage } =
    usePdfNavigation(numPages);

  useEffect(() => {
    if (previewUrl) {
      setLoading(false);
    }
  }, [previewUrl]);

  const handleDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    resetPage();
    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 items-center max-w-fit max-h-fit">
      {loading && (
        <div className="w-full flex justify-center items-center p-8">
          <Loader />
        </div>
      )}

      <div className="bg-card rounded-lg overflow-hidden border border-border shadow-md max-w-fit">
        <PdfHeader filename={filename} onDownload={onDownload} />

        <PdfViewer
          url={previewUrl}
          pageNumber={pageNumber}
          scale={scale}
          onLoadSuccess={handleDocumentLoadSuccess}
        />

        <PdfControls
          pageNumber={pageNumber}
          numPages={numPages}
          scale={scale}
          previousPage={previousPage}
          nextPage={nextPage}
          zoomIn={zoomIn}
          zoomOut={zoomOut}
          resetZoom={resetZoom}
        />
      </div>
    </div>
  );
};

export default PdfPreview;
