define([
	'app/util/ajax'
], function (Ajax) {
    $(function () {
    	Ajax.get(APIURL + "/company/menu/list", {"companyCode": companyCode})
    		.then(function(res){
    			if(res.success){
    				var data = res.data;
    				for(var i = data.length; i > 0;){
    					var d = data[--i];
    					if(d.url && d.name.indexOf("首页") != -1){
    						location.href = d.url + "?cp=" + companyCode;
    						break;
    					}
    				}
    			}
    		});
    });
});