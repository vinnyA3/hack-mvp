const faker = require('faker');

const genRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const concatTwoValuesWith = delim => val1 => val2 => `${val1}${delim}${val2}`;

const moneyDelimValues = concatTwoValuesWith('.');

const genDollarsCents = () => {
  const dollars = genRandomInt(1, 800);
  const cents = genRandomInt(0, 99);
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
      genDollarsCents(),
      genDollarsCents(),
      faker.lorem.sentences(),
    ];
  } else {
    return [false, null, null, null];
  }
};

module.exports = {
  genRandomInt,
  concatTwoValuesWith,
  moneyDelimValues,
  genDollarsCents,
  getLightningDeal,
  multiplePricing,
  getUsedPrice,
  protectionPlan,
};
