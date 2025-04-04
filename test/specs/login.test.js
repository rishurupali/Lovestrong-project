describe('Login Test', () => {
    it('should login successfully', async () => {
        await browser.url('http://66.235.194.119:8091/login');

        // Wait for the login page to load
        await $('input[name="username"]').waitForDisplayed({ timeout: 10000 });
        await $('#exampleInputPassword').waitForDisplayed({ timeout: 10000 });

        // Enter login credentials
        await $('input[name="username"]').setValue('manpreet02701@gmail.com');
        await $('#exampleInputPassword').setValue('Admin123');
        await $('button[type="submit"]').click();

        // Wait for dashboard/profile image to confirm login
        const profileImage = await $('.column-rowImage');
        await profileImage.waitForDisplayed({ timeout: 10000 });

        console.log('✅ Logged in successfully.');
    });
});
