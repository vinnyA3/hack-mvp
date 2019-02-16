const sqlite3 = require('sqlite3').verbose();
const faker = require('faker');
const path = require('path');
const genRandomInt = require('utils/genRandInt');
const {
  moneyDelimValues,
  genDollarsCents,
  getLightningDeal,
  multiplePricing,
  getUsedPrice,
  protectionPlan,
} = require('./seedHelpers');

// init database connection
const db = new sqlite3.Database(path.join(__dirname, '../db.products'));

// generate the random data
db.serialize(() => {
  const seed1 = db.prepare(
    'INSERT INTO products VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
  );

  const seed2 = db.prepare('INSERT INTO productReviews VALUES (?, ?, ?)');

  for (let i = 1; i < 201; i++) {
    const randStockNum = genRandomInt(1, 900);

    seed1.run(
      [
        i,
        faker.commerce.productName(),
        genDollarsCents(),
        ...getLightningDeal(),
        ...multiplePricing(),
        faker.company.companyName(), // owning
        faker.company.companyName(), // fulfilled
        randStockNum,
        !!genRandomInt(0, 1), // type cast int to bool (!!<int>) - prime
        !!genRandomInt(0, 1), // returnable
        !!genRandomInt(0, 1), // gift
        !!genRandomInt(0, 1), // buy used
        ...getUsedPrice(),
        ...protectionPlan(),
      ],
      err => {
        if (err) {
          console.error(err);
        }
      }
    );

    if (i < 71) {
      seed2.run([i, genRandomInt(0, 801), genRandomInt(0, 5)]);
    }
  }
});
