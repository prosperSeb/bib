const fs = require('fs');

async function getBoth() {
	var restaurant = []
	var config = require('./restaurant_maitre.json');
	var config2 = require('./restaurant_michelin.json');
	fs.writeFileSync('restaurant_both.json', "")
  	fs.appendFileSync('restaurant_both.json', "[")

	for(let pas =0;pas< config.length;pas++)
	{
		for(let pas2 =0;pas2< config2.length;pas2++)
		{
			if(config2[pas2].num===config[pas].num)
			{
				var restau = JSON.stringify(config2[pas2], null, 2)
				restaurant.push(restau);
				
			}
		}
	}
	console.log(restaurant);
	fs.appendFileSync('restaurant_both.json', restaurant);
			
	fs.appendFileSync('restaurant_both.json', "]")

	
	
};
getBoth();

