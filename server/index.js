const express = require('express');
const morgan = require('morgan');
const path = require('path');
const sqlite3 = require('sqlite3').verbose();
const PORT = process.env.PORT || 3000;
const { API_KEY } = require('./config/config');
const axios = require('axios');
const { genRandomInt } = require('../db/seedHelpers');
const db = new sqlite3.Database(path.join(__dirname, '../db/db.products'));
const app = express();

// MIDDLEWARE
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/location', (req, res) => {
  console.log(req.query);
  const { long, lat } = req.query;
  if (!long || !lat) {
    return res.send({
      message: 'Ooop! You need to send longitude and latitude',
      status: 400,
    });
  } else {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${API_KEY}`
      )
      .then(({ data }) => {
        return res.send({
          message: 'okay',
          results: data.results[0].formatted_address,
        });
      })
      .catch(err => res.status(500).send({ message: 'something went wrong' }));
  }
});

app.get('/api/:id', (req, res) => {
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
