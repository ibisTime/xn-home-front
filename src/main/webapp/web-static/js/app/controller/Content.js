define([
	'app/controller/base',
	'app/util/ajax',
	'app/util/dict',
	'Handlebars',
	'lib/Pagination'
], function (base, Ajax, Dict, Handlebars, Pagination) {
	var tmpls = {												//每种模板类型对应生成内容的方法
			"001": addEle,
			"002": addList
		}, COMPANYCODE;				//公司的code
	var menuArr = {}, menuArr1 = {}, menuSeq = [];
	var contentSource = Dict.get("contentSource"),				//api的url地址
		contentType = base.getUrlParam("ct"),					//内容类型（ele：单条数据，list：列表数据）
		menuCode = base.getUrlParam("m"),						//菜单编号
		limit = Dict.get("limit"), url, specialUrl,				//limit：列表显示时，单页显示多少条数据
		config, hasChildMenu = true,
		parentCode = base.getUrlParam("pc"),					//父菜单编号
		tmplCont, code = base.getUrlParam("code"), eleMenus;	//如果是显示单条数据的具体内容，则可以获取到code
	var footTmpl = __inline('../ui/foot.handlebars');
		
	init();

	function init(){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			var data = sessionStorage.getItem("compInfo");
			if(data){
				data = JSON.parse(data);
				addCompanyInfo({"success":true,"data": data});
			}else{
				getCompany();
			}
			base.addIcon();
			//获取菜单列表
			getMenuList();
		}else{
			base.getCompanyByUrl(getMyCont);
		}
	}
	function getMyCont(res){
		if(COMPANYCODE = sessionStorage.getItem("compCode")){
			base.addIcon();
			//获取菜单列表
			getMenuList();
			addCompanyInfo(res);
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!");
		}
	}
	//获取网页头部尾部和公司相关的内容
	function getCompany(){
		base.getCompany(COMPANYCODE)
			.then(function(res){
				addCompanyInfo(res);
			});
	}
	//添加网页头部尾部和公司相关的内容
	function addCompanyInfo(res){
		if(res.success){
			var data = res.data,
				html = footTmpl(data);
			$("#top-tel").text(data.mobile);
			$(".top .logo img").attr("src", data.logo);
			$("#foot").replaceWith(html);
		}else{
			base.showMsg("非常抱歉，暂时无法获取公司信息!")
		}
	}

	function getMenuList(){
		base.getMenuList(COMPANYCODE)
			.then(function(res){
				if(res.success){
					var data = res.data, html = "";
					var html1 = "";
					//menuArr1存储所有菜单数据，menuArr按父子关系保存菜单数据，menuSeq保存一级菜单的顺序
					for(var j = 0, len = data.length; j < len; j++){
						var dd = data[j], pc = dd.parentCode;
						menuArr1[dd.code] = dd;
						if(!pc || pc == "0"){
							//不是微信顶级菜单、微信首页和微信我要合作 
							//if(!/^wei/.test(dd.code) && !/^inw/.test(dd.code) && !/^cin/.test(dd.code)){
							if( /^M_Web$/.test(dd.location) ){
								if(!menuArr[dd.code]){
									menuArr[dd.code] = [];
								}
								menuSeq.push(dd.code);
							}
						}else{
							//不是微信顶级菜单、微信首页和微信我要合作
							if(!/^wei/.test(pc) && !/^inw/.test(pc) && !/^cin/.test(dd.code)){
								if(!menuArr[pc]){
									menuArr[pc] = [];
								}
								menuArr[pc].push(dd);
							}
						}
					}
					addMenuList();
				}
			});
	}
	//生成头部和左边的菜单
	function addMenuList(){
		//menuArr1存储所有菜单数据，menuArr按父子关系保存菜单数据，menuSeq保存一级菜单的顺序
		var topHtml = "", leftHtml = "";
		//如果是查看二级菜单的内容
		if(parentCode && parentCode != "0"){
			//遍历顶级菜单
			for(var j = 0; j < menuSeq.length; j++){
				var pCode = menuSeq[j], pMenu = menuArr1[pCode];
				//是web菜单
				if( /^M_Web$/.test( pMenu.location ) ){
					
					//是当前菜单的父菜单
					if(parentCode == pCode){
						topHtml += '<li><a href="./content.html?ct='+pMenu.contentType+'&m='+ pCode+'" class="wa active">'+pMenu.name+'</a></li>';
						//一级菜单的子菜单
						var childrenMenu = menuArr[pCode];
						//有子菜单
						if(childrenMenu.length){
							hasChildMenu = true;
							//如果当前一级菜单是公司简介，并且有子菜单，则添加name为 公司简介 的菜单
							if(/^com/.test(pCode)){
								childrenMenu.unshift({
									"code": "gsjj",
									"parentCode": pCode,
									"name": "公司简介",
									"contentType": "ele"
								});
							}
							for(var i = 0; i < childrenMenu.length; i++){
								var childMenu = childrenMenu[i];
								//如果是当前查看的菜单
								if(childMenu.code == menuCode){
									leftHtml += '<li>'+
												'<a href="./content.html?ct=' + childMenu.contentType + '&m=' + childMenu.code + '&pc=' + parentCode + '" class="wz_a active">'+
													'<div class="wz time1">' + childMenu.name + '</div>'+
													'<div class="sk time1"></div>'+
												'</a>'+
											'</li>';
								}else{
									leftHtml += '<li>' +
												'<a href="./content.html?ct=' + childMenu.contentType + '&m=' + childMenu.code + '&pc=' + parentCode + '" class="wz_a time1">' +
													'<div class="wz time1">' + childMenu.name + '</div>' +
													'<div class="sk time1"></div>' +
												'</a>'+
											'</li>';
								}
							}
						}else{
							hasChildMenu = false;
						}
						getContent();

						if (history.pushState) {
							history.replaceState(null, document.title, location.href.split("#")[0]+location.hash);
						}
					//不是当前菜单的父菜单
					}else{
						if(/^ind/.test(pMenu.code)){
							topHtml = '<li><a href="../home/index.html" class="wa time1">首页</a></li>' + topHtml;
						}else {
							topHtml += '<li><a href="./content.html?ct=' + pMenu.contentType + '&m=' + pMenu.code + '" class="wa time1">' + pMenu.name + '</a></li>';
						}
					}	
				}
			}
		//如果是查看一级菜单的内容
		}else{
			//遍历顶级菜单
			for(var j = 0; j < menuSeq.length; j++){
				var pCode = menuSeq[j], pMenu = menuArr1[pCode];
				//是web菜单
				if( /^M_Web$/.test( pMenu.location ) ){
					if(pCode == menuCode){
						topHtml += '<li><a href="./content.html?ct='+pMenu.contentType+'&m='+ pMenu.code+'" class="wa active">'+pMenu.name+'</a></li>';
						//一级菜单的子菜单
						var childrenMenu = menuArr[pCode];
						//有子菜单
						if(childrenMenu.length){
							hasChildMenu = true;
							//如果当前一级菜单是公司简介，并且有子菜单，则添加name为 公司简介 的菜单
							if(/^com/.test(pCode)){
								childrenMenu.unshift({
									"code": "gsjj",
									"parentCode": pCode,
									"name": "公司简介",
									"contentType": "ele"
								});
							}
							for(var k = 0; k < childrenMenu.length; k++){
								var childMenu = childrenMenu[k];
								//默认显示第一个子菜单
								if(k == 0){
									document.title = childMenu.name;
									menuCode = childMenu.code;
									contentType = childMenu.contentType;
									parentCode = pCode;
									leftHtml += '<li>'+
													'<a href="./content.html?ct='+childMenu.contentType+'&m='+ childMenu.code+'&pc='+pCode+'" class="wz_a active">'+
														'<div class="wz time1">'+childMenu.name+'</div>'+
														'<div class="sk time1"></div>'+
													'</a>'+
												'</li>';
								}else{
									leftHtml += '<li>'+
													'<a href="./content.html?ct='+childMenu.contentType+'&m='+ childMenu.code+'&pc='+pCode+'" class="wz_a time1">'+
														'<div class="wz time1">'+childMenu.name+'</div>'+
														'<div class="sk time1"></div>'+
													'</a>'+
												'</li>';
								}
							}
						}else{
							document.title = pMenu.name;
							hasChildMenu = false;
						}
						getContent();
						history.pushState && history.replaceState(null, document.title, location.href.split("#")[0]+location.hash);
					}else{
						if(/^ind/.test(pMenu.code)){
							topHtml = '<li><a href="../home/index.html" class="wa time1">'+pMenu.name+'</a></li>' + topHtml;
						}else {
							topHtml += '<li><a href="./content.html?ct=' + pMenu.contentType + '&m=' + pMenu.code + '" class="wa time1">' + pMenu.name + '</a></li>';
						}
					}
				}
			}
		}
		topHtml = '<ul>'+topHtml+'</ul>';
		$("#nav").html(topHtml);
		$("#l_list").html(leftHtml);
		eleMenus = $("#l_list>li a");
		addListeners();
	}

	//获取内容
	function getContent(){
		if(hasChildMenu){
			$("#n_left").removeClass("hidden");
			$("#n_right").css("float", "right").removeClass("clearfix");
			//如果是公司简介
			if(/^gsjj/.test(menuCode)){
				getCompanyInfo();
				return;
			}
		}else{
			$("#n_left").addClass("hidden");
			$("#n_right").css({
				"float": "none",
				"padding-top": "1px"
			}).addClass("clearfix");
			//如果是公司简介
			if(/^com/.test(menuCode)){
				getCompanyInfo();
				return;
			}
		}
		//列表数据
		if(contentType == "list"){
			config = {
				"menuCode": menuCode,
				"start": 1,
				"limit": limit
			}
			url = APIURL + contentSource["list"];
			getListCont();
		//单条数据
		}else if(contentType == "ele"){
			if(code){
				config = {
					"code": code
				}
				url = APIURL + contentSource["info"];
				getOneCont();
			}else{
				config = {
					"menuCode": menuCode
				}
				url = APIURL + contentSource["ele"];
				getEleCont();
			}
		}
	}
	//获取类型为List的内容
	function getListCont(){
		Ajax.get(url, config, true)
			.then(function (res) {
				if(res.success){
					var data = res.data,
						list = data.list,
						html = "";

					if(list.length){
						html = addList({items: data.list});

						$("#n_right").html(html);

						$("#pagination_div").pagination({
							items: data.totalCount,
							itemsOnPage: config.limit,
							pages: data.totalPage,
							prevText: '<',
							nextText: '>',
							displayedPages: '2',
							currentPage: config.start,
							onPageClick: function(pageNumber){
								config.start = pageNumber;
								$("#news_list").html("<i style='height:521px;' class='loading-icon'></i>");
								getListCont();
							}
						});
					}else{
						doError();
					}
				}else{
					doError();
				}
			});
	}
	function addList(data){
		var html = '<div id="news_list" class="news_list">'+
			'<ul class="time1">', list = data.items;
		var parent_code = menuArr1[menuCode].parentCode;
		//menuArr1存储所有菜单数据，menuArr按父子关系保存菜单数据，menuSeq保存一级菜单的顺序
		if(!hasChildMenu){
			parent_code = "0";
		}
		for(var i = 0; i < list.length; i++){
			var d = list[i];
			//站内
			if(d.kind == 1){
				//尾注是上传的
				if(d.type == "0"){
					html += '<li>'+
								'<a href="javascript:void(0);" class="time1 cursor_d">'+
									'<div class="pic">'+
										'<img src="'+d.pic1+'" class="time1">'+
									'</div>'+
									'<div class="n_wz">'+
										'<div class="n_title time1">'+
											'<span class="wz">'+d.title+'</span>'+
										'</div>'+
									'</div>'+
								'</a>'+
								'<a href="' + d.endNote + '" target="_blank" class="download-sp"><span class="idx-tips">点击下载</span></a>'+
							'</li>';
				}else{
					html += '<li>'+
								'<a href="./content.html?ct=ele&code='+d.code+'&m='+menuCode+'&pc='+parent_code+'" class="time1">'+
									'<div class="pic">'+
										'<img src="'+d.pic1+'" class="time1">'+
									'</div>'+
									'<div class="n_wz">'+
										'<div class="n_title time1">'+
											'<span class="idx-tips">'+ (d.endNote || "") +'</span>'+
											'<span class="wz">'+d.title+'</span>'+
										'</div>'+
									'</div>'+
								'</a>'+
							'</li>';
				}
			//站外
			}else{
				html += '<li>'+
							'<a href="'+d.url+'" target="_blank" class="time1">'+
								'<div class="pic">'+
									'<img src="'+d.pic1+'" class="time1">'+
								'</div>'+
								'<div class="n_wz">'+
									'<div class="n_title time1">'+
										'<span class="wz">'+d.title+'</span>'+
									'</div>'+
								'</div>'+
							'</a>'+
						'</li>';
			}
		}
		html += '</ul></div>'+
			'<div id="pagination_div"></div>'+
			'<div class="hen"></div>';
		return html;
	}
	//获取类型为ele的内容
	function getEleCont(){
		Ajax.get(url, config, true)
			.then(function (res) {
				if(res.success){
					var data = res.data,
						html = "";
					if(data.length){
						data = data[0];
						html = addEle(data);
						$("#n_right").html(html);
					}else{
						doError();
					}
				}else{
					doError();
				}
			});
	}

	function addEle(data){
		var html = '<div class="r_nr">'+
			'<div class="c_txt ele_font">'+
			'<div class="r_nr">'+
			'<div class="c_txt ele_font">';
		if(data.title){
			html += '<p><span class="c_151_72_6 tc"><strong><span>'+data.title+'</span></strong></span><p>';
		}
		if(data.description){
			html += '<p><span class="c_68_68_68 t-i2em d_block break-word">'+data.description+'</span></p>';
		}
		if(data.pic2){
			html += '<p style="text-align: left;"><br><img src="'+data.pic2+'"></p>';
		}else if(data.url){
			html += "<iframe width='100%' height='400' src='"+data.url+"' frameborder=0 'allowfullscreen' style='border:none;'></iframe>";
		}
		
		html += '</div></div><div class="hen"></div>';
		return html;
	}

	function getOneCont(){
		Ajax.get(url, config, true)
			.then(function (res) {
				if(res.success){
					var data = res.data,
						html = "";
					html = addEle(data);
					$("#n_right").html(html);
				}else{
					doError();
				}
			});
	}

	//查看公司简介时获取公司信息
	function getCompanyInfo(){
		base.getCompany(COMPANYCODE)
			.then(function(res){
				if(res.success){
					$("#n_right")
						.html("<div class='r_nr'>"+
									"<div id='addr'></div>"+
									"<div id='allmap'></div>"+
								"</div>"+
								"<div class='hen'></div>");
					var data = res.data;
					$("#addr").replaceWith(addRightCompany(data));
					//addMap(data.longitude, data.latitude);
					addMap(data.province, data.city, data.area, data.address);
				}else{
					doError();
				}
			})
	}
	function addRightCompany(data){
		var html = '<div class="c_txt">';
		if(data.name){
			html += '<span>'+data.name+'</span><br/>';
		}
		if(data.description){
			html += '<p class="mtb10 t-i2em">'+data.description+'</p>';
		}
		html += '<p style="position: relative;min-height:120px;">';
		if(data.mobile){
			html += '电话：'+data.mobile+'<br/>';
		}
		if(data.fax){
			html += '传真：'+data.fax+'<br/>';
		}
		if(data.email){
			html += '邮箱：'+data.email+'<br/>';
		}
		if(data.address){
			html += '地址：'+ data.province + " " + data.city + " " + data.area + " " + data.address+'<br/>';
		}
		if(data.qq){
			html += "qq："+ data.qq + "<br/>";
		}
		if(data.weChat){
			html += "微信号：" + data.weChat + "<br/>";
		}
		if(data.qrCode){
			html += '<img class="cp-barCode cursor_p" src="'+data.qrCode+'"/>';
			$("#bigQrCode").attr("src", data.qrCode);
		}
		html += '</p></div>';
		return html;
	}
	// function addMap(longitude, latitude) {
	// 	// 百度地图API功能
	// 	var map = new BMap.Map("allmap");    // 创建Map实例
	// 	var point = new BMap.Point(longitude, latitude);
	// 	map.centerAndZoom(point, 14);  // 初始化地图,设置中心点坐标和地图级别
	// 	map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
	// 	map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
	// 	map.addControl(new BMap.ScaleControl());             // 添加比例尺控件
	// 	var marker = new BMap.Marker(point);// 创建标注
	// 	map.addOverlay(marker);             // 将标注添加到地图中
	// 	marker.disableDragging();           // 不可拖拽
	// 	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	// }
	function addMap(province, city, area, address) {
		// 百度地图API功能
		var map = new BMap.Map("allmap");    // 创建Map实例

		// 创建地址解析器实例
		var myGeo = new BMap.Geocoder();
		// 将地址解析结果显示在地图上,并调整地图视野
		myGeo.getPoint(province+city+area+address, function(point){
			if (point) {
				map.centerAndZoom(point, 14);
				map.addOverlay(new BMap.Marker(point));
				map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
				//map.setCurrentCity("");          // 设置地图显示的城市 此项是必须设置的
				map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
				map.addControl(new BMap.ScaleControl());             // 添加比例尺控件
				var marker = new BMap.Marker(point);// 创建标注
				map.addOverlay(marker);             // 将标注添加到地图中
				marker.disableDragging();           // 不可拖拽
				map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			}else{
				base.showMsg("您选择地址没有解析到结果!");
			}
		}, province);
		
	}
	
	function doError(){
		$("#n_right").html("<span style='margin:80px 0;display:inline-block;font-size:30px;width: 100%;text-align: center;'>暂无数据</span>");
	}
	//浏览器后退时触发（实现单页面）
	function fnHashTrigger(target) {
		var query = location.href.split("?")[1], eleTarget = target || null;
		eleMenus.each(function() {
			if (eleTarget === null && this.href.split("?")[1] === query) {
				eleTarget = this;
			}
		});
		
		if (!eleTarget) {
			eleTarget = eleMenus.get(0);
		}
		$(eleTarget).trigger("click");
	}
	
	function addListeners(){
		$("#n_right").on("click", ".cp-barCode", function(){
			$("#mask").removeClass("hidden");
			$("#bigQrCode").removeClass("hidden");
		});
		$("#mask, #bigQrCode").on("click", function(){
			$("#mask").addClass("hidden");
			$("#bigQrCode").addClass("hidden");
		});
		$("#nav").on("mouseover", "ul>li>a.time1", function(){
			$("#nav").find("a.active.time1").removeClass("active");
			$(this).addClass("active");
		}).on("mouseout", "ul>li>a.time1" , function(){
			$(this).removeClass("active");
		});
		$("#l_list").on("mouseover", "li>a.time1", function(){
			$("#l_list").find("a.active.time1").removeClass("active");
			$(this).addClass("active");
		}).on("mouseout", "li>a.time1" , function(){
			$(this).removeClass("active");
		});
		//二级菜单点击时实现单页面
		$("#l_list").on("click", "li a", function(event){
			$("#l_list").find("a.active").addClass("time1");
			$("#l_list").find("a.active").removeClass("active");
			$(this).addClass("active").removeClass("time1");
			var query = this.href.split("?")[1], me = $(this);
			contentType = base.getParam("ct", query);
			code = base.getParam("code", query);
			menuCode = base.getParam("m", query);
			parentCode = base.getParam("pc", query);
			
			var title = me.text();
			document.title = title;
			if (event && /\d/.test(event.button) && history.pushState) {            
				history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
			}
			$("#n_right").html("<i style='height:521px;' class='loading-icon'></i>");

			getContent();
			return false;
		});
		//浏览器后退事件
		if (history.pushState) {
			window.addEventListener("popstate", function() {
				fnHashTrigger();                             
			});
		}
	}
});
