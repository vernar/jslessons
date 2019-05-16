
let inputRub = document.getElementById('rub'),
    inputUsd = document.getElementById('usd');

inputRub.addEventListener('input', () => {

    function sendAjax(method, url) {
        return new Promise(function(resolve, reject) {
            let request = new XMLHttpRequest();
            request.open(method, url);
            request.setRequestHeader('Content-type', 'application/json; charset=utf-8');

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

            request.send();
        });
    }

    sendAjax('GET', 'js/current.json')
        .then(responce => {
            let data = JSON.parse(response);
            inputUsd.value = inputRub.value / data.usd;
        },error => {
            inputUsd.value = `Что-то пошло не так! error - ${error}`;
        });

});