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
var uname = location.search.split("?")[1].split("=")[1] ? location.search.split("?")[1].split("=")[1] : "请登录";
if(uname != ""){
    $("#denglu").find(".d1").remove();
    $("#denglu").find(".d2").html(uname);
}


var currentPage = 1;
//生成列表
var xhr = new XMLHttpRequest();
var qty = 16;
xhr.onreadystatechange = function(){
    var status = [200,304];
    if(xhr.readyState == 4 && status.indexOf(xhr.status)!=-1){
        if(xhr.responseText.length != ""){
            var res = JSON.parse(xhr.responseText);
            console.log(res);
            var str = "";
            res.data.map(function(item,idx){
                str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img class="goDetail" src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                if(i == currentPage){
                    $('.page span:nth-child('+ i +')').addClass("pageAct");
                    $('.page span:first-child').removeClass("pageAct");
                }
            }
            if(currentPage == 1){  //初始化的时候给页码一高亮
                $('.page span:first-child').addClass("pageAct");
            }

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

    }
};

xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+currentPage+"&qty="+qty+"&uname="+uname);
xhr.send(null);


//页码的单击事件
var cpage = 0
$(".page").on("click","span",function () {
    currentPage = $(this).html()*1;
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&uname="+uname);
    xhr.send(null);
});
//点击首页
$(".shouye").on("click",function(){
    currentPage = 1;
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&uname="+uname);
    xhr.send(null);
});

//点击上一页
$(".prevPage").on("click",function(){
    currentPage = $("span.pageAct").html()-1;
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&uname="+uname);
    xhr.send(null);
});
//点击下一页
$(".nextPrev").on("click",function(){
    currentPage = $("span.pageAct").html()*1+1;
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&uname="+uname);
    xhr.send(null);
});
//点击末页
$(".endPage").on("click",function(){
    currentPage = $(".page span:last-child").html();
    xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty);
    xhr.send(null);
});
//第几页查询
$(".dijiPage").on("click",function(){
    var maxPage = $(".page span:last-child").html();
    if($(this).prev().val() <= maxPage && $(this).prev().val() >0){
        currentPage = $(this).prev().val();
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&uname="+uname);
        xhr.send(null);
    }else {
        alert("您输入的页码有误");
    }
});


// 点击添加购物车
var goodUl = $(".goodlist")[0];
goodUl.onclick = function (e) {

    if(e.target.className == "goDetail") {
        var gid = e.target.parentElement.getAttribute("date-gid");
        location.href = "details.html?gid="+gid+"&uname="+uname;
    }



    if(e.target.className == "addCar") {

        var $addBtn = $(e.target);
        var gid = ($addBtn.closest("li").attr("date-gid"));
        var imgurl = $addBtn.closest("li").find("img").prop("alt");
        var gname = $addBtn.closest("li").find("a").html();
        var price = $addBtn.closest("li").find("span s").html();
        var manufactor = ($addBtn.closest("li").attr("date-manufactor"));
        var guige = ($addBtn.closest("li").attr("date-guige"));

        var goodobj = {
            uname : uname,
            gid : gid,
            gname :gname,
            guige :guige,
            price : price,
            imgurl : "../"+imgurl,
            manufactor : manufactor,
            num : 1
        };

        console.log(goodobj);
        xhr.onreadystatechange = function(){
            var status = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){

                console.log(xhr.responseText);
                if(xhr.responseText == "yes"){

                    if(confirm("添加购物车成功，去购物车查看？")){
                        location.href = "shopcar.html?uname="+uname;
                    }
                }

            }
        };
        xhr.open("post","../api/details.php");
        xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
        xhr.send("shopcar="+ JSON.stringify(goodobj));

    }
};

