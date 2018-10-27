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
    $delSingleId = isset($_GET["delSingle"])?$_GET["delSingle"]:"";
    $gidStr = isset($_GET["gidArr"])?$_GET["gidArr"]:"";

    if($delSingleId != ""){
        $deleteSql = 'delete from shopcar where uname="'.$uname.'" and gid = '.$delSingleId ;
        if($conn->query($deleteSql)){
            $selectSql = 'select * from shopcar where uname = "'.$uname.'"';
            $selRes = $conn->query($selectSql);
            $selArr = $selRes->fetch_all(MYSQLI_ASSOC);
            echo json_encode($selArr,JSON_UNESCAPED_UNICODE);
            $selRes->close();
        }
    }

    if($gidStr != ""){

        $deleteSql = 'delete from shopcar where uname="'.$uname.'" and gid in ('.$gidStr.')';
            if ($conn->query($deleteSql)) {
                $selectSql = 'select * from shopcar where uname = "'.$uname.'"';
                $selRes = $conn->query($selectSql);
                $selArr = $selRes->fetch_all(MYSQLI_ASSOC);
                echo json_encode($selArr,JSON_UNESCAPED_UNICODE);
                $selRes->close();
            }

    }

    if($delSingleId == "" && $username != "" && $gidStr == ""){
        $selectSql = 'select * from shopcar where uname = "'.$uname.'"';
        $selRes = $conn->query($selectSql);
        $selArr = $selRes->fetch_all(MYSQLI_ASSOC);
        $resArr = array("data" => $selArr);
        echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
        $selRes->close();
    }


    $conn->close();


?>