
window.addEventListener('DOMContentLoaded', function () {

    'use strict';

    function tabSelector (tab, info, tabContent) {
        function selectTabContent(number) {
            for (let i = 0; i < tabContent.length; i++) {
                if (number === i ) {
                    tabContent[i].classList.remove('hide');
                    tabContent[i].classList.add('show');
                } else {
                    tabContent[i].classList.remove('show');
                    tabContent[i].classList.add('hide');
                }
            }
        }

        selectTabContent(0);

        info.addEventListener('click', function (event) {
            let target = event.target;
            if (target && target.classList.contains('info-header-tab')) {
                for (let i = 0; i < tab.length; i++) {
                    if (target == tab[i]) {
                        selectTabContent(i);
                        break;
                    }
                }
            }
        });
    }

    let tab = document.querySelectorAll('.info-header-tab'),
        info = document .querySelector('.info-header'),
        tabContent = document.querySelectorAll('.info-tabcontent');

    tabSelector(tab, info, tabContent);


    let deadline = '2019-5-12 12:00:00';

    function getTimeRemaining(endtime) {
        let endTimestamp = Date.parse(endtime) - Date.parse(new Date());

        //4) Изменить скрипт так, чтобы в таком случае выводилось: 00:00:00
        let seconds = Math.floor((endTimestamp/1000) % 60),
            minutes = Math.floor((endTimestamp/1000/60) % 60),
            hours = Math.floor(endTimestamp/1000/60/60);

        return {
            'total' : endTimestamp,
            'hours' : hours < 10 ? '0' + hours : hours,
            'minutes' : minutes < 10 ? '0' + minutes : minutes,
            'seconds' : seconds < 10 ? '0' + seconds : seconds
        }
    }

    function setClock(id, deadline) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds'),
            intervalFunction = setInterval(updateClock, 1000);

        function updateClock() {
            let t = getTimeRemaining(deadline);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(intervalFunction);
                hours.textContent = '00';
                minutes.textContent = '00';
                seconds.textContent = '00';
            }
        }
    }

    getTimeRemaining(deadline);
    setClock('timer', deadline);
});
