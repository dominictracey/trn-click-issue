var page = require('webpage').create();
//var _ = require('lodash')
//var $ = require('jquery')

const selectorAttacking = "li[data-reactid$='$attacking']"
const metresRunSelector = "[data-tooltip='Metres Run']"

page.onConsoleMessage = function(msg) {
    console.log(msg);
};

// var rectangle = page.evaluate(function(el) {
//   console.log('coords: ' + el.getBoundingClientRect())
//     return el.getBoundingClientRect();
// });

// var clickElement = function (el){
//     console.log(_.keys(el))
//
//     var ev = document.createEvent("MouseEvent");
//     ev.initMouseEvent(
//       "click",
//       true /* bubble */, true /* cancelable */,
//       window, null,
//       0, 0, 0, 0, /* coordinates */
//       false, false, false, false, /* modifier keys */
//       0 /*left*/, null
//     );
//     el.dispatchEvent(ev);
// };

var sendEventClick = function(rect, page) {
  console.log("clicking")
  page.sendEvent('click', rect.left + rect.width / 2, rect.top + rect.height / 2);
}

//debugger
//console.log('fetching')
page.onLoadFinished = function(status) {
    console.log('Load Finished: ' + status);
    page.render("test37_next_page.png");
    if (status === "success") {
        page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js", function() {
          page.evaluate(function(sendEventClick, page) {
            var rect = $("li[data-reactid$='$attacking']")[0].getBoundingClientRect()
            console.log("L: " + rect.left + " T: " + rect.top + " H: " + rect.height + " W: " + rect.width)
            sendEventClick(rect, page)
          }, sendEventClick, page);
          page.render('espn.png');
          phantom.exit(0);
        });
    } else {
      phantom.exit(1);
    }
    //phantom.exit();
};
page.onLoadStarted = function() {
    console.log('Load Started');
};
page.open('http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041', function(status) {
    console.log(status)

    //debugger
    // if (status === "success") {
    //     page.includeJs("http://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js", function() {
    //       page.evaluate(function() {
    //         var rect = $("li[data-reactid$='$attacking']")[0].getBoundingClientRect()
    //         console.log("L: " + rect.left + " T: " + rect.top + " H: " + rect.height + " W: " + rect.width)
    //         sendEventClick(page, rect)
    //       });
    //       page.render('espn.png');
    //       phantom.exit(0);
    //     });
    // } else {
    //   phantom.exit(1);
    // }
});

// page.open('http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041', function(status) {
//   console.log("Status: " + status);
//   if(status === "success") {
//     console.log("query for selector: " + selectorAttacking);
//     page.querySelector(selectorAttacking).click()
//     console.log("clicked")
//     //page.waitForSelector(metresRunSelector)
//     page.render('espn.png');
//       console.log("screenshotted")
//   }
//   console.log("exiting")
//   phantom.exit();
//   console.log("done")
// });
