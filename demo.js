var Horseman = require('node-horseman')
var horseman = new Horseman()
var rect = {};

const selectorTabs = "ul.tabs.alt"
const selectorAttacking = "li[data-reactid$='attacking'] > span"
const metresRunSelector = "[data-tooltip='Metres Run']"

horseman
  .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
  .viewport(1920, 1080)
  .on('consoleMessage', function( msg ){
    console.log(msg);
  })
  .open('http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041').log()
 	.title().log()
 	.waitForSelector(selectorAttacking).log('Found attacking tab')
  .screenshot("images/attacking-pre.png")
 	.click(selectorAttacking).log('Clicked attacking tab')
 	.waitForSelector(metresRunSelector)   // never reaches here
 	.screenshot("images/attacking-post.png")
  .catch(function (err) {   //Catch errors and send to error function.
 	  console.log(err)
 	})
  .close();
