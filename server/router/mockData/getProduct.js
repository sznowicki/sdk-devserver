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

  const products = [{
    id: 'SG10',
    identifiers: {
      sku: 'SG10',
      mpn: 'MPPP',
    },
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
    rating: {
      count: 10,
      average: 0.44,
      reviewCount: 8,
    },
    featuredImageUrl: 'http://lorempixel.com/1024/1024/cats/1/',
    price: {
      tiers: [{from: 10, to: 20, unitPrice: 3.99}, {from: 21, unitPrice: 2.99}],
      info: '12,40€/kg',
      unitPrice: 4.99,
      unitPriceStriked: 5.99,
      unitPriceMin: 2.99,
      msrp: 6.99,
      currency: 'EUR',
    },
    flags: {
      hasChildren: true,
      hasVariants: false,
      hasOptions: false,
    }
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
    shipping: {
      currency: 'EUR',
      amount: 0,
    },
  }, {
    id: '1013-1014',
    name: 'Product with child 5 Mother 2 Attributes-Black-0',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1014\',\'item_type\':\'simple\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454-Black-0'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: false,
      quantity: 20,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0
    },
    flags: {
      hasChildren: false,
      hasVariants: false,
      hasOptions: false
    },
    featuredImageUrl: 'https://img-cdn.shopgate.com/30289/1/1650481042da1502577c69ef9db95d91c390f1b7a293d85e53b24e50bdd651f6',
    price: {
      currency: 'EUR',
      info: '',
      unitPrice: 9999,
      unitPriceStriked: 100000,
      unitPriceMin: 0,
      msrp: 0,
      tiers: [],
      unitPriceMax: 1000
    },
    shipping: {
      currency: 'EUR',
      amount: 0
    }
  }, {
    id: '1013-1015',
    name: 'Product with child 5 Mother 2 Attributes-Black-11',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1015\',\'item_type\':\'simple\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454-Black-11'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: false,
      quantity: 20,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0
    },
    flags: {
      hasChildren: false,
      hasVariants: false,
      hasOptions: false
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
      unitPriceMax: 1000
    },
    shipping: {
      currency: 'EUR',
      amount: 0
    }
  }, {
    id: '1013-1016',
    name: 'Product with child 5 Mother 2 Attributes-Black-7',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1016\',\'item_type\':\'simple\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454-Black-7'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: false,
      quantity: 20,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0
    },
    flags: {
      hasChildren: false,
      hasVariants: false,
      hasOptions: false
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
      unitPriceMax: 1000
    },
    shipping: {
      currency: 'EUR',
      amount: 0
    }
  }, {
    id: '1013-1017',
    name: 'Product with child 5 Mother 2 Attributes-Blue-0',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1017\',\'item_type\':\'simple\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454-Blue-0'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: false,
      quantity: 20,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0
    },
    flags: {
      hasChildren: false,
      hasVariants: false,
      hasOptions: false
    },
    featuredImageUrl: null,
    price: {
      currency: 'EUR',
      info: '',
      unitPrice: 32,
      unitPriceStriked: 0,
      unitPriceMin: 0,
      msrp: 0,
      tiers: [],
      unitPriceMax: 1000
    },
    shipping: {
      currency: 'EUR',
      amount: 0
    }
  }, {
    id: '1013-1018',
    name: 'Product with child 5 Mother 2 Attributes-Blue-11',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1018\',\'item_type\':\'simple\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454-Blue-11'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: false,
      quantity: 20,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0
    },
    flags: {
      hasChildren: false,
      hasVariants: false,
      hasOptions: false
    },
    featuredImageUrl: null,
    price: {
      currency: 'EUR',
      info: '',
      unitPrice: 32,
      unitPriceStriked: 0,
      unitPriceMin: 0,
      msrp: 0,
      tiers: [],
      unitPriceMax: 1000
    },
    shipping: {
      currency: 'EUR',
      amount: 0
    }
  }, {
    id: '1013-1019',
    name: 'Product with child 5 Mother 2 Attributes-Blue-7',
    customData: '{\'store_view_id\':\'1\',\'product_id\':\'1019\',\'item_type\':\'simple\',\'exchange_rate\':1}',
    manufacturer: '',
    identifiers: {
      sku: '0113565654487845454-Blue-7'
    },
    ageRating: 0,
    stock: {
      ignoreQuantity: false,
      quantity: 20,
      available: true,
      info: 'In stock',
      orderable: true,
      minOrderQuantity: 1,
      maxOrderQuantity: 10000
    },
    rating: {
      count: 0,
      average: 0,
      reviewCount: 0
    },
    flags: {
      hasChildren: false,
      hasVariants: false,
      hasOptions: false
    },
    featuredImageUrl: null,
    price: {
      currency: 'EUR',
      info: '',
      unitPrice: 32,
      unitPriceStriked: 0,
      unitPriceMin: 0,
      msrp: 0,
      tiers: [],
      unitPriceMax: 1000
    },
    shipping: {
      currency: 'EUR',
      amount: 0
    }
  }];

  let product = products.find(product => product.id === productId);

  if (!product) {
    // Return the first product as default, if no match was found
    product = products[0];
  }

  cb(null, product)
};
