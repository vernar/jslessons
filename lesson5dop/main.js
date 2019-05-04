'ues strict';

let now = new Date();
console.log(now);

//1) Выведите на страницу текущую дату и время в
//формате '09:59:59 30.05.2018'
console.log(
    (now.getHours() < 10 ? '0' + now.getHours() : now.getHours()) + ':' +
    (now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()) + ':' +
    (now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()) + ' ' +
    (now.getDay() < 10 ? '0' + now.getDay() : now.getDay()) + '.' +
    (now.getMonth() < 10 ? '0' + now.getMonth() : now.getMonth()) + '.' +
    now.getFullYear()
);

//2) Напишите функцию, которая будет добавлять 0 перед днями и месяцами,
// которые состоят из одной цифры (из 1.6.2018 сделает 01.06.2018)
function addZeroToData(number) {
    return number < 10 ? '0' + number : number;
}
console.log(addZeroToData(now.getDay()));

//3) Напишите функцию, которая выводит на страницу текущий день недели
// на русском языке (реализацию выбираете сами)
var formatter = new Intl.DateTimeFormat("ru", {weekday: 'long'});
console.log(formatter.format(now));

//4) Напишите функцию, которая выводит на страницу разницу между двумя
// датами в количестве дней
//·  На странице создайте интерфейс для её отображения: как минимум
// - 3 input’a: для двух ввода дат и вывода результата.
//YYYY-MM-DDTHH:mm:ss
function calculateData() {
    let dateStartInput = document.getElementById('date-start').value;
    let dateEndInput = document.getElementById('date-end').value;

    let dateStartValue = new Date(dateStartInput);
    let dateEndValue = new Date(dateEndInput);

    let result = (dateEndValue - dateStartValue) > 0 ?
        dateEndValue - dateStartValue   :
        dateStartValue - dateEndValue;
    result = result / 86400 / 1000;

    let resultElement = document.getElementById('date-result');
    resultElement.value = result;
}