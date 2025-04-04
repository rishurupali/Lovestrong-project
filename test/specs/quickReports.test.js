describe('Quick Reports - Add New User', () => {
    it('should login, navigate to Quick Reports, click Full List, click Add New User, and fill form', async () => {
        await browser.url('http://66.235.194.119:8091/login');

        const usernameInput = await $('input[name="username"]');
        const passwordInput = await $('#exampleInputPassword');
        const loginButton = await $('button[type="submit"]');

        await usernameInput.waitForDisplayed({ timeout: 10000 });
        await usernameInput.setValue('manpreet02701@gmail.com');
        await passwordInput.setValue('Admin123');
        await loginButton.click();

        const quickReportsLink = await $('span.menu-title=Quick Reports');
        await quickReportsLink.waitForDisplayed({ timeout: 15000 });
        await quickReportsLink.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('quickReport'),
            { timeout: 10000 }
        );

        const fullListBtn = await $('button=Full List');
        await fullListBtn.waitForClickable({ timeout: 10000 });
        await fullListBtn.click();

        const addNewUserBtn = await $('button.add-user');
        await addNewUserBtn.waitForClickable({ timeout: 10000 });
        await addNewUserBtn.click();

        // Fill form fields
        await $('#hisFirstName').setValue('John');
        await $('#hisLastName').setValue('Doe');
        await $('#hisEmail').setValue('john.doe@example.com');
        await $('#hisMobile').setValue('1234567890');
        await $('#address').setValue('123 Main Street');
        await $('#city').setValue('Springfield');
        await $('#parishId').selectByVisibleText('Holy Spirit Catholic Church');
        await $('#notes').setValue('Test user note');
        await $('#herFirstName').setValue('Jane');
        await $('#herLastName').setValue('Doe');
        await $('#herEmail').setValue('jane.doe@example.com');
        await $('#herMobile').setValue('0987654321');
        await $('#state').selectByVisibleText('California');
        await $('#zip').setValue('90210');
        await $('#anniversary_date').setValue('01-01');
        await $('#allergies').setValue('None');
        await $('#emergency_name1').setValue('Alice');
        await $('#emergency_relationship1').setValue('Sister');
        await $('#emergency_phone1').setValue('1112223333');
        await $('#emergency_name2').setValue('Bob');
        await $('#emergency_relationship2').setValue('Brother');
        await $('#emergency_phone2').setValue('4445556666');
        await $('input[name="Website"]').click();
        await $('#referral_from_a_friend_or_family_member').setValue('Mark');

        // Check the "under age 35" checkbox
        const under35Checkbox = await $('input[name="under_age_35"]');
        await under35Checkbox.click();

        // Submit the form
        const submitButton = await $('button=Submit');
        await submitButton.click();

        await browser.pause(3000);
        console.log('✅ User form filled and submitted');
    });
});
