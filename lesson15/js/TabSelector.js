'use strict';

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