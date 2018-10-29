$("div.price .xiadan").hide();
$("div.price .sm").on("mouseenter",function(){
    $("div.price  .xiadan").show();
});
$("div.price .sm").on("mouseleave",function(){
    $("div.price  .xiadan").hide();
});

// 接受登录传过来的用户名,并显示在顶部
//接收来自首页的gid  向PHP发送请求


var uname = location.search.split("?")[1].split("&")[1].split("=")[1];
var gid = location.search.split("?")[1].split("&")[0].split("=")[1];
$("#denglu").find(".d1").remove();
$("#denglu").find(".d2").html(uname).css("color","#c40000");

var xhr = new XMLHttpRequest();

if(gid){
    getGidMsg();
}

function getGidMsg(){
    xhr.onreadystatechange = function(){
        var status = [200,304];
        if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
            var res = JSON.parse(xhr.responseText);
            $(".Gid").html(res.gooddata[0].gid);
            $(".Gname").html(res.gooddata[0].gname);
            $(".Guige").html(res.gooddata[0].guige);
            $(".Price").html(res.gooddata[0].price);
            $(".smortImg li img").attr("src","../" + res.gooddata[0].imgurl);
            $(".Imgurl").attr("src","../" + res.gooddata[0].imgurl)[0].setAttribute("jqimg","../" +res.gooddata[0].imgurl);
            $(".Manufactor").html(res.gooddata[0].manufactor);


            //生成评价
            var str = "";
            res.comment.map(function (item,idx) {
                var imgurl = "../images/details/%5Btouxiang.png";
                var star = "";
                for(let i=0;i<item.star;i++){
                    star += "<i></i>";
                }
                str+=`
                     <li>
                            <img class="fl" src=${imgurl} alt="">
                            <div class="fl"> 
                                <span class="star">
                                    ${star}
                                </span>
                                <span>非常满意</span>
                                <p class="pj_conent">
                                   ${item.content}
                                </p>
                            </div>
                            <p id="show_name">
                                <span class="show_name">(${item.uname})</span>
                            </p>
                        </li>
                `;
            });

            $(".commentList").html(str);



            //    显示购物车
            if(uname != ""){
                //    显示购物车
                var str1 = "";
                res.shopcar.map(function (item,idx) {
                    str1 += `
                    <li class="clearfix">
                                <img class="fl" src="${item.imgurl}" alt="">
                                <p class="fl">
                                    <span>${item.gname}</span>
                                    <span>${item.price}</span>
                                </p>
                                <span class="clearfix fl number">
                                    <s class="fl btnJia">-</s>
                                    <input type="text" class="fl goodNum" value="${item.num}">
                                    <s class="fl btnJian">+</s>
                                    </span>
                            </li> `;
                });

                $(".shopCar .logo_ul2").append($("<ul>").html(str1).addClass("myShopCar")).find("div").hide();

                //移入购物车的效果
                $(".shopCar").on("mouseenter",function(){
                    $(".shopCar .logo_ul2").stop().show().parent().addClass("shopCarHover");
                });
                $(".shopCar .logo_ul2").on("mouseleave",function(){
                    $(this).stop().hide(500);
                });

                //点击添加加减商品的数量  商品数量的加减按钮
                $(".number").on("click","s",function(){
                    if($(this).html() == "-"){
                        var num = $(this).next().val();
                        num--;
                        if(num <= 0){num=0;}
                        $(this).next().val(num);


                    }else if($(this).html() == "+"){
                        var num = $(this).prev().val();
                        num++;
                        if(num <= 0){num=0;}
                        $(this).prev().val(num);
                    }
                });

            }

        }
    };
    if(uname){
        xhr.open("get","../api/details.php?gid="+gid+"&uname="+uname);
        xhr.send(null);
    }else {
        xhr.open("get","../api/details.php?gid="+gid);
        xhr.send(null);
    }



}


//商品数量的加减按钮
$("#number .btnJia").on("click",function () {
        var num = $("#goodNum").val();
        num++;
        $("#goodNum").val(num);
});
$("#number .btnJian").focus(function(){
    var num = $("#goodNum").val();
    if(num <= 0){
        num = 0;
    }
}).on("click",function () {
    var num = $("#goodNum").val();
    num--;
    if(num <= 0){
        num = 0;
    }
    $("#goodNum").val(num);
});

//热门推荐和人气组合
$(".tjGood").show().next().hide();

$("#zh_tuijian").addClass("zuheActive").on("mouseenter",function () {
    $(this).addClass("zuheActive").next().removeClass("zuheActive");
    $(".tjGood").show().next().hide();
});
$("#zh_renqi").on("mouseenter",function () {
    $(this).toggleClass("zuheActive").prev().removeClass("zuheActive");
    $(".rqGood").show().prev().hide();
});


// 固定定位
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


//选择规格
$($(".smortImg")[0].children[0]).addClass("liActive").append("<i></i>");

$(".smortImg").on("click","li",function () {
    $(this).addClass("liActive").append("<i></i>").siblings().removeClass("liActive").find("i").remove();
});


