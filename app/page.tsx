import PdfApp from '@/app/components/pdf/components/PdfApp';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home | PDF Generator',
  description: 'Generate PDF from URL.',
};

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center p-3 sm:p-6 py-8 sm:py-12 my-50">
      <div className="w-full max-w-[calc(100%-32px)] sm:max-w-lg mx-auto rounded-xl border border-border/50 bg-card/60 shadow-xl backdrop-blur-md p-4 sm:p-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />

        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-2 sm:mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            PDF Generator
          </h1>
          <p className="text-sm sm:text-base text-center text-muted-foreground mb-6 sm:mb-8">
            Enter a URL below to generate a PDF of the webpage
          </p>

          <PdfApp />
        </div>
      </div>
    </div>
  );
}
