// var globals = require('protractor');
var HtmlReporter = require('protractor-beautiful-reporter');
exports.config = {
  
    framework: 'jasmine',
    capabilities: {
      browserName: 'chrome',
      chromeOptions: {
        args: [ "--headless", "--disable-gpu" ]
      }
    },
    specs: [
      './src/specs/demo.spec.js'
    ],
    directConnect: true,
  
    // You could set no globals to true to avoid jQuery '$' and protractor '$'
    // collisions on the global namespace.
    noGlobals: false,

    onPrepare() { 
      // let browser = globals.browser;
      jasmine.getEnv().addReporter(new HtmlReporter({
        baseDirectory: 'Reports/screenshots',
        screenshotsSubfolder: 'images'
     }).getJasmine2Reporter());
      browser.driver.manage().window().maximize();
      browser.driver.manage().window().setPosition(0, 0);
    }, 
    onComplete() { 
      browser.close();
    }  
}