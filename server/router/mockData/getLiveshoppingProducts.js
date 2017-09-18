/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const products =
  [
    {
      "id":"983-986",
      "name":"Product with child 3 Mother - 3 Attributes -XL-Black-9",
      "active":true,
      "description":"Product with child 3 Mother - 3 Attributes ",
      "customData":"{\"store_view_id\":\"1\",\"product_id\":\"986\",\"item_type\":\"simple\",\"exchange_rate\":1}",
      "manufacturer":"",
      "identifiers":{
        "sku":"012301231454-XL-Black-9"
      },
      "tags":[

      ],
      "ageRating":0,
      "stock":{
        "ignoreQuantity":false,
        "quantity":20,
        "info":"In stock",
        "orderable":true,
        "minOrderQuantity":1,
        "maxOrderQuantity":10000
      },
      "rating":{
        "count":0,
        "average":0,
        "reviewCount":0
      },
      "flags":{
        "hasChildren":false,
        "hasVariants":false,
        "hasOptions":false
      },
      "characteristicValues":{

      },
      "availability":{
        "text":"In stock",
        "state":"ok"
      },
      "featuredImageUrl":null,
      "price":{
        "currency":"EUR",
        "info":"",
        "unitPrice":120,
        "unitPriceStriked":0,
        "unitPriceMin":0,
        "unitPriceNet":120,
        "unitPriceWithTax":120,
        "taxAmount":0,
        "taxPercent":0,
        "msrp":0,
        "tiers":[

        ],
        "unitPriceMax":1000
      },
      "highlight":false,
      "liveshoppings":[
        {
          "from":"2017-05-03T12:17:00.000Z",
          "to":"2017-06-17T13:45:00.000Z"
        }
      ]
    },
    {
      "id":"940",
      "name":"Product with rating 4",
      "active":true,
      "description":"Product with rating.",
      "customData":"{\"store_view_id\":\"1\",\"product_id\":\"940\",\"item_type\":\"simple\",\"exchange_rate\":1}",
      "manufacturer":"",
      "identifiers":{
        "sku":"991"
      },
      "tags":[

      ],
      "ageRating":0,
      "stock":{
        "ignoreQuantity":true,
        "quantity":0,
        "info":"In stock",
        "orderable":true,
        "minOrderQuantity":1,
        "maxOrderQuantity":10000
      },
      "rating":{
        "count":1,
        "average":1,
        "reviewCount":1
      },
      "flags":{
        "hasChildren":false,
        "hasVariants":false,
        "hasOptions":false
      },
      "availability":{
        "text":"In stock",
        "state":"ok"
      },
      "featuredImageUrl":"https://img-cdn.shopgate.com/30190/1/3646be6c1ce5356cd16b038fa256a940cd3d8867882f16993da9ad83d511586d",
      "price":{
        "currency":"EUR",
        "info":"",
        "unitPrice":1.99,
        "unitPriceStriked":150,
        "unitPriceMin":0,
        "unitPriceNet":1.99,
        "unitPriceWithTax":1.99,
        "taxAmount":0,
        "taxPercent":0,
        "msrp":0,
        "tiers":[

        ],
        "unitPriceMax":1000,
        "discount":99
      },
      "highlight":true,
      "liveshoppings":[
        {
          "from":"2017-05-03T13:53:00.000Z",
          "to":"2017-06-25T19:50:00.000Z"
        }
      ]
    },
    {
      "id":"133",
      "name":"Universal Camera Case",
      "active":false,
      "description":"A stylish digital camera demands stylish protection. This leather carrying case will defend your camera from the dings and scratches of travel and everyday use while looking smart all the time.",
      "customData":"{\"store_view_id\":\"2\",\"product_id\":\"133\",\"item_type\":\"simple\",\"exchange_rate\":1}",
      "manufacturer":"",
      "identifiers":{
        "sku":"ac9003"
      },
      "tags":[

      ],
      "ageRating":0,
      "stock":{
        "ignoreQuantity":false,
        "quantity":398,
        "info":"In stock",
        "orderable":false,
        "minOrderQuantity":1,
        "maxOrderQuantity":10000
      },
      "rating":{
        "count":0,
        "average":0,
        "reviewCount":0
      },
      "flags":{
        "hasChildren":false,
        "hasVariants":false,
        "hasOptions":false
      },
      "availability":{
        "text":"Currently not available",
        "state":"alert"
      },
      "featuredImageUrl":null,
      "price":{
        "currency":"EUR",
        "info":"",
        "unitPrice":1.99,
        "unitPriceStriked":28.57,
        "unitPriceMin":0,
        "unitPriceNet":1.99,
        "unitPriceWithTax":1.99,
        "taxAmount":0,
        "taxPercent":0,
        "msrp":0,
        "tiers":[

        ],
        "unitPriceMax":1000,
        "discount":93
      },
      "highlight":false,
      "liveshoppings":[
        {
          "from":"2017-05-03T13:52:00.000Z",
          "to":"2017-05-26T13:50:00.000Z"
        }
      ]
    },
    {
      "id":"1070",
      "name":"Product with many attribute values",
      "active":true,
      "description":"Product with many attribute values ",
      "customData":"{\"store_view_id\":\"1\",\"product_id\":\"1070\",\"item_type\":\"configurable\",\"exchange_rate\":1}",
      "manufacturer":"",
      "identifiers":{
        "sku":"12354564684354654564"
      },
      "tags":[

      ],
      "ageRating":0,
      "stock":{
        "ignoreQuantity":true,
        "quantity":0,
        "info":"In stock",
        "orderable":true,
        "minOrderQuantity":1,
        "maxOrderQuantity":10000
      },
      "rating":{
        "count":0,
        "average":0,
        "reviewCount":0
      },
      "flags":{
        "hasChildren":false,
        "hasVariants":true,
        "hasOptions":false
      },
      "availability":{
        "text":"In stock",
        "state":"ok"
      },
      "featuredImageUrl":"https://img-cdn.shopgate.com/30190/1/37695265773a52874c66e999b5145c439c6bb3b49b1d766dac0ea39d832258e8",
      "price":{
        "currency":"EUR",
        "info":"",
        "unitPrice":220,
        "unitPriceStriked":0,
        "unitPriceMin":0,
        "unitPriceNet":220,
        "unitPriceWithTax":220,
        "taxAmount":0,
        "taxPercent":0,
        "msrp":0,
        "tiers":[

        ],
        "unitPriceMax":1000
      },
      "highlight":true,
      "liveshoppings":[
        {
          "from":"2017-05-03T13:01:00.000Z",
          "to":"2017-05-27T13:30:00.000Z"
        }
      ]
    }
  ];

  cb(null, { products });
};
