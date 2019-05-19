'use strict';


// Узнать, что нам вернет функция each в данных условиях.
// Проверить её на тип данных, который она возвращает,
// на соответствие ожидаемому результату (который вы получили)
// и на свойство length.

let each = function(startArr, f){
    return f(startArr);
};
let arrTest = [64, 49, 36, 25, 16];
let myFunc = function(a){
    let newArr = [];
    for (let i = 0; i < a.length; i++) {
        newArr[i]=Math.sqrt(a[i]);
    }
    return newArr;
};
function check() {
    return each(arrTest, myFunc);
}
//console.log(each(arrTest, myFunc));

module.exports = check;