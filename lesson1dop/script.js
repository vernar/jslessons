'use strict';

//1
let num = '33721';

let summ = 0;
for(let i = 0; i < num.length; i++ ){
    summ += Number(num[i]);
}

console.log(summ);


//2

let numPow = String(summ ** 3);
console.log(numPow[0] +  numPow[1]);
