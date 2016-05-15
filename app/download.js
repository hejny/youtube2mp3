

var dir = __dirname + '/../download/';
var list_file = __dirname + '/../list.json';


var exec = require('child_process').exec;
var fs = require("fs");


var list=[];




 function loadList(){
    list = JSON.parse(fs.readFileSync(list_file).toString());
    list = Object.keys(list).map(function(k) { return list[k] });
}

function saveList(){
    fs.writeFileSync(list_file, JSON.stringify(list,null,4));
}

function timestamp(){
	return Math.floor(new Date().getTime()/1000);
}

function getCurrent(old) {

	for (var i = 0, l = list.length; i < l; i++) {

		if (list[i].url === old.url) {

			return(list[i]);

		}
	}

	throw new Error('Cant find current!');
}





function downloadOne(){


	loadList();



	var current = false;
	for(var i= 0,l=list.length;i<l;i++){
		if(list[i].actions.downloading.finish===false && list[i].errors.indexOf('downloading')==-1){

			current = list[i];
			break;

		}
	}

    if(current===false){

        console.log('All done!');
        return;

    }
    //console.log(current);
	console.log('Downloading '+current.url);

	current.actions.downloading.start=timestamp();
	saveList();

	exec('cd '+dir+'; youtube-dl --extract-audio --audio-format mp3 '+current.url, function(error, stdout, stderr) {

		loadList();
		current=getCurrent(current);

		if (error){

			console.log(error);

			current.errors.push('downloading');
			saveList();

			downloadOne()

		}else{

			current.actions.downloading.finish=timestamp();
			saveList();

			downloadOne()


		}

	});
}









downloadOne();


