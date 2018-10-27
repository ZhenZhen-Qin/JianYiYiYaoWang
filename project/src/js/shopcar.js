var uname = location.search.split("?")[1].split("=")[1];

var xhr = new XMLHttpRequest();

if(uname){
    xhr.onreadystatechange = function(){
        var status = [200,304];
        var str = "";
        if(xhr.readyState == 4 && status.indexOf(xhr.status)!=-1){
            var res = JSON.parse(xhr.responseText);
            console.log(res.shopcar);
            res.data.map(function (item) {
                str += `
                <li>
                    <input type="checkbox" class="danXuan">
                    <img src="${item.imgurl}" alt="">
                    <span class="uname">${item.gname}</span>
                    <span class="gId">${item.gid}</span>
                    <span class="GoodGg">${item.guige}</span>
                    <span class="manufactor">${item.manufactor}</span>
                    <span>${item.price}</span>
                    <span  class="clearfix number">
                            <s class="fl btnJia">-</s>
                            <input class="fl goodNum" type="text" value="${item.num}">
                            <s class="fl btnJian">+</s>
                        </span>
                    <span class="tatolPrice">${item.price*item.num}</span>
                    <p class="">
                        <span class="shoucangBtn">收藏</span>
                        <span class="delBtn">删除</span>
                    </p>
                </li>`;
            });
            $(".myGoods").html(str);


            //单选改变状态
            var zongjia = 0;
            $(".danXuan").change(function () {
                if($(this).prop("checked")){
                    var currentTol = $(this).parent().find(".tatolPrice").html();
                    zongjia = Number(zongjia) + Number(currentTol);
                    $(".zongjia").html(zongjia);
                }else{
                    var currentTol = $(this).parent().find(".tatolPrice").html();
                    zongjia = Number(zongjia) - Number(currentTol);
                    $(".zongjia").html(zongjia);
                }

                var len = $(".danXuan").filter(":checked").length;
                $(".xzGoodLen").html(len);
                if($(".danXuan").length == len){
                    $("#allCheck").prop("checked",true);
                }else{
                    $("#allCheck").prop("checked",false);
                }

            });


            //点击添加加减商品的数量  商品数量的加减按钮
            $(".number").on("click","s",function(){
                var zjTol = $(".zongjia").html()*1;   //增加或减少时获取总价
               if($(this).html() == "-"){
                   var num = $(this).next().val();
                   num--;
                   if(num <= 0){num=0;}
                   var $tolP = $(this).next().val(num).parent().next();  //单价
                   var $total = $(this).parent().prev().html()*num;  //单价*数量
                   $tolP.html($total);
                   if($(this).parent().siblings(".danXuan").prop("checked")){
                       zjTol = zjTol - Number($(this).parent().prev().html());
                       $(".zongjia").html(zjTol);
                   }


               }else if($(this).html() == "+"){
                   var num = $(this).prev().val();
                   num++;
                   if(num <= 0){num=0;}
                   var $tolP = $(this).prev().val(num).parent().next();
                   var $total = $(this).parent().prev().html()*num;
                   $tolP.html($total);
                   if($(this).parent().siblings(".danXuan").prop("checked")) {
                       zjTol = zjTol + Number($(this).parent().prev().html());
                       $(".zongjia").html(zjTol);
                   }
               }
            });

            //不选和全选部分
            var qxzongjia = 0;
            $("#allCheck").on("click",function(){
                $("input").filter(".danXuan").prop("checked",$(this).prop("checked"));
                var xzGoodLen = $(".danXuan").filter(":checked").length;
                $(".xzGoodLen").html(xzGoodLen);

                if($("#allCheck").prop("checked")){
                    var tols = document.querySelectorAll(".tatolPrice");
                    for(var i=0;i<tols.length;i++){
                        var currTol =  tols[i].innerHTML;
                        qxzongjia += Number(currTol);
                    }
                    $(".zongjia").html(qxzongjia);
                }else {
                    $(".zongjia").html("0.00");
                }

            });


            //删除单个商品
            $(".myGoods li").on("click",".delBtn",function(){

                if(confirm("确定要删除该商品吗？")){

                    var chrrentgid = Number($(this).closest("li").find(".gId").html());
                    console.log(chrrentgid);
                    $(this).parent().parent().remove();
                    if($(".myGoods")[0].children.length <=0){
                        $(".myGoods").append("<li id='qingkong'><i class='iconfont icon-gouwuchekong'></i>您的购物已经没有商品咯！赶快选购吧！</li>")
                    }

                    xhr.onreadystatechange = function(){
                        var status = [200,304];
                        if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
                            $(this).parent().parent().remove();
                        }
                    };
                    xhr.open("get","../api/shopcar.php?uname="+uname+"&delSingle="+chrrentgid);
                    // xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
                    xhr.send(null);
                }

            });

        //    批量删除
            $("#pilDel").on("click",function(){
                if(confirm("确认删除选中的商品？")){
                    //$(".danXuan").filter(":checked").parent().remove();
                    var len = $(".danXuan").filter(":checked").length;

                    if($(".myGoods")[0].children.length <=0){
                        $(".myGoods").append("<li id='qingkong'><i class='iconfont icon-gouwuchekong'></i>您的购物已经没有商品咯！赶快选购吧！</li>")
                        $("#allCheck").prop("checked",false);
                    }
                    $(".zongjia").html(0.00);
                    $(".xzGoodLen").html(0);

                    xhr.onreadystatechange = function(){
                        var status = [200,304];
                        if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
                            $(".danXuan").filter(":checked").parent().remove();
                        }
                    };

                    var gidArr = [];
                    for(let i=0;i<len;i++){
                        var gid = $($(".danXuan").filter(":checked")[i]).siblings(".gId").html();
                        gidArr.push(Number(gid));
                    }

                    xhr.open("get","../api/shopcar.php?uname="+uname+"&gidArr="+String(gidArr));
                    xhr.send(null);

                }

            });

        }
    };

    xhr.open("get","../api/shopcar.php?uname="+uname);
    xhr.send(null);
}



$(".jixuShopping").on("click",function () {
    location.href = "listpage.html?uname="+uname;
});





























