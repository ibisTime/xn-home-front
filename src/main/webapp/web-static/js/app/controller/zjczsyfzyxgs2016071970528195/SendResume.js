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
                    $(this).addClass("isdoing").val("�ϴ���");
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
                url: postUrl, //�����ļ��ϴ��ķ������������ַ
                type: 'POST',
                secureuri: false, //�Ƿ���Ҫ��ȫЭ�飬һ������Ϊfalse
                fileElementId: fileId, //�ļ��ϴ����ID
                dataType: 'json', //����ֵ���� һ������Ϊjson
                success: function (data, status)  //�������ɹ���Ӧ������
                {
                    if (typeof (data.status) != 'undefined') {
                        if (data.status == "1") {
                            addResume(data.url);
                            if(!isEmpty(uploadControlId)){
                                $("#"+uploadControlId).text(data.url.substring(data.url.lastIndexOf('/')+1));
                                $("#"+uploadControlId).attr('href',data.url);
                            }
                        } else {
                            $("#sbtn").removeClass("isdoing").val("�ύ");
                            showMsg('�ϴ�ʧ��');
                        }
                    }
                },
                error: function (data, status, e)//��������Ӧʧ�ܴ�����
                {
                    $("#sbtn").removeClass("isdoing").val("�ύ");
                    showMsg('�ϴ�ʧ��');
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
                    $("#sbtn").removeClass("isdoing").val("�ύ");
                    if(res.success){
                        showMsg('�ϴ��ɹ�');
                    }else{
                        showMsg('�ϴ�ʧ��');
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
