/**
 * Created with JetBrains WebStorm.
 * User: RD4021
 * Date: 13-8-13
 * Time: 下午4:49
 * To change this template use File | Settings | File Templates.
 */
if(typeof cherie !=='object') var cherie = {};
cherie.worksBig = function(){
    var enterFlag=false;
    var $workGroup = $("#work-group");
    function imgMouseenter(e){
        console.log("enter");
        e=e||window.event;
        e.preventDefault();
        enterFlag=true;
        var srcBig;
        if(this.tagName.toLowerCase()==="img"){
            srcBig=this.getAttribute("src").replace(/(\w+)(.png)$/g,"$1"+"_big"+"$2");
        }else if(this.tagName.toLowerCase()==="a"){
            var img=$(this).find("span").get(0);
            var result=img.outerHTML.toString().match(/images\/works\/\w+.png/);
            if(!result[0]) return false;
            srcBig=result[0].replace(/(\w+)(.png)$/g,"$1"+"_big"+"$2");
        }
        var $bigImg=$("#bigImg");
        $bigImg.css("background-image","url("+srcBig+")");
        $bigImg.css("top",(e.pageY-340)+"px");
        $bigImg.css("left",(e.pageX-190)+"px");
        $bigImg.css("display","block");
        return false;
    }
    function imgMousemove(e){
        console.log("move");
        e=e||window.event;
        if(enterFlag){
            var bigImg=$("#bigImg").get(0);
            if(!bigImg)    return false;
            $(bigImg).css("top",(e.pageY-340)+"px");
            $(bigImg).css("left",(e.pageX-190)+"px");
        }
        return false;
    }
    function imgMouseout(e){
        e=e||window.event;
        e.preventDefault();
        enterFlag=false;
        var bigImg=$("#bigImg").get(0);
        $(bigImg).css("display","none");
        return false;
    }
    this.onReady = function(){
        if(navigator.appVersion.indexOf("MSIE")!==-1){
            $workGroup.delegate("dd>a","mouseenter",imgMouseenter);
            $workGroup.delegate("dd>a","mousemove",imgMousemove);
            $workGroup.delegate("dd>a","mouseout",imgMouseout);
        }else{
            $workGroup.delegate("a>img","mouseenter",imgMouseenter);
            $workGroup.delegate("a>img","mousemove",imgMousemove);
            $workGroup.delegate("a>img","mouseout",imgMouseout);
        }
        return false;
    };
};

$(function(){(new cherie.worksBig).onReady()});