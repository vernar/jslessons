'use strict';

class ModalWindow {
    constructor(moreClass, overlayClass, closeClass, moreDescriptionClass) {
        //modal window elements
        this.more = document.querySelector(moreClass);
        this.overlay = document.querySelector(overlayClass);
        this.close = document.querySelector(closeClass);
        this.moreDescriptionElements = document.querySelectorAll(moreDescriptionClass);
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
        this.formPhone.querySelector('.status').remove();
        this.formPhone.querySelector('.message-icon').remove();
    }

}
module.exports = ModalWindow;