'use strict';

let buttonStartElement = document.getElementById('start');
let expensesItems = document.getElementsByClassName('expenses-item');
let expensesButtonElement = document.getElementsByTagName('button')[0];
let optionalExpensesButtonElement = document.getElementsByTagName('button')[1];
let calculateButtonElement = document.getElementsByTagName('button')[2];
let optionalExpensesInputElements = document.querySelectorAll('.optionalexpenses-item');
let chooseIncomeInputValue = document.querySelector('.choose-income');
let savingCheckboxValue = document.querySelector('#savings');
let chooseSumValue = document.querySelector('.choose-sum');
let choosePersentValue = document.querySelector('.choose-percent');

let appData = {
    'budget': 0,
    'timeData': '',
    'expenses': {},
    'optionalExpenses': {},
    'income': [],
    'monthIncome': 0,
    'yearIncome': 0,
    'savings': false,
    init: function () {
        this.startEventObserver();
        this.setDefaultFieldsState();
    },
    startEventObserver: function() {

    },
    setDefaultFieldsState: function() {
        //2) Если программа еще не запущена( не нажали кнопку "Начать расчет")
        // или нужное(соответственное) для заполнения поле пустое - сделать
        // кнопки неактивными. (Например, если ни одно поле обязательных
        // расходов не заполнено - блокируем кнопку "Утвердить")
        chooseSumValue.setAttribute('disabled','');
        choosePersentValue.setAttribute('disabled','');
        expensesButtonElement.setAttribute('disabled','');
        optionalExpensesButtonElement.setAttribute('disabled','');
        calculateButtonElement.setAttribute('disabled','');
    },

    start: function () {
        this.timeData = prompt('Введите дату в формате YYYY-MM-DD', "2019-04-20");
        do {
            this.budget = +prompt('Ваш бюджет на месяц?', "2000");
        } while (isNaN(this.budget) || this.budget === 0 );
        calculateButtonElement.removeAttribute('disabled');
    },
    detectLevel: function () {
        let result = '';
        if (this.moneyPerDay < 100 && this.moneyPerDay > 0) {
            result = "Минимальный уровень достатка";
        } else if(this.moneyPerDay > 100 && this.moneyPerDay > 2000){
            result = "Средний уровень достатка";
        } else if(this.moneyPerDay > 2000 && this.moneyPerDay > 2000){
            result = "Высокий уровень достатка";
        } else {
            result = "Не определён";
        }
        return result;
    },
    updateElements: function () {
        let budgetValueElement = document.querySelector('.budget-value');
        let dayBudgetValueElement = document.querySelector('.daybudget-value');
        let levelValueElement = document.querySelector('.level-value');
        let expensesValueElement = document.querySelector('.expenses-value');
        let optionalexpensesValueElement = document.querySelector('.optionalexpenses-value');
        let incomeValueElement = document.querySelector('.income-value');
        let monthSavingValueElement = document.querySelector('.monthsavings-value');
        let yearsavingsValueElement = document.querySelector('.yearsavings-value');

        let yearInputValue = document.querySelector('.year-value');
        let monthInputValue = document.querySelector('.month-value');
        let dayInputValue = document.querySelector('.day-value');

        budgetValueElement.textContent = this.budget;

        let tempDate = new Date(Date.parse(this.timeData));
        yearInputValue.value = tempDate.getFullYear();
        monthInputValue.value = tempDate.getMonth() + 1;
        dayInputValue.value = tempDate.getDate();

        expensesValueElement.textContent = this.getTotalExpenses();
        optionalexpensesValueElement.textContent = this.getOptionalExpensesString();
        dayBudgetValueElement.textContent = this.moneyPerDay;
        levelValueElement.textContent = this.detectLevel();
        incomeValueElement.innerHTML = this.getIncomeString();

        if (this.savings === true) {
            monthSavingValueElement.textContent = this.monthIncome;
            yearsavingsValueElement.textContent = this.yearIncome;
        }
    },
    getTotalExpenses: function () {
        let sum = 0;
        for (let i in this.expenses) {
            sum += +this.expenses[i];
        }
        return sum;
    },
    getOptionalExpensesString: function () {
        let optionalexpensesString = '';
        for (let i in this.optionalExpenses) {
            optionalexpensesString += this.optionalExpenses[i] + ' ';
        }
        return optionalexpensesString;
    },
    getIncomeString: function () {
        let incomeString = '';
        for (let val of this.income) {
            incomeString += val + '<br />';
        }
        return incomeString;
    }
};



