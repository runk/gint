'use strict';

const fs = require('fs');
const path = require('path');
const stripComments = require('strip-json-comments');

const CONFIG_FILES = [
  '.gintrc.js',
  '.gintrc.json',
  '.gintrc',
  'package.json'
];


/**
 * Convenience wrapper for synchronously reading file contents.
 * @param {string} filePath The filename to read.
 * @returns {string} The file contents, with the BOM removed.
 * @private
 */
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8').replace(/^\ufeff/, '');
}


/**
 * Loads a JSON configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadJSONConfigFile(filePath) {
  try {
    const config = JSON.parse(stripComments(readFile(filePath)));
    return (path.basename(filePath) === 'package.json') ? config.gintConfig : config;
  } catch (e) {
    e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
    throw e;
  }
}


/**
 * Loads a JavaScript configuration from a file.
 * @param {string} filePath The filename to load.
 * @returns {Object} The configuration object from the file.
 * @throws {Error} If the file cannot be read.
 * @private
 */
function loadJSConfigFile(filePath) {
  try {
    return require(filePath);
  } catch (e) {
    e.message = `Cannot read config file: ${filePath}\nError: ${e.message}`;
    throw e;
  }
}


/**
   * Retrieves the configuration filename for a given directory. It loops over all
   * of the valid configuration filenames in order to find the first one that exists.
   * @param {string} directory The directory to check for a config file.
   * @returns {?string} The filename of the configuration file for the directory
   *      or null if there is no configuration file in the directory.
   */
function getFilenameForDirectory(directory) {
  for (let i = 0; i < CONFIG_FILES.length; i++) {
    const filename = path.join(directory, CONFIG_FILES[i]);

    if (fs.existsSync(filename) && fs.statSync(filename).isFile()) {
      return filename;
    }
  }

  return null;
}


/**
 * Loads a configuration file regardless of the source. Inspects the file path
 * to determine the correctly way to load the config file.
 * @param {Object} file The path to the configuration.
 * @returns {Object} The configuration information.
 * @private
 */
module.exports = function(dir) {
  const filePath = getFilenameForDirectory(dir);

  switch (path.extname(filePath)) {
    case '.js':
      return loadJSConfigFile(filePath);
    case '.json':
      return loadJSONConfigFile(filePath);
    default:
      return loadJSONConfigFile(filePath);
  }
};
