/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const categories = [{
    id: 'cat42',
    name: 'Kategorie 42',
    productCount: 5,
    imageUrl: 'http://placekitten.com/g/200/200'
  }, {
    id: 'cat43',
    name: 'Kategorie 43',
    productCount: 5,
    imageUrl: 'http://placekitten.com/g/200/200'
  }, {
    id: 'cat44',
    name: 'Kategorie 44',
    productCount: 5,
    imageUrl: 'http://placekitten.com/g/200/200'
  }]

  cb(null, { categories })
}