// 排序
$(".sortLeft span:contains('销量')").on("click",function(){
    $(this).addClass("sortActive").siblings("span").removeClass("sortActive");
    $(this).find(".iconfont").toggleClass("icon-jiantou-xia").toggleClass("icon-jiantou-shang");
    if($(this).find(".iconfont").hasClass("icon-jiantou-xia")){
        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&xiaoliang=sheng&uname="+uname);
        xhr.send(null);



    }else if($(this).find(".iconfont").hasClass("icon-jiantou-shang")){

        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&xiaoliang=jiang&uname="+uname);
        xhr.send(null);


    }


});

$(".sortLeft span:contains('评论')").on("click",function(){
    $(this).addClass("sortActive").siblings("span").removeClass("sortActive");
    $(this).find(".iconfont").toggleClass("icon-jiantou-xia").toggleClass("icon-jiantou-shang");
    if($(this).find(".iconfont").hasClass("icon-jiantou-xia")){
        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&comment=sheng&uname="+uname);
        xhr.send(null);



    }else if($(this).find(".iconfont").hasClass("icon-jiantou-shang")){

        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&comment=jiang&uname="+uname);
        xhr.send(null);


    }


});

$(".sortLeft span:contains('价格')").on("click",function(){
    $(this).addClass("sortActive").siblings("span").removeClass("sortActive");
    $(this).find(".iconfont").toggleClass("icon-jiantou-xia").toggleClass("icon-jiantou-shang");
    if($(this).find(".iconfont").hasClass("icon-jiantou-xia")){
        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&jiage=sheng&uname="+uname);
        xhr.send(null);



    }else if($(this).find(".iconfont").hasClass("icon-jiantou-shang")){

        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&jiage=jiang&uname="+uname);
        xhr.send(null);


    }


});

$(".sortLeft span:contains('时间')").on("click",function(){
    $(this).addClass("sortActive").siblings("span").removeClass("sortActive");
    $(this).find(".iconfont").toggleClass("icon-jiantou-xia").toggleClass("icon-jiantou-shang");
    if($(this).find(".iconfont").hasClass("icon-jiantou-xia")){
        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                        <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }


                    res.shopcardata.map(function (item,idx) {
                        str +=`
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

                    $(".logo_ul2").html($("<ul>").addClass("myShopCar").html(str));
                }
            }

        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&shijian=sheng&uname="+uname);
        xhr.send(null);



    }else if($(this).find(".iconfont").hasClass("icon-jiantou-shang")){

        xhr.onreadystatechange = function () {
            var status  = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!= -1){
                if(xhr.responseText.length != ""){
                    var res = JSON.parse(xhr.responseText);
                    console.log(res);
                    var str = "";
                    res.data.map(function(item,idx){
                        str+=`
                 <li date-gid="${item.gid}" date-guige="${item.guige}" date-manufactor="${item.manufactor}">
                            <img src="../${item.imgurl}" alt="${item.imgurl}">
                            <a href="#">${item.gname}</a>
                            <span>￥<s>${item.price}</s></span>
                            <div>
                                总销量
                                <span>${item.xiaoliang}</span>
                                <a href="#">
                                    <s>${item.comment}</s>条评论
                                </a>
                                <p>
                                    <span class="addCar">
                                        <i class="iconfont icon-gouwuchekong"></i>
                                        加入购物车
                                    </span>
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
                        if(i == currentPage){
                            $('.page span:nth-child('+ i +')').addClass("pageAct");
                            $('.page span:first-child').removeClass("pageAct");
                        }
                    }
                    if(currentPage == 1){  //初始化的时候给页码一高亮
                        $('.page span:first-child').addClass("pageAct");
                    }
                }


            }


        };
        xhr.open("get","../api/listpage.php?goodlist=true&currentPage="+ currentPage +"&qty="+qty+"&shijian=jiang&uname="+uname);
        xhr.send(null);


    }

});


if(uname){
    $(".signout").html("退出").css("color","#c40000").on("click",function(){
        location.href = "login.html";
    })
}

$(".goIndex").on("click",function(){
    if(uname){
        location.href = "../index.html?uname="+uname;
    }else {
        location.href = "../index.html";
    }
});









