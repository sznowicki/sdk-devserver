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

  const products = [{
    id: 'SG10',
    identifiers: {sku: 'SG10', mpn: 'MPPP'},
    manufacturer: 'Sony',
    name: 'Something',
    stock: {
      info: 'info',
      available: true,
      orderable: true,
      quantity: 10,
      maxOrderQuantity: 10,
      minOrderQuantity: 2,
      ignoreQuantity: false
    },
    rating: {count: 10, average: 0.44, reviewCount: 8},
    featuredImageUrl: 'http://placekitten.com/220/333',
    price: {
      tiers: [{from: 10, to: 20, unitPrice: 3.99}, {from: 21, unitPrice: 2.99}],
      info: '12,40€/kg',
      unitPrice: 4.99,
      unitPriceStriked: 5.99,
      unitPriceMin: 2.99,
      msrp: 6.99
    },
    shipping: {
      price: 4.99,
      currency: 'EUR',
    },
    flags: {hasChildren: true, hasVariants: false, hasOptions: false}
  }, {
    id: 'SG11',
    identifiers: {sku: 'SG11', mpn: 'MPPP1'},
    manufacturer: 'Sony',
    name: 'Something Other',
    stock: {
      info: 'info',
      available: true,
      orderable: true,
      quantity: 0,
      maxOrderQuantity: 10,
      minOrderQuantity: 2,
      ignoreQuantity: true
    },
    rating: {count: 10, average: 0.44, reviewCount: 8},
    featuredImageUrl: 'http://placekitten.com/220/333',
    price: {
      tiers: [],
      unitPrice: 4.99,
      currency: 'EUR',
    },
    shipping: {
      price: 0,
      currency: 'EUR',
    },
    flags: {hasChildren: false, hasVariants: true, hasOptions: true}
  }]

  cb(null, { products })
}
