const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3000;
const { genRandomInt } = require('../db/seedHelpers');
const db = new sqlite3.Database(path.join(__dirname, '../db/db.products'));
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/:id', (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.send({
      message: 'Please supply an ID!',
      status: 400,
    });
  }

  // const product = db.prepare('SELECT * FROM products WHERE id = (?)');
  db.serialize(() => {
    db.get('SELECT * FROM products WHERE id = (?)', id, (err, rows) => {
      if (err) {
        return res.send({
          message: 'Oops, something went wrong!!',
          status: 500,
        });
      }

      if (!!rows.protectionPlan) {
        db.get(
          'SELECT * FROM productReviews WHERE id = ?',
          genRandomInt(0, 70),
          (err, rRows) => {
            if (err) {
              return res.send({
                message: 'Oops, something went wrong!!',
                status: 500,
              });
            }

            return res.send({
              rows,
              rRows,
              status: 200,
            });
          }
        );
      } else {
        return res.send({
          rows,
          status: 200,
        });
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