//点击添加购物车
$("#addCar").on("click",function(){
    if(uname != ""){
        var goodobj = {
            uname : uname,
            gid : gid,
            gname :$(".Gname").html(),
            guige :$(".Guige").html(),
            price : Number($(".Price").html()),
            imgurl : $(".smortImg li img").attr("src"),
            manufactor : $(".Manufactor").html(),
            num : Number($("#goodNum").val())
        };
        xhr.onreadystatechange = function(){
            var status = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){

                if(xhr.responseText == "yes"){
                    alert("加入购物车成功");
                    location.href = "shopcar.html?uname="+uname;
                }

            }
        };
        xhr.open("post","../api/details.php");
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send("shopcar="+ JSON.stringify(goodobj));
    }else if(confirm("您还没有登录,前往登录？")) {
       location.href = "login.html";
    }

});


if(uname){
    $(".signout").html("退出").css("color","#c40000").on("click",function(){
        location.href = "login.html";
    })
}

$(".golist").on("click",function(){
    if(uname){
        location.href = "listpage.html?uname="+uname;
    }else {
        location.href = "listpage.html";
    }
});

$(".goIndex").on("click",function(){
    if(uname){
        location.href = "../index.html?uname="+uname;
    }else {
        location.href = "../index.html";
    }
});


//评价内容
$(".comment").on("click",function () {
    if(uname){
        location.href = "comment.html?uname="+uname+"&gid="+gid;
    }
});


//放大镜
var Box = document.getElementById("Box");
var bigBox = document.getElementById("bigBox");
var bigbox = bigBox.children[0];
var lay = document.getElementById("lay");
Fangdajing(Box,bigBox,bigbox,lay);
function Fangdajing(Box,bigBox,bigbox,lay) {
    //鼠标移入时，将放大镜和bigBox显示出来
    Box.onmouseover = function () {
        lay.style.display = "block";
        bigBox.style.display = "block";
    }
    //鼠标移出时，将放大镜和bigBox隐藏起来
    Box.onmouseout = function () {
        lay.style.display = "none";
        bigBox.style.display = "none";
    }
    Box.onmousemove = function (e) {
        e = e || event;//事件源的兼容问题
        var scale = 4;//图片的放缩比例
        //将鼠标放到放大镜的中间
        var x = e.clientX-60-lay.offsetWidth/2;
        var y = e.clientY+30-lay.offsetHeight/2;
        //将放大镜的宽高与盒子的宽高结合起来按比例放缩
        lay.style.width = parseInt(Box.offsetWidth / scale) + "px";
        lay.style.height = parseInt(Box.offsetHeight / scale) + "px";
        //设置大盒子的宽高
        bigbox.style.width = Box.offsetWidth * scale + "px";
        bigbox.style.height = Box.offsetHeight * scale + "px";
        if (x < 0) {
            x = 0;//左边界的判断，当超出时将x置为0;
        }
        //右边界的判断，当超出时将x置为Box的宽度减去放大镜的宽度;
        if (x >= Box.offsetWidth - lay.offsetWidth) {
            x = Box.offsetWidth - lay.offsetWidth;
        }
        //下边界的判断，当超出时将y置为Box的高度减去放大镜的高度;
        if (y >= Box.offsetHeight - lay.offsetHeight) {
            y = Box.offsetHeight - lay.offsetHeight;
        }
        if (y < 0) {
            y = 0;//上边界的判断，当超出时将y置为0;
        }
        lay.style.left = x  + "px";
        lay.style.top = y  + "px";
        //同比例放缩，大的盒子图片的放缩比例，当小盒子向右移动的时候，大盒子向左移动同等的比例的宽高，方向是相反的
        var left = lay.offsetLeft * scale;
        var top = lay.offsetTop * scale;
        bigbox.style.marginLeft = (left * (-1)) + "px";
        bigbox.style.marginTop = (top * (-1)) + "px";

    }

}

//前往购物车
$(".goShopCar").on("click",function () {
    if(uname){
        location.href = "shopCar.html?uname="+uname;
    }else {
        if(confirm("您还未登录，前往登录")){
            location.href = "login.html";
        }
    }
});

//吸顶菜单
window.onscroll = function () {
    console.log(window.scrollY)
    if(window.scrollY > 200){
        $("#nav").css("position","fixed");
        $("#nav").css("top","0px").css("z-index","9999");
    }else if(window.scrollY < 200){
        $("#nav").css("position","relative");
    }
};

// 置顶
$("#goTop").hide();
window.onscroll = function(){
    if(window.scrollY >= 1000){
        $("#goTop").show();
    }
    if(window.scrollY <= 1000){
        $("#goTop").hide();
    }
}
$("#goTop").click(function () {
    clearInterval(timer);
    var timer = setInterval(function(){
        var currentTop = window.scrollY;
        var speed = Math.floor((0-currentTop)/10);
        currentTop += speed;
        if(currentTop == 0){
            // currentTop = 0;
            clearInterval(timer);
        }
        // window.scrollTo(0,currentTop);
        window.scrollBy(0,speed);
        console.log(speed);

    }, 20)
});