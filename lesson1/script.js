'use strict';
/*
2) В файле скрипта создать 2 переменные (money и time), которые будут получать
данные от пользователя:
Первая будет спрашивать "Ваш бюджет на месяц?"
Вторая "Введите дату в формате YYYY-MM-DD"
*/
let money;
let time;

money = +prompt('Ваш бюджет на месяц?', "3000");
time = prompt('Введите дату в формате YYYY-MM-DD', "2019-04-20");

/*
3) Создать объект appData, который будет содержать такие данные:
·      бюджет (передаем сюда переменную из п.2)
·      данные времени - timeData (передаем сюда переменную из п.2)
·      объект с обязательными расходами - expenses (смотри пункт 4)
·      объект с необязательными расходами - optionalExpenses (оставляем пока пустым)
·      массив данных с доп. доходом - income (оставляем пока пустым)
·      свойство savings (выставляем его как false)
 */

let appData = {
    'budget': money,
    'timeData': time,
    'expenses': {},
    'optionalExpenses': {},
    'income': [],
    'savings': false,
};

/*
4) Задать пользователю по 2 раза вопросы:
    “Введите обязательную статью расходов в этом месяце”
    “Во сколько обойдется?”
    Записать ответы в объект expenses в формате:
    expenses: {
    “ответ на первый вопрос” : “ответ на второй вопрос”
    }
 */

let expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Тополиво');
let expensesValue = +prompt('Во сколько обойдётся?', '1000');
appData.expenses[expensesName] = expensesValue;

expensesName = prompt('Введите обязательную статью расходов в этом месяце', 'Скрепки');
expensesValue = +prompt('Во сколько обойдётся?', '20');
appData.expenses[expensesName] = expensesValue;

//5 Вывести на экран пользователя бюджет на 1 день (брать месяц за 30 дней)
alert(appData.budget / 30);



console.log(appData);
