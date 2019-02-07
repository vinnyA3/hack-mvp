const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3000;
const db = new sqlite3.Database(path.join(__dirname, '../db/db.products'));
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => {
  res.status(200).send({
    message: 'Everything is good, life is good',
    status: 200,
  });
});

app.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).send({
      message: 'Please supply an ID!',
      status: 400,
    });
  }

  const product = db.prepare('SELECT * FROM products WHERE id = (?)');

  product.each(id, (err, rows) => {
    if (err) {
      return res.status(500).send({
        message: 'Oops, something went wrong!!',
        status: 500,
      });
    }

    // TODO
    // if successful, then lets query for the productReviews if the
    // protectionPlan || pricingOption exists
    res.status(200).send({
      rows,
      status: 200,
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
