const { Schema, Types, model } = require('mongoose');

const User = Schema({
  username: {
    type: String,
    required: true,
  },
  messages: [{ type: Types.ObjectId(), ref: 'Message' }],
});

module.exports = model('User', User);
