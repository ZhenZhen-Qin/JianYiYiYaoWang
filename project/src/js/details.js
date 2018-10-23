$("div.price .xiadan").hide();
$("div.price .sm").on("mouseenter",function(){
    $("div.price  .xiadan").show();
});
$("div.price .sm").on("mouseleave",function(){
    $("div.price  .xiadan").hide();
});

//商品数量的加减按钮
$("#number .btnJia").on("click",function () {
        var num = $("#goodNum").val();
        num++;
        $("#goodNum").val(num);
        console.log( $("#goodNum").val())
});
$("#number .btnJian").on("click",function () {
    var num = $("#goodNum").val();
    num--;
    $("#goodNum").val(num);
    console.log( $("#goodNum").val())
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
