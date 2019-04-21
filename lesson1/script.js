'use strict';
//2
let money;
let time;

money = +prompt('Ваш бюджет на месяц?', "3000");
time = prompt('Введите дату в формате YYYY-MM-DD', "2019-04-20");

//3
let appData = {
    'budget': money,
    'timeData': time,
    'expenses': {},
    'optionalExpenses': {},
    'income': [],
    'savings': false,
};

//4

let expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Тополиво');
let expensesValue = +prompt('Во сколько обойдётся?', '1000');

appData.expenses[expensesName] = expensesValue;

//5
alert(appData.budget / 30);



//console.log(appData);
