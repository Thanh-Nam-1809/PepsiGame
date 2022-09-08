const productService = require("./service");
const date = require("../../utils/date");

exports.getProducts = async () => {
  try {
    let products = await productService.getProducts();
    products = products.map((item, index) => {
      item = {
        released: date.format(item.released),
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,

        index: index + 1,
      };
      return item;
    });

    return products;
  } catch (error) {
    return [];
  }
};

exports.getProductById = async (id) => {
  try {
    let product = await productService.getProductById(id);
    product = {
      released: date.format(product.released),
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity,
      image: product.image,
    };
    return product;
  } catch (error) {
    return {};
  }
};

exports.insert = async (product) => {
  await productService.insert(product);
};

exports.update = async (id, products) => {
  try {
    await productService.update(id, products);
  } catch (error) {
    return null;
  }
};

exports.delete = async (id) => {
  try {
    await productService.delete(id);
  } catch (error) {
    return null;
  }
};
