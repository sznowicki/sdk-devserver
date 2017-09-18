/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const productId = input.productId;

  if (typeof productId === 'undefined') {
    return cb(new Error('productId missing'));
  }

  const properties = [
    { label: 'RAM', value: '16 GB' },
    { label: 'VeryLongLongLongLongLongProperty', value: 'So long such ellipsis much wow' },
    { label: 'Foo', value: 'Bar' },
    { label: 'Cats', value: 'Enough' },
  ];

  cb(null, { properties });
}
