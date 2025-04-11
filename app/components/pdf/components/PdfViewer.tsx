"use client";

import { Document, Page } from "react-pdf";
import Loader from "./Loader";

interface PdfViewerProps {
  url: string;
  pageNumber: number;
  scale: number;
  onLoadSuccess: (data: { numPages: number }) => void;
}

const PdfViewer = ({
  url,
  pageNumber,
  scale,
  onLoadSuccess,
}: PdfViewerProps) => (
  <div className="overflow-auto flex justify-center p-4 bg-background min-h-[500px]">
    <Document
      file={url}
      onLoadSuccess={onLoadSuccess}
      loading={<Loader />}
      error={
        <div className="text-destructive p-4 text-center">
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
);

export default PdfViewer;
