const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;

const app = express();

// MIDDLEWARE
app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Everything is good, life is good',
    status: 200,
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
