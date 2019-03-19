const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');
const db = require('db');

const server = require('http').createServer(app);
const io = require('socket.io')(server);

// socket

// ===== models
const Room = require('db/models/Rooms');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.get('/lobby', (req, res) => {
  Room.find().then(data => {
    res.status(200).send({ message: 'retrieving all messages', data });
  });
});

app.get('/lobby/:roomname', (req, res) => {
  const { roomname } = req.params;

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
    { $push: { chat_messages: newMessage } },
    { new: true }
  ).then(({ chat_messages }) => {
    res.status(200).send({ message: 'Message created!', chat_messages });
  });
});

// io
io.on('connection', socket => {
  socket.on('chat message', msg => {
    io.emit('chat message', msg);
  });

  console.log('a client has now connected!!!!!!!!!!!');
});

// ROUTES
// app.listen(PORT, () => (console.log(`Listening on port ${PORT}`), void 0));
server.listen(PORT, () => (console.log(`Listening on port ${PORT}`), void 0));
