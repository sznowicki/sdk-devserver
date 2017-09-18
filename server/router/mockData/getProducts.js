/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const categoryId = input.categoryId
  const searchPhrase = input.searchPhrase
  const filters = input.filters || []
  const offset = input.offset || 0
  const limit = input.limit || 20
  const sort = input.sort

  if (typeof categoryId === 'undefined' && typeof searchPhrase === 'undefined') {
    return cb(new Error('categoryId or searchPhrase missing'))
  }
  if (typeof categoryId !== 'undefined' && typeof searchPhrase !== 'undefined') {
    return cb(new Error('only categoryId or searchPhrase is supported'))
  }
  if (offset < 0) {
    return cb(new Error('offset has to be greater or equal 0'))
  }
  if (limit < 1 || limit > 100) {
    return cb(new Error('limit has to be between 1 and 100'))
  }

  const products = [{
    id: 'SG10',
    identifiers: {sku: 'SG10', mpn: 'MPPP'},
    manufacturer: 'Sony',
    name: 'My fany Product',
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
    featuredImageUrl: 'https://img-cdn.shopgate.com/10006/16/07d7ac7daf24f744ac19e76e4fd67cbe8bf7fe6080bd0175617e5555d82339f6',
    price: {
      tiers: [{from: 10, to: 20, unitPrice: 3.99}, {from: 21, unitPrice: 2.99}],
      info: '12,40€/kg',
      unitPrice: 4.99,
      unitPriceStriked: 5.99,
      unitPriceMin: 2.99,
      msrp: 6.99,
      currency: 'USD',
    },
    flags: {hasChildren: false, hasVariants: false, hasOptions: false}
  }, {
    id: 'SG11',
    identifiers: {sku: 'SG11', mpn: 'MPPP1'},
    manufacturer: 'Sony',
    name: 'Product very long name with some really cool text that will be cut off after a few lines',
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
    featuredImageUrl: 'https://img-cdn.shopgate.com/23538/1/c624a7f59fc8a72b498ecfd6e94e91860655ce0ed4606fdddeb6454d5362aa2a',
    price: {
      tiers: [],
      info: '45,00 EUR pro Stück',
      unitPrice: 1254.99,
      unitPriceMin: 0,
      currency: 'PLN'
    },
    flags: {hasChildren: false, hasVariants: false, hasOptions: false}
  }, {
    id: 'SG12',
    identifiers: {sku: 'SG10', mpn: 'MPPP'},
    manufacturer: 'Sony',
    name: 'A really nice product, hu?',
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
    featuredImageUrl: 'https://img-cdn.shopgate.com/23538/1/ef25db84d72198b5bb9df97b695dca1cf031b5a1c3ec552a0d34407b8b657bc1',
    price: {
      tiers: [{from: 10, to: 20, unitPrice: 3.99}, {from: 21, unitPrice: 2.99}],
      info: '12,40€/kg',
      unitPrice: 4.99,
      unitPriceStriked: 5.99,
      unitPriceMin: 0,
      msrp: 6.99,
      currency: 'EUR',
    },
    flags: {hasChildren: false, hasVariants: false, hasOptions: false}
  }, {
    id: 'SG13',
    identifiers: {sku: 'SG11', mpn: 'MPPP1'},
    manufacturer: 'Sony',
    name: 'Something Other Product',
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
    featuredImageUrl: 'https://img-cdn.shopgate.com/23538/1/1d0816014cfb3cdd0653e28abd71f0d2b7a6826405db2467be53ac97394a547a',
    price: {tiers: [], unitPrice: 4.99, unitPriceMin: 4.99, currency: 'EUR'},
    flags: {hasChildren: false, hasVariants: false, hasOptions: false}
  }, {
    id: 'SG14',
    identifiers: {sku: 'SG11', mpn: 'MPPP1'},
    manufacturer: 'Sony',
    name: 'Test Product',
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
    featuredImageUrl: 'https://img-cdn.shopgate.com/23538/1/30a2e72f8886b59b39118760edf974c13f443eaa523c9713742238eb06c69bb6',
    price: {tiers: [], unitPrice: 1234.99, unitPriceMin: 0, currency: 'USD'},
    flags: {hasChildren: false, hasVariants: false, hasOptions: false}
  }, {
    id: '1013',
    name: 'Product with child 5 Mother 2 Attributes',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1013\',\'item_type\':\'configurable\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: true,
      quantity: 0,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000,
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0,
    },
    flags: {
      hasChildren: false,
      hasVariants: true,
      hasOptions: false,
    },
    featuredImageUrl: 'https://img-cdn.shopgate.com/30289/1/1650481042da1502577c69ef9db95d91c390f1b7a293d85e53b24e50bdd651f6',
    price: {
      currency: 'EUR',
      info: '',
      unitPrice: 32,
      unitPriceStriked: 0,
      unitPriceMin: 0,
      msrp: 0,
      tiers: [],
      unitPriceMax: 1000,
    },
  }];

  cb(null, {
    totalProductCount: products.length,
    products: products.slice(offset, offset + limit),
  })
}
