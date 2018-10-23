<?php
    $severname = "localhost";
    $username = "root";
    $password = "";
    $dbname = "goodms";

    $conn = new myspli($severname,$username,$password,$dbname);
    if($conn->connect_error){
        die($conn->$connect_error);
    }
    $sql = 'select * from goodsmsg ORDER BY date asc';
    $result = $conn->query($sql);
    $arr = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    $result->close();
    $conn->close();
?>