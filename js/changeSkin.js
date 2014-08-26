if(typeof yang !=='object') var yang = {};
yang.changeSkin = function(){
	var $chooseSkin = $("#choose-skin"),
		$chooseSkinLi = $chooseSkin.find("li"),
		$skin = $("#skin");
	function CookieEnable() { 
		var result=false; 
        if(navigator.cookiesEnabled){
			return true; 
		}
        var cookieSet = document.cookie; 
        if (cookieSet.indexOf("testcookie=yes") > -1){
			result=true; 
		}
        document.cookie = ""; 
        return result; 
    }
	function setSkin(newSkin){
		var nowSkin = $.cookie('chooseSkin'); // 获得cookie
		if(nowSkin){
			if(!CookieEnable())  {//测试浏览器是否启用了cookie
				$skin.attr("href",nowSkin);
				var thisIndex = nowSkin.slice(8,-4) - 1;
				$chooseSkinLi.eq(thisIndex).addClass("cur").siblings("li").removeClass("cur");
			}
		}else if(newSkin){
            $skin.attr("href",newSkin);
            thisIndex = newSkin.slice(8,-4) - 1;
            $chooseSkinLi.eq(thisIndex).addClass("cur").siblings("li").removeClass("cur");
        }
	} 
	this.onReady = function(){
		setSkin();
        $chooseSkinLi.click(function(){
            var newSkin = "css/" + $(this).data("theme") + ".css";
            $.cookie('chooseSkin', newSkin,{expires: 30}); // 设置cookie
            setSkin(newSkin);
        });
	}
};
$(function(){(new yang.changeSkin).onReady()});