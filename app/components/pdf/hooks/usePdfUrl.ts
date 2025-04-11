"use client";

import { useEffect, useState } from "react";

const usePdfUrl = (pdfBlob: Blob) => {
  const [previewUrl, setPreviewUrl] = useState<string>("");

  useEffect(() => {
    if (pdfBlob) {
      const url = URL.createObjectURL(pdfBlob);
      setPreviewUrl(url);

      return () => {
        URL.revokeObjectURL(url);
      };
    }
  }, [pdfBlob]);

  return previewUrl;
};

export default usePdfUrl;
