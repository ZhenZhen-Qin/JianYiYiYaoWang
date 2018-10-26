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
            console.log(xhr.responseText);
            var res = JSON.parse(xhr.responseText);
            $(".Gid").html(res[0].gid);
            $(".Gname").html(res[0].gname);
            $(".Guige").html(res[0].guige);
            $(".Price").html(res[0].price);
            $(".smortImg li img").attr("src","../" + res[0].imgurl);
            $(".Imgurl").attr("src","../" + res[0].imgurl)[0].setAttribute("jqimg","../" +res[0].imgurl);
            $(".Manufactor").html(res[0].manufactor);

        }
    };
    xhr.open("get","../api/details.php?gid="+gid);
    xhr.send(null);
}

//放大镜



//getAllGoods();
function getAllGoods(){
    xhr.onreadystatechange = function(){
        var status = [200,304];
        if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
            var res = JSON.parse(xhr.responseText);
            console.log(res);

        }
    };
    xhr.open("get","../api/index.php");
    xhr.send(null);
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
