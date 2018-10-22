//banner
$("#lunbo").lmCarousel({imgs:["images/banner.jpg","images/banner1.jpg","images/banner2.jpg","images/banner3.jpg","images/banner4.jpg","images/banner5.jpg"],width:740,height:266,type:"fade",seamless : true});

// 右侧tab切换
tabSwitch();
function tabSwitch(){
     $ul1 = $(".tab_title");
     $showImg = $(".showImg").children();
    $($showImg[0]).show();
    $($ul1.children()[0]).addClass("li_1");

    $ul1.on("mouseenter","li",function(){
        for(var i=0;i<$showImg.length;i++){
            $($ul1.children()[i]).removeClass("li_1");
            $($showImg[i]).hide();
            if(this.getAttribute("idx") == $showImg[i].getAttribute("idx")){
                $(this).addClass("li_1");
                $($showImg[i]).show();
            }
        }

    })

}


//轮播图左右点击效果,传入jquery对象
$span3 = $(".span3");
$span4 = $(".span4");
$banBtmUl = $(".banner_bottom ul");
$span3.on("click",function(){
    clickLunbotu($span3,$banBtmUl,"left",740);
});
$span4.on("click",function(){
    clickLunbotu($span4,$banBtmUl,"right",740);
});
function clickLunbotu(ele,moveEle,fangxiang,juli){
        var currentPos = $banBtmUl.position();

        if(fangxiang == "left"){
            moveEle.animate({left:currentPos.left-juli},1000);
            currentPos.left -= juli;
            console.log(currentPos.left);
            if(currentPos.left < -2220){
                currentPos.left = 0;
            }
        }else if(fangxiang == "right"){
            moveEle.animate({left:currentPos.left+juli},1000);
            currentPos.left += juli;
            console.log(currentPos.left);
            if(currentPos.left > 2220){
                currentPos.left = 0;
            }
        }
}

/*banner底部轮播图*/
var timer1 = movePic();
var timer2;
var idx = 0
function movePic(){
    var timer = setInterval(function(){
        idx ++;
        $banBtmUl.animate({left:-idx*740},1000);
        if(idx >= 5){
            //$banBtmUl[0].style.left = 0;
            idx = 1;
        }
    },2000);
    return timer;
}
$banBtmUl.on("mouseenter", function () {
    clearInterval(timer1);
    clearInterval(timer2);
    console.log("清除定时器");
});
$banBtmUl.on("mouseleave", function () {
    timer2 = movePic();
    console.log("开启定时器")
});




