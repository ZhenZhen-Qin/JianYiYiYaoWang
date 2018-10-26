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

//接受从主页传过来的用户名
var uname = location.search.split("?")[1].split("=")[0] ? location.search.split("?")[1].split("=")[0] : "请登录";

var currentPage = 1;
//生成列表
var xhr = new XMLHttpRequest();
var qty = 16;
xhr.onreadystatechange = function(){
    var status = [200,304];
    if(xhr.readyState == 4 && status.indexOf(xhr.status)!=-1){
        var res = JSON.parse(xhr.responseText);
        var str = "";
        res.data.map(function(item,idx){
            str+=`
                 <li>
                            <img src="../${item.imgurl}" alt="">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <a href="#" class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </a>
                                    <a href="details.html?gid=${item.gid}&uname=${uname}">查看详情</a>
                                </p>
                            </div>
                        </li>`;
        });
        $(".goodlist").html(str);
        $(".goodLen").html(res.len);

        //生成页码
        var pageTatol = Math.ceil(res.len/qty);
        $(".page").html("");

        for (let i=1; i<=pageTatol;i++) {
            $(".page").append($("<span/>").html(i));
            if(i == cpage){
                $('.page span:nth-child('+ i +')').addClass("pageAct");
                $('.page span:first-child').removeClass("pageAct");
            }
        }
        if(cpage == 0){  //初始化的时候给页码一高亮
            $('.page span:first-child').addClass("pageAct");
        }
        console.log(cpage);
    }
};

xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+currentPage+"&qty="+qty);
xhr.send(null);


//页码的单击事件
var cpage = 0
$(".page").on("click","span",function () {
    cpage = $(this).html()*1;
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+$(this).html()+"&qty="+qty);
    xhr.send(null);
});
//点击首页
$(".shouye").on("click",function(){
    currentPage = 1;
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty);
    xhr.send(null);
});

//点击上一页



//点击添加购物车
// $(".addCar").on("click",function(){
//     var goodobj = {
//         uname : uname,
//         gid : gid,
//         gname :$(".Gname").html(),
//         guige :$(".Guige").html(),
//         price : Number($(".Price").html()),
//         imgurl : $(".smortImg li img").attr("src"),
//         manufactor : $(".Manufactor").html(),
//         num : Number($("#goodNum").val())
//     };
//     xhr.onreadystatechange = function(){
//         var status = [200,304];
//         if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
//
//             console.log(xhr.responseText);
//             if(xhr.responseText == "yes"){
//                 alert("加入购物车成功");
//                 location.href = "shopcar.html?uname="+uname;
//             }
//
//         }
//     };
//     xhr.open("post","../api/details.php");
//     xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
//     xhr.send("shopcar="+ JSON.stringify(goodobj));
// });
