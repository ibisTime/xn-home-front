define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base, Ajax, Handlebars) {
    $(function () {
        var template = __inline("../ui/error-fragment.handlebars"),
            code = base.getUrlParam("code"),
            name = base.getUrlParam("n");
        document.title = name;
        var $iframe = $('<iframe src="/static/images/favicon.ico"></iframe>');
        $iframe.on('load',function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0);
        }).appendTo($("body"));
        Ajax.get(APIURL + '/company/product/list',
            {"code": code, "companyCode": COMPANYCODE})
            .then(function (res) {
                $(".icon-loading").remove();
                if (res.success) {
                    var data = res.data;
                    if(data.length){
                        data = data[0];
                        $("#comImg").attr("src", data.picture);
                        $("#comCont").text(data.description);
                    }else{
                        doError();
                    }
                }else{
                    doError();
                }
            });

        function doError() {
            $("#comImg").parent().remove();
            $("#comCont").parent().removeClass("mt20");
            $("#comCont").replaceWith(template);
        }
    })
});
