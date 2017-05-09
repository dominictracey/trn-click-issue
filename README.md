## Demo of issue with PhantomJS

This issue actually happens within PhantomJS but is demonstrated here using node-horseman as that is the configuration we use. To see manually what we are trying to automate:

1. Visit [this site](http://www.espn.co.uk/rugby/playerstats?gameId=290812&league=242041)
2. Click on the tab labeled "attacking"
3. Note the statistics change in the table. For instance, one column is labeled MR (Metres Run)

To install and run the demo of the problem clone this repo and:

```npm install
npm run demo```

Note that the script times out waiting for the selector for the Metres Run column after clicking on the attacking tab.
