'use strict';

class Page {
    constructor(){
        this.initData();
        this.startObservers();
    }

    initData() {
        //tabs elements
        this.tab = document.querySelectorAll('.info-header-tab');
        this.info = document .querySelector('.info-header');
        this.tabContent = document.querySelectorAll('.info-tabcontent');

        //timer elements
        this.deadline = '2019-5-22 12:00:00';
        let timer = document.getElementById('timer');
        this.hours = timer.querySelector('.hours');
        this.minutes = timer.querySelector('.minutes');
        this.seconds = timer.querySelector('.seconds');

        //modal window elements
        this.more = document.querySelector('.more');
        this.overlay = document.querySelector('.overlay');
        this.close = document.querySelector('.popup-close');
        this.moreDescriptionElements = document.querySelectorAll('.description-btn');

        //navigation menu
        this.navigationMenu = document.querySelector('nav ul');
    }

    startObservers() {
        this.initTabSelector(0);
        this.initClock(this.deadline);
        this.initModal();
        this.initSoftScroll();
    }

    initTabSelector (initTabNumber) {
        let selectTabContent = (number) => {
            for (let i = 0; i < this.tabContent.length; i++) {
                if (number === i ) {
                    this.tabContent[i].classList.remove('hide');
                    this.tabContent[i].classList.add('show');
                } else {
                    this.tabContent[i].classList.remove('show');
                    this.tabContent[i].classList.add('hide');
                }
            }
        };

        selectTabContent(initTabNumber);

        this.info.addEventListener('click', (event) => {
            let target = event.target;
            if (target && target.classList.contains('info-header-tab')) {
                for (let i = 0; i < this.tab.length; i++) {
                    if (target === this.tab[i]) {
                        selectTabContent(i);
                        break;
                    }
                }
            }
        });
    }

    _getTimeRemaining(endtime) {
        let now = new Date();
        let endTimestamp = Date.parse(endtime) - now.getTime();

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

    initClock(deadline) {
        let updateClock = () => {
            let t = this._getTimeRemaining(deadline);
            this.hours.textContent = t.hours;
            this.minutes.textContent = t.minutes;
            this.seconds.textContent = t.seconds;

            if (t.total <= 0) {
                clearInterval(timer);
                this.hours.textContent = '00';
                this.minutes.textContent = '00';
                this.seconds.textContent = '00';
            }
        };
        let timer = setInterval(updateClock, 1000);
    }

    initModal() {
        this.more.addEventListener('click',  () => {
            this.modalShow();
        });

        this.close.addEventListener('click', () => {
            this.modalHide();
        });

        this.overlay.addEventListener('click', () => {
            if (this.overlay === event.target) {
                this.modalHide();
            }
        });

        this.moreDescriptionElements.forEach((item) => {
            item.addEventListener('click', () => {
                this.modalShow();
            });
        });
    }

    modalShow() {
        this.overlay.style.display = 'block';
        this.more.classList.add('more-splash');
        document.body.style.overflow = 'hidden';
    }

    modalHide() {
        this.overlay.style.display = 'none';
        this.more.classList.remove('more-splash');
        document.body.style.overflow = '';
    }

    initSoftScroll() {
        this.navigationMenu.addEventListener('click',  (event) => {
            let targetElement = event.target;
            if (targetElement.tagName === 'A') {
                event.preventDefault();
                let doc = document.documentElement,
                    scrollElement = document.querySelector(targetElement.href.match(/#\w*/)[0]);

                this._softScroll(doc, scrollElement.offsetTop - 150, 0.4);
            }

        });
    }

    _softScroll(element, endPos, stepPos = 10) {
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

}

window.addEventListener('DOMContentLoaded', function () {
    let page = new Page();
});
