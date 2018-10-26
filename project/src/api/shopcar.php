<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "jianyimsg";

    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die($conn->connect_error);
    }
    $conn->set_charset("utf-8");

    $uname = isset($_GET["uname"])? $_GET["uname"] : "";
    $selectSql = 'select * from shopcar where uname = "'.$uname.'"';
    $selRes = $conn->query($selectSql);
    $selArr = $selRes->fetch_all(MYSQLI_ASSOC);
    echo json_encode($selArr,JSON_UNESCAPED_UNICODE);
    $conn->close();


?>