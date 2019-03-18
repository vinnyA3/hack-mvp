const { Schema, Types, model } = require('mongoose');

const Room = Schema({
  roomname: {
    type: String,
    required: true,
  },
  chat_messages: [{ type: Types.ObjectId(), ref: 'Message' }],
});

module.exports = model('Room', Room);
