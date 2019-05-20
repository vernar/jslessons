'use strict';
$(document).ready(() => {
    function toggleModal() {
        let yStartPos = -800,
            yEndPos = 0;
        if ($('.overlay').first().css('display') === "block") {
            yStartPos = 0;
            yEndPos = -800;
        }

        $('.overlay').fadeToggle('slow');
        $('.modal')
            .css({display:'block',top: yStartPos,position:'absolute'})
            .animate({
            top: yEndPos,
        }, 1000);
    }

    $('.list-item:first').hover(() => {
        $(this).toggleClass('active');
    });

    $('.main_btna').on('click', () => toggleModal());
    $('.main_btn').on('click', () => toggleModal());
    $(".main_nav [href^='#sheldure']").on('click', () => toggleModal());

    $('.overlay').on('click', () => toggleModal());
    $('.close').on('click', () => toggleModal());
});