const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const querystring = require('querystring')


const parse = data => {
  const $ = cheerio.load(data)
  var restaurants = []

  $('div.annuaire_single').each(function (x, elem) {
    
    var name = $(elem).find('a').text()
    var location = $(elem).find('div.single_info3 > div:nth-child(2)').text()
    var link = 'https://www.maitresrestaurateurs.fr' + $(elem).find('a').attr('href')
    var num = $(elem).find('div.single_info3 > div:nth-child(3)').text()
    var name_tab;
    name = name.replace(/\n|  /g,'')
    name_tab = name.split(' (')
    location = location.replace(/\n|  /g,'')
    num = num.replace(/\n| /g,'')

    restaurants.push(JSON.stringify({ name: name_tab[0], location: location, link: link, num: num }, null, 2))
	//fs.appendFileSync('restaurant_maitre.json', JSON.stringify({ name: name_tab[0], location: location, link: link, num: num }, null, 2))
  });

  fs.appendFileSync('restaurant_maitre.json', restaurants)
  return restaurants;
};


module.exports.scrapeRestaurant = async (url, i) => {
  const response = await axios.post('https://www.maitresrestaurateurs.fr/annuaire/ajax/loadresult/', querystring.stringify({
      page: `${i}`,
      sort: 'undefined',
      request_id: 'f74f4573cb46e1daa71c15306b84a6ef'
    })
  );
  
  const {data, status} = response;
  if (status >= 200 && status < 300) {
    return parse(data);
  }

  console.error(status);

  return null;
};


module.exports.get = () => {
  return [];
};
