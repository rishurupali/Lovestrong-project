module.exports = {
    login: async (username, password) => {
        // Navigate to login page
        await browser.url('http://66.235.194.119:8091/login');
        
        // Wait for login fields to appear
        await $('input[name="username"]').waitForExist({ timeout: 5000 });
        await $('#exampleInputPassword').waitForExist({ timeout: 5000 });

        // Input credentials and submit form
        await $('input[name="username"]').setValue(username);
        await $('#exampleInputPassword').setValue(password);
        await $('button[type="submit"]').click();

        // Wait until user is redirected to dashboard
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/dashboard'),
            { timeout: 10000, timeoutMsg: 'User was not redirected to the dashboard after login' }
        );
    }
};
