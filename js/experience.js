if(typeof yang !=='object') var yang = {};
yang.notes = function(){
    this.onReady = function(){
        var $experience = $("#experience");

        //experience-nav菜单动态效果
        function curContent(o){
            var id=$(o).attr("id");
            $("#main").find("h2>strong").html(id);
            var curId = "#content-"+id;
            $("dl").css("display","none");
            $(curId).css("display","block");
            console.log(curId);
            console.log(id);
        }
        $("#experience-nav").find("li").each(function(index,element){
            if(index===0){
                curContent(this);
            }else{
                $(this).animate({"margin-left":"90px","padding-left":"500px","background-color":"#ccc","color": "#000"},"normal");
            }
        }).bind("click",function(e){
                e=e||window.event;
                e.preventDefault();
                if(this.tagName.toLowerCase()==="li"){
                    $(this).animate({"margin-left":0,"padding-left":0},"normal").
                        siblings().animate({"margin-left":"90px","padding-left":"500px"},"normal");
                    curContent(this);
                }
                return false;
        });

        //experience内容动态效果
        function dtToggle(){
            if(this.className==="hide"){
                $(this).removeClass();
            }else{
                $(this).addClass("hide");
            }
            var nextNode=this.nextSibling;
            while(nextNode.nodeType !==1){
                nextNode=nextNode.nextSibling;
            }
            if(nextNode.tagName.toLowerCase()==="dd"){
                $(nextNode).toggle();
            }
        }
        $(document).delegate("#experience dt","click",dtToggle);

    }
};
$(function() {
    (new yang.notes).onReady()
});