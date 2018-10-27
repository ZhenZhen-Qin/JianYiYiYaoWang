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
    $uname = isset($_GET["uname"])?$_GET["uname"] : "";


//    排序
    $xiaoliang = isset($_GET["xiaoliang"])? $_GET["xiaoliang"] : "";
    $comment = isset($_GET["comment"])? $_GET["comment"] : "";
    $jiage = isset($_GET["jiage"])? $_GET["jiage"] : "";
    $shijian = isset($_GET["shijian"])? $_GET["shijian"] : "";

    if($goodlist != ""){

        if($xiaoliang == "sheng"){
            $selectAll = 'select * from goodsmsg order by xiaoliang asc';
            $selResultAll = $conn->query($selectAll);
            $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
            $len = count($selResAll);
            $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                    $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                   $selRes1 = $conn->query($selectSql1);
                   $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                           // 数据格式化
                           $resArr = array(
                               "data" => $dataArr,
                               "shopcar" => $selArr1,
                               "len" => $len,
                               "currentPage" => $currentPage,
                               "qty" => $qty
                               );

            echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

        }else if($xiaoliang == "jiang"){
            $selectAll = 'select * from goodsmsg order by xiaoliang desc';
            $selResultAll = $conn->query($selectAll);
            $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
            $len = count($selResAll);
            $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                    $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                   $selRes1 = $conn->query($selectSql1);
                   $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                           // 数据格式化
                           $resArr = array(
                               "data" => $dataArr,
                               "shopcar" => $selArr1,
                               "len" => $len,
                               "currentPage" => $currentPage,
                               "qty" => $qty
                               );
            echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
        }else if($comment == "sheng"){
              $selectAll = 'select * from goodsmsg order by comment asc';
              $selResultAll = $conn->query($selectAll);
              $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
              $len = count($selResAll);
              $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                      $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                     $selRes1 = $conn->query($selectSql1);
                     $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                             // 数据格式化
                             $resArr = array(
                                 "data" => $dataArr,
                                 "shopcar" => $selArr1,
                                 "len" => $len,
                                 "currentPage" => $currentPage,
                                 "qty" => $qty
                                 );

              echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

          }else if($comment == "jiang"){
              $selectAll = 'select * from goodsmsg order by comment desc';
              $selResultAll = $conn->query($selectAll);
              $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
              $len = count($selResAll);
              $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                      $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                     $selRes1 = $conn->query($selectSql1);
                     $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                             // 数据格式化
                             $resArr = array(
                                 "data" => $dataArr,
                                 "shopcar" => $selArr1,
                                 "len" => $len,
                                 "currentPage" => $currentPage,
                                 "qty" => $qty
                                 );

              echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
          }else if($jiage == "sheng"){
                         $selectAll = 'select * from goodsmsg order by price asc';
                         $selResultAll = $conn->query($selectAll);
                         $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
                         $len = count($selResAll);
                         $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                                 $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                                $selRes1 = $conn->query($selectSql1);
                                $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                                        // 数据格式化
                                        $resArr = array(
                                            "data" => $dataArr,
                                            "shopcar" => $selArr1,
                                            "len" => $len,
                                            "currentPage" => $currentPage,
                                            "qty" => $qty
                                            );

                         echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

                     }else if($jiage == "jiang"){
                         $selectAll = 'select * from goodsmsg order by price desc';
                         $selResultAll = $conn->query($selectAll);
                         $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
                         $len = count($selResAll);
                         $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                                 $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                                $selRes1 = $conn->query($selectSql1);
                                $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                                        // 数据格式化
                                        $resArr = array(
                                            "data" => $dataArr,
                                            "shopcar" => $selArr1,
                                            "len" => $len,
                                            "currentPage" => $currentPage,
                                            "qty" => $qty
                                            );

                         echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
                     }else if($shijian == "sheng"){
                           $selectAll = 'select * from goodsmsg order by product_date asc';
                           $selResultAll = $conn->query($selectAll);
                           $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
                           $len = count($selResAll);
                           $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                           $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                          $selRes1 = $conn->query($selectSql1);
                          $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                          // 数据格式化
                          $resArr = array(
                              "data" => $dataArr,
                              "shopcar" => $selArr1,
                              "len" => $len,
                              "currentPage" => $currentPage,
                              "qty" => $qty
                              );

                           echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

                       }else if($shijian == "jiang"){
                           $selectAll = 'select * from goodsmsg order by product_date desc';
                           $selResultAll = $conn->query($selectAll);
                           $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
                           $len = count($selResAll);
                           $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);

                           $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
                           $selRes1 = $conn->query($selectSql1);
                           $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                           // 数据格式化
                           $resArr = array(
                               "data" => $dataArr,
                               "shopcar" => $selArr1,
                               "len" => $len,
                               "currentPage" => $currentPage,
                               "qty" => $qty
                               );

                           echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
                       }

            else{

                $selectAll = 'select * from goodsmsg';
                $selResultAll = $conn->query($selectAll);
                $selResAll = $selResultAll->fetch_all(MYSQLI_ASSOC);
                $len = count($selResAll);
                $dataArr = array_slice($selResAll,($currentPage-1)*$qty,$qty);
                $selectSql1 = 'select * from shopcar where uname = "'.$uname.'"';
               $selRes1 = $conn->query($selectSql1);
               $selArr1 = $selRes1->fetch_all(MYSQLI_ASSOC);



                       // 数据格式化
                       $resArr = array(
                           "data" => $dataArr,
                           "shopcar" => $selArr1,
                           "len" => $len,
                           "currentPage" => $currentPage,
                           "qty" => $qty
                           );

                    echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
                }
    }



?>