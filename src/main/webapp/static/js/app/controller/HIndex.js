define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    var COMPANYCODE = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            getBanner();
            base.addIcon();
            if(sessionStorage.getItem("wxMenuCode")){
                var name = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(name);
            }else{
                getWXCode();
            }
        }else{
            base.getCompanyByUrl()
                .then(function(){
                    if(COMPANYCODE = sessionStorage.getItem("compCode")){
                        getBanner();
                        base.addIcon();
                        getWXCode();
                    }else{
                        $(".icon-loading").remove();
                        base.showMsg("非常抱歉，暂时无法获取公司信息!");
                    }
                });
        }
    }
    function getBanner(){
        base.getBanner(COMPANYCODE, "B_Mobile_SY")
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img class="wp100 hp100" src="'+data[i].pic+'"></div>';
                    }
                    if(data.length == 1){
                        $("#swiper-pagination").remove();
                    }
                    $("#swr").html(html);
                    swiperImg();
                }
                $(".icon-loading").remove();
            });
    }
    function getWXCode(){
        base.getMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var list = res.data;
                    for(var i = 0; i < list.length; i++){
                        //微信顶级菜单
                        if(/^wei/.test(list[i].code)){
                            sessionStorage.setItem("wxMenuCode", list[i].code)
                            sessionStorage.setItem("wxMenuName", list[i].name);
                            sessionStorage.setItem("wxMenuType", list[i].contentType);
                            $("#wxdjcd").text(list[i].name);
                        //公司简介菜单
                        }else if(/^com/.test(list[i].code)){
                            sessionStorage.setItem("compMCode", list[i].code);
                        }
                    }
                }
            });
    }
    
    function swiperImg(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
    }
});
