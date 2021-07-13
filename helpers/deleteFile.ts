import { promises } from "fs";

const { unlink } = promises;

/**
 * Delete list of files.
 * @function
 *
 * @param   files           array of file paths to delete
 * @returns {Promise<void>}
 */
export const deleteFiles = async (files: string[]): Promise<void> => {
  const delCmds = files.map((fl) => unlink(fl));

  await Promise.all(delCmds);
};
