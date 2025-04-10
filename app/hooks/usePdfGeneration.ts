import { useMutation } from "@tanstack/react-query";

interface UsePdfGenerationOptions {
  onSuccess?: () => void;
  onError?: (error: Error) => void;
}

export const usePdfGeneration = (options?: UsePdfGenerationOptions) => {
  const mutation = useMutation({
    mutationFn: async (url: string) => {
      console.log("Generating PDF from URL:", url);
      return;
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
