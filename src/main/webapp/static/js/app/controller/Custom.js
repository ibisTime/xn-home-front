define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    $(function () {
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
        Ajax.get(APIURL + '/company/product/list', {companyCode: COMPANYCODE}, true)
            .then(function (res) {
                if(res.success){
                }else {
                    doError();
                }
            });

        function doError() {
          
        }
    });
});
