"use client";

import { useState } from "react";

const usePdfNavigation = (totalPages: number) => {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.max(1, Math.min(totalPages, newPageNumber));
    });
  };

  const previousPage = () => changePage(-1);
  const nextPage = () => changePage(1);
  const resetPage = () => setPageNumber(1);

  return {
    pageNumber,
    previousPage,
    nextPage,
    resetPage,
  };
};

export default usePdfNavigation;
