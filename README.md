# Protractor with Selenium Grid and Performance testing with Lighthouse

This suite consists of end to end tests written in protractor and performance tests written in Lighthouse. 
The repository after cloning can be run in multiple ways: 

## Protractor

### In localhost 

Run the following commands to run end to end tests in your system. This is also applicable for local development. 
It can be run as a regression suite while development to check for bugs. 

1) Install dependencies 
    ```bash
    npm install
    ```
   
2) Run the test suite first time 
    ```bash
   npm run test
    ```
   This will run protractor end to end tests on baseurl. This will install all browser dependencies and run the test. 
   For consecutive runs, you need not install dependencies again so use the command:
   ```bash
   npm run e2e
   ``` 
   
   If you want to run it on your development server, you will need to make a change in the configuration file of protractor.
   
3) Change configuration file for protractor
    ```typescript
    export const config: Config = {
        // directConnect: true,  //Uncomment this to run protractor on chrome driver directly.
        // seleniumAddress: 'http://localhost:4444/wd/hub', //Uncomment this to use protractor with selenium grid.

       capabilities: {
            'browserName': 'chrome',
            chromeOptions: {
               // You can remove headless to check your browser interactions and any failing tests. 
               // You can remove the no-sandbox flag for local testing but make sure to add it when running the tests on docker. 
                args: [ "--headless", "--disable-gpu", "--disable-dev-shm-usage", "--no-sandbox" ]
            },
        },
       onPrepare: async() => {
               browser.baseUrl = 'https://staging.jeet11.com'; // Change the baseurl to point to your local development server.
               await browser.driver.manage().window().setPosition(0,0);
       }
   }
    ```
   
### Using Docker

To run protractor tests with docker command inside a container, run the following command:
1) Build the protractor image
    ```bash
    docker build -f protractor/Dockerfile -t protractor .
    ```
   This command will build the protractor image locally in your system. If you want to run 
   protractor using a docker container, make sure you make changes to the configuration file before
   you run the build command. 
  
2) Run the protractor container
    ```bash
   docker run -it --privileged --rm --net=host -v /dev/shm:/dev/shm -v $(pwd)/report:/protractor/report protractor
    ```
   This command will run your protractor tests in a container. Make sure to add the no-sandbox option in your chrome capabilities
   in the configuration file. 
   
### Using selenium grid

You will need to use the grid if you are running parallel tests for your application on multiple browsers. The grid consists of 
a selenium hub that is the master server where we can run multiple browser instances. These browser instances are called nodes 
and each node is connected to the hub. We can have firefox and chrome on the hub. 

Use the following command for a simple run (make sure you change the config file to point to selenium hub address at http://localhost:4444):
```bash
npm run grid
```
This command will run docker-compose and scale chrome node instances to 5 and then run the automated tests.

Use the following command to start the selenium grid on port 4444. Make sure you have docker compose installed in your system. For Mac users
 you can use Docker for Mac. It comes with docker-compose.
```bash
docker-compose up -d 
```

Use the -d tag to run it as a daemon. If you want to check browser logs, you can run it without the -d flag.

Make sure you change your protractor configuration file to use selenium address at http://localhost:4444 else your tests
 will not run on the grid. You can change the capability options to run tests in multiple browser types. In the configuration 
 file you will find the multicapabilities options where you can configure different browsers. For mobile testing, we will be
  adding appium packages here soon. 
  
  ```typescript
     multiCapabilities: [
            {
                browserName: 'chrome',
                chromeOptions: {
                    args: [
                        "--headless", '--disable-gpu'
                    ]
                },
                shardTestFiles: true,
                maxInstances: 4,
                platformName: "OS X 10.9",
                version: '63.0'
            },
            {
                browserName: 'firefox',
                'moz:firefoxOptions': {
                    'args': [
                        "--headless"
                    ]
                },
                shardTestFiles: true,
                maxInstances: 4
            },
            {
                browserName: 'safari',
                'safari.options': {
                    cleanSession: true
                }
            }]
  ```
In order to scale the number of chrome nodes , you can run the following command:
```
docker-compose scale chromenode=5
```
This command will run 5 chrome nodes, you can now shard the tests to a max 5 instances of parallelism. 

### Deployment Pipeline

Kubernetes configuration files for protractor tests will be written in yaml and this will be deployed as a job in the existing
kubernetes cluster. Once this job ends with an exit code 0, we will trigger the next part in the pipeline. This readme will 
be updated once the manifests are written. 

## Lighthouse

Lighthouse is an open-source, automated tool for improving the quality of web pages. You can run it against any web page,
 public or requiring authentication. It has audits for performance, accessibility, progressive web apps, SEO and more.
 
You can run Lighthouse in Chrome DevTools, from the command line, or as a Node module. You give Lighthouse a URL to audit,
it runs a series of audits against the page, and then it generates a report on how well the page did. From there, use the
failing audits as indicators on how to improve the page. Each audit has a reference doc explaining why the audit is important,
as well as how to fix it.

Lighthouse offers a varied range of metrics to monitor in a webpage. More details can be found 
[here](http://docs.google.com/spreadsheets/d/1up5rxd4EMCoMaxH8cppcK1x76n6HLx0e7jxb0e0FXvc/edit#gid=0). 
We are using lighthouse programmatically with jasmine to test for 13 different metrics.:We can add and remove these
as the app grows. The current metrics are Accessibility audit score, Performance audit score, Best practice audit score,
Progressive Web App audit score, SEO audit score, Contrast check, Alt text for all images, Page load speed threshold, 
Valid ARIA attributes, Valid values for all ARIA attributes, Contains no tabIndex values above 0, Has a logical tab order for assistive technology use, 
Contains no known vulnerable libraries.

Run the following command to execute Lighthouse audit tests locally to check if any of the monitoring indices is failing. 
```bash
npm run lighthouse
```

After the command is run, you will be able to view the reports in the lighthouse-reports folder. The report will be viewable in 
a browser. It will also be available as a csv file. 

NOTE: For local use only, you can run the following command to save the generated report in a running database (mongodb) 
for later analysis. 

### Using docker

You can run these tests using a docker container to replicated the deployment pipeline conditions to verify your tests. 
Execute the following command to run lighthouse tests in a docker container: 
```bash
docker build -f performance/Dockerfile -t lighthouse .
```
The tests are currently executed on build so the image need not run. This will change as we will be deploying this as a job in our 
deployment pipeline.

### Deployment Pipeline

Kubernetes configuration files for lighthouse tests will be written in yaml and this will be deployed as a job in the existing
kubernetes cluster. Once this job ends with an exit code 0, we will trigger the next part in the pipeline. This readme will 
be updated once the manifests are written. 