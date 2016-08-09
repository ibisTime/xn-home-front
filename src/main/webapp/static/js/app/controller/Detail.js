define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base, Ajax, Handlebars) {
    $(function () {
        var template = __inline("../ui/error-fragment.handlebars");
        var code = base.getUrlParam("code");
        Ajax.get(APIURL + '/company/case/list',
            {"code": code, "companyCode": COMPANYCODE}, true)
            .then(function (res) {
                if(res.success){
                    var data = res.data;
                    if(data.length){
                        data = data[0];
                        if(!data.barCode){
                            data.barCode = "/static/images/ttt.png";
                        }
                        $(".icon-loading").remove();
                        $("#barCode").attr("src", data.barCode);
                        $("#pic").attr("src", data.picture);
                        if(data.status == "1"){
                            $("#barCode").css({
                                "border": "1px solid #666"
                            });
                        }
                        $("#desc").text(data.description);
                    }else{
                        doError();
                    }
                }else{
                    doError();
                }
            });
        
        function doError() {
            $(".icon-loading").remove();
            $("#d-top-imgs").hide();
            $("#desc").replaceWith(template);
        }
    });
});
