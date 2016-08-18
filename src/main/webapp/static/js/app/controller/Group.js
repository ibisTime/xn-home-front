define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base, Ajax, Handlebars) {
    var errorTemplate = __inline("../ui/error-fragment.handlebars");
    $(function () {
        Ajax.get(APIURL + '/company/worker/list', {companyCode: COMPANYCODE}, true)
            .then(function (res) {
                $(".icon-loading").remove();
                if(res.success){
                    var data = res.data, html = "";
                    if(data.length){
                        for(var i = 0, len = data.length; i < len; i++){
                            var dd = data[i];
                            if(dd.status == "9"){
                                $("#topImg").html('<img class="wp100" src="' + data[i].picture + '"/>');
                            }else{
                                html += '<a class="b_e6_b b_e6_t bg_fff show mb6" href="javascript:void(0)">' +
                                    '<div class="wp100 plr10 clearfix">' +
                                    '<div class=" ptb20 fl wp36 clearfix">' +
                                    '<img class="mr20 " src="'+dd.picture+'">' +
                                    '<div class="mt10 s_11 break-word">ÐÕÃû£º'+dd.name+' </br>Ö°Î»£º'+dd.position+'</div>' +
                                    '</div>' +
                                    '<div class="ptb20 t-i2 wp60 fr s_11 break-word">'+dd.description+'</div>' +
                                    '</div>' +
                                    '</a>';
                            }
                        }
                        $("#group").replaceWith(html);
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
