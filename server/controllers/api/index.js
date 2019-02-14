const path = require('path');
const axios = require('axios');
const sqlite3 = require('sqlite3').verbose();
const { genRandomInt } = require('db/seedHelpers');
const db = new sqlite3.Database(
  path.resolve(__dirname, '../../db/db.products')
);
const { API_KEY } = require('config/config');

module.exports = {
  getGeolocation: (req, res) => {
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
        .catch(err =>
          res.status(500).send({ message: 'something went wrong' })
        );
    }
  },
  getProductInfo: (req, res) => {
    const { id } = req.params;

    if (!id) {
      return res.send({
        message: 'Please supply an ID!',
        status: 400,
      });
    }

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
  },
};
