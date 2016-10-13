define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper'
], function (base, Ajax, Swiper) {
    var COMPANYCODE = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            if(sessionStorage.getItem("wxMenuCode")){
                var name = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(name);
                getBanner();
            }else{
                getWXCodeAndBanner();
            }
        }else{
            base.getCompanyByUrl().then(function(){
                if(COMPANYCODE = sessionStorage.getItem("compCode")){
                    getWXCodeAndBanner();
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!");
                }
            });
        }
    }
    function getBanner(){
        base.getBanner(COMPANYCODE, 2)
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img class="backa" src="'+data[i].url+'"></div>';
                    }
                    $("#swr").html(html);
                    swiperImg();
                }
                $(".icon-loading").remove();
            });
    }
    function getWXCode(){
        base.getWXMenuCode(COMPANYCODE)
            .then(function(){
                var code, name;
                sessionStorage.setItem("wxMenuCode", data[0].code)
                sessionStorage.setItem("wxMenuName", data[0].name);
                $("#wxdjcd").text(data[0].name);
            });
    }
    function getWXCodeAndBanner(){
        getWXCode();
        getBanner();
    }
    
    function swiperImg(){
        var mySwiper = new Swiper('.swiper-container', {
            autoplay: 2000,//可选选项，自动滑动
            pagination: '.swiper-pagination'
        });
    }
});
