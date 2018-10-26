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

    $uname = isset($_GET["uname"])?$_GET["uname"]:"";
    $user = isset($_POST["user"])?$_POST["user"] : "";

    if($uname != "" && $user == ""){
        $sql = 'select * from user where uname = "'.$uname.'"';
        $result = $conn->query($sql);
        $res = $result->num_rows;
        if($res>0){
            echo "yicunzai";
        }else{
            echo "bucunzai";
        }

        $result->close();
    }


    if($user != ""){
            if($user){
                $user = json_decode($user);
                $instert = 'insert into user(uname,password) value("'.$user->uname.'","'.$user->pwd.'")';
                if ($conn->query($instert)) {
                    echo "yes";
                } else {
                    echo "no";
                }

        }

    }


    $conn->close();
?>