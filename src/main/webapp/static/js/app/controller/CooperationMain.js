define([
    'app/controller/base',
    'app/util/ajax',
    'app/util/dialog'
], function (base, Ajax, dialog) {
    $(function(){
    	$("#footDiv").on("click", "a", function(e){
    		e.preventDefault();
    		var idx = $(this).index();
    		$("#ssD>.coopmain-img:eq("+idx+")").show(300);
    	});
    	$("#ssD").on("click", ".coopmain-img>img", function(e){
    		e.stopPropagation();
    		$(this).parent().hide(300);
    	});
    
    	$("#ksjq").on("click", function(){
    		location.href = "./cooperation.html";
    	});
    });
});