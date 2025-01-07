import { promises } from "fs";

const { writeFile } = promises;

/**
 * Save buffer as local file.
 */
export const bufferToFile = async (data: Buffer, name: string): Promise<void> => {
  try {
    await writeFile(name, data);
  } catch (error) {
    throw new Error(`Saving buffer as file: \n ${error}`);
  }
};
