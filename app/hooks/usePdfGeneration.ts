import { useMutation } from "@tanstack/react-query";
import { generatePdfFromUrl } from "../services/pdfService";

interface UsePdfGenerationOptions {
  onSuccess?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export const usePdfGeneration = (options?: UsePdfGenerationOptions) => {
  const mutation = useMutation({
    mutationFn: async (url: string) => {
      return generatePdfFromUrl(url);
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return {
    generatePdf: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
    pdfBlob: mutation.data,
  };
};
