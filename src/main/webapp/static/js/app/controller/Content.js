define([
    'app/controller/base',
    'app/util/ajax',
    'lib/swiper-3.3.1.jquery.min'
], function (base, Ajax, Swiper) {
    $(function () {

        var code = base.getUrlParam("code");
        init();
        function init(){
            if(sessionStorage.getItem("compCode")){
                base.addIcon();
            }else{
                base.getCompanyByUrl()
                    .then(function(){
                        base.addIcon();
                    });
            }
            if(code){
                getContent();
            }else{
                base.showMsg("未传入内容编号!");
            }
        }

        function getContent(){
            base.getContent(code)
                .then(function(res){
                    if(res.success){
                        var data = res.data;
                        $("#title").text(data.title);
                        var pic = data.pic2;
                        if(pic){
                            $("#img").html('<img class="wp100" src="'+pic+'">');
                        }else if(data.url){
                            $("#img").html("<iframe height='300' width='100%' src='"+data.url+"' frameborder=0 'allowfullscreen'></iframe>");            
                        }
                        $("#description").html(data.description);
                    }else{
                        base.showMsg("非常抱歉，暂时无法获取相关内容!");
                    }
                });
        }
    });
});
