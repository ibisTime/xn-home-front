!function(){!function(){return console.info("Powered By Xiongniu")}(),$(function(){var n,e,o;return e=$("#header .menu-icon"),n=$("#aside-mobile"),o=function(){return n.toggleClass("on"),n.hasClass("on")?($("html").addClass("on-slide-menu"),setTimeout(function(){return $(document).one("touchend",function(e){return $(e.target).is(n.find("a"))?void 0:o()})})):($("html").removeClass("on-slide-menu"),e.one("click",o))},e.one("click",o)})}.call(this);