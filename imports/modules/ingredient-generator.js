import data from './ingredientdata.js'

const datacopy = data.slice();

export default (times) => {
	if(times > datacopy.length){
		console.log(`request number too high, bigger than dataset. Request truncated to ${datacopy.length}`);
		times = datacopy.length
	}
	let generatedData = [];

	for(let i = 0; i < times; i++){
		let ingredientIndex = Math.floor((Math.random() * datacopy.length));
		generatedData.push(datacopy[ingredientIndex]);
		datacopy.splice(ingredientIndex,1)
	}
	return generatedData
}




