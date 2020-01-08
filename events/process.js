const Event = require('events');
class Processing extends Event{
	constructor(data){
		super();
		this.product = data;
		this.on('start',(data)=>{
			this.processingStart(data);		
		});
	}
	processingStart(data){
		console.log(`processing your Product - ${data}`);
		setTimeout(()=>{
			this.emit('done');
		},3000);
	}
};

module.exports = Processing;
