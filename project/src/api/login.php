<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "jianyimsg";
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $conn->set_charset('utf8');

    $user = isset($_POST["user"]) ? $_POST["user"]:"";
    $user = json_decode($user);

    $sql = 'select * from user where uname = "'.$user->uname.'"';
    $result = $conn->query($sql);
    $res = $result->fetch_row();

    if($res[1] == $user->uname && $res[2] == $user->pwd){
        echo "yes";
    }else{
        echo "no";
    }

    $result->close();
    $conn->close();
?>