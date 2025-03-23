describe('Login Page Tests', () => {
    
    beforeEach(async () => {
        await browser.url('http://66.235.194.119:8091/login'); // Ensure correct login page URL
        await browser.pause(3000); // Allow time for page to load
    });

    it('should log in successfully with valid credentials', async () => {
        // Locate elements
        const username = await $('.form-control');
        const password = await $('[name="password"]');
        const signInButton = await $('.btn-primary');

        // Perform login actions
        await username.setValue('manpreet02701@gmail.com');
        await password.setValue('Admin123');
        await signInButton.click();

        // Wait for profile image to verify successful login
        const profileImage = await $('.column-rowImage');
        await profileImage.waitForExist({ timeout: 5000 });

        // Assertion: Ensure profile image is displayed
        await expect(profileImage).toBeDisplayed();
    });

    it('should show an error for invalid login', async () => {
        const username = await $('.form-control');
        const password = await $('[name="password"]');
        const signInButton = await $('.btn-primary');
        const errorMessage = await $('.alert-danger'); // Adjust based on UI

        await username.setValue('invalidUser');
        await password.setValue('wrongPass');
        await signInButton.click();

        await expect(errorMessage).toBeDisplayed();
        await expect(errorMessage).toHaveTextContaining('Invalid username or password');
    });

    it('should not allow login with empty fields', async () => {
        const signInButton = await $('.btn-primary');
        await signInButton.click();

        const usernameError = await $('#username-error'); // Adjust selector for validation
        const passwordError = await $('#password-error');

        await expect(usernameError).toBeDisplayed();
        await expect(passwordError).toBeDisplayed();
    });

    it('should keep password masked while typing', async () => {
        const password = await $('[name="password"]');
        await password.setValue('secretPassword');
        
        const passwordType = await password.getAttribute('type');
        await expect(passwordType).toBe('password'); // Ensuring it's masked
    });

    it('should log out user after session timeout', async () => {
        // Login first
        const username = await $('.form-control');
        const password = await $('[name="password"]');
        const signInButton = await $('.btn-primary');

        await username.setValue('validUser');
        await password.setValue('validPass');
        await signInButton.click();

        await browser.pause(60000); // Simulate session timeout
        await browser.refresh();

        // Ensure the user is redirected back to the login page
        await expect(browser).toHaveUrlContaining('/login');
    });

});
