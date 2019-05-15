'use strict';

//3) У вас есть код:
//· Выведите на экран правильное сообщение, которое берет значение из input
//· Написать скрипт в отдельном js файле

document.addEventListener('DOMContentLoaded', function () {
    let age = document.getElementById('age');

    function showUser(surname, name) {
        alert("Пользователь " + surname + " " + name + ", его возраст " + this.value);
    }

    showUser.apply(age, ['Arbuzov', 'Dmitry']);
});
