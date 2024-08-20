const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addToCart(productId, price) {
    fs.readFile(p, (err, fileContent) => {
      let cart = { products: [], totalPrice: 0 };

      if (!err) {
        cart = JSON.parse(fileContent);
      }

      let existingProductIndex = cart.products.findIndex(
        (c) => c.productId === productId
      );
      let existingProduct = cart.products[existingProductIndex];

      if (existingProduct) {
        existingProduct = { ...existingProduct, qty: existingProduct.qty + 1 };
        cart.products[existingProductIndex] = existingProduct;
      } else {
        const newProduct = { productId, qty: 1 };
        cart.products = [...cart.products, newProduct];
      }
      cart.totalPrice = cart.totalPrice + +price;
      fs.writeFile(p, JSON.stringify(cart), (err) => {
        if (err) {
          console.log(err);
        }
      });
    });
  }
};
