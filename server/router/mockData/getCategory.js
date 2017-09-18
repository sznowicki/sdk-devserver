/**
 * @param {Object} context
 * @param {Object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const categoryId = input.categoryId
  const includeChildren = input.includeChildren || false

  if (typeof categoryId === 'undefined') {
    return cb(new Error('categoryId missing'))
  }

  const category = {
    id: 'cat41',
    name: 'Kategorie 41',
    productCount: 5,
    imageUrl: 'http://placekitten.com/200/300',
    parent: {
      id: 'cat40',
      name: 'Kategorie 40'
    }
  }

  if (includeChildren && categoryId !== 'cat44') {
    category.children = [{
      id: 'cat42',
      name: 'Kategorie 42',
      productCount: 5,
      imageUrl: 'http://placekitten.com/300/200'
    }, {
      id: 'cat43',
      name: 'Kategorie 43',
      productCount: 5,
      imageUrl: 'http://placekitten.com/310/210'
    }]
  }

  cb(null, category)
}
