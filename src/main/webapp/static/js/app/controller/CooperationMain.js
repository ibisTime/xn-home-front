define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
	var COMPANYCODE, wxMenuCode = "", wxMenuName = "";
	init();

	function init(){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			getBanner();
			var data = sessionStorage.getItem("compInfo");
			if(data){
				data = JSON.parse(data);
				addCompanyInfo({"success":true,"data": data});
			}else{
				getCompany();
			}
			if(sessionStorage.getItem("wxMenuCode")){
				wxMenuName = sessionStorage.getItem("wxMenuName");
                $("#wxdjcd").text(wxMenuName);
			}else{
				getWXCode();
			}
			base.addIcon();
		}else{
			base.getCompanyByUrl(getMyCont);
		}
		addListeners();
	}

	function getMyCont(res){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			getBanner();
			base.addIcon();
			addCompanyInfo(res.data);
			getWXCode();
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!");
		}
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
                        }
					}
				}
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

	function getBanner(){
        base.getBanner(COMPANYCODE, "B_Mobile_WYHZ")
            .then(function(res){
                if(res.success){
                    var data = res.data, html = "";
                    for(var i = 0; i < data.length; i++){
                        html += '<div class="swiper-slide"><img class="wp100" src="'+data[i].pic+'"></div>';
                    }
					if(data.length == 1){
						$("#swiper-pagination").remove()
					}
                    $("#swr").html(html);
                    swiperImg();
                }
                $(".icon-loading").remove();
            });
    }
    
    function swiperImg(){
        var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
    }
    	
});