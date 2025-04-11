import { PdfResponse, generatePdfFromUrl } from "@/app/services/pdfService";
import { useMutation } from "@tanstack/react-query";

interface UsePdfGenerationOptions {
  onSuccess?: (response: PdfResponse) => void;
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
    pdfResponse: mutation.data,
  };
};
