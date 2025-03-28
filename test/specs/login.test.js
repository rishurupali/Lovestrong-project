describe('Login Page Tests', () => {
    beforeEach(async () => {
        console.log('Navigating to Login Page...');
        await browser.url('http://66.235.194.119:8091/login');
        await browser.pause(3000); // Allow page to load

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/login'),
            {
                timeout: 15000,
                timeoutMsg: 'ERROR: Did not navigate to the login page!'
            }
        );

        await $('input[name="username"]').waitForExist({ timeout: 20000 });
        await $('#exampleInputPassword').waitForExist({ timeout: 20000 });
        console.log('Login page loaded successfully');
    });

    it('should log in successfully with valid credentials', async () => {
        await $('input[name="username"]').setValue('manpreet02701@gmail.com');
        await $('#exampleInputPassword').setValue('Admin123');
        await $('button[type="submit"]').click();

        const profileImage = await $('.column-rowImage');
        await profileImage.waitForExist({ timeout: 10000 });
        await expect(profileImage).toBeDisplayed();
        console.log('PASSED: Login successful');
    });

    it('should show an error for invalid login', async () => {
        await $('input[name="username"]').setValue('invalidUser');
        await $('#exampleInputPassword').setValue('wrongPass');
        await $('button[type="submit"]').click();

        const errorMessage = await $('.alert-danger');
        await errorMessage.waitForExist({ timeout: 10000 });
        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Invalid username or password');
        console.log('PASSED: Invalid login error displayed');
    });

    it('should not allow login with empty fields', async () => {
        await $('button[type="submit"]').click();

        const usernameField = await $('input[name="username"]');
        const passwordField = await $('#exampleInputPassword');
        await expect(usernameField).toHaveAttribute('required');
        await expect(passwordField).toHaveAttribute('required');
        console.log('PASSED: Empty fields validation');
    });

    it('should keep password masked while typing', async () => {
        const password = await $('#exampleInputPassword');
        await password.setValue('secretPassword');

        await expect(password).toHaveAttribute('type', 'password');
        console.log('PASSED: Password masking works');
    });

    it('should log out user after session timeout', async () => {
        await $('input[name="username"]').setValue('validUser');
        await $('#exampleInputPassword').setValue('validPass');
        await $('button[type="submit"]').click();

        await $('.column-rowImage').waitForExist({ timeout: 10000 });
        console.log('Waiting for session timeout...');

        await browser.pause(60000); // Simulate session timeout (1 min)
        await browser.refresh();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('/login'),
            {
                timeout: 15000,
                timeoutMsg: 'ERROR: User was not redirected to login after session timeout!'
            }
        );
        console.log('PASSED: Logout after session timeout');
    });

    it('should prevent multiple login attempts within a short period', async () => {
        for (let i = 0; i < 3; i++) {
            await $('input[name="username"]').setValue('invalidUser');
            await $('#exampleInputPassword').setValue('wrongPass');
            await $('button[type="submit"]').click();
            await browser.pause(2000); // Wait between attempts
        }

        const lockoutMessage = await $('.alert-warning');
        await lockoutMessage.waitForExist({ timeout: 10000 });
        await expect(lockoutMessage).toHaveTextContaining('Too many login attempts');
        console.log('PASSED: Lockout after multiple failed attempts');
    });

    afterEach(async function () {
        if (this.currentTest.state === 'failed') {
            console.log(`FAILED: ${this.currentTest.title}`);
        }
    });
});
