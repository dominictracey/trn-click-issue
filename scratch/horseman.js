var Horseman = require('node-horseman')
var horseman = new Horseman()
var rect = {};

const selectorTabs = "ul.tabs.alt"
const selectorAttacking = "li[data-reactid$='attacking'] > span"
const metresRunSelector = "[data-tooltip='Metres Run']"
const commentaryTab = "[data-linktype$='commentary']"
const topDown = ".tabbedTable"
horseman
  .userAgent('Mozilla/5.0 (Windows NT 6.1; WOW64; rv:27.0) Gecko/20100101 Firefox/27.0')
  .viewport(1920, 1080)
  .on('consoleMessage', function( msg ){
    console.log(msg);
  })
  .on('click', function( event ) {
    console.log('got click');
  })
  .open('http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041').log()
 	.title().log()
 	.waitForSelector(selectorAttacking).log('Found attacking tab with text: ').text(selectorAttacking)
  .screenshot("attacking-pre.png")
  // .evaluate( function(selector){
  //   return $(selector)[0].getBoundingClientRect()
  // },selectorAttacking)
  // .then(function(result) {
  //   console.log(' L: ' + result.left + " W: " + result.width + " T: " + result.top + " H: " + result.height)
  //   rect = result
  //   const x = rect.left + rect.width / 2
  //   const y = rect.top + rect.height / 2
  //   console.log('Will click at: ' + x + ", " + y)
  // })
  .evaluate( function(selector) {

      // console.log('click it')
      // $(selector).trigger("click.tabs_transform"); // moves active tab, no content
    var span = $(selector)
    var c = "active"
    , $parent = span.parent()
    , $tabs = $parent.parent()
    , $tabWrap = $parent.parent().parent()
    , index = $parent.index();
  if ($parent.addClass(c).siblings().removeClass(c),
  $tabs.add($tabWrap).next().children().eq(index).addClass(c).siblings().removeClass(c),
  parseInt($(".carousel", $tabs.add($tabWrap).next().children().eq(index)).length) > 0 && 0 == parseInt($(".carousel .slick-track", $tabs.add($tabWrap).next().children().eq(index)).css("width")) && $(".carousel", $tabs.add($tabWrap).next().children().eq(index)).slick("setOption", null, null, !0),
  "mobile" === espn_ui.media_query_in_use && $tabs.add($tabWrap).toggleClass("open"), false) { console.log('wat') }
  // event.currentTarget && $parent.hasClass(c)) {
  //     var label = $(this).text().toLowerCase().replace(/team| /g, "");
  //     $(document).trigger("tab.track", [event, "tabs", label])
  // }
  span.trigger("tabs_transform.click")
  }, selectorAttacking)
  // .mouseEvent('mousedown',rect.left + rect.width / 2, rect.top + rect.height / 2)
  // .mouseEvent('mouseup',rect.left + rect.width / 2, rect.top + rect.height / 2)
 	//.click(selectorAttacking).log('Clicked attacking tab')
 	//.waitForSelector(metresRunSelector)
  .wait({timeout: 10000})
 	.screenshot("attacking-post.png")
  .catch(function (err) {   //Catch errors and send to error function.
 							console.log(err)
 						})
  .close();
