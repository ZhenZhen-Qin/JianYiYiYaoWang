<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "jianyimsg";
    $conn = new mysqli($servername,$username,$password,$dbname);
    if($conn->connect_error){
        die($conn->connect_error);
    }

    $conn->set_charset("utf8");
    $goodlist = isset($_GET["goodlist"])? $_GET["goodlist"] : "";
    $currentPage = isset($_GET["currentPage"])?$_GET["currentPage"] : 3;
    $qty = isset($_GET["qty"])?$_GET["qty"] : 16;
    if($goodlist != ""){
        $selectAll = 'select * from goodsmsg';
        $selResultAll = $conn->query($selectAll);
        $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
        $len = count($selResAll);
        $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

            // 数据格式化
            $resArr = array(
                "data" => $dataArr,
                "len" => $len,
                "currentPage" => $currentPage,
                "qty" => $qty
                );

            echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

    }



?>