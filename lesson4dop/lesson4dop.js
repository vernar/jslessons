'use strict';

function getFriendlyNumbers(start, end) {

    let friendlyNumbers = {
        getDividers: function (nuber) {
            let result = [];
            let limit = nuber / 2 + 1;
            for (let i = 1; i < limit; i++) {
                if (nuber % i === 0) {
                    result.push(i);
                }
            }
            return result;
        },
        getSummArray: function (array) {
            let result = 0;
            for (let val of array) {
                result += val;
            }
            return result;
        },
        getSummDeviders(number) {
            return this.getSummArray(this.getDividers(number));
        },
        checkValues: function (start, end) {
            if (typeof start === 'number'
                && typeof end === 'number'
                && start <= end
                && start > 0
                && end > 0
                && Number.isInteger(start)
                && Number.isInteger(end)
            ){
                return true;
            }
            return false;
        },
        fire: function (start, end) {
            if (this.checkValues(start, end) === false) {
                return false;
            }
            let result = [];
            for (let i = start; i <= end; i++) {
                let devI = this.getSummDeviders(i);
                for (let j = i + 1; j <= end; j++) {
                    if ( devI === j && this.getSummDeviders(j) === i){
                        result.push([i, j])
                    }
                }
            }
            return result;
        }
    };

    return friendlyNumbers.fire(start, end);
}


console.log(getFriendlyNumbers(1, 10000));