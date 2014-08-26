//jquery-1.8.3.min.js

if(typeof yang !=='object') var yang = {};
yang.toTop = function(){
	var showBtn = function(o){
		if ( $(document).scrollTop() == 0 )
		{
			o.hide();
		}else{
			o.fadeIn();
		}	
	};
	this.onReady = function(){
		var $totopbtn = $("#to-top");
		$(window).scroll(function(){showBtn($totopbtn)});
		$totopbtn.click(function(o){
			o.preventDefault();
			$('body,html').animate({scrollTop:0}, 'slow');
			return false;
		});	
	};
};

$(function(){(new yang.toTop).onReady()});