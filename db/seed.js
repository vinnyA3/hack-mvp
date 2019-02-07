const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const path = require('path');
// init database connection
const db = new sqlite3.Database(path.join(__dirname, './db.amazon-products'));

const genRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const concatTwoValuesWith = delim => val1 => val2 => `${val1}${delim}${val2}`;

const moneyDelimValues = concatTwoValuesWith('.');

// generate the random data
db.serialize(() => {
  const seed = db.prepare(
    'INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?)'
  );

  for (let i = 1; i < 201; i++) {
    const randBills = genRandomInt(1, 800);
    const randCents = genRandomInt(10, 99);
    const randStockNum = genRandomInt(1, 900);

    seed.run([
      i,
      faker.commerce.productName(),
      moneyDelimValues(randBills)(randCents),
      faker.company.companyName(),
      randStockNum,
      !!genRandomInt(0, 1), // type cast int to bool (!!<int>)
      faker.company.companyName(),
      !!genRandomInt(0, 1),
    ]);
  }
});
