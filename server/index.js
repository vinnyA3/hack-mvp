const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
const cors = require('cors');

// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// ROUTES
app.use('/api', require('./routes/api'));
app.get('/bundle', (req, res) =>
  res.sendFile(path.resolve(__dirname, '../dist/bundle.js'))
);

app.listen(PORT, () => (console.log(`Listening on port ${PORT}`), void 0));
