"use client";

import { ArrowLeft, ArrowRight, Download, ZoomIn, ZoomOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

// Set up the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

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
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [scale, setScale] = useState<number>(0.5);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPreviewUrl(url);
      setLoading(false);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setPageNumber(1);
    setLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(numPages, newPageNumber));
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);

  const zoomIn = () => setScale((prevScale) => Math.min(prevScale + 0.2, 2.5));
  const zoomOut = () => setScale((prevScale) => Math.max(prevScale - 0.2, 0.5));
  const resetZoom = () => setScale(1.0);

  return (
    <div className="flex flex-col gap-4 items-center max-w-fit max-h-fit">
      {loading && (
        <div className="w-full flex justify-center items-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      )}

      <div className="bg-white rounded-lg overflow-hidden border border-gray-200 shadow-md max-w-fit">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-gray-700 font-medium">{filename}</div>

          <button
            onClick={onDownload}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <Download size={18} />
            Download
          </button>
        </div>

        <div className="overflow-auto flex justify-center p-4 bg-gray-100 min-h-[500px]">
          <Document
            file={previewUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex justify-center items-center h-full w-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              </div>
            }
            error={
              <div className="text-red-500 p-4 text-center">
                Failed to load PDF. Please try again.
              </div>
            }
          >
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer
              renderAnnotationLayer
              className="shadow-lg"
            />
          </Document>
        </div>

        <div className="p-4 border-t border-gray-200 flex items-center justify-between bg-gray-50">
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
        </div>
      </div>
    </div>
  );
};

export default PdfPreview;
