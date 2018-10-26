
var xhr = new XMLHttpRequest();

$("#uname").blur(function(){
    // 手机号码的判断
    var $_uname = $("#uname").val();
    if(yanzheng.checkMobile($_uname) && $_uname.length == 11){

        xhr.onreadystatechange = function(){
            var status = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!=-1){
                var res = xhr.responseText;
                if(res == "yicunzai"){
                    $("#tel").html("该手机号已经注册，换一个吧").css("color","#c40000");
                }else if(res == "bucunzai"){
                    $("#tel").html("可以使用").css("color","#58bc58");
                }

            }
        }

        xhr.open("get","../api/register.php?uname="+$("#uname").val());
        xhr.send(null);

    }else{
        $("#tel").html("不是正确的手机号").css("color","#c40000");

    }

 });


//设置密码
$("#pwd").focus(function(){
    if($("#uname").val() == ""){
        $("#tel").html("请输入手机号").css("color","#c40000");
    }

    $("#setPwd").html('密码格式：6-16位大小写字母数字,"-"和"_"').css("color","#58bc58");


}).blur(function () {
    //验证密码
    var $_pwd = $("#pwd").val();
    if(!yanzheng.checkPwd($_pwd)){
        $("#setPwd").html("不是正确的密码格式或密码强度不够").css("color","#c40000");
    }
});

$("#Cpwd").focus(function(){
    $("#conPwd").html("");
}).blur(function () {
    var $_pwd = $("#pwd").val();
    var $_Cpwd = $("#Cpwd").val();

    if( $_pwd != "" && $_pwd != $_Cpwd){
        $("#conPwd").html("两次输入密码不正确").css("color","#c40000");
    }else {
        $("#conPwd").html("密码可以使用").css("color","#58bc58");
    }

});

//验证码
$(".setYzm").on("click",function () {
    var str = setCheckMa(5);
   $(this).html(str);
});
$("#YanZM").focus(function () {
    $("#tishiYZM").html("");

}).blur(function(){
    if($(this).val() != $(".setYzm").html()){
        $("#tishiYZM").html("验证码错误").css("color","#c40000");
    }
});

$("#registerBtn").on("click",function(){
    if($("#YanZM").val() == ""){
        alert("请输入验证码");
    }
    if($("#conPwd").html() == "密码可以使用" && $("#tel").html() == "可以使用" && $("#tishiYZM").html() != "验证码错误"){

        var user = {
            "uname" : $("#uname").val(),
            "pwd" : $("#Cpwd").val()
        };

        xhr.onreadystatechange = function(){
            var status = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status) != -1){
                var res = xhr.responseText;
                if(res == "yes"){
                    alert("注册成功，跳转登录页面登录");
                    location.href = "./login.html?uname="+user.uname;
                }

            }
        };

        xhr.open("post","../api/register.php");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.send("user="+JSON.stringify(user));

    }
})





//表单验证
var yanzheng = {
    checkMobile : function(sMobile){
        return !(/^1[3|4|5|8][0-9]\d{4,8}$/.test(sMobile))? false :true;
        },
    checkPwd : function(Pwd){
        return !(/^[\w_-]{6,16}$/.test(Pwd)) ? false : true;

    },
    checkMa : function (yanzhengMa,ele) {
            return ele.val() == yanzhengma ? true : false;
    }
};









