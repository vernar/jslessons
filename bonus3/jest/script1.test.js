'use strict';
const sum = require('./script1');

test(`1. Функция sum должна возвращать тип данных true`, () => {
      expect(sum(2,2)).toBe(true);
});
