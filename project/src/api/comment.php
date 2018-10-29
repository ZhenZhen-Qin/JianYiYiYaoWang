<?php

    include 'connDb.php';

    $commentObj = isset($_POST["commentObj"])?$_POST["commentObj"]:"";
    $commentObj = json_decode($commentObj);
    $insertSql = 'insert into comment(gid,uname,content,file,star) values('.$commentObj->gid.',"'.$commentObj->uname.'","'.$commentObj->content.'","'.$commentObj->file.'",'.$commentObj->star.')';
    if($conn->query($insertSql)){
        echo "success";
    }else{
        echo "error";
    }

?>