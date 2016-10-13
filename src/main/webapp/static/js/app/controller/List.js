define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {
    var start = 1, limit = 10, isEnd = false,
        canScrolling = false, first = true,
        code = base.getUrlParam("code");
    init();
    function init(){
        getContentPage();
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

    function getContentPage(){
        base.getContentPage(code, start, limit)
            .then(function(res){
                if(res.success){
                    var list = res.data.list, html = "",
                        totalCount = +data.totalCount;
                    if(totalCount <= limit || list.length < limit){
                        isEnd = true;
                    }
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        html += '<li class="wp100 b_e6_b">';
                        if(ll.type == "0" || ll.url){
                            if(ll.url){
                                html += '<a href="'+ll.url+'">'
                                            '<div class="plr12 ptb10 clearfix">'+
                                                '<div class="fl wp30 tl"><img class="max-hp100p" src="'+ll.picture1+'"/></div>'+
                                                '<div class="fl wp55 plr6">'+ll.title+'</div>'+
                                                '<div class="fl wp15 s_10">'+ll.endNote+'</div>'+
                                            '</div>'+
                                        '</a></li>';
                            }else{
                                html += '<a href="'+ll.endNote+'">'
                                            '<div class="plr12 ptb10 clearfix">'+
                                                '<div class="fl wp30 tl"><img class="max-hp100p" src="'+ll.picture1+'"/></div>'+
                                                '<div class="fl wp55 plr6">'+ll.title+'</div>'+
                                            '</div>'+
                                        '</a></li>';
                            }
                        }else{
                            html += '<a href="../custom/content.html?code='+ll.code+'">'
                                        '<div class="plr12 ptb10 clearfix">'+
                                            '<div class="fl wp30 tl"><img class="max-hp100p" src="'+ll.picture1+'"/></div>'+
                                            '<div class="fl wp55 plr6">'+ll.title+'</div>'+
                                            '<div class="fl wp15 s_10">'+ll.endNote+'</div>'+
                                        '</div>'+
                                    '</a></li>';
                        }
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
});