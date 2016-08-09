define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base, Ajax, Handlebars) {
    var template = __inline("../ui/company-group.handlebars"),
        errorTemplate = __inline("../ui/error-fragment.handlebars");
    $(function () {
        Ajax.get(APIURL + '/company/worker/list', {companyCode: COMPANYCODE}, true)
            .then(function (res) {
                $(".icon-loading").remove();
                if(res.success){
                    var data = res.data, html = "";
                    if(data.length){
                        for(var i = 0, len = data.length; i < len; i++){
                            if(data[i].status == "9"){
                                $("#topImg").html('<img class="wp100" src="' + data[i].picture + '"/>');
                                data.splice(i, 1);
                                break;
                            }
                        }
                        $("#group").replaceWith(template({items: data}));
                    }else{
                        $("#topImg").remove();
                        $("#group").replaceWith(errorTemplate);
                    }
                }else{
                    $("#topImg").remove();
                    $("#group").replaceWith(errorTemplate);
                }
            });
    });
});
