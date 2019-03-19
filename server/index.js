const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const db = require('db');

// ===== models
const Room = require('db/models/Rooms');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/lobby', (req, res) => {
  const { roomname } = req.body;

  if (!roomname) {
    return res
      .status(400)
      .send({ message: 'Invalid room id.  Please supply a valid object id.' });
  }

  // query the database
  Room.find({ roomname })
    .then(docs => {
      res.status(200).send(docs);
    })
    .catch(e => {
      res.status(500).send({ error: e });
    });
});

app.post('/lobby', (req, res) => {
  const { roomname, message } = req.body;

  if (!roomname || !message) {
    return res
      .status(404)
      .send({ message: 'Please supply a roomname and message' });
  }

  const newMessage = {
    username: message.username,
    text: message.text,
  };

  Room.findOneAndUpdate(
    { roomname },
    { $push: { chat_messages: newMessage } }
  ).then(_ => {
    res.status(200).send({ message: 'Message created!' });
  });
});

app.get('*', (req, res) => {
  res.status(404).send({ message: 'Page not found!' });
});

// ROUTES
app.listen(PORT, () => (console.log(`Listening on port ${PORT}`), void 0));
