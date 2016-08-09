define([
	'app/controller/base',
	'app/util/ajax'
], function (base, Ajax) {
    $(function () {
    	var COMPANYCODE = base.getUrlParam("cp");

    	Ajax.get(APIURL + '/company/info', {"companyCode": COMPANYCODE}, true)
    		.then(function(res){
    			if(res.success){
                    var data = res.data;
					$("#addr").replaceWith(addCompany(data));
					addMap(data.longitude, data.latitude);
                }
    		});

		function addCompany(data){
			var html = '<div class="c_txt">';
			if(data.name){
				html += '<span>'+data.name+'</span><br/>';
			}
			if(data.description){
				html += '<p class="mtb10 t-i2em">'+data.description+'</p>';
			}
			html += '<p style="position: relative;min-height:120px;">'
			if(data.telephone){
				html += '电话：'+data.telephone+'<br/>';
			}
			if(data.fax){
				html += '传真：'+data.fax+'<br/>'
			}
			if(data.email){
				html += '邮箱：'+data.email+'<br/>'
			}
			if(data.address){
				html += '地址：'+data.address+'<br/>'
			}
			if(data.barCode){
				html += '<img class="cp-barCode" src="'+data.barCode+'"/>'
			}
			html += '</p></div>';
			return html;
		}
		function addMap(longitude, latitude) {
			// 百度地图API功能
			var map = new BMap.Map("allmap");    // 创建Map实例
			var point = new BMap.Point(longitude, latitude);
			map.centerAndZoom(point, 14);  // 初始化地图,设置中心点坐标和地图级别
			map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
			//map.setCurrentCity("");          // 设置地图显示的城市 此项是必须设置的
			map.addControl(new BMap.NavigationControl());        // 添加平移缩放控件
			map.addControl(new BMap.ScaleControl());             // 添加比例尺控件
			var marker = new BMap.Marker(point);// 创建标注
			map.addOverlay(marker);             // 将标注添加到地图中
			marker.disableDragging();           // 不可拖拽
			map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
			$(parent.document).find("#c-iframe").height($("html").height());
		}
    });
});
