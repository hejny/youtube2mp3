

var dir = '/home/hejny/Stažené/youtube/debaty/';



var exec = require('child_process').exec;
var fs = require("fs");



var changeVideoStatus = function(video,status){

	status=status.substr(0,4);

	var list = fs.readFileSync(dir+'list.txt').toString().split("\r").join('').split("\n");
	
	for(var line=0,length=list.length;line<length;line++){
		
		//console.log(list[line].trim().substr(0,video.length));

		if(list[line].trim().substr(0,video.length)===video){
			list[line]=video+' ('+status+')';
		}

	}
	
	fs.writeFileSync(dir+'list.txt', list.join("\n"));


};






var downloadOne = function(){


	var list = fs.readFileSync(dir+'list.txt').toString().split("\r").join('').split("\n");

	actual=false;
	line=0;
	for(var line=0,length=list.length;line<length;line++){


		if(list[line].trim()!=='' && ['(done)','(fail)','(econ)'].indexOf(list[line].substr(list[line].length-6,6))===-1){
			actual=list[line];
			break;
		}


	}



	actual = actual.split(' (load)').join('');
	changeVideoStatus(actual,'load');




	if(actual){

		console.log('Downloading '+actual);


		exec('cd '+dir+'; youtube-dl '+actual, function(error, stdout, stderr) {
			if (error){


				console.log(error);
				changeVideoStatus(actual,'fail');

				downloadOne();

			}else{


				console.log('Converting '+actual);
				//process.stdout.write(stdout);
				//process.stderr.write(stderr);
				exec('pacpl --to mp3 --delete -v -r -bitrate 240 \''+dir+'\'', {maxBuffer: 1024 * 1024 * 5 }, function(error, stdout, stderr) {
					if (error){

						console.log(error);
						changeVideoStatus(actual,'econ');

						downloadOne();


					}else{

						console.log('Finished working on '+actual);
						changeVideoStatus(actual,'done');
						downloadOne();


					}






				});

			}


		});




		

	}else{
		console.log('All Done!');
	}

	

}


downloadOne();


/*



var child = exec('pacpl --to mp3 --delete -v -r -bitrate 240 \''+dir+'\'', function(error, stdout, stderr) {
  if (error) console.log(error);

  process.stdout.write(stdout);
  process.stderr.write(stderr);



});*/
