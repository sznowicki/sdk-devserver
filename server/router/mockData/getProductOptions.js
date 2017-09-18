/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const productId = input.productId

  if (typeof productId === 'undefined') {
    return cb(new Error('productId missing'))
  }

  const options = [
    {
      id: 'o1',
      type: 'select',
      label: 'Farbe',
      required: true,
      annotation: 'wählen',
      values: [
        {id: 'v1', unitPriceModifier: 3.22, label: 'Gelb'},
        {id: 'v2', unitPriceModifier: -2.33, label: 'Rot'}
      ]
    }, {
      id: 'o2',
      type: 'text',
      label: 'Aufdruck',
      required: true,
      unitPriceModifier: 1.99
    }
  ]

  cb(null, { options })
}
