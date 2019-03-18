const { Schema, Types, model } = require('mongoose');

const Message = Schema({
  room_id: { type: Types.ObjectId(), ref: 'Room' },
  text: String,
});

module.exports = model('Message', Message);
