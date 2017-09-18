/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const { productId } = input;

  if (typeof productId === 'undefined') {
    return cb(new Error('productId missing'))
  }

  const products = [{
    id: 'SG10',
    shipping: {
      price: 4.99,
      currency: 'EUR',
    },
  }, {
    id: 'SG11',
    shipping: {
      price: 2.99,
      currency: 'PLN',
    },
  }, {
    id: 'SG12',
    shipping: {
      price: 8.99,
      currency: 'USD',
    },
  }, {
    id: 'SG13',
    shipping: {
      price: 0,
      currency: 'EUR',
    },
  }, {
    id: 'SG14',
    shipping: {
      price: 0,
      currency: 'USD',
    },
  }];

  let foundProduct = products.find(product => product.id === productId);

  if (!foundProduct) {
    // Fallback shipping costs if no mock data is available
    foundProduct = products[0];
  }

  const { shipping } = foundProduct;

  cb(null, { shipping })
};
