/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/AjaxSend.js":
/*!*************************!*\
  !*** ./src/AjaxSend.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class AjaxSend {
    ajaxSendResponce(method, url, formElement) {
        return new Promise(function(resolve, reject) {
            let formData = new FormData(formElement),
                request = new XMLHttpRequest(),
                obj = {};
            formData.forEach((value, key) => {
                obj[key] = value;
            });

            request.open(method, url);
            request.setRequestHeader('Content-Type', 'application/json; charset=utf-8;');

            request.onload = function() {
                if (this.status === 200) {
                    resolve(this.response);
                } else {
                    let error = new Error(this.statusText);
                    error.code = this.status;
                    reject(error);
                }
            };

            request.onerror = function() {
                reject(new Error("Network Error"));
            };

            request.send(JSON.stringify(obj));
        });
    }
}
module.exports = AjaxSend;


/***/ }),

/***/ "./src/Calculator.js":
/*!***************************!*\
  !*** ./src/Calculator.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Calculator {
    constructor(calculatorElements) {
        this.persons = calculatorElements.persons;
        this.restDays = calculatorElements.restDays;
        this.place = calculatorElements.place;
        this.calcTotalValue =  calculatorElements.calcTotalValue;
        this.initCalculator();
    }

    _calculate() {
        let personsSum = +this.persons.value,
            daysSum = +this.restDays.value,
            place = +this.place.options[this.place.selectedIndex].value,
            total = 0;

        if (personsSum > 0 && daysSum > 0) {
            total = (daysSum + personsSum) * place * 4000;
        } else {
            total = 0;
        }

        this.calcTotalValue.innerHTML = total.toString();
    }

    initCalculator() {

        this.calcTotalValue.innerHTML = '0';
        this.persons.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^\d]/g, '');
            this._calculate();
        });
        this.restDays.addEventListener('input', (event) => {
            event.target.value = event.target.value.replace(/[^\d]/g, '');
            this._calculate();
        });
        this.place.addEventListener('change', () => this._calculate());
    }
}
module.exports = Calculator;

/***/ }),

/***/ "./src/Clock.js":
/*!**********************!*\
  !*** ./src/Clock.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Clock {
    constructor(deadline, timerId, hoursClass, minutesClass, secondsClass) {
        //timer elements
        let timer = document.getElementById(timerId);
        this.hours = timer.querySelector(hoursClass);
        this.minutes = timer.querySelector(minutesClass);
        this.seconds = timer.querySelector(secondsClass);
        this.initClock(deadline);
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
            'seconds' : seconds < 10 ? '0' + seconds : seconds,
        };
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
}
module.exports = Clock;

/***/ }),

/***/ "./src/ModalWindow.js":
/*!****************************!*\
  !*** ./src/ModalWindow.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class ModalWindow {
    constructor(moreClass, overlayClass, closeClass, moreDescriptionClass, phoneFormClass, phoneTemplate) {
        //modal window elements
        this.more = document.querySelector(moreClass);
        this.overlay = document.querySelector(overlayClass);
        this.close = document.querySelector(closeClass);
        this.moreDescriptionElements = document.querySelectorAll(moreDescriptionClass);
        this.formPhone = document.querySelector(phoneFormClass);
        this.input = this.formPhone.getElementsByTagName('input');

        this.phoneTemplate = phoneTemplate;
        this.initModal();
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
    }

    modalHide() {
        this.overlay.style.display = 'none';
        this.more.classList.remove('more-splash');
        document.body.style.overflow = '';
        if (this.formPhone.querySelector('.status')) {
            this.formPhone.querySelector('.status').remove();
            this.formPhone.querySelector('.message-icon').remove();
        }

    }

}
module.exports = ModalWindow;

/***/ }),

/***/ "./src/PhoneTemplate.js":
/*!******************************!*\
  !*** ./src/PhoneTemplate.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class PhoneTemplate {
    constructor(phoneInputClass, template, startPos) {
        this.phoneInput = document.querySelector(phoneInputClass);
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

module.exports = PhoneTemplate;

/***/ }),

