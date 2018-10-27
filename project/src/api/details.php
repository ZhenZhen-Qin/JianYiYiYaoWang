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

    $gid = isset($_GET["gid"])? $_GET["gid"] : "";
    $uname = isset($_GET["uname"])?$_GET["uname"]:"";

    if($gid != ""){
        $selectSql = 'select * from goodsmsg where gid = '.$gid;
        $selRes = $conn->query($selectSql);
        $selResult = $selRes->fetch_all(MYSQLI_ASSOC);

        //拿到商品评价
        $selectSql2 = 'select * from comment where gid = '.$gid;
        $selRes2 = $conn->query($selectSql2);
        $selResult2 = $selRes2->fetch_all(MYSQLI_ASSOC);


        if($uname != ""){
                $selectSql1 = 'select * from shopcar where uname = '.$uname;
                $selRes1 = $conn->query($selectSql1);
                $selResult1 = $selRes1->fetch_all(MYSQLI_ASSOC);
                $resArr = array(
                                "gooddata" => $selResult,
                                "shopcar" => $selResult1,
                                "comment" => $selResult2
                            );
                echo json_encode($resArr,JSON_UNESCAPED_UNICODE);

                $selRes1->close();
        }else{
            $resArr = array(
                "gooddata" => $selResult,
                "comment" => $selResult2
            );
            echo json_encode($resArr,JSON_UNESCAPED_UNICODE);
            $selRes->close();
        }


    }






    $shopcar =  isset($_POST["shopcar"])? $_POST["shopcar"] : "";

    if($shopcar != ""){
        $shopcar = json_decode($shopcar);
        $selSql = 'select num from shopcar where uname = "'.$shopcar->uname.'" and gid='.$shopcar->gid;
        $selRes1 = $conn->query($selSql);
        $selResult1 = $selRes1->fetch_row();

        $num = $selResult1[0]*1+ $shopcar->num;
        if($selRes1->num_rows > 0){
            $updateSql = 'update shopcar set num = '.$num.' where gid ='.$shopcar->gid.' and uname = "'.$shopcar->uname.'"';
            if ($conn->query($updateSql)) {
                echo "yes";


            }
        $selRes1->close();

        }else{
            $instert = 'insert into shopcar(gid,uname,imgurl,manufactor,price,guige,num,gname) value('.$shopcar->gid.',"'.$shopcar->uname.'","'.$shopcar->imgurl.'","'.$shopcar->manufactor.'",'.$shopcar->price.',"'.$shopcar->guige.'",'.$shopcar->num.',"'.$shopcar->gname.'")';
            if ($conn->query($instert)) {
                echo "yes";
            }
            $selRes1->close();
        }
    }

    $conn->close();

?>