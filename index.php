<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>YouTube2MP3</title>
</head>
<body>

<?php

$file = file_get_contents('list.json');
$json = json_decode($file, true);

$all=0;
$downloaded=0;
foreach($json as $video){

    $all++;

    if($video['actions']['downloading']['finish']!==false){
        $downloaded++;
    }
}

?>


<h2><?=$downloaded?>/<?=$all?></h2>

<h2>Download button</h2>
<a href="javascript: <?=htmlentities(/*str_replace(array("\r","\n"),'',*/file_get_contents('app/browser.js'));?>">DownloadMP3!</a>

<h2>Download script</h2>
node <?=__DIR__?>/app/download.js


</body>
</html>

