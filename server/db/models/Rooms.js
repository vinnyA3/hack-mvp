const { Schema, Types, model } = require('mongoose');

const Room = Schema({
  roomname: {
    type: String,
    required: true,
    unique: true,
  },
  video_url: {
    type: String,
    required: true,
    unique: true,
  },
  chat_messages: [
    {
      username: { type: String, required: true },
      text: String,
    },
  ],
});

module.exports = model('Room', Room);
