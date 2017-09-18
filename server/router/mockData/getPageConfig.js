/**
 * @param {object} context
 * @param {object} input - Properties depend on the pipeline this is used for
 * @param {Function} cb
 */
module.exports = function (context, input, cb) {
  const widgets = {
    index: {
      "title": "My awesome page",
    	"widgets": [
        {
          "type": "core-widgets/liveshopping",
          "settings": {
            "title": "Deal of the day",
          },
        },
        {
          "type": "core-widgets/html",
          "settings": {
            html: `
              &lt;script src="https://code.jquery.com/jquery-2.2.4.min.js"&gt;&lt;/script&gt;

              &lt;script&gt;
                console.warn($);
              &lt;/script&gt;

              &lt;style&gt;
                h1 {
                  color: blue;
                  font-size: 12px;
                }

                .image {
                  width: 100px;
                }
              &lt;/style&gt;

              &lt;h1&gt;Best Headline Ever :-P&lt;/h1&gt;

              &lt;script&gt;
                window.setTimeout(() =&gt; {
                  console.warn('World!');
                }, 5000);
              &lt;/script&gt;
            `,
          }
        },
    		{
    			"type": "core-widgets/widget-grid",
    			"settings": {
    				"widgets": [
    					{
    						"col": 0,
    						"row": 0,
    						"width": 12,
    						"height": 5,
    						"settings": {
    							"id": "84961",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/aedc545959f55e3f73851eca0ed40a75.min.jpeg",
    							"link": "/category/"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 0,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83535",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/92204c0f264ac30d6836994c2fb64eb1.min.jpeg",
    							"link": "/item/31303730"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 3,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83537",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/f53558bbc14ad6c75e9f97530661cf0a.min.jpeg",
    							"link": "/category/3733"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 6,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83534",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/e7959dc1f2cfef5613cdb2367c02f369.min.jpeg",
    							"link": "/item/31303637"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 9,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83555",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/54cc40669a57614b004e41ca6a95e629.min.png",
    							"link": "http://www.cat.com/"
    						},
    						"type": "core-widgets/image"
    					}
    				]
    			},
    			"height": 8
    		},
    		{
    			"type": "core-widgets/image_slider",
    			"settings": {
    				"autostart": true,
    				"delay": 2000,
    				"pagination": true,
    				"loop": true,
    				"images": [
    					{
    						"image": "https://data.shopgate.com/shop_widget_images/23836/9091591e5a02bd0cb40b2f45db784c39.min.jpeg",
    						"link": "/item/31303631"
    					},
    					{
    						"image": "https://data.shopgate.com/shop_widget_images/23836/a9896ccd8e951d4c11dd5173cffd8534.min.jpeg",
    						"link": "tel:%2B4915119615747"
    					},
    					{
    						"image": "https://data.shopgate.com/shop_widget_images/23836/348ddf72c7884d45d2694cd2978cc6a2.min.jpeg",
    						"link": "mailto:marcel.lein+materialfashion@shopgate.com?subject=subject&body=content%20foobar"
    					}
    				]
    			},
          "height": 3
        },
        {
          "type": "core-widgets/html",
          "settings": {
            html: `
              &lt;img class="image" src="http://placekitten.com.s3.amazonaws.com/homepage-samples/408/287.jpg" /&gt;

              &lt;script&gt;
                console.warn('Just another HTML Widget');
              &lt;/script&gt;

              &lt;style&gt;
                h2 {
                  color: red;
                }

                .image {
                  width: 100px;
                }
              &lt;/style&gt;

              &lt;h2&gt;And some other HTML tag&lt;/h2&gt;
            `,
          }
        },
        {
    			"type": "core-widgets/widget-grid",
    			"settings": {
    				"widgets": [
    					{
    						"col": 0,
    						"row": 0,
    						"width": 12,
    						"height": 5,
    						"settings": {
    							"id": "84961",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/aedc545959f55e3f73851eca0ed40a75.min.jpeg",
    							"link": "/category/"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 0,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83535",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/92204c0f264ac30d6836994c2fb64eb1.min.jpeg",
    							"link": "/item/31303730"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 3,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83537",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/f53558bbc14ad6c75e9f97530661cf0a.min.jpeg",
    							"link": "/category/3733"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 6,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83534",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/e7959dc1f2cfef5613cdb2367c02f369.min.jpeg",
    							"link": "/item/31303637"
    						},
    						"type": "core-widgets/image"
    					},
    					{
    						"col": 9,
    						"row": 5,
    						"width": 3,
    						"height": 3,
    						"settings": {
    							"id": "83555",
    							"alt": "",
    							"image": "https://data.shopgate.com/shop_widget_images/23836/54cc40669a57614b004e41ca6a95e629.min.png",
    							"link": "http://www.cat.com/"
    						},
    						"type": "core-widgets/image"
    					}
    				]
    			},
    			"height": 8
    		},
    	]
    }
  };

  cb(null, widgets[input.pageId]);
};
