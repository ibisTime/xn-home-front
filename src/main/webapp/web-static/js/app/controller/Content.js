define([
	'app/controller/base',
	'app/util/ajax',
	'app/util/dict',
	'Handlebars',
	'lib/Pagination'
], function (base, Ajax, Dict, Handlebars, Pagination) {
    $(function () {
    	var tmpls = {												//每种模板类型对应生成内容的方法
        		"001": addEle,
        		"002": addList
        	}, COMPANYCODE = base.getUrlParam("cp");				//公司的code
		var menuArr = {}, menuArr1 = {}, menuSeq = [];
    	var contentSource = Dict.get("contentSource"),				//api的url地址
			u = base.getUrlParam("u"),								//是否是定制页面
    		source = contentSource["default"],						//默认api地址
    		tmpl = base.getUrlParam("tmp"),							//模板类型（001：单条数据模板，002：列表数据模板）
    		contentType = base.getUrlParam("ct"),					//内容类型（ele：单条数据，list：列表数据）
    		menuCode = base.getUrlParam("m"),						//菜单编号
    		limit = Dict.get("limit"), url, specialUrl,				//limit：列表显示时，单页显示多少条数据
    		config = {
    			"companyCode": COMPANYCODE
    		}, hasChildMenu = true,
			parentCode = base.getUrlParam("pc"),					//父菜单编号
    		tmplCont, code = base.getUrlParam("code"), eleMenus;	//如果是显示单条数据的具体内容，则可以获取到code
    	var footTmpl = __inline('../ui/foot.handlebars');
    		
    	initView();
    	//获取内容
    	function getContent(){
			if(hasChildMenu){
				$("#n_left").removeClass("hidden");
				$("#n_right").css("float", "right").removeClass("clearfix");
			}else{
				$("#n_left").addClass("hidden");
				$("#n_right").css({
					"float": "none",
					"padding-top": "1px"
				}).addClass("clearfix");
			}
    		url = APIURL + source;
    		//定制页面
    		if(u == "1"){
				getSpecialCont();
			//标准页面
    		}else{
    			config.menuCode = menuCode;
    			tmplCont = tmpls[tmpl];
				//列表数据
    			if(contentType == "list"){
        			config.start = 1;
        			config.limit = limit;
        			getListCont();
				//单条数据
        		}else if(contentType == "ele"){
        			if(code){
        				config.code = code;
        			}
        			source = contentSource["list"];
    				url = APIURL + source;
    				getEleCont();
        		}
    		}
    	}
    	function getSpecialCont(){
			$("#n_right").html('<iframe id="c-iframe" class="c-iframe" scrolling="no" src="'+specialUrl+'?cp='+COMPANYCODE+'"></iframe>');
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
    		if(data.picture2){
    			html += '<p style="text-align: left;"><br><img src="'+data.picture2+'"></p>';
    		}
    		html += '</div></div><div class="hen"></div>';
    		return html;
    	}
    	function addList(data){
    		var html = '<div id="news_list" class="news_list">'+
    		    '<ul class="time1">', list = data.items;
			var parent_code = menuArr1[menuCode].parentCode;
			if(!hasChildMenu){
				parent_code = menuCode;
			}
    		for(var i = 0; i < list.length; i++){
    			var d = list[i];
				if(d.type == "1"){
					html += '<li>'+
						'<a href="./content.html?tmp=001&ct=ele&code='+d.code+'&cp='+COMPANYCODE+'&m='+menuCode+'&pc='+parent_code+'" target="_blank" class="time1">';
				}else{
					html += '<li>'+
						'<a href="javascript:void(0);" class="time1 cursor_d">';
				}
				html += '<div class="pic">'+
					'<img src="'+d.picture1+'" class="time1">'+
				'</div>'+
				'<div class="n_wz">'+
					'<div class="n_title time1">';
				if(d.endNote){
					if(d.endNote.indexOf("http") == -1){
						html += '<span class="idx-tips">'+ d.endNote +'</span>';
					}
				}
				html += '<span class="wz">'+d.title+'</span></div></div></a>';
				if(d.endNote){
					if(d.endNote.indexOf("http") != -1) {
						html += '<a href="' + d.endNote + '" target="_blank" class="download-sp"><span class="idx-tips">点击下载</span></a>';
					}
				}
				'</li>';
    		}
    		html += '</ul></div>'+
			    '<div id="pagination_div"></div>'+
			    '<div class="hen"></div>';
    		return html;
    	}
    	function getListCont(){
    		Ajax.get(url, config, true)
				.then(function (res) {
					if(res.success){
						var data = res.data,
							list = data.list,
							html = "";

						if(list.length){
							html = tmplCont({items: data.list});

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
    	
    	function getEleCont(){
    		Ajax.get(url, config, true)
				.then(function (res) {
					if(res.success){
						var data = res.data,
							html = "";
						data = data.length && data[0];
						html = tmplCont(data);
						$("#n_right").html(html);
					}else{
						doError();
					}
				});
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
    	
    	function initView(){
			//获取菜单信息
    		Ajax.get(APIURL + '/company/menu/list', {"companyCode": COMPANYCODE}, true)
				.then(function (res) {
					if(res.success){
						 var data = res.data, html = "";
						 var html1 = "";
						 //menuArr1存储所有菜单数据，menuArr按父子关系保存菜单数据，menuSeq保存一级菜单的顺序
						 for(var j = 0, len = data.length; j < len; j++){
							 var dd = data[j], pc = dd.parentCode;
							 menuArr1[dd.code] = dd;
							 if(!pc || pc == "0"){
								 if(!menuArr[dd.code]){
									 menuArr[dd.code] = [];
									 menuSeq.push(dd.code);
								 }
							 }else{
								 if(!menuArr[pc]){
									 menuArr[pc] = [];
									 menuSeq.push(pc);
								 }
								 menuArr[pc].push(dd);
							 }
						 }
						//如果是查看二级菜单的内容，或者根据code获取内容
						 if(code || parentCode){
							 //for(var dd in menuArr){
							 for(var j = 0; j < menuSeq.length; j++){
								 var dd = menuSeq[j];
								 var flag = 0, d = menuArr1[dd];
								 //当前页面是否是定制页面
								 if(d.url){
									 flag = 1;
								 }
								 //如果是当前页面的父菜单，则取出当前父菜单下的所有子菜单并显示
								 if(parentCode == dd){
									 html += '<li><a href="./content.html?tmp='+d.templetCode+'&ct='+d.contentType+'&cp='+COMPANYCODE+'&m='+ d.code+'&u='+flag+'" class="wa active">'+d.name+'</a></li>';
									 var arr = menuArr[dd];
									 //有子菜单
									 if(arr.length){
										 for(var k = 0; k < arr.length;k++){
											 flag = 0;
											 var aa = arr[k];
											 //如果是查看当前菜单下的内容
											 if(aa.code == menuCode){
												 if(aa.url){
													 u = 1;
													 flag = 1;
													 specialUrl = aa.url;
												 }
												 html1 += '<li>'+
													 '<a href="./content.html?tmp='+aa.templetCode+'&ct='+aa.contentType+'&cp='+COMPANYCODE+'&m='+ aa.code+'&u='+flag+'&pc='+parentCode+'" class="wz_a active">'+
													 '<div class="wz time1">'+aa.name+'</div>'+
													 '<div class="sk time1"></div>'+
													 '</a></li>';
											 }else {
												 if(aa.url){
													 flag = 1;
												 }
												 html1 += '<li>' +
													 '<a href="./content.html?tmp=' + aa.templetCode+'&ct='+aa.contentType+'&cp='+COMPANYCODE+'&m='+aa.code+'&u='+flag+'&pc='+parentCode+'" class="wz_a time1">' +
													 '<div class="wz time1">' + aa.name + '</div>' +
													 '<div class="sk time1"></div>' +
													 '</a></li>';
											 }
										 }
									 //没有子菜单
									 }else{
										 hasChildMenu = false;
									 }
									 getContent();

									 if (history.pushState) {
										 history.replaceState(null, document.title, location.href.split("#")[0]+location.hash);
									 }
								 //不是当前页面的一级菜单
								 }else{
									 if(d.code.indexOf("Index") != -1){
										 html = '<li><a href="'+d.url+'?cp='+COMPANYCODE+'" class="wa time1">'+d.name+'</a></li>' + html;
									 }else {
										 html += '<li><a href="./content.html?tmp=' + d.templetCode + '&ct=' + d.contentType + '&cp=' + COMPANYCODE + '&m=' + d.code + '&u=' + flag + '" class="wa time1">' + d.name + '</a></li>';
									 }
								 }
							 }
						 //获取一级菜单的内容
						 }else{
							 //for(var dd in menuArr){
							 for(var j = 0; j < menuSeq.length; j++){
								 var dd = menuSeq[j];
								 var flag = 0, d = menuArr1[dd];
								 if(d.url){
									 flag = 1;
								 }
								 //如果是当前菜单
								 if(menuCode == dd){
									 if(d.url){
										 u = 1;
									 }
									 html += '<li><a href="./content.html?tmp='+d.templetCode+'&ct='+d.contentType+'&cp='+COMPANYCODE+'&m='+ d.code+'&u='+flag+'" class="wa active">'+d.name+'</a></li>';
									 var arr = menuArr[dd];
									 //如果有子菜单
									 if(arr.length){
										 for(var k = 0; k < arr.length;k++){
											 flag = 0;
											 var aa = arr[k];
											 if(aa.url){
												 flag = 1;
											 }
											 //默认显示第一个子菜单
											 if(k == 0){
												 menuCode = aa.code;
												 tmpl = aa.templetCode;
												 contentType = aa.contentType;
												 u = flag;
												 specialUrl = aa.url;
												 html1 += '<li>'+
													 '<a href="./content.html?tmp='+aa.templetCode+'&ct='+aa.contentType+'&cp='+COMPANYCODE+'&m='+ aa.code+'&u='+flag+'&pc='+dd+'" class="wz_a active">'+
													 '<div class="wz time1">'+aa.name+'</div>'+
													 '<div class="sk time1"></div>'+
													 '</a></li>';
											 }else {
												 html1 += '<li>' +
													 '<a href="./content.html?tmp=' + aa.templetCode+'&ct='+aa.contentType+'&cp='+COMPANYCODE+'&m='+aa.code+'&u='+flag+'&pc='+dd+'" class="wz_a time1">' +
													 '<div class="wz time1">' + aa.name + '</div>' +
													 '<div class="sk time1"></div>' +
													 '</a></li>';
											 }
										 }
									 }else{
										 hasChildMenu = false;
									 }
									 getContent();

									 if (history.pushState) {
										 history.replaceState(null, document.title, location.href.split("#")[0]+location.hash);
									 }
								 //不是当前页面的一级菜单
								 }else{
									 if(d.code.indexOf("Index") != -1){
										 html = '<li><a href="'+d.url+'?cp='+COMPANYCODE+'" class="wa time1">'+d.name+'</a></li>' + html;
									 }else {
										 html += '<li><a href="./content.html?tmp=' + d.templetCode + '&ct=' + d.contentType + '&cp=' + COMPANYCODE + '&m=' + d.code + '&u=' + flag + '" class="wa time1">' + d.name + '</a></li>';
									 }
								 }
							 }
						 }

						 html = '<ul>'+html+'</ul>';
						 $("#nav").html(html);
						 $("#l_list").html(html1);
						 eleMenus = $("#l_list>li a");
						 addListeners();
					 }
				});
			//获取公司信息
	    	Ajax.get(APIURL + '/company/info', {"companyCode": COMPANYCODE}, true)
				.then(function(res){
					if(res.success){
		                var data = res.data,
		                	html = footTmpl(data);
		                $("#top-tel").text(data.telephone);
		                $(".top .logo img").attr("src", data.logo);
		                $("#foot").replaceWith(html);
		            }
				});
    	}
    	
    	function addListeners(){
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
    			config = {
	    			"companyCode": COMPANYCODE
	    		};
    			var query = this.href.split("?")[1], me = $(this);
    			u = base.getParam("u", query);
    			source = contentSource["default"];
    			tmpl = base.getParam("tmp", query);
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
				//如果是定制页面
				if(u == "1"){
					specialUrl = menuArr1[menuCode].url;
				}
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
});
