/* eslint-disable no-console, no-process-exit */
const michelin = require('./michelin');
const fs = require('fs');
const maitre = require("./maitre");

async function getMichelin() {

  var i = 1
  fs.writeFileSync('restaurant_michelin.json', "")
  var linkMichelin
  fs.appendFileSync('restaurant_michelin.json', "[")

  do {
    linkMichelin = `https://guide.michelin.com/fr/fr/restaurants/bib-gourmand/page/${i++}`
    var restaurant
    try {
      console.log(`Browsing ${linkMichelin} source`);
      restaurant = await michelin.scrapeRestaurantAll(linkMichelin);
	  if(restaurant.length != 0)
	  {
		  fs.appendFileSync('restaurant_michelin.json', ",")
	  }
      console.log('done');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } while (restaurant.length != 0) //restaurant.length != 0
  fs.appendFileSync('restaurant_michelin.json', "]")
}

async function getMaitre() {

  const linkMaitre = 'https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/'
	fs.writeFileSync('restaurant_maitre.json', "")
  var i = 1
	fs.appendFileSync('restaurant_maitre.json', "[")
  do {
    var restaurant
    try {
      console.log(`Browsing ${linkMaitre} source, page ${i}`);
	  
      restaurant = await maitre.scrapeRestaurant(linkMaitre, i++);
	  if(restaurant.length != 0)
	  {
		  fs.appendFileSync('restaurant_maitre.json', ",")
	  }
      console.log('done');
    } catch (e) {
      console.error(e);
      process.exit(1);
    }
  } while (restaurant.length != 0)
  fs.appendFileSync('restaurant_maitre.json', "]");
}

getMaitre();
getMichelin();