'use strict';

const arrFunction = require('./script2');
let arr = [ [1, 2, 3], [4, 5, 6], [7,8,9] ];

test(`2. Переменная num должна быть равна 5. Проверить на соответствие`, () => {
      expect(arrFunction(arr)).toBe(5);
});
