const { existsSync, statSync } = require('fs');
const { join, resolve } = require('path');

// Checks if file from source stream is newer than than destination version.
const newer = (sourceFile, options) => {
  const generated = options.generated || false;
  const srcFilePath = resolve(
    `${generated ? 'assets/img-gen' : 'assets/img'}`,
    sourceFile.relative
  );
  const destFile = sourceFile.relative.replace(/.(jpg|jpeg|png)/g, p1 => {
    if (typeof options.extension !== 'undefined') {
      return `.${options.extension}`;
    } else if (typeof options.modifier !== 'undefined') {
      return `${options.modifier}${p1}`;
    }
    return `${p1}`;
  });
  const destFilePath = join('assets/img-gen', destFile);
  const destExists = existsSync(destFilePath);

  return destExists
    ? statSync(srcFilePath).mtime > statSync(destFilePath).mtime
    : true;
};

exports.newer = newer;
