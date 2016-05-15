<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>YouTube2MP3</title>
</head>
<body>

<h2>Download button</h2>
<a href="javascript: <?=htmlentities(/*str_replace(array("\r","\n"),'',*/file_get_contents('app/browser.js'));?>">DownloadMP3!</a>

<h2>Download script</h2>
node <?=__DIR__?>/app/download.js


</body>
</html>

