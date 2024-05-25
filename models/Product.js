const { getDb } = require('../config/db');

const Product = {
  getAll: async () => {
    const db = await getDb();
    return db.collection('products').find({}).toArray();
  },

  getById: async (id) => {
    const db = await getDb();
    return db.collection('products').findOne({ _id: id });
  },

  create: async (productData) => {
    const db = await getDb();
    return db.collection('products').insertOne(productData);
  },

  update: async (id, productData) => {
    const db = await getDb();
    return db.collection('products').updateOne({ _id: id }, { $set: productData });
  },

  delete: async (id) => {
    const db = await getDb();
    return db.collection('products').deleteOne({ _id: id });
  }
};

module.exports = Product;
