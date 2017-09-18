/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const productId = input.productId
  const offset = input.offset || 0
  const limit = input.limit || 20

  if (typeof productId === 'undefined') {
    return cb(new Error('productId missing'))
  }
  if (offset < 0) {
    return cb(new Error('offset has to be greater or equal 0'))
  }
  if (limit < 1 || limit > 100) {
    return cb(new Error('limit has to be between 1 and 100'))
  }

  const reviews = [
    {id: 'r10', author: 'Max Muster', date: '2017-01-16T13:33:22Z', score: 0.3, title: 'title', text: 'Text'},
    {id: 'r11', author: 'Miriam Muster', date: '2017-01-17T14:44:44Z', score: 0.2, title: 'title2', text: 'Text2'},
    {id: 'r12', author: 'Max Miriam', date: '2017-01-18T16:35:55Z', score: 0.8, title: 'title3', text: 'Text3'}
  ]

  cb(null, { reviews })
}
