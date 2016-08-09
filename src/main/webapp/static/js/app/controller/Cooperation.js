define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dialog'
], function (base, Ajax, dialog) {
    $(function(){
        $('#sbt').on("click", function () {
            if(validate()){
                $("body").append('<i class="icon-loading" style="position: fixed;top: -72px;height: 100%;background-color: #fff;opacity: .6;background-position: 50% 58%;"></i>');
                doSubmit();
            }
        });
        function validate() {
            var flag = true;
            var isPhone = /^([0-9]{3,4}-)?[0-9]{7,8}$/;
            var isMob=/^((\+?86)|(\(\+86\)))?(13[012356789][0-9]{8}|15[012356789][0-9]{8}|18[02356789][0-9]{8}|147[0-9]{8}|1349[0-9]{7})$/;
            
            if(!$("#compName").val().trim()){
                flag = false;
                $("#compName").next().fadeIn(150).fadeOut(3000);
            }else if($("#compName").val().length > 64){
            	flag = false;
                $("#compName").next().next().fadeIn(150).fadeOut(3000);
            }
            var tval = $("#telephone").val();
            if(!tval.trim()){
                flag = false;
                $("#telephone").next().fadeIn(150).fadeOut(3000);
            }else if( !(isPhone.test(tval) || isMob.test(tval)) ){
            	flag = false;
                $("#telephone").next().next().fadeIn(150).fadeOut(3000);
            }
            if(!$("#person").val().trim()){
                flag = false;
                $("#person").next().fadeIn(150).fadeOut(3000);
            }else if($("#person").val().length > 64){
            	flag = false;
                $("#person").next().next().fadeIn(150).fadeOut(3000);
            }
            if(!$("#remark").val().trim()){
                flag = false;
                $("#remark").next().fadeIn(150).fadeOut(3000);
            }else if($("#remark").val().length > 255){
            	flag = false;
                $("#remark").next().next().fadeIn(150).fadeOut(3000);
            }
            return flag;
        }
        function doSubmit(){
            Ajax.post(APIURL + '/company/addPartner',
                {
                    "organization": $("#compName").val(),
                    "person": $("#person").val(),
                    "contact": $("#telephone").val(),
                    "content1": $("#remark").val(),
                    "companyCode": COMPANYCODE
                })
                .then(function (res) {
                    if(res.success){
                        location.href = './submit_success.html';
                    }else{
                        $(".icon-loading").remove();
                        var d = dialog({
                            content: '提交失败！',
                            quickClose: true
                        });
                    }
                });
        }
    });
});