/***/ "./src/Slider.js":
/*!***********************!*\
  !*** ./src/Slider.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class Slider {
    constructor(sliderElements) {
        //slider
        this.sliders = sliderElements.sliders;
        this.prev = sliderElements.prev;
        this.next = sliderElements.next;
        this.dotsWrap = sliderElements.dotsWrap;
        this.dots = sliderElements.dots;

        this.initSlider(0);
    }

    _showSlides() {
        this.slideIndex = this.slideIndex >= this.sliders.length ? 0 : this.slideIndex;
        this.slideIndex = this.slideIndex < 0 ? this.sliders.length - 1 : this.slideIndex;

        this.sliders.forEach((item) => item.style.display = 'none');
        this.dots.forEach((item) => item.classList.remove('dot-active'));

        this.sliders[this.slideIndex].style.display = 'block';
        this.dots[this.slideIndex].classList.add('dot-active');
    }

    _plusSlides(count) {
        this.slideIndex += count;
        this._showSlides();
    }

    _showSlideByNumber(index) {
        this.slideIndex = index;
        this._showSlides();
    }

    initSlider(startIndex = 0) {
        this.slideIndex = startIndex;
        this._showSlides(this.slideIndex);

        this.next.addEventListener('click', () => {
            this._plusSlides(1);
        });

        this.prev.addEventListener('click', () => {
            this._plusSlides(-1);
        });

        this.dotsWrap.addEventListener('click', (event) => {
            this.dots.forEach((item, numb) => {
                if(event.target === item) {
                    this._showSlideByNumber(numb);
                }
            });
        });
    }
}
module.exports = Slider;

/***/ }),

/***/ "./src/SoftScroll.js":
/*!***************************!*\
  !*** ./src/SoftScroll.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class SoftScroll {
    constructor(navigationMenuClass) {
        //navigation menu
        this.navigationMenu = document.querySelector(navigationMenuClass);
        this.initSoftScroll();
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
module.exports = SoftScroll;

/***/ }),

/***/ "./src/TabSelector.js":
/*!****************************!*\
  !*** ./src/TabSelector.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class TabSelector {
    constructor(startTab, tabClass, infoClass, tabContentClass) {
        //tabs elements
        this.tab = document.querySelectorAll(tabClass);
        this.info = document .querySelector(infoClass);
        this.tabContent = document.querySelectorAll(tabContentClass);
        this.initTabSelector(startTab);
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
}

module.exports = TabSelector;

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};
let PhoneTemplate = __webpack_require__(/*! ./PhoneTemplate.js */ "./src/PhoneTemplate.js"),
    TabSelector = __webpack_require__(/*! ./TabSelector.js */ "./src/TabSelector.js"),
    Clock = __webpack_require__(/*! ./Clock.js */ "./src/Clock.js"),
    ModalWindow = __webpack_require__(/*! ./ModalWindow.js */ "./src/ModalWindow.js"),
    SoftScroll = __webpack_require__(/*! ./SoftScroll.js */ "./src/SoftScroll.js"),
    AjaxSend = __webpack_require__(/*! ./AjaxSend.js */ "./src/AjaxSend.js"),
    Slider = __webpack_require__(/*! ./Slider.js */ "./src/Slider.js"),
    Calculator = __webpack_require__(/*! ./Calculator.js */ "./src/Calculator.js");

