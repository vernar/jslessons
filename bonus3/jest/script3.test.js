'use strict';

const check = require('./script3');

console.log(check());
test(`3.1. Проверить её на тип данных, который она возвращает", function ()`, () => {
      expect(Array.isArray(check())).toBe(true);
});

test(`3.2. На соответствие ожидаемому результату`, () => {
      expect([ 8, 7, 6, 5, 4 ]).toEqual(check());
});

test(`3.3. на свойство length`, () => {
      expect(check()).toHaveLength(5);
});

// describe('3. Функция', function () {
//     it("Проверить её на тип данных, который она возвращает", function () {
//         assert.typeOf(each(arrTest, myFunc), 'array', 'прошёл');
//     });
//     it("на соответствие ожидаемому результату", function () {
// 	    expect([ 8, 7, 6, 5, 4 ]).to.eql(each(arrTest, myFunc));
//     });
//     it("на свойство length", function () {
// 	    each(arrTest, myFunc).should.have.lengthOf(5);
//     });
// });
