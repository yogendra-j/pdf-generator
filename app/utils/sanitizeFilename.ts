export const sanitizeFilename = (filename: string): string => {
  return (
    filename
      .replace(/[^\w\s.-]/g, '')
      .replace(/\s+/g, '_')
      .substring(0, 100) || 'download'
  );
};
