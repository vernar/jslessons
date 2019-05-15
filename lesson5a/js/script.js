'use strict';

//· Восстановить порядок в меню, добавить пятый пункт
let menuItem = document.getElementsByClassName('menu-item');
let menu = document.querySelector('.menu');
let menuSecondItem = menu.replaceChild(menuItem[1], menuItem[2]);
menu.insertBefore(menuSecondItem, menuItem[1]);

//· Заменить картинку заднего фона на другую из папки img
let bodyElement = document.getElementsByTagName('body');
bodyElement[0].style.backgroundImage = 'url(img/apple_true.jpg)';

//  Поменять заголовок, добавить слово "подлинную"
//  ( Получится - "Мы продаем только подлинную технику Apple")
let titleElement = document.getElementById('title');
titleElement.textContent = 'Мы продаем только подлинную технику Apple';

//· Удалить рекламу со страницы
let columnElements = document.getElementsByClassName('column');
let promoElements = document.getElementsByClassName('adv');
columnElements[1].removeChild(promoElements[0]);

//Спросить у пользователя отношение к технике apple и записать
// ответ в блок на странице с id "prompt"
let answer = prompt("Как вы относитесь к технике apple", 'Хорошо');
let promptElement = document.getElementById('prompt');
promptElement.innerHTML = '<h3>' + answer + '</h3>';