buttonStartElement.addEventListener('click', function (event) {
    appData.start();
    calculateButtonElement.removeAttribute('disabled');
    appData.updateElements();
});

//2) Если программа еще не запущена( не нажали кнопку "Начать расчет")
// или нужное(соответственное) для заполнения поле пустое - сделать
// кнопки неактивными. (Например, если ни одно поле обязательных
// расходов не заполнено - блокируем кнопку "Утвердить")
for (let expensesItem of expensesItems) {
    expensesItem.addEventListener('input', function (event) {
        let status = false;
        for (let item of expensesItems) {
            if (item.value.length > 0) {
                status = true;
            }
        }
        if (status === true) {
            expensesButtonElement.removeAttribute('disabled');
        } else {
            expensesButtonElement.setAttribute('disabled','');
        }
    });
}
//2) Если программа еще не запущена( не нажали кнопку "Начать расчет")
// или нужное(соответственное) для заполнения поле пустое - сделать
// кнопки неактивными. (Например, если ни одно поле обязательных
// расходов не заполнено - блокируем кнопку "Утвердить")
for (let optionalExpensesItem of optionalExpensesInputElements) {
    optionalExpensesItem.addEventListener('input', function (event) {
        let status = false;
        for (let item of optionalExpensesInputElements) {
            if (item.value.length > 0) {
                status = true;
            }
        }
        if (status === true) {
            optionalExpensesButtonElement.removeAttribute('disabled');
        } else {
            optionalExpensesButtonElement.setAttribute('disabled','');
        }
    });
}

expensesButtonElement.addEventListener('click', function (event) {
    for (let i = 0; i < expensesItems.length; i++) {
        let expensesName = expensesItems[i].value;
        let expensesValue = expensesItems[++i].value;

        if (typeof(expensesName) === 'string'
            && expensesValue != null
            && expensesName !== ''
            && expensesValue !== ''
            && expensesName.length < 50
        ){
            appData.expenses[expensesName] = +expensesValue;
        }
    }
    appData.updateElements();
});

optionalExpensesButtonElement.addEventListener('click', function () {
    for (let i = 0; i < optionalExpensesInputElements.length; i++) {
        appData.optionalExpenses[i] = optionalExpensesInputElements[i].value;
    }
    appData.updateElements();
});

calculateButtonElement.addEventListener('click', function () {
    //3) Реализовать функционал: при расчете дневного бюджета учитывать
    // сумму обязательных трат (т. e. от бюджета на месяц отнимаем общую
    // сумму всех обяз. трат и ее делим на 30 дней)
    appData.moneyPerDay = +((appData.budget - appData.getTotalExpenses())/ 30).toFixed();
    appData.updateElements();
});

chooseIncomeInputValue.addEventListener('input', function () {
    let items = chooseIncomeInputValue.value;
    appData.income = items.split(',');
    appData.updateElements();
});

savingCheckboxValue.addEventListener('click', function () {
    if (appData.savings === true) {
        appData.savings = false;
        chooseSumValue.setAttribute('disabled','');
        choosePersentValue.setAttribute('disabled','');
    } else {
        appData.savings = true;
        chooseSumValue.removeAttribute('disabled');
        choosePersentValue.removeAttribute('disabled');
    }
});

chooseSumValue.addEventListener('input', function () {
    if (appData.savings === true) {
        let sum = +chooseSumValue.value;
        let percent = +choosePersentValue.value;
        appData.monthIncome = (sum / 100 / 12 * percent).toFixed(1);
        appData.yearIncome = (sum / 100 * percent).toFixed(1);
        appData.updateElements();
    }
});

choosePersentValue.addEventListener('input', function () {
    if (appData.savings === true) {
        let sum = +chooseSumValue.value;
        let percent = +choosePersentValue.value;
        appData.monthIncome = (sum / 100 / 12 * percent).toFixed(1);
        appData.yearIncome = (sum / 100 * percent).toFixed(1);
        appData.updateElements();
    }
});

appData.init();

