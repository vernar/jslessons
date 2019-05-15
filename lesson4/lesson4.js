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
    start: function () {
        do {
            money = +prompt('Ваш бюджет на месяц?', "2000");
        } while (isNaN(money) || money === 0 );

        time = prompt('Введите дату в формате YYYY-MM-DD', "2019-04-20");

        this.budget = money;
        this.timeData = time;
    },
    chooseExpenses: function () {
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
    }, checkSavings: function () {
        let save, percent;
        if (appData.savings === true) {
            save = +prompt("Какова сумма накоплений", '300');
            percent = +prompt("Под какой процент", '20');
        }

        appData.mounthIncome = save / 100 / 12 * percent;
        alert('Доход в месяц с вашего депозита: ' + appData.mounthIncome);
    },
    detectDayBudget: function () {
        this.moneyPerDay = +(this.budget / 30);
        alert("Ежедневный бюджет: " + this.moneyPerDay);
    },
    detectLevel: function () {
        if (this.moneyPerDay < 100) {
            console.log("Минимальный уровень достатка");
        } else if(this.moneyPerDay > 100 && this.moneyPerDay > 2000){
            console.log("Средний уровень достатка");
        } else if(this.moneyPerDay > 2000 && this.moneyPerDay > 2000){
            console.log("Высокий уровень достатка");
        } else {
            console.log("Произошла ошибка");
        }
    },
    chooseOptExpenses: function () {
        let optionalExperensesString = '';
        let optionalExpenses = {};

        for (let i = 1; i < 4; i++) {
            optionalExperensesString = prompt("Статья необязательных расходов?", 'article#' + i);
            optionalExpenses[i] = optionalExperensesString;
        }
        console.log(optionalExpenses);
    },
    /*
  1) Написать проверку, что пользователь может:
·        Ввести в дополнительных доходах (chooseIncome) только строку
·        Не может оставить строку пустой
·        Не может отменить вопрос
     */
    chooseIncome: function () {
        let items;
        do{
            items = prompt("Что принесёт дополнительный доход? (Перечислить через запятую)", "аренда, подработка, чаевые");
        } while (parseFloat(items) == items && items === '' || items === null);
       this.income = items.split(',');
       this.income.push(prompt("Может что-то ещё?", "рыбалка"));
       this.income.sort();
/*
2) При помощи метода перебора массива(forEach) вывести
на экран сообщение "Способы доп. заработка: " и полученные
способы (внутри chooseIncome)
· Товары должны начинаться с 1, а не с 0. Выполняем
этот пункт в chooseIncome.
 */
       this.income.forEach(function (val, index) {
           document.write('Способы доп. заработка: #' + (index + 1) + ' ' + val + '<br />') ;
       })

    }
};


appData.start();
appData.chooseExpenses();
appData.checkSavings();
appData.detectDayBudget();
appData.detectLevel();
appData.chooseOptExpenses();
appData.chooseIncome();

/*
3) Используя цикл for in для объекта (appData) вывести в
консоль сообщение "Наша программа включает в себя данные: "
(вывести весь appData)
 */
for (let val in appData) {
    console.log('Наша программа включает в себя данные: ' + val);
}

console.log(appData);