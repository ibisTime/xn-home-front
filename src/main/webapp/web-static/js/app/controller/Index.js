define([
	'app/controller/base',
	'app/util/ajax',
	'Handlebars',
	'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Handlebars, Swiper) {
	var COMPANYCODE;
	var footTmpl = __inline('../ui/foot.handlebars');
	var mySwiper = new Swiper ('.swiper-container', {
            direction: 'horizontal',
            loop: true,
            autoplay: 2000,
            autoplayDisableOnInteraction: false,
            // 如果需要分页器
            pagination: '.swiper-pagination'
        });
	//initView();
	function initView(){

		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			getCompany();
			getBanner();
		}else{
			base.getCompanyByUrl()
				.then(function(res){
					if(COMPANYCODE = sessionStorage.getItem("compCode")){
						getBanner();
						addCompanyInfo(res);
					}else{
						base.showMsg("非常抱歉，暂时无法获取公司信息!");
					}
				});
		}

		//获取菜单
		getMenuList();
		//获取公司详情
		getCompnany();
		addListeners();
	}
	function getMenuList(){
		base.getMenuList(COMPANYCODE)
			.then(function (res) {
				if(res.success){
					//menuArr1存储所有菜单数据，menuArr按父子关系保存菜单数据，menuSeq保存一级菜单的顺序
					var data = res.data, html = "", menuArr1 = {}, menuArr = {}, menuSeq = [];
					for(var j = 0, len = data.length; j < len; j++){
						var dd = data[j], pc = dd.parentCode;
						menuArr1[dd.code] = dd;
						if(!pc || pc == "0"){
							if(!menuArr[dd.code]){
								menuArr[dd.code] = [];
							}
							menuSeq.push(dd.code);
						}else{
							if(!menuArr[pc]){
								menuArr[pc] = [];
							}
							menuArr[pc].push(dd);
						}
					}
					for(var j = 0; j < menuSeq.length; j++){
						//父菜单
						var d = menuArr1[menuSeq[j]];
						if(d.url && d.code.indexOf("Index") != -1){
							html = '<li><a href="./index.html" class="wa active">'+首页+'</a></li>' + html;
						}else{
							html += '<li><a href="../menu/content.html?ct='+d.contentType+'&m='+d.code+'" class="wa time1">'+d.name+'</a></li>';
						}
					}
					html = '<ul>'+ html +'</ul>';
					$("#nav").html(html);
					$(".nav ul li")
						.hover(function(){
							$(this).find("a.time1").addClass("active");
						}, function(){
							$(this).find("a.time1").removeClass("active");
						});
				}
			});
	}
	function getCompnany(){
		base.getCompany()
			.then(function(res){
				addCompanyInfo(res);
			});
	}

	function addCompanyInfo(res){
		if(res.success){
			//获取菜单列表
			getMenuList();
			var data = res.data,
				html = footTmpl(data);
			$("#top-tel").text(data.telephone);
			$("#foot").replaceWith(html);
			if(data.description.length > 250){
				data.description = data.description.substr(0, 255) + "...";
			}
			$("#companyCont").html(data.description);
			$("#companyLogo").attr("src", data.logo);
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!")
		}
	}

	function addListeners(){

		$("#hzsq-close").on("click", function(){
			$("#mask").addClass("hidden");
			$("#hzsq-dialog").addClass("hidden");
		});

		$("#hzsq").on("click", function(){
			$("#hzdw-name").val("").trigger("keyup");
			$("#hz-name").val("").trigger("keyup");
			$("#hz-mobile").val("").trigger("keyup");
			$("#hzjj").val("").trigger("keyup");
			$("#hznr").val("").trigger("keyup");
			$("#mask").removeClass("hidden");
			$("#hzsq-dialog").removeClass("hidden");
		});

		$("#hz-sbtn").on("click", function(){
			if(!$(this).hasClass("isdoing") && validateHZSQ()){
				$(this).addClass("isdoing").text("提交中...");
				doHZSQ();
			}
		});

		$("#hzdw-name").on("keyup", function(e){
			var keyCode = e.charCode || e.keyCode,
				placeholder = $(this).prev();
			this.value != "" ? placeholder.hide() : placeholder.show();
			if(keyCode == 13){
				$("#hz-sbtn").click();
			}
		}).on("change", function(){
			validateHzdwName();
		});

		$("#hz-name").on("keyup", function(e){
			var keyCode = e.charCode || e.keyCode,
				placeholder = $(this).prev();
			this.value != "" ? placeholder.hide() : placeholder.show();
			if(keyCode == 13){
				$("#hz-sbtn").click();
			}
		}).on("change", function(){
			validateHzName();
		});
		$("#hz-mobile").on("keyup", function(e){
			var keyCode = e.charCode || e.keyCode,
				placeholder = $(this).prev();
			this.value != "" ? placeholder.hide() : placeholder.show();
			if(keyCode == 13){
				$("#hz-sbtn").click();
			}
		}).on("change", function(){
			validateHzMobile();
		});
		$("#hzjj").on("keyup", function(e){
			var keyCode = e.charCode || e.keyCode,
				placeholder = $(this).prev();
			this.value != "" ? placeholder.hide() : placeholder.show();
			if(keyCode == 13){
				$("#hz-sbtn").click();
			}
		}).on("change", function(){
			validateHzjj();
		});
		$("#hznr").on("keyup", function(e){
			var keyCode = e.charCode || e.keyCode,
				placeholder = $(this).prev();
			this.value != "" ? placeholder.hide() : placeholder.show();
			if(keyCode == 13){
				$("#hz-sbtn").click();
			}
		}).on("change", function(){
			validateHznr();
		});
	}

	function doHZSQ(){
		Ajax.post(APIURL + '/company/addPartner',
			{
				"organization": $("#hzdw-name").val(),
				"person": $("#hz-name").val(),
				"contact": $("#hz-mobile").val(),
				"content1": $("#hznr").val(),
				"organizationDesc": $("#hzjj").val(),
				"companyCode": COMPANYCODE
			}).then(function(res){
				$("#hz-sbtn").removeClass("isdoing").text("提交");
				if(res.success){
					base.showMsg("提交成功！");
					setTimeout(function(){
						$("#hzsq-close").click();
					}, 2000);
				}else{
					base.showMsg("提交失败！");
				}
			});
	}
	function validateHZSQ(){
		return validateHzdwName() && validateHzName() &&
			validateHzMobile() && validateHzjj() && validateHznr();
	}
	function validateHzdwName(){
		var ele = $("#hzdw-name"),
			mVal = ele.val(), flag = true;
		if(isEmpty(mVal)){
			ele.next().fadeIn(150).fadeOut(3000);
			flag = false;
		}else if(mVal.length > 64){
			ele.next().next().fadeIn(150).fadeOut(3000);
			flag = false;
		}
		return flag;
	}
	function validateHzName(){
		var ele = $("#hz-name"),
			mVal = ele.val(), flag = true;
		if(isEmpty(mVal)){
			ele.next().fadeIn(150).fadeOut(3000);
			flag = false;
		}else if(mVal.length > 64){
			ele.next().next().fadeIn(150).fadeOut(3000);
			flag = false;
		}
		return flag;
	}
	function validateHzMobile(){
		var ele = $("#hz-mobile"),
			mVal = ele.val(), flag = true;
		var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
		var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
		if(isEmpty(mVal)){
			flag = false;
			ele.next().fadeIn(150).fadeOut(3000);
		}else if( !(isPhone.test(mVal) || isMob.test(mVal)) ){
			flag = false;
			ele.next().next().fadeIn(150).fadeOut(3000);
		}
		return flag;
	}
	function validateHzjj(){
		var ele = $("#hzjj"),
			mVal = ele.val(), flag = true;
		if(isEmpty(mVal)){
			ele.next().fadeIn(150).fadeOut(3000);
			flag = false;
		}else if(mVal.length > 255){
			ele.next().next().fadeIn(150).fadeOut(3000);
			flag = false;
		}
		return flag;
	}
	function validateHznr(){
		var ele = $("#hznr"),
			mVal = ele.val(), flag = true;
		if(isEmpty(mVal)){
			ele.next().fadeIn(150).fadeOut(3000);
			flag = false;
		}else if(mVal.length > 255){
			ele.next().next().fadeIn(150).fadeOut(3000);
			flag = false;
		}
		return flag;
	}

	function isEmpty(str){
		if(str == undefined || trim(str) === ""){
			return true;
		}
		return false;
	}
	function trim(str){
		return str ? str.replace(/^\s*|\s*$/ig, ""): "";
	}
});
