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

    $uname = isset($_GET["uname"])? $_GET["uname"] : "";
    if($uname != ""){

        $selectSql = 'select * from goodsmsg';
        $result = $conn->query($selectSql);
        $res = $result->fetch_all(MYSQLI_ASSOC);

         $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
         $selRes1 = $conn->query($selectSql1);
         $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);
        // 数据格式化
         $resArr = array(
           "data" => $res,
           "shopcar" => $selArr1 );

        echo json_encode($resArr);
        }else{
             $selectSql = 'select * from goodsmsg';
             $result = $conn->query($selectSql);
             $res = $result->fetch_all(MYSQLI_ASSOC);
             $resArr = array(
                       "data" => $res,
                      );

             echo json_encode($resArr);

        }



        $result->close();
        $conn->close();
?>