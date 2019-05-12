//2) Используя синтаксис ES6 в отдельном документе:
// - Создать класс options
// - Он должен содержать свойства: height, width, bg, fontSize, textAlign
// - Он должен содержать метод, создающий новый div на странице, записывающий
// в него любой текст и при помощи cssText изменять свой стиль из переданных параметров
// - Создать новый объект через класс
// - Вызвать его метод и получить элемент на странице

'use strict';

class Option {
    constructor(height = 0, width = 0, bg = 0, fontSize = 0, textAlign = 'center') {
        this.height = height;
        this.width = width;
        this.bg = bg;
        this.fontSize = fontSize;
        this.textAlign = textAlign;

        this.content = document.querySelector('.content');
    }

    createNewDiv(text) {
        let newDiv = document.createElement('div');
        newDiv.innerHTML = text;
        newDiv.style.cssText = `height: ${this.height}px; width: ${this.width}px; background: ${this.bg}; font-size: ${this.fontSize}px; text-align: ${this.textAlign};`;
        this.content.appendChild(newDiv);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    let option = new Option(100, 100, 'red', 15, 'center');
    option.createNewDiv('hello world');
});
