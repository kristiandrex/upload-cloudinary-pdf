/**
 * Transforms a file into a data URI.
 * @param {Buffer} buffer The file buffer.
 * @param {string} mimeType The file mime type.
 * @returns {string} Data URL
 */

export function bufferToDataURL(buffer, mimeType) {
  return `data:${mimeType};base64,${buffer.toString('base64')}`;
}

/**
 * Change filename extension to .png
 * @param {string} filename
 * @returns {string}
 */
export function replaceFileExtension(filename) {
  return filename.replace('.pdf', '.png');
}

export default {
  bufferToDataURL,
  replaceFileExtension
};
