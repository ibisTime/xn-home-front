define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {
    var COMPANYCODE = "";
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            getCompany()
                .then(function(){
                    getCompMenuList();
                    getBanner();
                });
            if(sessionStorage.getItem("wxMenuCode")){
                var name = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(name);
            }else{
                getWXCode();
            }
        }else{
            base.getCompanyByUrl().then(function(res){
                if(COMPANYCODE = sessionStorage.getItem("compCode")){
                    addCompanyInfo(res.data);
                    getCompMenuList();
                    getWXCode()
                        .then(function(){
                            getBanner();
                        });
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!");
                }
            });
        }
    }

    function getCompany(){
        return base.getCompany()
            .then(function(res){
                if(res.success){
                    addCompanyInfo(res.data);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!")
                }
            });
    }

    function addCompanyInfo(data){
        $("#logo").html('<img class="wp200p" src="'+data.logo+'"/>');
        $("#slogan").text(data.slogan);
    }

    function getCompMenuList(){
        base.getCompMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var list = res.data,
                        html = '<a href="./adress.html" class="plr10 p_r b_e6_b show">公司简介<i class="r-tip"></i></a>';
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        if(ll.contentType == "ele"){
                            html += '<a href="./s_content.html?code='+ll.code+'" class="plr10 p_r b_e6_b show">'+ll.name+'<i class="r-tip"></i></a>';
                        }else{
                            html += '<a href="./list.html?code='+ll.code+'" class="plr10 p_r b_e6_b show">'+ll.name+'<i class="r-tip"></i></a>';
                        }
                    }
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!")
                }
            });
    }

    function getBanner(){
        base.getBanner(COMPANYCODE, 4)
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img src="'+data[i].url+'"></div>';
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
    function swiperImg(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
    }
});
