'use client';

import { useState } from 'react';

const usePdfZoom = (initialScale = 0.5) => {
  const [scale, setScale] = useState<number>(initialScale);

  const zoomIn = () => setScale(prevScale => Math.min(prevScale + 0.2, 2.5));
  const zoomOut = () => setScale(prevScale => Math.max(prevScale - 0.2, 0.5));
  const resetZoom = () => setScale(1.0);

  return {
    scale,
    zoomIn,
    zoomOut,
    resetZoom,
  };
};

export default usePdfZoom;
