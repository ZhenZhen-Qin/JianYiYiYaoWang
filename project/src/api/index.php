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

    $selectSql = 'select * from goodsmsg';
    $result = $conn->query($selectSql);
    $res = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($res);

    $result->close();
    $conn->close();
?>