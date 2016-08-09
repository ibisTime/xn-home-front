define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dialog'
], function (base, Ajax, dialog) {
    $(function () {
        var COMPANYCODE = base.getUrlParam("cp");
        initView();
        function initView(){

            $(parent.document).find("#c-iframe").height($("html").height());
            $("#form").attr("action", APIURL + '/upload/file');
            addListeners();
        }

        function addListeners(){
            $("#sbtn").on("click", function(){
                if(!$(this).hasClass("isdoing") && validate()){
                    $(this).addClass("isdoing").val("上传中");
                    sendResume();
                }
            });
        }
        function sendResume(){
            ajaxFileUpload(APIURL + '/upload/file', "file1");
        }
        function validate(){
            var maxSize = 10 * 1024 * 1024;
            var file1 = $("#file1"),
                myFile = $("#file1")[0], ff;
            var myValue = $("#content1").val();
            if(isEmpty(myValue)){
                $("#content1").next().fadeIn(150).fadeOut(3000);
                return false;
            }
            if(myValue.length > 255){
                $("#content1").next().next().fadeIn(150).fadeOut(3000);
                return false;
            }

            if(ff = myFile.files && myFile.files[0]){
                if(ff.size > maxSize){
                    file1.next().next().next().fadeIn(150).fadeOut(3000);
                    return false;
                }
                if(ff.type != "application/pdf"){
                    file1.next().next().next().next().fadeIn(150).fadeOut(3000);
                    return false;
                }
                return true;
            }else{
                file1.next().next().fadeIn(150).fadeOut(3000);
                return false;
            }

        }
        function ajaxFileUpload(postUrl,fileId,uploadControlId) {
            $.ajaxFileUpload({
                url: postUrl, //用于文件上传的服务器端请求地址
                type: 'POST',
                secureuri: false, //是否需要安全协议，一般设置为false
                fileElementId: fileId, //文件上传域的ID
                dataType: 'json', //返回值类型 一般设置为json
                success: function (data, status)  //服务器成功响应处理函数
                {
                    if (typeof (data.status) != 'undefined') {
                        if (data.status == "1") {
                            addResume(data.url);
                            if(!isEmpty(uploadControlId)){
                                $("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
                                $("#"+uploadControlId).attr('href',data.url);
                            }
                        } else {
                            $("#sbtn").removeClass("isdoing").val("提交");
                            showMsg('上传失败');
                        }
                    }
                },
                error: function (data, status, e)//服务器响应失败处理函数
                {
                    $("#sbtn").removeClass("isdoing").val("提交");
                    showMsg('上传失败');
                }
            });
            return false;
        }
        function addResume(url){
            Ajax.post(APIURL + "/company/addResume", {
                "content1": $("#content1").val(),
                "content2": url,
                "companyCode": COMPANYCODE
            }, true)
                .then(function (res) {
                    $("#sbtn").removeClass("isdoing").val("提交");
                    if(res.success){
                        showMsg('上传成功');
                    }else{
                        showMsg('上传失败');
                    }
                });
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
