'use strict';

/*
1) У вас есть str = “урок-3-был слишком легким”
· Сделать так, чтобы строка начиналась с большой буквы
 */

let str = "урок-3-был слишком легким";

/*
2) Теперь замените все “-” на пробелы
 Вывести в консоль то, что получилось
 */

str = str.replace(/[-]/g, ' ');
console.log(str);

/*
3) Из получившейся строки вырезать слово “легким”,
в этом же слове заменить 2 последние буквы на букву “о”
· Вывести на экран то, что получилось
 */

let arrStr = str.split(/\s*(легким)/);
str = arrStr[0];
console.log( arrStr[1].substring(0, arrStr[1].length - 3) + 'оо');

/*
4) У вас также есть массив arr = [20, 33, 1, “Человек”, 2, 3]
· Вывести в консоль квадратный корень
 из суммы кубов его элементов (Да, человека нужно исключить)
 */
let arr = [20, 33, 1, 'Человек', 2, 3];

arr.splice(arr.indexOf('Человек'),1);
console.log(arr);

let summ = 0;
arr.forEach(function (value) {
    summ += value
});
console.log(Math.pow(summ, 2) );

/*
5) Создайте функцию, которая принимает 1 аргумент
(название произвольное)
· Если как аргумент передана не строка - функция
оповещает об этом пользователя
· В полученной (как аргумент) строке функция должна
убрать все пробелы в начале и в конце
· Если строка более 50 знаков - то после 50го символа
часть текста скрывается и вместо них появляются три точки (...)
 */

function checkValue(value) {
    if (typeof (value) !== 'string'){
        console.log('Значение не является строкой');
        return false;
    }

    value = value.trim();

    if (value.length > 50) {
        value = value.substr(50, value.length) + '...';
    }
    return value;
}