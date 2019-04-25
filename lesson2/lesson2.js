'use strict';


let money;
let time;

money = +prompt('Ваш бюджет на месяц?', "3000");
time = prompt('Введите дату в формате YYYY-MM-DD', "2019-04-20");


let appData = {
    'budget': money,
    'timeData': time,
    'expenses': {},
    'optionalExpenses': {},
    'income': [],
    'savings': false,
};

for (let i = 0; i < 2; i++) {
    let expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Тополиво');
    let expensesValue = +prompt('Во сколько обойдётся?', '1000');

    if (typeof(expensesName) === 'string'
        && expensesName != null
        && expensesValue != null
        && expensesName != ''
        && expensesValue != ''
        && expensesName.length < 50
    ){
        appData.expenses[expensesName] = expensesValue;
    } else {
        i --;
        continue;
    }
}

/*
1) Переписать наш цикл for еще двумя способами и закомментировать
их (еще 2 вида циклов, тренируемся)
 */

/*
let i = 0;
while (i < 2) {
    i++;
    let expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Тополиво');
    let expensesValue = +prompt('Во сколько обойдётся?', '1000');

    if (typeof(expensesName) === 'string'
        && typeof(expensesName) != null
        && typeof(expensesValue) != null
        && expensesName != ''
        && expensesValue != ''
        && expensesName.length < 50
    ){
        appData.expenses[expensesName] = expensesValue;
    } else {
        i --;
        continue;
    }
}
//------------------------------------------------------
let i = 0;
do {
    i++;
    let expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Тополиво');
    let expensesValue = +prompt('Во сколько обойдётся?', '1000');

    if (typeof(expensesName) === 'string'
        && typeof(expensesName) != null
        && typeof(expensesValue) != null
        && expensesName != ''
        && expensesValue != ''
        && expensesName.length < 50
    ){
        appData.expenses[expensesName] = expensesValue;
    } else {
        i --;
        continue;
    }
} while (i < 2);
*/

appData.moneyPerDay = appData.budget / 30;

alert("Ежедневный бюджет: " + appData.moneyPerDay);

if (appData.moneyPerDay < 100) {
    console.log("Минимальный уровень достатка");
} else if(appData.moneyPerDay > 100 && appData.moneyPerDay > 2000){
    console.log("Средний уровень достатка");
} else if(appData.moneyPerDay > 2000 && appData.moneyPerDay > 2000){
    console.log("Высокий уровень достатка");
} else {
    console.log("Произошла ошибка");
}

console.log(appData);