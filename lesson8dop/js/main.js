
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
//3) У таймера есть проблема (нужно исправить)
        if (endTimestamp < 0) {
                return {
                'total' : endTimestamp,
                'hours' : 0,
                'minutes' : 0,
                'seconds' : 0
            }
        }

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

    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            hours = timer.querySelector('.hours'),
            minutes = timer.querySelector('.minutes'),
            seconds = timer.querySelector('.seconds');

        function updateClock() {
            let t = getTimeRemaining(deadline);
            hours.textContent = t.hours;
            minutes.textContent = t.minutes;
            seconds.textContent = t.seconds;

            if (t.total > 0) {
                setTimeout(updateClock, 1000);
            }
        }
        updateClock();
    }

    setClock('timer', deadline);


//1) Написать скрипт плавной прокрутки страницы при клике на элементы меню, используя чистый JS
    (function() {
        let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
        window.requestAnimationFrame = requestAnimationFrame;
    })();
    let navigationMenu = document.querySelector('nav ul');

    function softScroll(element, endPos, stepPos = 10) {
        let start = performance.now(),
            startPos = element.scrollTop,
            direction = startPos < endPos ? 'asc' : 'desk';

        function scroll(timestamp) {
            let timeLeft = timestamp - start,
                points = timeLeft / stepPos,
                curPos = direction === 'asc' ? startPos + points : startPos - points;

            element.scrollTo(0, curPos);

            if ( (curPos < endPos && direction === 'asc') || (curPos > endPos && direction === 'desk')) {
                requestAnimationFrame(scroll);
            }
        }
        requestAnimationFrame(scroll);
    }

    navigationMenu.addEventListener('click', function (event) {
        let targetElement = event.target;
        if (targetElement.tagName === 'A') {
            event.preventDefault();
            let doc = document.documentElement,
                scrollElement = document.querySelector(targetElement.href.match(/#\w*/)[0]);

            softScroll(doc, scrollElement.offsetTop - 150, 1);
        }

    });
});
