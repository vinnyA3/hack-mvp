import React from 'react';

const optionGenerator = n => {
  let result = [];
  for (let i = 1; i <= n; i++) {
    result.push(
      <option key={i} value={i}>
        {i}
      </option>
    );
  }
  return result;
};

export default optionGenerator;
