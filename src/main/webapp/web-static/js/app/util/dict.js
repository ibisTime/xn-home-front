define([
    'app/controller/base',
    'app/util/ajax'
], function(base, ajax) {
    var dict = {
        contentSource: {
        	"default" : "/company/acontent/page",
        	"list": "/company/acontent/list",
        	"company": "/company/info"
        },
        companyTmpl: "company.handlebars",
        limit: "5"
    };

    var changeToObj = function(data) {
        var data = data || [], obj = {};
        data.forEach(function(item) {
            obj[item.dkey] = item.dvalue;
        });
        return obj;
    };

    return {
        get: function(code) {
            return dict[code];
        },
        getRemote: function(type) {
            return ajax.get(base.apiUrl + '/gene/dict', {
                type: type
            }).then(function(res) {
                return changeToObj(res.data);
            });
        }
    }
});