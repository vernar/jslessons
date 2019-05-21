'use strict';

String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
};

class Page {
    constructor(){
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
            ajaxSend.ajaxSendResponce('POST', 'server.php', this.formPhone)
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
            ajaxSend.ajaxSendResponce('POST', 'server.php', this.formContacts)
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

window.addEventListener('DOMContentLoaded', function () {

    let PhoneTemplate = require('./PhoneTemplate.js'),
        TabSelector = require('./TabSelector.js'),
        Clock = require('./Clock.js'),
        ModalWindow = require('./ModalWindow.js'),
        SoftScroll = require('./SoftScroll.js'),
        AjaxSend = require('./AjaxSend.js'),
        Slider = require('./Slider.js'),
        Calculator = require('./Calculator.js');

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
        modalWindow = new ModalWindow('.more', '.overlay', '.popup-close', '.description-btn'),
        softScroll = new SoftScroll('nav ul'),
        phoneTemplate = new PhoneTemplate('.popup-form .popup-form__input', '+375 (__) ___-__-__', 6),
        ajaxSend = new AjaxSend(),
        slider = new Slider(sliderElements),
        calculator = new Calculator(calculatorElements),
        page = new Page();
});
