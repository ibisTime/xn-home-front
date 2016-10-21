define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    var COMPANYCODE = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            base.addIcon();
            if(sessionStorage.getItem("wxMenuCode")){
                var name = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(name);
                var idxCode;
                //首页菜单code
                if(idxCode = sessionStorage.getItem("wxIndexCode")){
                    getBanner(idxCode);
                }else{
                    getWXCode();
                }
            }else{
                getWXCode();
            }
        }else{
            base.getCompanyByUrl()
                .then(function(){
                    if(COMPANYCODE = sessionStorage.getItem("compCode")){
                        base.addIcon();
                        getWXCode();
                    }else{
                        $(".icon-loading").remove();
                        base.showMsg("非常抱歉，暂时无法获取公司信息!");
                    }
                });
        }
    }
    function getBanner(code){
        base.getBanner(COMPANYCODE, code)
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img class="wp100 hp100" src="'+data[i].pic+'"></div>';
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
                        //微信首页菜单
                        }else if(/^inw/.test(list[i].code)){
                            sessionStorage.setItem("wxIndexCode", list[i].code);
                            getBanner(list[i].code);
                        //微信我要合作菜单
                        }else if(/^cin/.test(list[i].code)){
                            sessionStorage.setItem("wxCoopCode", list[i].code);
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
