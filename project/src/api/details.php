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
    if($gid != ""){
        $selectSql = 'select * from goodsmsg where gid = '.$gid;
        $selRes = $conn->query($selectSql);
        $selResult = $selRes->fetch_all(MYSQLI_ASSOC);
        echo json_encode($selResult,JSON_UNESCAPED_UNICODE);

        $selRes->close();
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