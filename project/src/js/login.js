jQuery(function ($) {
    var $uname = $("#uname");
    var $pwd = $("#pwd");
    var xhr = new XMLHttpRequest();
    $("#loginBtn").on("click",function(){

        var user = {
            "uname" : $uname.val(),
            "pwd" : $pwd.val()
        };
        xhr.onreadystatechange = ()=>{
            var status = [200,304];
            if(xhr.readyState == 4 && status.indexOf(xhr.status)!=-1) {
                var res = xhr.responseText;
                if(res == "yes"){
                    alert("登录成功！");
                    location.href = "../index.html?uname="+ $uname.val();
                }else if(res == "no"){
                    alert("用户名或密码错误！请重新登录！");
                }
            }
        };

        xhr.open("post","../api/login.php");
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        //Content-Type设置成application/x-www-form-urlencoded 的情况下，
        // 请求主体可以用key1=value1&key2=value2的形式发送数据
        xhr.send("user=" + JSON.stringify(user));
    });



});




