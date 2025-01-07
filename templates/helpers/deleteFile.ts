import { promises } from "fs";

const { unlink } = promises;

/**
 * Delete list of files.
 */
export const deleteFiles = async (files: string[]): Promise<void> => {
  const delCmds = files.map((fl) => unlink(fl));

  await Promise.all(delCmds);
};
