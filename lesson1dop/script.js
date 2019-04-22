'use strict';

/*
1) Создать переменную num со значением 33721
Вывести в консоль произведение (умножение) цифр этого числа
 */
let num = 33721;

let summ = num.toString().split("").reduce(function (mult, current) {
    return mult * current;
});

console.log(summ);


/*
2) Полученный результат возвести в степень 3, используя только 1 оператор
(Math.pow не подходит)
Вывести на экран первые 2 цифры полученного числа
 */

let numPow = String(summ ** 3);
let result = numPow.toString().split("").reduce(function (mult, current, i) {
    return i < 2 ? mult += +current : mult;
});

console.log(result);

//console.log(numPow[0] +  numPow[1]);
