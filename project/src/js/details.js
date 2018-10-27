$("div.price .xiadan").hide();
$("div.price .sm").on("mouseenter",function(){
    $("div.price  .xiadan").show();
});
$("div.price .sm").on("mouseleave",function(){
    $("div.price  .xiadan").hide();
});

// 接受登录传过来的用户名,并显示在顶部
//接收来自首页的gid  向PHP发送请求

console.log(location.search);

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
            console.log(xhr.responseText);
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
    xhr.open("get","../api/details.php?gid="+gid);
    xhr.send(null);

    if(uname){
        xhr.open("get","../api/details.php?gid="+gid+"&uname="+uname);
        xhr.send(null);
    }
}

//放大镜





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

            console.log(xhr.responseText);
            if(xhr.responseText == "yes"){
                alert("加入购物车成功");
                location.href = "shopcar.html?uname="+uname;
            }

        }
    };
    xhr.open("post","../api/details.php");
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send("shopcar="+ JSON.stringify(goodobj));
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
        console.log(999);
        location.href = "comment.html?uname="+uname+"&gid="+gid;
    }
});

