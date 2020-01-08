const Events = require('events');

class Job extends Events{};

var job = new Job();

job.on('isItGood', function(data){
	console.log(`is it Good - ${data}`);
});

job.once('namePlease',(name)=>{
	console.log(`What is your name - its ${name}`);
});

job.emit("isItGood","Yes it is!");
// job.removeAllListeners();
job.emit("isItGood","No its not!")

job.emit("namePlease","Mohan");
job.emit("namePlease","Abhishek");
