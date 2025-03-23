export const config: WebdriverIO.Config = {
    runner: 'local',

    specs: ['./test/specs/**/*.js'], // Use './test/specs/**/*.ts' if using TypeScript

    capabilities: [{
        browserName: 'chrome',
        'goog:chromeOptions': { 
            args: ['--disable-gpu', '--start-maximized']  // Remove '--headless' for debugging
        }
    }],

    services: ['chromedriver'], // Ensure ChromeDriver service is enabled

    logLevel: 'info', // Set log level for debugging

    port: 9515, // Match the port where ChromeDriver is running
    path: '/',  // Default WebDriver path

    waitforTimeout: 20000,  // Increase element wait timeout to 20s

    mochaOpts: {
        timeout: 60000  // Increase test execution timeout to 60s
    },

    beforeSession: async function () {
        console.log('Starting WebDriverIO tests...');
    },

    afterSession: async function () {
        console.log('Tests completed. Closing WebDriverIO session...');
    },
};