window.addEventListener('DOMContentLoaded', function () {
    let sliderElements = {
        sliders: document.querySelectorAll('.slider-item'),
        prev: document.querySelector('.prev'),
        next: document.querySelector('.next'),
        dotsWrap: document.querySelector('.slider-dots'),
        dots: document.querySelectorAll('.dot'),
    };

    let calculatorElements = {
        persons: document.querySelectorAll('.counter-block-input')[0],
        restDays: document.querySelectorAll('.counter-block-input')[1],
        place: document.getElementById('select'),
        calcTotalValue: document.querySelector('#total'),
    };

    let tabSelector = new TabSelector(0, '.info-header-tab', '.info-header', '.info-tabcontent'),
        phone = new Clock('2019-5-22 12:00:00', 'timer', '.hours', '.minutes', '.seconds'),
        softScroll = new SoftScroll('nav ul'),
        phoneTemplate = new PhoneTemplate('.popup-form .popup-form__input', '+375 (__) ___-__-__', 6),
        modalWindow = new ModalWindow('.more', '.overlay', '.popup-close', '.description-btn', '.main-form', phoneTemplate),
        ajaxSend = new AjaxSend(),
        slider = new Slider(sliderElements),
        calculator = new Calculator(calculatorElements),
        page = new Page(ajaxSend, phoneTemplate);
});

class Page {
    constructor(ajaxSend, phoneTemplate){
        this.ajaxSend = ajaxSend;
        this.phoneTemplate = phoneTemplate;
        this.initData();
        this.startObservers();
    }

    initData() {
        this.formPhone = document.querySelector('.main-form');
        this.input = this.formPhone.getElementsByTagName('input');

        //form contacts
        this.formContacts = document.querySelector('#contact-form');
        this.inputContacts = document.querySelectorAll('#form input');

        //messages
        this.message = {
            loading: 'Loading',
            success: 'Thank You! We will contact with you!',
            failure: 'Something wrong!'
        };
    }

    startObservers() {
        this.initAjaxPhoneSend();
        this.initAjaxContactsSend();
    }

    initAjaxPhoneSend() {
        this.formPhone.addEventListener('submit', (event) => {
            event.preventDefault();
            let statusMessage = this.formPhone.querySelector('.status'),
                messageIcon = this.formPhone.querySelector('.message-icon');

            if (!statusMessage){
                statusMessage = document.createElement('span');
                statusMessage.className = 'status';
                this.formPhone.appendChild(statusMessage);
            }
            if (!messageIcon){
                messageIcon = document.createElement('div');
                messageIcon.className = 'message-icon';
                this.formPhone.appendChild(messageIcon);
            }

            statusMessage.innerHTML = this.message.loading;
            messageIcon.className = ('message-icon loading-icon');
            this.ajaxSend.ajaxSendResponce('POST', 'server.php', this.formPhone)
                .then(
                    responce =>  {
                        statusMessage.innerHTML = this.message.success;
                        messageIcon.className = 'message-icon success-icon';
                        this.phoneTemplate.clearField();
                    },error =>  {
                        statusMessage.innerHTML = this.message.failure;
                        messageIcon.className = 'message-icon error-icon';
                    }
                );
        });
    }

    initAjaxContactsSend() {
        this.formContacts.addEventListener('submit', (event) => {
            event.preventDefault();
            let statusMessage = this.formContacts.querySelector('.status'),
                messageIcon = this.formContacts.querySelector('.message-icon');

            if (!statusMessage){
                statusMessage = document.createElement('span');
                statusMessage.className = 'status';
                this.formContacts.appendChild(statusMessage);
            }
            if (!messageIcon){
                messageIcon = document.createElement('div');
                messageIcon.className = 'message-icon';
                this.formContacts.appendChild(messageIcon);
            }

            statusMessage.innerHTML = this.message.loading;
            messageIcon.className = ('message-icon loading-icon');
            this.ajaxSend.ajaxSendResponce('POST', 'server.php', this.formContacts)
                .then(
                    responce =>  {
                        statusMessage.innerHTML = this.message.success;
                        messageIcon.className = 'message-icon success-icon';
                        for (let i = 0; i < this.inputContacts.length; i++) {
                            this.inputContacts[i].value = '';
                        }
                        setTimeout(()=>{
                            statusMessage.remove();
                            messageIcon.remove();
                        }, 5000);
                    },error =>  {
                        statusMessage.innerHTML = this.message.failure;
                        messageIcon.className = 'message-icon error-icon';
                    }
                );
        });
    }
}




/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map