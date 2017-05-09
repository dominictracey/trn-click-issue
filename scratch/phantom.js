var page = require('webpage').create();
var _ = require('lodash')
//var $ = require('jquery')

const selectorAttacking = "li[data-reactid$='$attacking'] > span"
const metresRunSelector = "[data-tooltip='Metres Run']"

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// var rectangle = page.evaluate(function(el) {
//   console.log('coords: ' + el.getBoundingClientRect())
//     return el.getBoundingClientRect();
// });

var clickElement = function (el){
    console.log(_.keys(el))

    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
      "click",
      true /* bubble */, true /* cancelable */,
      window, null,
      0, 0, 0, 0, /* coordinates */
      false, false, false, false, /* modifier keys */
      0 /*left*/, null
    );
    el.dispatchEvent(ev);
};

page.onLoadFinished = function(status) {
  page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);
}

//debugger
console.log('fetching')
page.open('http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041', function(status) {
    console.log(status)
    //debugger
    if (status === "success") {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js", function() {
            page.evaluate(function(fn) {
                // lastest version on the web
                console.log("$(selectorAttacking).text() -> " + $("li[data-reactid$='$attacking']").text());
                //$("li[data-reactid$='$attacking'] > span").click()
                //clickEl($("li[data-reactid$='$attacking']")[0])
                //clickEl($("[data-reactid$='$sn']")[0])
                var rect = $("li[data-reactid$='$attacking']")[0].getBoundingClientRect()
                console.log("L: " + rect.left + " T: " + rect.top + " H: " + rect.height + " W: " + rect.width)
                sendEventClick(page, rect)

                console.log("clicked")
                console.log('column header desired: ' + $("[data-tooltip='Metres Run']").text())
                console.log('column header found: ' + $("[data-tooltip='Conversion Goals']").text()) //
                //console.log('h1 found: ' + $('h1')[2].text()) //
            }, sendEventClick);
            phantom.exit(0);
        });
    } else {
      phantom.exit(1);
    }
});
//
// page.open('http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041', function(status) {
//   console.log("Status: " + status);
//   if(status === "success") {
//     console.log("query for selector: " + selectorAttacking);
//     page.querySelector(selectorAttacking).click()
//     console.log("clicked")
//     //page.waitForSelector(metresRunSelector)
//     page.render('phantom.png');
//       console.log("screenshotted")
//   }
//   console.log("exiting")
//   phantom.exit();
//   console.log("done")
// });
