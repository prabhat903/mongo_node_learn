const fs = require('fs');
const path = require('path');

var testWrite="";
fs.readFile(path.join(__dirname, '/dummy.html'), {encoding: 'utf-8'}, function (error, data) {
  if (error) return console.error(error)
  testWrite = data;
	// console.log(testWrite);
	fs.writeFile('message.txt', testWrite , function (error) {
	  if (error) return console.error(error)
	  console.log('Writing is done.')
	})
})
// fs.appendFile create new file if not exist and append content if not present
// fs.write create new file always and replace the file if found
// fs.open create new file if not found. can be open in write mode.

// fs.unlink delete the file passed.
// fs.rename rename the file.

