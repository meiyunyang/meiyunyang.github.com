if(typeof yang !=='object') var yang = {};
yang.nav = function(){
	var $nav = $("#nav");
	this.onReady = function(){
		try{
            $nav.Fisheye({
                maxWidth: 35,
                items: 'li',
                itemsText: 'span',
                container: '.nav-container',
                itemWidth: 80,
                proximity: 50,
                alignment : 'center',
                valign: 'bottom',
                halign : 'center'
            });
        }catch(e){
        }
	}
};
$(function() {
	(new yang.nav).onReady()
});