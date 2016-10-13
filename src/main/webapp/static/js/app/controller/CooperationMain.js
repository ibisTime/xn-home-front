define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dialog'
], function (base, Ajax, dialog) {
	var COMPANYCODE;
	init();

	function init(){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
            getCompany();
			getWXCode();
		}else{
			base.getCompanyByUrl().then(function(res){
                if(COMPANYCODE = sessionStorage.getItem("compCode")){
                    addCompanyInfo(res.data);
                    getWXCode();
                }else{
                    base.showMsg("非常抱歉，暂时无法获取公司信息!");
                }
            });
		}
		addListeners();
	}

	function getCompany(){
		base.getCompany(COMPANYCODE)
			.then(function(res){
				addCompanyInfo(res);
			});
	}

	function addCompanyInfo(res){
		if(res.success){
			var data = res.data;
			$("#qrCode").html('<img class="wp40" src="'+data.qrCode+'">')
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!");
		}
	}

	function getWXCode(){
        base.getWXMenuCode(COMPANYCODE)
            .then(function(){
                var code, name;
                sessionStorage.setItem("wxMenuCode", data[0].code)
                sessionStorage.setItem("wxMenuName", data[0].name);
                $("#wxdjcd").text(data[0].name);
            });
    }

	function addListeners(){
		$("#footDiv").on("click", "a", function(e){
    		e.preventDefault();
    		var idx = $(this).index();
    		$("#ssD>.coopmain-img:eq("+idx+")").show(300);
    	});
    	$("#ssD").on("click", ".coopmain-img>img", function(e){
    		e.stopPropagation();
    		$(this).parent().hide(300);
    	});
    
    	$("#ksjq").on("click", function(){
    		location.href = "./cooperation.html";
    	});
	}
    	
});