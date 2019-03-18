const { Schema, Types, model } = require('mongoose');

const Room = Schema({
  roomname: {
    type: String,
    required: true,
  },
  users: [{ type: Types.ObjectId, ref: 'User' }],
  messages: [{ username: { type: String, required: true }, text: String }],
});

module.exports = model('Room', Room);
