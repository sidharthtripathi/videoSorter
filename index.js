const rl = require('readline-sync')
const fs = require('fs')
const path = require('path')
const {getVideoDurationInSeconds} = require('get-video-duration');
function ask(ques){
	return rl.question(ques)
}


function rename(){
const fl = ask("file length: ")

}


async function vidDuration(vidPath){
let s = await getVideoDurationInSeconds(vidPath)
const hours = Math.floor(s/3600)
const minutes = Math.floor((s%3600)/60)
const remainingSeconds = Math.floor(s%60)
//console.log(s);
//const formattedTime = `${hours}:${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
return hours+"."+minutes+"."+remainingSeconds;

}


// vidDuration('/home/sid/Videos/Telegram Video/5_6082143126766487865.mp4')
// .then(ans => console.log(ans))


async function vidNameWithDuration(dirPath,duration){
	try{
		const vidFiles = [];
		const vids = fs.readdirSync(dirPath)
		//console.log('read dir ok !')
		for(let i = 0 ; i<vids.length ; i++){
			if(path.extname(vids[i])!== '.mp4')
				continue;
			const time = await vidDuration(path.join(dirPath,vids[i]))
			if(time === duration)
				vidFiles.push(vids[i]);
		}
		return vidFiles;
	}
	catch(err){
		console.log('something wrong happend')
		return []
	}

}


async function sorter(){
if(process.argv[2] !== undefined)
	dirPath = process.argv[2]
else{
	console.log(`Provide full directory path in quotes !\nexiting..`)
	return;
}
while(true){
	console.log('================================')
	const time = ask('time: ');
	const files = await vidNameWithDuration(dirPath,time)
	console.log(`files array is ${files}`)
	if(files.length === 0){
		console.log("not found !\n skipping..")
		continue;
	}
	else if(files.length > 1){
		console.log('multiple files detected! ')
		for(let i = 0 ; i<files.length ; i++)
			console.log(files[i])
		ask('what to do ! ');
	}
	else if(files.length === 1){
		const newName = ask('new name: ')
		const outputFolder = path.join(dirPath,'output')
		if (!fs.existsSync(outputFolder)) {
  			fs.mkdirSync(outputFolder);
			}
		fs.renameSync(path.join(dirPath,files[0]),path.join(outputFolder,newName+".mp4"))
	}

}

}


sorter()

