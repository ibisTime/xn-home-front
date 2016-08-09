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
            addListeners();
        }

        function addListeners(){

            $("#person").on("keyup", function(e){
                var keyCode = e.charCode || e.keyCode;
                if(keyCode == 13){
                    $("#sbtn").click();
                }
            }).on("change", function(){
                validatePerson();
            });
            $("#content1").on("keyup", function(e){
                var keyCode = e.charCode || e.keyCode;
                if(keyCode == 13){
                    $("#sbtn").click();
                }
            }).on("change", function(){
                validateContent1();
            });

            $("#sbtn").on("click", function(){
                if(!$(this).hasClass("isdoing") && validate()){
                    $(this).addClass("isdoing").text("提交中...");
                    postMessage();
                }
            });
        }
        function postMessage(){
            Ajax.post(APIURL + '/company/addOnlineMessage',
                {
                    "person": $("#person").val(),
                    "content1": $("#content1").val(),
                    "companyCode": COMPANYCODE
                }).then(function(res){
                    $("#sbtn").removeClass("isdoing").text("提交");
                    if(res.success){
                        showMsg("提交成功！");
                    }else{
                        showMsg("提交失败！");
                    }
                });
        }
        function validate(){
            return validateContent1() && validatePerson();
        }
        function validatePerson(){
            var ele = $("#person"),
                mVal = ele.val(), flag = true;
            if(!isEmpty(mVal) && mVal.length > 64){
                ele.next().next().fadeIn(150).fadeOut(3000);
                flag = false;
            }
            return flag;
        }
        function validateContent1(){
            var ele = $("#content1"),
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
