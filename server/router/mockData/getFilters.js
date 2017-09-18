/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const categoryId = input.categoryId
  const searchPhrase = input.searchPhrase
  // const filters = input.filters || []

  if (typeof categoryId === 'undefined' && typeof searchPhrase === 'undefined') {
    return cb(new Error('categoryId or searchPhrase missing'))
  }
  if (typeof categoryId !== 'undefined' && typeof searchPhrase !== 'undefined') {
    return cb(new Error('only categoryId or searchPhrase is supported'))
  }

  const filters = [{
    id: 'filter23',
    label: 'Preisbereich',
    type: 'range',
    minimum: 42,
    maximum: 876
  }, {
    id: 'filter24',
    label: 'Marke',
    type: 'multiselect',
    values: [{id: 'v1', label: 'Sony'}, {id: 'v2', label: 'Panasonic'}]
  }]

  cb(null, { filters })
}
