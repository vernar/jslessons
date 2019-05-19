// Функция sum должна возвращать тип данных true. Проверить её на это.
'use strict';

function sum(a, b) {
	return a + b > 10;
}
sum(2,2)

// Переменная num должна быть равна 5. Проверить на соответствие.

let arr = [ [1, 2, 3], [4, 5, 6], [7,8,9] ];
let num = arr[1][1];

// Узнать, что нам вернет функция each в данных условиях.
// Проверить её на тип данных, который она возвращает,
// на соответствие ожидаемому результату (который вы получили)
// и на свойство length.

let each = function(startArr, f){return f(startArr)};
let arrTest = [64, 49, 36, 25, 16];
let myFunc = function(a){
	let newArr = [];
	for (let i = 0; i < a.length; i++) {
		newArr[i]=Math.sqrt(a[i]);
	}
	return newArr;
};
console.log(each(arrTest, myFunc));

//tests
let assert = require('chai').assert,
	expect = require('chai').expect,
	should = require('chai').should();
describe('1. Функция', function () {
    it("Функция sum должна возвращать тип данных true", function () {
        assert.equal(sum(2,2), true, 'прошёл');
    });
});

describe('2. Массив', function () {
    it("Переменная num должна быть равна 5. Проверить на соответствие.", function () {
        assert.equal(arr[1][1], 5, 'прошёл');
    });
});

describe('3. Функция', function () {
    it("Проверить её на тип данных, который она возвращает", function () {
        assert.typeOf(each(arrTest, myFunc), 'array', 'прошёл');
    });
    it("на соответствие ожидаемому результату", function () {
	    expect([ 8, 7, 6, 5, 4 ]).to.eql(each(arrTest, myFunc));
    });
    it("на свойство length", function () {
	    each(arrTest, myFunc).should.have.lengthOf(5);
    });
});
