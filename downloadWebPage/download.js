const http = require('http');
const path = require('path');
const fs = require('fs');
const uuid  = require('uuid');

const downloadPageURL = (url = 'http://google.com')=>{
	console.log('downloading ', url);

	const folderName = uuid();

	const onPageResponce = (res)=>{
		var buffer = "";
		res.on('data',(chunks)=>{
			buffer += chunks;
		})
		res.on('end',()=>{
			writeInFile(buffer);
			console.log(`Page download completed in ${folderName} folder`);
		})
		res.on('error',(error)=>{console.log(`error - ${error}`)})
	}

	const writeInFile = (data) => {
		const createfile = fs.mkdirSync(folderName)
		fs.writeFileSync(path.join(__dirname,folderName,'file.html'),data);
		fs.writeFileSync(path.join(__dirname,folderName,'url.txt'),url);
	} 
	var getpage = http.get(url,onPageResponce);
	getpage.on('error',(error)=>{console.log(`error - ${error}`)});	
}

downloadPageURL(process.argv[2]);
