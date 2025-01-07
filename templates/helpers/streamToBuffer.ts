import { Readable } from "stream";

/**
 * Create buffer from readable stream.
 */
export const streamToBuffer = async (stream: Readable): Promise<Buffer> => {
  const chunks = [];

  for await (const chunk of stream) {
    chunks.push(chunk);
  }

  return Buffer.concat(chunks);
};
