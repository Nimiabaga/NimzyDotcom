const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  const newUser = { username, email, password };

  User.create(newUser)
    .then(() => res.status(201).send('User registered successfully'))
    .catch(err => res.status(500).send(err));
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email)
    .then(users => {
      if (users.length === 0) return res.status(404).send('User not found');

      const user = users[0];
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if (!isMatch) return res.status(400).send('Invalid password');

          const token = jwt.sign({ id: user.id }, 'secret_key', { expiresIn: '1h' });
          res.status(200).send({ token });
        })
        .catch(err => res.status(500).send(err));
    })
    .catch(err => res.status(500).send(err));
};
