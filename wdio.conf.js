exports.config = {
    runner: 'local',

    specs: ['./test/specs/**/*.js'], // Ensure JavaScript file extension is used

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--disable-gpu', '--no-sandbox', '--window-size=1920,1080']  // Removed '--headless' to allow GUI mode
        }
    }],

    services: [['chromedriver', { 
        port: 9515,  // Ensures WebDriverIO connects to the correct ChromeDriver instance
        usePort: true
    }]], 

    logLevel: 'debug', // Set to 'debug' for better troubleshooting

    port: 9515, // Match the port where ChromeDriver is running
    path: '/',  // Default WebDriver path

    waitforTimeout: 30000,  // Increased timeout to 30s

    mochaOpts: {
        timeout: 60000  // Increased test execution timeout to 60s
    },

    beforeSession: async function () {
        console.log('Starting WebDriverIO tests...');
    },

    reporters: ['spec', [
        'allure', { outputDir: 'allure-results' }
    ]],

    afterTest: async function(test, context, { error, result, duration, passed }) {
        if (!test || !test.title) {
            console.error("Test object is undefined. Possible issue with test execution.");
            return;
        }
        if (passed) {
            console.log(`PASSED: ${test.title}`);
        } else {
            console.error(`FAILED: ${test.title}`);
            console.error(`   - Error Message: ${error?.message || 'No error message available'}`);
            console.error(`   - Stack Trace: ${error?.stack || 'No stack trace available'}`);
        }
    }
};
