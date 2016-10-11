define([
    'app/controller/base',
    'lib/swiper'
], function (base, Swiper) {
    // setTimeout(function () {
    //     location.href = "../case/success.html";
    // }, 900);
    var mySwiper = new Swiper('.swiper-container', {
        autoplay: 5000,//可选选项，自动滑动
        pagination: '.swiper-pagination'
    })
});
