'use strict';
$(document).ready(() => {
    function toggleModal() {
        $('.overlay').fadeToggle('slow');
        $('.modal')
            .fadeToggle('slow')
            .css({top:-800,position:'absolute'})
            .animate({
            top: 0,
        }, 1000);
    }


    $('.list-item:first').hover(() => {
        $(this).toggleClass('active');
    });

    $('.main_btna').on('click', () => toggleModal());
    $('.main_btn').on('click', () => toggleModal());
    $(".main_nav [href^='#sheldure']").on('click', () => toggleModal());

    $('.overlay').on('click', () => toggleModal());


});