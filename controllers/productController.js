const Product = require('../models/Product');

exports.getAllProducts = (req, res) => {
  Product.getAll()
    .then(results => res.status(200).send(results))
    .catch(err => res.status(500).send(err));
};

exports.getProductById = (req, res) => {
  const id = req.params.id;
  Product.getById(id)
    .then(result => {
      if (!result) return res.status(404).send('Product not found');
      res.status(200).send(result);
    })
    .catch(err => res.status(500).send(err));
};

exports.createProduct = (req, res) => {
  const { name, description, price, category } = req.body;
  const newProduct = { name, description, price, category };

  Product.create(newProduct)
    .then(() => res.status(201).send('Product created successfully'))
    .catch(err => res.status(500).send(err));
};

exports.updateProduct = (req, res) => {
  const id = req.params.id;
  const { name, description, price, category } = req.body;
  const updatedProduct = { name, description, price, category };

  Product.update(id, updatedProduct)
    .then(() => res.status(200).send('Product updated successfully'))
    .catch(err => res.status(500).send(err));
};

exports.deleteProduct = (req, res) => {
  const id = req.params.id;

  Product.delete(id)
    .then(() => res.status(200).send('Product deleted successfully'))
    .catch(err => res.status(500).send(err));
};
