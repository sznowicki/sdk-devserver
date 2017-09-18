/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const categoryId = input.categoryId

  if (typeof categoryId === 'undefined') {
    return cb(new Error('categoryId missing'))
  }

  if (categoryId === 'cat44') {
    cb(null, { categories: [] });
    return;
  }

  const categories = [{
    id: 'cat42',
    name: 'Kategorie 42',
    productCount: 5,
    imageUrl: 'http://placekitten.com/300/200'
  }, {
    id: 'cat43',
    name: 'Kategorie 43',
    productCount: 5,
    imageUrl: 'http://placekitten.com/310/210'
  }, {
    id: 'cat44',
    name: 'Kategorie 44',
    productCount: 5,
    imageUrl: 'http://placekitten.com/320/220'
  }]

  cb(null, { categories })
}
