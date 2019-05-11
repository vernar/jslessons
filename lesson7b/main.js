'use strict';
document.addEventListener('DOMContentLoaded', function () {

    let boll = document.querySelector('#boll'),
        startButton = document.querySelector('#start-button'),
        coordX = 0,
        coordY = 0,
        start = performance.now();


    (function() {
      let requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
      window.requestAnimationFrame = requestAnimationFrame;
    })();

    function step(timestamp) {
        let timeLeft = timestamp - start;
        coordX = timeLeft / 10; // 100 пикселей в секунду
        coordY = timeLeft / 10;
        boll.style.left = coordX + 'px';
        boll.style.top = coordY + 'px';

      if (coordX < 900 || coordY < 900) {
        requestAnimationFrame(step);
      }
    }

    startButton.addEventListener('click', function () {
        start = performance.now();
        coordX = 1;
        coordY = 0;
        requestAnimationFrame(step);
    });
});

