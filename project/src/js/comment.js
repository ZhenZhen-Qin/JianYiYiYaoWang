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



var uname = location.search.split("?")[1].split("&")[0].split("=")[1];
var gid = location.search.split("?")[1].split("&")[1].split("=")[1];
$("#denglu").find(".d1").remove();
$("#denglu").find(".d2").html(uname).css("color","#c40000");

$(".pingjiaContent")[0].oninput = function () {
    var content = $(".pingjiaContent").val();
    var len = content.length;
    $(".len").html(len).css("color","#58bc58");
    if(len == 300){
        $(".len").css("color","#c40000");
    }
};

var xhr = new XMLHttpRequest();
$("#subBtn").on("click",function(){
    var file = $(".imgFile").val();
    var star = $(":checked").prop("id").slice(-1);


    var commentObj = {
        "gid": gid,
        "uname" : uname,
        "content": $(".pingjiaContent").val(),
        "file" : $(".imgFile").val()? $(".imgFile").val():"",
        "star": star
    }

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && [200,304].indexOf(xhr.status) != -1){
            console.log(xhr.responseText);
            if($.trim(xhr.responseText)  == "success"){
                alert("评论成功");
                location.href="details.html?gid="+gid+"&uname="+uname+"#pingjiaMsg";
            }else {
                alert("评论失败");
            }
        }

    }
    xhr.open("post","../api/comment.php")
    xhr.setRequestHeader('content-type','application/x-www-form-urlencoded');
    xhr.send("commentObj="+JSON.stringify(commentObj));

});


//