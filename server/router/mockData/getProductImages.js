/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const productId = input.productId;

  if (typeof productId === 'undefined') {
    return cb(new Error('productId missing'))
  }

  const images = [
    'http://lorempixel.com/1024/1024/cats/1/',
    'http://lorempixel.com/1024/1024/cats/4/',
    'http://lorempixel.com/1024/1024/cats/5/',
  ];

  cb(null, { images })
};
