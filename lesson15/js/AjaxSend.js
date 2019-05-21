'use strict';

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
