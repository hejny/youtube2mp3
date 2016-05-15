<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");

//----------------------------------------------------------------------------------------------------------------------


$method = strtoupper($_SERVER['REQUEST_METHOD']);



$filename = __DIR__ . '/../../list.json';




if($method == 'OPTIONS'){

    header("Access-Control-Allow-Methods: GET, POST, OPTIONS");


}elseif($method=='GET'){

    header('Content-Type: application/json');
    if (file_exists($filename)) {
        readfile($filename);
    }else{
        echo('[]');
    }

}elseif($method=='POST') {


    if (file_exists($filename)) {
        $file = file_get_contents($filename);
        $json = json_decode($file, true);
    }else{
        $json=array();
    }

    $inlist=false;
    foreach($json as $video){
        if($video['url']==$_POST['url']){
            $inlist=true;
        }
    }

    if(!$inlist){

        $json[]=array(
            "url"=>$_POST['url'],
            "actions"=>array(
                "added"=>time(),
                "downloading"=>array("start"=>false,"finish"=>false)
            ),
            "errors"=> []
        );

    }else{

        $json=array_filter($json,function($video){

            if($video['url']==$_POST['url'] && $video['actions']['downloading']['start']===false){
                return false;
            }else{
                return true;
            }

        });

    }


    $file=json_encode($json, JSON_PRETTY_PRINT);

    file_put_contents($filename,$file);
    chmod($filename,0777);


}else{

    http_response_code(400);//Bad Request

}









