/*
3) На отдельной html странице написать простой таймер,
который будет показывать текущее время в формате 14:26:50
(часы/минуты/секунды) (внешний вид может быть абсолютно простой - только цифры)
·        Необходимо подставлять 0 перед значениями, которые состоят
из одной цифры (из 4:6:50 сделает 04:06:50)
 */

'use strict';
document.addEventListener('DOMContentLoaded', function () {
    let hours = document.querySelector('#timer .hours'),
        minutes = document.querySelector('#timer .minutes'),
        seconds = document.querySelector('#timer .seconds');

    function timer() {
        let now  = new Date();
        hours.innerHTML = now.getHours() < 10 ? '0' + now.getHours() : now.getHours();
        minutes.innerHTML = now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes();
        seconds.innerHTML = now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds();
        setTimeout(timer, 1000);
    }

    timer();
});