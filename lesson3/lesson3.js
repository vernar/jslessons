'use strict';
let money;
let time;

let appData = {
    'budget': '',
    'timeData': '',
    'expenses': {},
    'optionalExpenses': {},
    'income': [],
    'savings': true,
};

function start() {
    do {
        money = +prompt('Ваш бюджет на месяц?', "3000");
    } while (isNaN(money) || money === 0 );

    time = prompt('Введите дату в формате YYYY-MM-DD', "2019-04-20");

    appData.budget = money;
    appData.timeData = time;
}

function chooseExpenses() {
    for (let i = 0; i < 2; i++) {
        let expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Тополиво#' + i);
        let expensesValue = +prompt('Во сколько обойдётся?', '1000');

        if (typeof(expensesName) === 'string'
            && expensesName != null
            && expensesValue != null
            && expensesName !== ''
            && expensesValue !== ''
            && expensesName.length < 50
        ){
            appData.expenses[expensesName] = expensesValue;
        } else {
            i --;
            continue;
        }
    }
}

function checkSavings() {
    let save, percent;
    if (appData.savings === true) {
        save = +prompt("Какова сумма накоплений", '300');
        percent = +prompt("Под какой процент", '20');
    }

    appData.mounthIncome = save / 100 / 12 * percent;
    alert('Доход в месяц с вашего депозита: ' + appData.mounthIncome);
}

/*
1) Оформить расчет дневного бюджета  и вывод на
экран этого значения как одну функцию (detectDayBudget)
 */
function detectDayBudget() {
    appData.moneyPerDay = (appData.budget / 30);
    alert("Ежедневный бюджет: " + appData.moneyPerDay);

}

/*
2) Оформить блок кода с расчетом уровня достатка как
отдельную функцию (detectLevel)
 */
function detectLevel() {
    if (appData.moneyPerDay < 100) {
        console.log("Минимальный уровень достатка");
    } else if(appData.moneyPerDay > 100 && appData.moneyPerDay > 2000){
        console.log("Средний уровень достатка");
    } else if(appData.moneyPerDay > 2000 && appData.moneyPerDay > 2000){
        console.log("Высокий уровень достатка");
    } else {
        console.log("Произошла ошибка");
    }
}


/*
3)Создать функцию для определения необязательных расходов (chooseOptExpenses):
Необходимо 3 раза спросить у пользователя “Статья необязательных расходов?”
Записать ответы в объект optionalExpenses в формате Номер - Ответ.
optionalExpenses: {
1 : “ответ на вопрос”
}
Вызывать функции не обязательно.
 */
function chooseOptExpenses() {
    let optionalExperensesString = '';
    let optionalExpenses = {};

    for (let i = 1; i < 4; i++) {
        optionalExperensesString = prompt("Статья необязательных расходов?", 'article#' + i);
        optionalExpenses[i] = optionalExperensesString;
    }
    console.log(optionalExpenses);
}

start();
chooseExpenses();
checkSavings();
detectDayBudget();
detectLevel();
chooseOptExpenses();

console.log(appData);