
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


    let deadline = '2019-6-13 12:00:00';

    function getTimeRemaining(endtime) {
        let endTimestamp = Date.parse(endtime) - Date.parse(new Date());

        let endDate = new Date();
        endDate.setTime(endTimestamp);
        let realDays = endDate.getUTCDate() - 1,
            realHours = endDate.getUTCHours(),
            realMinutes = endDate.getUTCMinutes(),
            realSeconds = endDate.getUTCSeconds();

        let secconds = Math.floor((endTimestamp/1000) % 60),
            minutes = Math.floor((endTimestamp/1000/60) % 60),
            hours = Math.floor(endTimestamp/1000/60/60);
    }

    getTimeRemaining(deadline);
});
