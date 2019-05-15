'use strict';

//Получить кнопку "Начать расчет" через id
let buttonStartElement = document.getElementById('start');


//Получить все блоки в правой части программы через классы
// (которые имеют класс название-value,
// начиная с <div class="budget-value"></div> и
// заканчивая <div class="yearsavings-value"></div>)
let valueElements = document.querySelectorAll('.result-table [class*="-value"]');


//Получить поля(input) c обязательными расходами через класс. (class=”expenses-item”)
let expensesItems = document.getElementsByClassName('expenses-item');

//Получить кнопки “Утвердить” и “Рассчитать” через Tag, каждую в своей переменной.
let buttonSubmitElement = document.getElementsByTagName('button')[0];
let buttonCalculateElement = document.getElementsByTagName('button')[2];

//Получить поля для ввода необязательных расходов (optionalexpenses-item)
// при помощи querySelectorAll
let optionalExpensesInputElements = document.querySelectorAll('.optionalexpenses-item');

//Получить оставшиеся поля через querySelector
// (статьи возможного дохода, чекбокс, сумма, процент, год, месяц, день)

let allRequiredElements = document.querySelectorAll('.expenses-item, .choose-income, .choose-sum, .choose-percent, .year-value, .month-value, .day-value');
