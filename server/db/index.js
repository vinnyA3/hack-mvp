const path = require('path');
const sqlite3 = require('sqlite3').verbose();

try {
  const db = new sqlite3.Database(path.join(__dirname, './db.products')).on(
    'error',
    err => {
      throw Error('Error occurred: ' + err);
    }
  );

  module.exports = db;
} catch (e) {
  console.error(e);
  process.exit(1);
}
