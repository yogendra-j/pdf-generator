import { useMutation } from "@tanstack/react-query";
import { downloadPdf, generatePdfFromUrl } from "../services/pdfService";

interface UsePdfGenerationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const usePdfGeneration = (options?: UsePdfGenerationOptions) => {
  const mutation = useMutation({
    mutationFn: async (url: string) => {
      const pdfBlob = await generatePdfFromUrl(url);
      downloadPdf(pdfBlob);
      return pdfBlob;
    },
    onSuccess: options?.onSuccess,
    onError: options?.onError,
  });

  return {
    generatePdf: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
  };
};
