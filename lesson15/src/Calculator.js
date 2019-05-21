'use strict';

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