define([
    'app/controller/base',
    'app/util/ajax',
    'Handlebars'
], function (base,  Ajax, Handlebars) {
    $(function () {
        var template = __inline('../ui/case-success.handlebars');
        Ajax.get(APIURL + '/company/case/list', {"companyCode": COMPANYCODE}, true)
            .then(function (res) {
                if(res.success){
                    var data = res.data, html = '', flag = true;
                    if(data.length){
                        var items = [];
                        data.forEach(function(dd){
                            if(dd.status == "1" && flag){
                                $("#topImg").attr("src", dd.picture);
                                $("#topa").attr("href", "./detail.html?code=" + dd.code);
                                flag = false;
                            }else{
                                dd.funds = base.fmoney(+dd.funds);
                                dd.status = base.dict["caseStatus"][dd.status] || "未知状态";
                                dd.description = dd.description.replace(/(?:<\/?[^>]*>)/gi, "");
                                if(dd.description.length >= 36){
                                    dd.description = dd.description.substr(0, 36) + "...";
                                }
                                items.push(dd);
                            }
                        });
                        var content = template({items: items});
                        $("#th").replaceWith(content);
                    }else{
                        $("#th").replaceWith('<div class="bg_fff" style="text-align: center;line-height: 150px;">暂无数据</div>');
                    }
                }else{
                    $("#th").replaceWith('<div class="bg_fff" style="text-align: center;line-height: 150px;">暂无数据</div>');
                }
            });
    });
});
