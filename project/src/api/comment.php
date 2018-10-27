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

    $commentObj = isset($_POST["commentObj"])?$_POST["commentObj"]:"";
    $commentObj = json_decode($commentObj);
    $insertSql = 'insert into comment(gid,uname,content,file,star) values('.$commentObj->gid.',"'.$commentObj->uname.'","'.$commentObj->content.'","'.$commentObj->file.'",'.$commentObj->star.')';
    if($conn->query($insertSql)){
        echo "success";
    }else{
        echo "error";
    }

?>