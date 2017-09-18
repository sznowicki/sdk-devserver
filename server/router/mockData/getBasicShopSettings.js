/**
 * @param {Object} context The context
 * @param {Object} input Properties depend on the pipeline this is used for
 * @param {Function} cb Callback
 */
module.exports = function (context, input, cb) {
  const settings = {
    languageId: 'de-de',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg',
  };

  cb(null, settings);
};
