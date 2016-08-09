define([
    'app/controller/base',
    'lib/appear',
    'lib/swiper'
], function(base, Appear, Swiper) {

    var mySwiper = new Swiper('.swiper-container', {
        spaceBetween: 0,
        //effect : 'flip',
        observer: true,
        observeParents: true,
        threshold: 3,
        simulateTouch: false
    });

    $('.animated').appear(function() {
        var elem = $(this);
        var animation = elem.data('animation');
        if ( !elem.hasClass('visible') ) {
            var animationDelay = elem.data('animation-delay');
            if ( animationDelay ) {
                setTimeout(function(){
                    elem.addClass( animation + " visible" );
                }, animationDelay);
            } else {
                elem.addClass( animation + " visible" );
            }
        }
    });
    setTimeout(function() {
        $('#bg-video')[0].play();
    }, 2000);
    $("#leadUl>li").hover(function (e) {
        $(this).addClass('active').siblings("li.active").removeClass("active");
    }, function (e) {
        $(this).removeClass('active')
    });
});