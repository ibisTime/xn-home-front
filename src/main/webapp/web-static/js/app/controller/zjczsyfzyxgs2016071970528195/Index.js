define([
	'app/controller/base',
	'app/util/ajax',
	'lib/jquery.flexslider-min',
	'Handlebars',
	'app/util/dialog'
], function (base, Ajax, flexSlider, Handlebars, dialog) {
    $(function () {
    	var COMPANYCODE = base.getUrlParam("cp");
    	var footTmpl = __inline('../../ui/foot.handlebars'),
    		arr = [$("#about"), $("#service"), $("#contact")];
		initView();
		function initView(){
			getMenuList();
			getCompnany();
			getRCont();
			getLCont();
			addListeners();
		}
    	function getMenuList(){
			Ajax.get(APIURL + '/company/menu/list', {"companyCode": COMPANYCODE}, true)
				.then(function (res) {
					if(res.success){
						var data = res.data, html = "", menuArr1 = {}, menuArr = {};
						for(var j = 0, len = data.length; j < len; j++){
							var dd = data[j], pc = dd.parentCode;
							menuArr1[dd.code] = dd;
							if(!pc || pc == "0"){
								if(!menuArr[dd.code]){
									menuArr[dd.code] = [];
								}
							}else{
								if(!menuArr[pc]){
									menuArr[pc] = [];
								}
								menuArr[pc].push(dd);
							}
						}
						for(var n in menuArr){
							var d = menuArr1[n];
							if(d.url && d.code.indexOf("Index") != -1){
								html = '<li><a href="'+d.url+'?cp='+COMPANYCODE+'" class="wa active">'+d.name+'</a></li>' + html;
							}else{
								html += '<li><a target="_blank" href="../../menu/content.html?tmp='+d.templetCode+'&ct='+d.contentType+'&cp='+COMPANYCODE+'&m='+d.code+'" class="wa time1">'+d.name+'</a></li>';
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
			Ajax.get(APIURL + '/company/info', {"companyCode": COMPANYCODE}, true)
				.then(function(res){
					if(res.success){
						var data = res.data,
							html = footTmpl(data);
						$("#top-tel").text(data.telephone);
						$(".top .logo img").attr("src", data.logo);
						$("#foot").replaceWith(html);
						if(data.description.length > 250){
							data.description = data.description.substr(0, 255) + "...";
						}
						$("#companyCont").html(data.description);
						//$("#companyLogo").attr("src", data.logo);
					}
				});
		}

		var bankArr = [], insurance = [], carArr = [];
		function getRCont(){
			Ajax.get(APIURL + '/company/acontent/list', {"menuCode": "Menu2016072030990399"}, true)
				.then(function(res){
					if(res.success){
						var data = res.data;
						if(data.length){
							for(var i = 0, len = data.length; i < len; i++){
								var dd = data[i];
								if(dd.endNote == "银行"){
									bankArr.push(dd);
								}else if(dd.endNote == '保险'){
									insurance.push(dd);
								}else if(dd.endNote == '车行'){
									carArr.push(dd);
								}
							}
							addRCont(bankArr, ".idx-news-r-panel0", "");
							addRCont(insurance, ".idx-news-r-panel1");
							addRCont(carArr, ".idx-news-r-panel2");
						}
					}
				});
		}
		var zbNews = [], fgsNews = [], htdtNews = [];
		function getLCont(){
			getLCont1();
			getLCont2();
			getLCont3();

		}
		function getLCont1(){
			var config = {
				"menuCode": "Menu2016072030950399",
				"start": "0",
				"limit": "2"
			};
			Ajax.get(APIURL + '/company/acontent/page', config, true)
				.then(function(res) {
					if (res.success) {
						var data = res.data.list;
						if (data.length) {
							for(var i = 0, len = data.length; i < len; i++){
								if(i < 2){
									zbNews.push(data[i]);
								}else{
									break;
								}
							}
						}
						addLCont(zbNews, ".idx-news-l-panel0", "Menu2016072030950399");
					}
				});
		}
		function getLCont2(){
			var config = {
				"menuCode": "Menu2016072030960399",
				"start": "0",
				"limit": "2"
			};
			Ajax.get(APIURL + '/company/acontent/page', config, true)
				.then(function(res) {
					if (res.success) {
						var data = res.data.list;
						if (data.length) {
							for(var i = 0, len = data.length; i < len; i++){
								if(i < 2){
									fgsNews.push(data[i]);
								}else{
									break;
								}
							}
						}
						addLCont(fgsNews, ".idx-news-l-panel1", "Menu2016072030960399");
					}
				});
		}
		function getLCont3(){
			var config = {
				"menuCode": "Menu2016072030970399",
				"start": "0",
				"limit": "2"
			};
			Ajax.get(APIURL + '/company/acontent/page', config, true)
				.then(function(res) {
					if (res.success) {
						var data = res.data.list;
						if (data.length) {
							for(var i = 0, len = data.length; i < len; i++){
								if(i < 2){
									htdtNews.push(data[i]);
								}else{
									break;
								}
							}
						}
						addLCont(htdtNews, ".idx-news-l-panel2", "Menu2016072030970399");
					}
				});
		}
		function addLCont(arr, cln, mc){
			arr.splice(2);
			var html = '';
			for(var i = 0; i < arr.length; i++){
				var aa = arr[i];
				if(aa.description.length > 50){
					aa.description = aa.description.substr(0, 50) + "...";
				}
				if(aa.type == "1"){
					html += '<a target="_blank" href="../../menu/content.html?tmp=001&ct=ele&cp='+COMPANYCODE+'&m='+mc+'&code='+aa.code+'&pc=Menu2016071977968697" class="clearfix">';
				}else{
					html += '<a href="javascript:void(0);" class="clearfix cursor_d">';
				}
				html += '<div class="pic">' +
					'<img src="'+aa.picture1+'" class="time1">' +
					'</div>' +
					'<div class="n_wz">' +
					'<div class="n_title time1">' +
					'<span class="idx-tips">'+aa.endNote+'</span>' +
					'<span class="wz">'+aa.title+'</span>' +
					'<span class="cont-span">'+aa.description+'</span>' +
				'</div>' +
				'</div></a>';
			}
			$(cln).html(html);
		}
		function addRCont(arr, cln){
			arr.splice(2);
			var html = '';
			for(var i = 0; i < arr.length; i++){
				var aa = arr[i];
				if(aa.type == "1"){
					html += '<a target="_blank" href="../../menu/content.html?tmp=001&ct=ele&cp='+COMPANYCODE+'&m=Menu2016072030990399&code='+aa.code+'&pc=Menu2016072030940399" class="clearfix">';
				}else{
					html += '<a href="javascript:void(0);" class="clearfix cursor_d">';
				}
				html += '<div class="pic">' +
				'<img src="'+aa.picture1+'" class="time1">' +
				'</div>' +
				'<div class="n_wz">' +
				'<div class="n_title time1"><span class="wz">'+aa.title+'</span></div>' +
				'</div></a>';
			}
			$(cln).html(html);
		}
		function addListeners(){
			$("#bbc").on("mouseover", "span", function(){
				var me = $(this);
				me.parent().find("span.selected").removeClass("selected");
				me.addClass("selected");
				$("#idx-news-r").find(".idx-news-r-panel").addClass("hidden");
				$("#idx-news-r").find(".idx-news-r-panel" + me.index()).removeClass("hidden");
			});

			$("#zfh").on("mouseover", "span", function(){
				var me = $(this);
				me.parent().find("span.selected").removeClass("selected");
				me.addClass("selected");
				$("#idx-news-l").find(".idx-news-l-panel").addClass("hidden");
				$("#idx-news-l").find(".idx-news-l-panel" + me.index()).removeClass("hidden");
			});

			$("#gcsq-close").on("click", function(){
				$("#mask").addClass("hidden");
				$("#gcsq-dialog").addClass("hidden");
			});

			$("#gcsq").on("click", function(){
				$("#gc-name").val("").trigger("keyup");
				$("#gc-age").val("").trigger("keyup");
				$("#gc-mobile").val("").trigger("keyup");
				$("#gc-ygcx").val("").trigger("keyup");
				$("#gc-amount").val("").trigger("keyup");
				$("#gc-area").val("").trigger("keyup");
				$("#mask").removeClass("hidden");
				$("#gcsq-dialog").removeClass("hidden");
			});

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

			$("#gc-sbtn").on("click", function(){
				if(!$(this).hasClass("isdoing") && validateGCSQ()){
					$(this).addClass("isdoing").text("提交中...");
					doGCSQ();
				}
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


			$("#gc-name").on("keyup", function(e){
				var keyCode = e.charCode || e.keyCode,
					placeholder = $(this).prev();
				this.value != "" ? placeholder.hide() : placeholder.show();
				if(keyCode == 13){
					$("#gc-sbtn").click();
				}
			}).on("change", function(){
				validateGcName();
			});

			$("#gc-age").on("keyup", function(e){
				var keyCode = e.charCode || e.keyCode,
					placeholder = $(this).prev();
				this.value != "" ? placeholder.hide() : placeholder.show();
				if(keyCode == 13){
					$("#gc-sbtn").click();
				}
			}).on("change", function(){
				validateGcage();
			});
			$("#gc-mobile").on("keyup", function(e){
				var keyCode = e.charCode || e.keyCode,
					placeholder = $(this).prev();
				this.value != "" ? placeholder.hide() : placeholder.show();
				if(keyCode == 13){
					$("#gc-sbtn").click();
				}
			}).on("change", function(){
				validateGcMobile();
			});
			$("#gc-ygcx").on("keyup", function(e){
				var keyCode = e.charCode || e.keyCode,
					placeholder = $(this).prev();
				this.value != "" ? placeholder.hide() : placeholder.show();
				if(keyCode == 13){
					$("#gc-sbtn").click();
				}
			}).on("change", function(){
				validateGcygcx();
			});
			$("#gc-amount").on("keyup", function(e){
				var keyCode = e.charCode || e.keyCode,
					placeholder = $(this).prev();
				this.value != "" ? placeholder.hide() : placeholder.show();
				if(keyCode == 13){
					$("#gc-sbtn").click();
				}
			}).on("change", function(){
				validateGcamount();
			});
			$("#gc-area").on("keyup", function(e){
				var keyCode = e.charCode || e.keyCode,
					placeholder = $(this).prev();
				this.value != "" ? placeholder.hide() : placeholder.show();
				if(keyCode == 13){
					$("#gc-sbtn").click();
				}
			}).on("change", function(){
				validateGcarea();
			});
		}

		function doGCSQ(){
			Ajax.post(APIURL + '/company/addBuyCarPartner',
				{
					"personDesc": $("#gc-age").val(),
					"person": $("#gc-name").val(),
					"contact": $("#gc-mobile").val(),
					"content1": $("#gc-ygcx").val(),
					"content2": $("#gc-amount").val(),
					"companyCode": COMPANYCODE,
					"remark": $("#gc-area").val()
				}).then(function(res){
					$("#gc-sbtn").removeClass("isdoing").text("提交");
					if(res.success){
						showMsg("提交成功！");

					}else{
						showMsg("提交失败！");
					}
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
						showMsg("提交成功！");
					}else{
						showMsg("提交失败！");
					}
				});
		}
		function validateGCSQ(){
			return validateGcName() && validateGcage() &&
				validateGcMobile() && validateGcygcx() && validateGcamount && validateGcarea();
		}
		function validateGcName(){
			var ele = $("#gc-name"),
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
		function validateGcage(){
			var ele = $("#gc-age"),
				mVal = ele.val(), flag = true;
			if(isEmpty(mVal)){
				ele.next().fadeIn(150).fadeOut(3000);
				flag = false;
			}else if(mVal.length > 255){
				ele.next().next().next().fadeIn(150).fadeOut(3000);
				flag = false;
			}else if(!/^\d+$/g.test(mVal)){
				ele.next().next().fadeIn(150).fadeOut(3000);
				flag = false;
			}
			return flag;
		}
		function validateGcMobile(){
			var ele = $("#gc-mobile"),
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
		function validateGcygcx(){
			var ele = $("#gc-ygcx"),
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
		function validateGcamount(){
			var ele = $("#gc-amount"),
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
		function validateGcarea(){
			var ele = $("#gc-area"),
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
    	
    	$(".bannar").flexslider({
            slideshowSpeed: 4000, //展示时间间隔ms
            animationSpeed: 400, //滚动时间ms
            touch: true, //是否支持触屏滑动
            start: function () {
                $(".slides li").css({height:398});
            }
        });
		function showMsg(msg){
			var d = dialog({
				content: msg,
				quickClose: true
			});
			d.show();
			setTimeout(function () {
				d.close().remove();
			}, 2000);
		}
    });
});
