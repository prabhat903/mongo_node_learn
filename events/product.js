const Processor = require('./process.js');

var processor = new Processor();

processor.on('done',()=>{
	console.log('Your Product is processed');
});
processor.emit('start','Mango');
// processor.removeAllListeners();
processor.emit('start','Pine');
