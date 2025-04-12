'use client';

import PdfControls from '@/app/components/pdf/components/PdfControls';
import PdfHeader from '@/app/components/pdf/components/PdfHeader';
import PdfViewer from '@/app/components/pdf/components/PdfViewer';
import usePdfNavigation from '@/app/components/pdf/hooks/usePdfNavigation';
import usePdfUrl from '@/app/components/pdf/hooks/usePdfUrl';
import usePdfZoom from '@/app/components/pdf/hooks/usePdfZoom';
import '@/app/components/pdf/pdfjs-config';
import { Loader } from 'lucide-react';
import { useEffect, useState } from 'react';

interface PdfPreviewProps {
  pdfBlob: Blob;
  onDownload: () => void;
  filename?: string;
}

const PdfPreview = ({
  pdfBlob,
  onDownload,
  filename = 'document.pdf',
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
    <div className="flex flex-col items-center w-full h-full max-h-[inherit]">
      {loading && (
        <div className="w-full flex justify-center items-center p-4 sm:p-8 flex-1">
          <Loader className="animate-spin" size={24} />
        </div>
      )}

      {!loading && previewUrl && (
        <div className="flex flex-col bg-card w-full h-full max-h-[inherit] overflow-hidden">
          <PdfHeader filename={filename} onDownload={onDownload} />

          <div className="flex-1 overflow-auto">
            <PdfViewer
              url={previewUrl}
              pageNumber={pageNumber}
              scale={scale}
              onLoadSuccess={handleDocumentLoadSuccess}
            />
          </div>

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
      )}
    </div>
  );
};

export default PdfPreview;
