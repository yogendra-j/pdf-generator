'use client';

import { QuirkyLoader } from '@/app/components/common/QuirkyLoader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@radix-ui/react-label';
import { LinkIcon } from 'lucide-react';
import { FormEvent, useState } from 'react';

interface UrlFormProps {
  onSubmit: (url: string) => void;
  isLoading: boolean;
}

const UrlForm = ({ onSubmit, isLoading }: UrlFormProps) => {
  const [url, setUrl] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    try {
      new URL(url);
    } catch {
      setError('Please enter a valid URL');
      return;
    }

    setError(null);
    onSubmit(url);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="mb-5">
        <Label htmlFor="url" className="mb-2 text-foreground/90 font-medium">
          Enter a URL to generate PDF
        </Label>
        <div className="relative mt-2">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground/70">
            <LinkIcon size={18} />
          </div>
          <Input
            id="url"
            type="text"
            placeholder="https://example.com"
            value={url}
            onChange={e => setUrl(e.target.value)}
            className={`pl-10 h-11 ${
              error
                ? 'border-destructive'
                : 'border-input focus:border-primary/50'
            }`}
            disabled={isLoading}
          />
        </div>
        {error && (
          <p className="mt-1.5 text-sm text-destructive flex items-center gap-1.5">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-destructive"></span>
            {error}
          </p>
        )}
      </div>
      {isLoading && <QuirkyLoader />}
      <Button
        type="submit"
        disabled={isLoading}
        className={`w-full h-11 font-medium transition-all duration-300 ${
          isLoading
            ? 'bg-secondary/90 text-primary-foreground ring-1 ring-primary/20 hover:bg-secondary'
            : ''
        }`}
      >
        {isLoading ? <QuirkyLoader.ButtonContent /> : 'Generate PDF'}
      </Button>
    </form>
  );
};

export default UrlForm;
