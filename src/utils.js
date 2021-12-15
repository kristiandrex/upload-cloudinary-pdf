/**
 * Transforms a file into a data URI.
 * @param {Express.Multer.File} file
 * @returns {string} Data URI
 */

function fileToDataURI(file) {
  return `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
}

/**
 * Change filename extension to .png
 * @param {string} filename
 * @returns {string}
 */
function changeExtToPng(filename) {
  return filename.slice(0, -3).concat('png');
}

module.exports = {
  fileToDataURI,
  changeExtToPng
};
