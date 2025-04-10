import { Readable } from "stream";

export const webToNodeStream = (
  webStream: ReadableStream<Uint8Array>
): Readable => {
  const nodeStream = new Readable({
    read() {},
  });

  const reader = webStream.getReader();

  const processStream = async () => {
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          nodeStream.push(null);
          break;
        }
        nodeStream.push(value);
      }
    } catch (error) {
      nodeStream.destroy(
        error instanceof Error ? error : new Error(String(error))
      );
    }
  };

  processStream();
  return nodeStream;
};
