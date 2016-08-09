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
                    var html1 = '<div class="mtb4 s_11 tc">',
                    	html2 = '<div class="mtb4 s_11 tc">',
                    	html3 = '<div class="mtb4 s_11 tc">',
                        count1 = 0, count2 = 0, count3 = 0;
                    var data = res.data;
                    if(data.length){
                        data.forEach(function (d) {
                            if(d.kind == 1){
                            	html1+= '<a class="tag ml20 mt10 tc .s_11" href="./component.html?code='+d.code+'&n='+d.name+'">'+d.name+'</a>';
                            }else if(d.kind == 2){
                            	html2+= '<a class="tag ml20 mt10 tc .s_11" href="./component.html?code='+d.code+'&n='+d.name+'">'+d.name+'</a>';
                            }else if(d.kind == 3){
                            	html3+= '<a class="tag ml20 mt10 tc .s_11" href="./component.html?code='+d.code+'&n='+d.name+'">'+d.name+'</a>';
                            }
                        });
                        $("#mxc").html(html1 || '<div style="text-align: center;padding: 10px 0;">暂无数据！</div>');
                        $("#mkc").html(html2 || '<div style="text-align: center;padding: 10px 0;">暂无数据！</div>');
                        $("#zjc").html(html3 || '<div style="text-align: center;padding: 10px 0;">暂无数据！</div>');
                    }else{
                        doError();
                    }
                }else {
                    doError();
                }
            });

        function doError() {
            $("#mxc").html('<div style="text-align: center;padding: 10px 0;">暂无数据！</div>');
            $("#mkc").html('<div style="text-align: center;padding: 10px 0;">暂无数据！</div>');
            $("#zjc").html('<div style="text-align: center;padding: 10px 0;">暂无数据！</div>');
        }
    });
});
