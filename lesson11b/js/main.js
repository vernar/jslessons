'use strict';

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

class PhoneTemplate {
    constructor(element, template, startPos) {
        this.phoneInput = element;
        this.template = template;
        this.curentString = template;
        this.startPosition = startPos;
        this.keyCode = '';

        this.phoneInput.value = template;
        this.setCursorPosition(startPos);

        this.startObservers();
    }

    startObservers() {
        document.addEventListener('keydown', (event) => {
            this.keyCode = event.key;
        });

        document.addEventListener('input', (event) => {
            if (this.serviceKey() === true) {
                return;
            }
            let inputValue = this.phoneInput.value,
                currentPosition = this.phoneInput.selectionStart,
                inputPosition = this.phoneInput.selectionStart - 1;

            while (this.template[inputPosition] !== '_' && inputPosition < this.template.length) {
                inputPosition++;
                this.setCursorPosition(inputPosition);
            }

            if (!isNaN(parseInt(inputValue[inputPosition])) && this.template[inputPosition] === '_') {
                this.curentString = this.curentString.replaceAt(inputPosition, inputValue[inputPosition]);
                this.setInput(this.curentString);
                this.setCursorPosition(currentPosition);
            } else {
                this.setInput(this.curString);
                this.setCursorPosition(inputPosition);
            }

            while (this.template[currentPosition] !== '_' && currentPosition < this.template.length) {
                currentPosition++;
                this.setCursorPosition(currentPosition);
            }

        });
    }

    clearField() {
        this.curentString = this.template;
        this.phoneInput.value = this.template;
        this.setCursorPosition(this.startPosition);
        this.phoneInput.focus();
    }

    setInput(text = '') {
        this.curentString = text === '' ? this.curentString : text;
        this.phoneInput.value = this.curentString;
    }

    setCursorPosition(pos) {
        this.phoneInput.setSelectionRange(pos,pos);
    }

    serviceKey() {
        let keyCode = this.keyCode,
            currentPosition = this.phoneInput.selectionStart;

        if (keyCode === 'ArrowLeft' || keyCode === 'ArrowRight') {
            return true;
        }

        if (keyCode === 'Delete') {
            return true;
        }

        if (keyCode === 'Backspace') {
            while (this.template[currentPosition] !== '_' && currentPosition > 0) {
                currentPosition--;
            }
            this.curentString = this.curentString.replaceAt(currentPosition, this.template[currentPosition]);
            this.setInput();
            this.setCursorPosition(currentPosition);
            return true;
        }
        return false;
    }
}

class Page {
    constructor(){
        this.initData();
        this.startObservers();
    }

    message = {
        loading: 'Loading',
        success: 'Thank You! We will contact with you!',
        failure: 'Something wrong!'
    };

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

        //form phone
        this.phoneInput = document.querySelector('.popup-form .popup-form__input');
        this.formPhone = document.querySelector('.main-form');
        this.input = this.formPhone.getElementsByTagName('input');
        this.statusMessage = document.createElement('span');
        this.statusMessage.classList.add('status');
        this.messageIcon = document.createElement('div');
        this.messageIcon.classList.add('message-icon');

        //form contacts
        this.formContacts = document.querySelector('#contact-form');
        this.inputContacts = document.querySelectorAll('#form input');
    }

    startObservers() {
        this.initTabSelector(0);
        this.initClock(this.deadline);
        this.initModal();
        this.initSoftScroll();
        this.initPhoneChecker();
        this.initAjaxPhoneSend();
        this.initAjaxContactsSend();
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
        this.phoneTemplate.clearField();
        this.messageIcon.className = '';
        this.statusMessage.innerHTML = '';
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

    initPhoneChecker() {
        this.phoneTemplate = new PhoneTemplate(this.phoneInput, '+375 (__) ___-__-__', 6);
    }

    _ajaxSendResponce(method, url, formElement) {
        let formData = new FormData(formElement),
            request = new XMLHttpRequest(),
            obj = {};
        formData.forEach((value, key) => {
            obj[key] = value;
        });

        request.open(method, url);
        request.setRequestHeader('Content-Type', 'application/json; charset=utf-8;');
        request.send(JSON.stringify(obj));
        return request;
    }
//1) Подключить скрипт отправки данных с формы к:
//·        Модальному окну
    initAjaxPhoneSend() {
        this.formPhone.addEventListener('submit', (event) => {
            event.preventDefault();
            this.formPhone.appendChild(this.messageIcon);
            this.formPhone.appendChild(this.statusMessage);


            let request = this._ajaxSendResponce('POST', 'server.php', this.formPhone);
            request.addEventListener('readystatechange', () => {
                if (request.readyState < XMLHttpRequest.DONE) {
                    this.statusMessage.innerHTML = this.message.loading;
                    this.messageIcon.classList.add('loading-icon');
                } else if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        this.statusMessage.innerHTML = this.message.success;
                        this.messageIcon.className = 'message-icon success-icon';
                        this.phoneTemplate.clearField();
                    } else {
                        this.statusMessage.innerHTML = this.message.failure;
                        this.messageIcon.className = 'message-icon error-icon';
                    }
                }
            });
        });
    }
//1) Подключить скрипт отправки данных с формы к:
//·        Контактной форме
    initAjaxContactsSend() {
        this.formContacts.addEventListener('submit', (event) => {
            event.preventDefault();
            this.formContacts.appendChild(this.statusMessage);

            let request = this._ajaxSendResponce('POST', 'server.php', this.formContacts);
            request.addEventListener('readystatechange', () => {
                if (request.readyState < XMLHttpRequest.DONE) {
                    this.statusMessage.innerHTML = this.message.loading;
                } else if (request.readyState === XMLHttpRequest.DONE) {
                    if (request.status === 200) {
                        this.statusMessage.innerHTML = this.message.success;
                    } else {
                        this.statusMessage.innerHTML = this.message.failure;
                    }
                }
            });

            for (let i = 0; i < this.inputContacts.length; i++) {
                this.inputContacts[i].value = '';
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
