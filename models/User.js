const db = require('../config/db');
const bcrypt = require('bcryptjs');

const User = {
  create: (userData, callback) => {
    bcrypt.hash(userData.password, 10, (err, hash) => {
      if (err) return callback(err);
      const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
      db.query(query, [userData.username, userData.email, hash], callback);
    });
  },

  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], callback);
  }
};

module.exports = User;
