<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "jianyimsg";
    $conn = new myspli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die($conn->$connect_error);
    }
    $sql = 'select * from goodsmsg ORDER BY price asc';
    $result = $conn->query($sql);
    $arr = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $result->close();
    $conn->close();
?>