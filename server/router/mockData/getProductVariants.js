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

  const variants = [{
    productId: '1013',
    products: [{
      id: '1013-1014',
      hasOptions: false,
      characteristics: {
        1: '1',
        2: '1',
      },
    }, {
      id: '1013-1015',
      hasOptions: false,
      characteristics: {
        1: '1',
        2: '2',
      },
    }, {
      id: '1013-1016',
      hasOptions: false,
      characteristics: {
        1: '1',
        2: '3',
      },
    }, {
      id: '1013-1017',
      hasOptions: false,
      characteristics: {
        1: '2',
        2: '1',
      },
    }, {
      id: '1013-1018',
      hasOptions: false,
      characteristics: {
        1: '2',
        2: '2',
      },
    }, {
      id: '1013-1019',
      hasOptions: false,
      characteristics: {
        1: '2',
        2: '3',
      },
    }],
    characteristics: [{
      id: '1',
      label: 'Color',
      values: [{
        id: '1',
        label: 'Black',
      }, {
        id: '2',
        label: 'Blue',
      }],
    }, {
      id: '2',
      label: 'Size',
      values: [{
        id: '1',
        label: '0',
      }, {
        id: '2',
        label: '11',
      }, {
        id: '3',
        label: '7',
      }],
    }],
  }];

  let error = null;
  let response = null;

  const searchResult = variants.find(variant => variant.productId === productId);

  if (searchResult) {
    const { products, characteristics } = searchResult;
    response = { products, characteristics };
  } else {
    error = {
      code: 'EUNKNOWN',
      message: 'error from bigApi 404',
    };
  }

  cb(error, response)
};
