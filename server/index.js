const express = require('express');
const morgan = require('morgan');
const path = require('path');
const PORT = process.env.PORT || 3000;
const app = express();
// MIDDLEWARE
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// ROUTES
app.use('/api', require('./routes/api'));
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
