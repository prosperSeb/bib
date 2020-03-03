const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');


const parse = data => {
  var $ = cheerio.load(data)
  var links = []

  $('div.col-md-6.col-lg-6.col-xl-3').each(function (x, elem) {
    var link = 'https://guide.michelin.com' + $(elem).find('a.link').attr('href') + "/"
    links.push(link)
  });
  //console.log(links)
  /*
  links.forEach(async url => {
    await restaurants.push(singleRestaurant(url))
    console.log(restaurants)
  })*/
  
  
  return links;
};


const scrapelinks = async url => {
  const response = await axios(url);

  const {data, status} = response;

  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};


const parse_restau = async res => {
  var $ = cheerio.load(res)
  var link = $('head > link:nth-child(19)').attr('href');
  var name = $('body > main > div.restaurant-details > div.container > div > div.col-xl-8.col-lg-7 > section.section.section-main.restaurant-details__main > div.restaurant-details__heading.d-none.d-lg-block > h2').text();
  var location = $('body > main > div.restaurant-details > div.container > div > div.col-xl-4.order-xl-8.col-lg-5.order-lg-7.restaurant-details__aside > div.restaurant-details__heading.d-lg-none > ul > li:nth-child(1)').text()
  var num = $('span.flex-fill').eq(0).text()
  num=num.replace('+33','0');
  name = name.replace(/\n|  /g,'')
   
    location = location.replace(/\n|  /g,'')
    num = num.replace(/\n| /g,'')
  //console.log(JSON.stringify({ name: name, location: location, link: link, num: num }, null, 2))
  var restaurant = JSON.stringify({ name: name, location: location, link: link, num: num }, null, 2)
  fs.appendFileSync('restaurant_michelin.json', restaurant)
  
  return restaurant
};


module.exports.scrapeRestaurantAll = async url => {
	let restaurant = [];
	var links = await scrapelinks(url);
	//console.log(links.length);
	for(let pas =0;pas< links.length;pas++)
	{
		const response = await axios(links[pas]);
		const {data, status} = response;
		if (status >= 200 && status < 300) {
			restaurant.push(parse_restau(data));
			if(pas < links.length-1)
			{
				fs.appendFileSync('restaurant_michelin.json', ",")
			}
		}
	}
	
	return restaurant;
};



