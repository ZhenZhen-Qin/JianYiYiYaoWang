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
var idx = 0;
function movePic(){
    var timer = setInterval(function(){
        idx ++;
        $banBtmUl.animate({left:-idx*740},1000);
        if(idx >= 5){
            idx = 1;
            $banBtmUl[0].style.left = 0;
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


// 接受登录传过来的用户名
var uname = "";
if(location.search.split("?")[1]){
    uname = location.search.split("?")[1].split("=")[1] ? location.search.split("?")[1].split("=")[1] : "";
    if(uname != ""){
        $("#denglu").find(".d1").remove();
        $("#denglu").find(".d2").html(uname);
    }
}

//a标签的默认行为
console.log($(".nav>li"))
$(".nav>li").on("click","a",function () {
    location.href = "html/listpage.html?uname=" + uname;

});



//固定定位
$(".Online_Consulting")[0].style.left = document.body.clientWidth-38 +"px";
$(".Online_Consulting .p1").hide();
$(".Online_Consulting #img1").on("mouseenter",function () {
    $(".Online_Consulting .p1").show(500);
});
$(".Online_Consulting #img1").on("mouseleave",function () {
    $(".Online_Consulting .p1").hide(100);
});

$(".Online_Consulting .p2").hide();
$(".Online_Consulting #img2").on("mouseenter",function () {
    $(".Online_Consulting .p2").show(500);
});
$(".Online_Consulting #img2").on("mouseleave",function () {
    $(".Online_Consulting .p2").hide(100);
});


//促销活动
var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        var status = [200,304];
        if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
            var res = JSON.parse(xhr.responseText);

            var str1 = "";
            var str2 = "";
            var str3 = "";

            for(let i=0;i<4;i++){
                str1+= `
                <li date-gid="${res[i].gid}">
                    <img src="${res[i].imgurl}" alt="">
                    <a class="hotlist_name">${res[i].gname}</a>
                    <p class="hotlist_price">
                        秋季上新价：<span>${res[i].price}</span>元
                    </p>
                </li>`;
            }
            for(let i=5;i<9;i++){
                str2+= `
                <li date-gid="${res[i].gid}">
                    <img src="${res[i].imgurl}" alt="">
                    <a class="hotlist_name">${res[i].gname}</a>
                    <p class="hotlist_price">
                        秋季上新价：<span>${res[i].price}</span>元
                    </p>
                </li>`;
            }
            for(let i=9;i<13;i++){
                str3+= `
                <li date-gid="${res[i].gid}">
                    <img src="${res[i].imgurl}" alt=""  >
                    <a class="hotlist_name">${res[i].gname}</a>
                    <p class="hotlist_price">
                        秋季上新价：<span>${res[i].price}</span>元
                    </p>
                </li>`;
            }

            $($(".hot_content")[0]).html(str1);
            $($(".hot_content")[1]).html(str2);
            $($(".hot_content")[2]).html(str3);
            $($(".hot_content")[0]).show().nextAll().hide();

        }
    };
xhr.open("get","api/index.php");
xhr.send(null);

$(".ht_li")[0].children[0].classList.add("lihover");
$(".ht_li").on("mouseenter","li",function(){
    $(this).addClass("lihover").siblings().removeClass("lihover");
    var idx = this.getAttribute("date-idx");
    $($(".hot_content")[idx-1]).show().siblings().hide();
});

//  给hot_content的所有img添加点击事件
console.log($("#good_hot .hot_content"));

$("#good_hot .hot_content").on("click","li",function(){
    location.href = "html/details.html?gid="+this.getAttribute("date-gid") + "&uname=" + uname;
});





















