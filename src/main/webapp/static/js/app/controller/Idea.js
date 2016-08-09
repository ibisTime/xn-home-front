define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base, Ajax, Handlebars) {
    var template = __inline("../ui/company-idea.handlebars"),
        errorTemplate = __inline("../ui/error-fragment.handlebars");
    $(function () {
        Ajax.get(APIURL + '/company/ideas',{"companyCode": COMPANYCODE}, true)
            .then(function (res) {
                $(".icon-loading").remove();
                if(res.success){
                    var data = res.data, html = "";
                    if(data.length){
                        data.forEach(function (dd) {
                            var tmplArr = dd.description;
                            var desc = dd.slogan + "<br>" + tmplArr;
                            
                            /*for(var i = 0, len = arr.length; i < len; i++){
                                if(i < (len - 1)){
                                	desc += (arr[i] + "<br>");
                                }else{
                                	desc += arr[i];
                                }
                            }*/
                            
                            html += '<a class="wp100 mb1r" href="#">' +
                                '<div class="wp100 bg_fff b_e6_tb ptb20 plr10 s_11 clearfix">' +
                                '<img class="wp38 fl mt-04r" src="'+dd.picture+'">' +
                                '<div class="fr wp62 pl16">'+desc+'</div>' +
                                '</div></a>';
                        });
                        $("#ideaR").replaceWith(html);
                    }else{
                        $("#i-tip").hide();
                        $("#ideaR").replaceWith(errorTemplate);
                    }
                }else{
                    $("#i-tip").hide();
                    $("#ideaR").replaceWith(errorTemplate);
                }
            });
    });
});
