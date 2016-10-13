define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    var COMPANYCODE = "", wxMenuCode = "", wxMenuName = "";
    var start = 1, limit = 10, isEnd = false, canScrolling = false, first = true;
    init();
    function init(){
        if(COMPANYCODE = sessionStorage.getItem("compCode")){
            getMyContent();
        }else{
            base.getCompanyByUrl().then(function(){
                if(COMPANYCODE = sessionStorage.getItem("compCode")){
                    getMyContent();
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!");
                }
            });
        }
        addListeners();
    }

    function addListeners(){
        $(window).on("scroll", function(){
            if( canScrolling && !isEnd && ($(document).height() - $(window).height() - 10 <= $(document).scrollTop()) ){
                canScrolling = false;
                getContentPage();
            }
        });
    }

    function getMyContent(){
        if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
            wxMenuName = sessionStorage.getItem("wxMenuName");
            $("#wxdjcd").text(wxMenuName);
            getContentPage();
            getBanner();
        }else{
            getWXCode().then(function(){
                getContentPage();
                getBanner();
            });
        }
    }

    function getWXCode(){
        return base.getWXMenuCode(COMPANYCODE)
            .then(function(){
                var code, name;
                wxMenuCode = data[0].code;
                wxMenuName = data[0].name;
                sessionStorage.setItem("wxMenuCode", wxMenuCode)
                sessionStorage.setItem("wxMenuName", wxMenuName);
                $("#wxdjcd").text(wxMenuName);
            });
    }
    function getContentPage(){
        base.getContentPage(wxMenuCode, start, limit)
            .then(function(res){
                if(res.success){
                    var list = res.data.list, html = "",
                        totalCount = +data.totalCount;
                    if(totalCount <= limit || list.length < limit){
                        isEnd = true;
                    }
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        html += '<li class="wp50 fl">'+
                                    '<div class="plr12">'+
                                        '<div class="p">';
                        if(ll.type == "0" || ll.url){
                            if(ll.url){
                                html += '<a class="re wp100" href="'+ll.url+'">';
                            }else{
                                html += '<a class="re wp100" href="'+ll.endNote+'">';
                            }
                        }else{
                            html += '<a class="re wp100" href="./content.html?code='+ll.code+'">';
                        }
                        html += '<div><img class="p-pic" src="'+ll.picture1+'"/></div>'+
                                        '</a>'+
                                    '</div>'+
                                    '<div class="mt14 t-3dot">'+ll.title+'</div>'+
                                '</div>'+
                            '</li>';
                    }
                    $("#customUl").append(html);
                    start++;
                    first = false;
                    canScrolling = true;
                }else{
                    if(first){
                        base.showMsg("非常抱歉，暂时无法获取数据!");
                    }
                }
            })
    }
    function getBanner(){
        base.getBanner(COMPANYCODE, 2)
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