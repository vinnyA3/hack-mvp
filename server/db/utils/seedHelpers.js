const faker = require('faker');
const genRandomInt = require('utils/genRandInt');

const concatTwoValuesWith = delim => val1 => val2 => `${val1}${delim}${val2}`;

const moneyDelimValues = concatTwoValuesWith('.');

const genDollarsCents = (dollarMax = 850, centsMax = 99) => {
  const dollars = genRandomInt(1, dollarMax);
  const cents = genRandomInt(0, centsMax);
  return moneyDelimValues(dollars)(cents < 10 ? '0' + cents : cents);
};

// getlightningDeal :: Number -> Array[...n]
const getLightningDeal = () => {
  if (!!genRandomInt(0, 1)) {
    return [true, genRandomInt(5, 75)];
  } else {
    return [false, null];
  }
};

const getUsedPrice = () => {
  if (!!genRandomInt(0, 1)) {
    return [genDollarsCents()];
  } else {
    return [null];
  }
};

const multiplePricing = () => {
  if (!!genRandomInt(0, 1)) {
    return [genDollarsCents(), genDollarsCents()];
  } else {
    return [null, null];
  }
};

const protectionPlan = () => {
  if (!!genRandomInt(0, 1)) {
    return [
      true,
      genDollarsCents(30, 99),
      genDollarsCents(40, 99),
      faker.lorem.sentences(),
    ];
  } else {
    return [false, null, null, null];
  }
};

module.exports = {
  concatTwoValuesWith,
  moneyDelimValues,
  genDollarsCents,
  getLightningDeal,
  multiplePricing,
  getUsedPrice,
  protectionPlan,
};
