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

    _checkValue(element, preValue) {
        let inputValue = element.value,
            inputPosition = element.selectionStart < 1 ? 0 : element.selectionStart-1;

        if (isNaN(parseInt(inputValue[inputPosition]))){
            element.value = preValue;
            element.setSelectionRange(inputPosition,inputPosition);
        }
    }

    initCalculator() {
        let prevPersonsValue = '',
            prevRestDaysValue = '';

        this.calcTotalValue.innerHTML = '0';
        this.persons.setAttribute('type', 'input');
        this.restDays.setAttribute('type', 'input');

        this.persons.addEventListener('input', (event) => {
            this._checkValue(this.persons, prevPersonsValue);
            this._calculate();
            prevPersonsValue = this.persons.value;
        });
        this.restDays.addEventListener('input', () => {
            this._checkValue(this.restDays, prevRestDaysValue);
            this._calculate();
            prevRestDaysValue = this.restDays.value;
        });
        this.place.addEventListener('change', () => this._calculate());
    }
}
module.exports = Calculator;