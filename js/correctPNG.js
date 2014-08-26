if(typeof yang !=='object') var yang = {};
yang.correctPNG = function(){
    this.onReady = function(){
        var arVersion=navigator.appVersion.split("MSIE");
        var version=parseFloat(arVersion[1]);
        if((version>=5.5) && (document.body.filters)){
            var $imgs=$("img");
            var len=$imgs.length;
            for(var j=0;j<len;j++){
                var img=$imgs[j];
                var imgName=img.src.toUpperCase();
                if(imgName.substring(imgName.length-8,imgName.length-4)==="_NAV") continue;
                if(imgName.substring(imgName.length-3,imgName.length)=="PNG"){
                    var imgID=(img.id)?"id='"+img.id+"'":"";
                    var imgClass=(img.className)?"class='"+img.className+"'":"";
                    var imgTitle=(img.title)?"title='"+img.title+"'":"title='"+img.alt+"'";
                    var imgStyle="display:inline-block;"+img.style.cssText;
                    if(img.align=="left"){
                        imgStyle+="float:left;"
                    }else if(img.align=="right"){
                        imgStyle+="float:right;"
                    }
                    if(img.parentNode && img.parentNode.href){
                        imgStyle+="cursor:pointer;"
                    }
                    var strNewHTML="<span "+imgID+imgClass+imgTitle+" style=\"width:"+img.width+"px;height:"+img.height+"px;"+
                        imgStyle+"filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'"+
                        img.src+"\',sizingMethod='scale');\"></span>";
                    img.outerHTML=strNewHTML;
                }
            }
        }
    }
};
$(function() {
    (new yang.correctPNG).onReady();
});
