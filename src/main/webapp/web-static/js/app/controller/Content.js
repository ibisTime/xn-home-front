define([
	'app/controller/base',
	'app/util/ajax',
	'app/util/dict',
	'Handlebars',
	'lib/Pagination'
], function (base, Ajax, Dict, Handlebars, Pagination) {
    $(function () {
    	var tmpls = {
        		"001": addEle,
        		"002": addList
        	}, COMPANYCODE = base.getUrlParam("cp");
		var menuArr = {}, menuArr1 = {};
    	var contentSource = Dict.get("contentSource"),
    		templetCode = Dict.get("templetCode"),
    		//idx = base.getUrlParam("t") || 0,
			u = base.getUrlParam("u"),
    		//s = base.getUrlParam("c"),
    		source = contentSource["default"],
    		tmpl = base.getUrlParam("tmp"),
    		contentType = base.getUrlParam("ct"),
    		menuCode = base.getUrlParam("m"),
    		limit = Dict.get("limit"), url, specialUrl,
    		config = {
    			"companyCode": COMPANYCODE
    		}, hasChildMenu = true,
			parentCode = base.getUrlParam("pc"),
    		tmplCont, code = base.getUrlParam("code"), eleMenus;
    	var footTmpl = __inline('../ui/foot.handlebars');
    		
    	initView();
    	
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
    		
    		if(u == "1"){
				getSpecialCont();
    		}else{
    			config.menuCode = menuCode;
    			tmplCont = tmpls[tmpl];
    			if(contentType == "list"){
        			config.start = 1;
        			config.limit = limit;
        			getListCont();
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
    		Ajax.get(APIURL + '/company/menu/list', {"companyCode": COMPANYCODE}, true)
				.then(function (res) {
					if(res.success){
						 var data = res.data, html = "";
						 var html1 = "";
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
						 if(code || parentCode){
							 for(var dd in menuArr){
								 var flag = 0, d = menuArr1[dd];
								 if(d.url){
									 flag = 1;
								 }
								 if(parentCode == dd){
									 html += '<li><a href="./content.html?tmp='+d.templetCode+'&ct='+d.contentType+'&cp='+COMPANYCODE+'&m='+ d.code+'&u='+flag+'" class="wa active">'+d.name+'</a></li>';
									 var arr = menuArr[dd];
									 if(arr.length){
										 for(var k = 0; k < arr.length;k++){
											 flag = 0;
											 var aa = arr[k];
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
									 }else{
										 hasChildMenu = false;
									 }
									 getContent();

									 if (history.pushState) {
										 history.replaceState(null, document.title, location.href.split("#")[0]+location.hash);
									 }
								 }else{
									 if(d.code.indexOf("Index") != -1){
										 html = '<li><a href="'+d.url+'?cp='+COMPANYCODE+'" class="wa time1">'+d.name+'</a></li>' + html;
									 }else {
										 html += '<li><a href="./content.html?tmp=' + d.templetCode + '&ct=' + d.contentType + '&cp=' + COMPANYCODE + '&m=' + d.code + '&u=' + flag + '" class="wa time1">' + d.name + '</a></li>';
									 }
								 }
							 }
						 }else{
							 for(var dd in menuArr){
								 var flag = 0, d = menuArr1[dd];
								 if(d.url){
									 flag = 1;
								 }
								 if(menuCode == dd){
									 if(d.url){
										 u = 1;
									 }

									 html += '<li><a href="./content.html?tmp='+d.templetCode+'&ct='+d.contentType+'&cp='+COMPANYCODE+'&m='+ d.code+'&u='+flag+'" class="wa active">'+d.name+'</a></li>';
									 var arr = menuArr[dd];
									 if(arr.length){
										 for(var k = 0; k < arr.length;k++){
											 flag = 0;
											 var aa = arr[k];
											 if(aa.url){
												 flag = 1;
											 }
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
    		/*$("#nav").on("click", "ul>li>a", function(){
    			var me = $(this);
    			if(me.text().indexOf("首页") == -1){
    				$("#nav").find("a.active").addClass("time1");
        			$("#nav").find("a.active").removeClass("active");
        			me.addClass("active").removeClass("time1");
        			config = {
    	    			"companyCode": COMPANYCODE
    	    		};
        			var query = this.href.split("?")[1], me = $(this);
        			var ii = me.parent().index();
        			var leftUl = $("#l_list");
        			
        			
        			leftUl.find("a.active").removeClass("active").addClass("time1");
        			var ac_a = leftUl.find("li:eq("+(ii-1)+")").find("a");
					ac_a.addClass("active").removeClass("time1");
        			
        			idx = base.getParam("t", query);
        			s = base.getParam("c", query);
        			source = contentSource[s] || contentSource["default"];
        			tmpl = base.getParam("tmp", query);
        			contentType = base.getParam("ct", query);
        			code = base.getParam("code", query);
        			menuCode = base.getParam("m", query);
            	    
        	        var title = me.text();
        	        document.title = title;
        	        if (event && /\d/.test(event.button) && history.pushState) {            
        	            history.pushState({ title: title }, title, location.href.split("?")[0] + "?" + query);
        	        }
        	        $("#n_right").html("<i style='height:521px;' class='loading-icon'></i>");
        	        getContent();
        	        
            	    return false;
    			}
    		});*/
    		$("#l_list").on("click", "li a", function(event){
    			$("#l_list").find("a.active").addClass("time1");
    			$("#l_list").find("a.active").removeClass("active");
    			$(this).addClass("active").removeClass("time1");
    			config = {
	    			"companyCode": COMPANYCODE
	    		};
    			var query = this.href.split("?")[1], me = $(this);
    			//var ii = me.parent().index();
    			//var topUl = $("#nav>ul");
    			
    			
    			//topUl.find("a.active").removeClass("active").addClass("time1");
				//var ac_a = topUl.find("li:eq("+(ii+1)+")").find("a");
				//ac_a.addClass("active").removeClass("time1");
    			
    			//idx = base.getParam("t", query);
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
				if(u == "1"){
					specialUrl = menuArr1[menuCode].url;
				}
    	        getContent();
    	        
        	    return false;
        	});
    		if (history.pushState) {
        	    window.addEventListener("popstate", function() {
        	        fnHashTrigger();                             
        	    });
        	}
    	}
    });
});
