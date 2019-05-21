'use strict';

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