if(typeof yang !=='object') var yang = {};
yang.resume = function(){
	this.onReady = function(){
        //打印
		var $print = $("#print");
		$print.click(function(e){
			e.preventDefault();
			window.print();
		});	
	};
};

$(function(){(new yang.resume).onReady()});