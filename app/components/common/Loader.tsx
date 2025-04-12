import { Loader2 } from 'lucide-react';

const Loader = () => (
  <div className="flex justify-center items-center h-full w-full">
    <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
  </div>
);

export default Loader;
