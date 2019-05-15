'use strict';

/*
1) Создать массив week и записать в него дни недели в виде строк
 Вывести на экран все дни недели
 Каждый из них с новой строчки
 Выходные дни - жирным шрифтом
 Текущий день - курсивом (пока можно задать текущий
день вручную, без работы с объектом даты)
 */

let week = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
];

let currentDay = 'Thursday';

for (let i = 0; i < week.length; i++){
    let fontWeight = (week[i] === 'Saturday' || week[i] === 'Sunday') ? 'bold' : 'normal';
    let fontStyle = week[i] === currentDay ? 'italic' : 'normal';
    document.write (
        '<p style="font-weight:' + fontWeight + '; font-style: ' + fontStyle +';">'
        + week[i]
        + '</p>');
}
/*
2) Создать массив arr = []
· Записать в него 7 любых многозначных чисел в виде строк
· Вывести в консоль только те, что начинаются с цифры 3 или 7 (Должны присутствовать в массиве)
 */

let arr = [
    '435',
    '323',
    '695',
    '534',
    '325',
    '743',
    '364',
];

for (let i = 0; i < arr.length; i++){
    if (arr[i][0] === '7' || arr[i][0] === '3'){
        console.log(arr[i]);
    }
}