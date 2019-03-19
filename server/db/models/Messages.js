const { Schema, Types, model } = require('mongoose');

const Message = Schema({
  username: { type: String, required: true },
  text: String,
});

module.exports = model('Message', Message);
