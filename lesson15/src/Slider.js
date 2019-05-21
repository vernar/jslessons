'use strict';

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