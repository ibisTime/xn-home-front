define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    $(function () {
        play();
        function play(){
            $('#bg-video')[0].play();
        }

        function doError() {
          
        }
    });
});
