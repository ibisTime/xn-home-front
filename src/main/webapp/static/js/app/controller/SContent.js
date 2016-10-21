define([
    'app/controller/base',
    'app/util/ajax'
], function (base, Ajax) {
    var code = base.getUrlParam("code");
    var COMPANYCODE, wxMenuCode = "", wxMenuName = "";
    init();
    function init(){
        if(code){
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
                            if(wxMenuCode = sessionStorage.getItem("wxMenuCode")){
                                wxMenuName = sessionStorage.getItem("wxMenuName");
                                $("#wxdjcd").text(wxMenuName);
                            }else{
                                getWXCode();
                            }
                        }else{
                            base.showMsg("非常抱歉，暂时无法获取公司信息!")
                        }
                    });
            }
            getContent();
        }else{
            base.showMsg("未传入菜单编号!");
        }
    }

    function getContent(){
        base.getContentList(code)
            .then(function(res){
                if(res.success){
                    var data = res.data[0];
                    $("#title").text(data.title);
                    var pic = data.pic2;
                    if(pic){
                        $("#img").html('<img class="wp100" src="'+pic+'">');
                    }else if(data.url){
                        $("#img").html("<iframe height='300' width='100%' src='"+data.url+"' frameborder=0 'allowfullscreen'></iframe>");
                    }
                    $("#description").html(data.description);
                }else{
                    base.showMsg("非常抱歉，暂时无法获取相关内容!");
                }
            });
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
