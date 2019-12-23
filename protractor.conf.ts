import {browser, by, Config, element} from 'protractor';
const HtmlReporter = require('protractor-beautiful-reporter');

let reporter = new HtmlReporter({
    baseDirectory: './protractor/protractor-report',
    takeScreenShotsOnlyForFailedSpecs: true,
    docTitle: 'E2E Test Report',
    preserveDirectory: false,
    jsonsSubfolder: 'json',
    excludeSkippedSpecs: 'true'
});

export const config: Config = {
    directConnect: true,
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: [ "--headless", "--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox" ]
        },
    },

    // seleniumAddress: 'http://localhost:4444/wd/hub',

    SELENIUM_PROMISE_MANAGER: false,

    // restartBrowserBetweenTests: true,
    // multiCapabilities: [
    //     {
    //         browserName: 'chrome',
    //         chromeOptions: {
    //             args: [
    //                 "--headless", '--disable-gpu'
    //             ]
    //         },
    //         shardTestFiles: true,
    //         maxInstances: 4,
    //         platformName: "OS X 10.9",
    //         version: '63.0'
    //     },
    //     {
    //         browserName: 'firefox',
    //         'moz:firefoxOptions': {
    //             'args': [
    //                 "--headless"
    //             ]
    //         },
    //         shardTestFiles: true,
    //         maxInstances: 4
    //     },
    //     {
    //         browserName: 'safari',
    //         'safari.options': {
    //             cleanSession: true
    //         }
    //     }],

    framework: 'jasmine',
    specs: [
        "src/specs/*.spec.js"
    ],

    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 260000,
        isVerbose: true,
        includeStackTrace: true,
    },
    getPageTimeout: 260000,
    allScriptsTimeout: 50000,

    onPrepare: async() => {
        browser.baseUrl = 'http://www.angularjs.org';
        await browser.driver.manage().window().setPosition(0,0);
        await browser.driver.manage().window().setSize(1440,960);
        await browser.waitForAngularEnabled(false);
        await browser.manage().timeouts().implicitlyWait(5000);
        jasmine.getEnv().addReporter(reporter.getJasmine2Reporter());
        await browser.get(browser.baseUrl);
    },

    onComplete: async () => {
        await browser.driver.close();
        await browser.driver.quit();
    }
};