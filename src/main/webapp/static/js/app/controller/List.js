define([
    'app/controller/base'
], function (base) {
    var start = 1, limit = 10, isEnd = false,
        canScrolling = false, first = true,
        code = base.getUrlParam("code"),
        name = base.getUrlParam("name"),
        COMPANYCODE, wxMenuCode = "", wxMenuName = "";
    init();
    function init(){
        if(code){
            getContentPage();
            if(COMPANYCODE = sessionStorage.getItem("compCode")){
                base.addIcon();
                if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                    wxMenuName = sessionStorage.getItem("wxMenuName");
                    $("#wxdjcd").text(wxMenuName);
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
                            base.showMsg("非常抱歉，暂时无法获取公司信息!");
                        }
                    });
            }
            addListeners();
        }else{
            base.showMsg("未传入菜单编号!");
        }
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
        addTitle();
        base.getContentPage(code, start, limit)
            .then(function(res){
                if(res.success){
                    var list = res.data.list, html = "",
                        totalCount = +res.data.totalCount;
                    if(totalCount <= limit || list.length < limit){
                        isEnd = true;
                    }
                    for(var i = 0; i < list.length; i++){
                        var ll = list[i];
                        html += '<li class="wp100 b_e6_b">';


                        //站内
                        if(ll.kind == 1){
                            //尾注是上传的
                            if(ll.type == "0"){
                                html += '<a class="show" href="'+ll.endNote+'">'+
                                            '<div class="plr12 ptb10 clearfix">'+
                                                '<div class="inline_block wp30 tl va-m"><img class="max-hp100p" src="'+ll.pic1+'"/></div>'+
                                                '<div class="inline_block wp55 plr6 va-m">'+ll.title+'</div>'+
                                                '<div class="inline_block s_10 tr va-t endNote">点击下载</div>'+
                                            '</div>'+
                                        '</a></li>';
                            }else{
                                html += '<a class="show" href="../custom/content.html?code='+ll.code+'">'+
                                            '<div class="plr12 ptb10 clearfix">'+
                                                '<div class="inline_block wp30 tl va-m"><img class="max-hp100p" src="'+ll.pic1+'"/></div>'+
                                                '<div class="inline_block wp55 plr6 va-m">'+ll.title+'</div>'+
                                                '<div class="inline_block s_10 tr va-t endNote">'+(ll.endNote || "")+'</div>'+
                                            '</div>'+
                                        '</a></li>';
                            }
                        //站外
                        }else{
                            html += '<a class="show" href="'+ll.url+'">'+
                                        '<div class="plr12 ptb10 clearfix">'+
                                            '<div class="inline_block wp30 tl va-m"><img class="max-hp100p" src="'+ll.pic1+'"/></div>'+
                                            '<div class="inline_block wp55 plr6 va-m">'+ll.title+'</div>'+
                                        '</div>'+
                                    '</a></li>';
                        }
                    }
                    first && $(".icon-loading").remove();
                    $("#customUl").append(html);
                    start++;
                    first = false;
                    canScrolling = true;
                }else{
                    if(first){
                        base.showMsg("非常抱歉，暂时无法获取数据!");
                        $(".icon-loading").remove();
                    }
                }
            })
    }
    function addTitle(){
        if(name){
            document.title = name;
            var $iframe = $('<iframe src="/static/images/favicon.ico"></iframe>');
            $iframe.on('load',function() {
                setTimeout(function() {
                    $iframe.off('load').remove();
                }, 0);
            }).appendTo($("body"));
        }
    }
    function getWXCode(){
        return base.getMenuList(COMPANYCODE)
            .then(function(res){
                if(res.success){
                    var list = res.data;
                    for(var i = 0; i < list.length; i++){
                        if(/^wei/.test(list[i].code)){
                            wxMenuCode = list[i].code;
                            wxMenuName = list[i].name;
                            sessionStorage.setItem("wxMenuCode", wxMenuCode)
                            sessionStorage.setItem("wxMenuName", wxMenuName);
                            $("#wxdjcd").text(wxMenuName);
                            sessionStorage.setItem("wxMenuType", list[i].contentType);
                        //公司简介菜单
                        }else if(/^com/.test(list[i].code)){
                            sessionStorage.setItem("compMCode", list[i].code);
                        //微信首页菜单
                        }else if(/^inw/.test(list[i].code)){
                            sessionStorage.setItem("wxIndexCode", list[i].code);
                        //微信我要合作菜单
                        }else if(/^cin/.test(list[i].code)){
                            sessionStorage.setItem("wxCoopCode", list[i].code);
                        }
                    }
                }
            });
    }
});