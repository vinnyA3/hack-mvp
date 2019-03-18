const { Schema, model } = require('mongoose');

const User = Schema({
  username: {
    type: String,
    required: true,
  },
});

module.exports = model('User', User);
