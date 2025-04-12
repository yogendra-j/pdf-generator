'use client';

import { Button } from '@/components/ui/button';
import { FileType, Github } from 'lucide-react';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-card/80 backdrop-blur-md">
      <div className="flex h-14 items-center justify-between px-8">
        <div className="flex items-center space-x-2 mr-4">
          <FileType className="h-6 w-6 text-primary" />
          <span className="hidden font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent md:inline-block">
            PDF Generator
          </span>
        </div>

        <nav>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-xs sm:text-sm h-8 sm:h-9 border-primary/20 bg-primary/5 hover:bg-primary/10"
          >
            <Link
              href="https://github.com/yogendra-j/pdf-generator"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4 sm:h-5 sm:w-5 mr-1 sm:mr-2 text-primary" />
              <span>GitHub</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
