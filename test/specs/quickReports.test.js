const { faker } = require('@faker-js/faker');

describe('Quick Reports - Add New User', () => {
    it('should login, navigate to Quick Reports, click Full List, click Add New User, and fill form', async () => {
        // Login
        await browser.url('http://66.235.194.119:8091/login');

        await $('input[name="username"]').setValue('manpreet02701@gmail.com');
        await $('#exampleInputPassword').setValue('Admin123');
        await $('button[type="submit"]').click();

        // Navigate to Quick Reports
        const quickReportsLink = await $('span.menu-title=Quick Reports');
        await quickReportsLink.waitForDisplayed({ timeout: 15000 });
        await quickReportsLink.click();

        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('quickReport'),
            { timeout: 10000 }
        );

        // Full List > Add New User
        await $('button=Full List').click();
        await $('button.add-user').click();

        // Generate Random Data
        const hisFirstName = faker.person.firstName();
        const hisLastName = faker.person.lastName();
        const hisEmail = faker.internet.email({ firstName: hisFirstName, lastName: hisLastName });
        const hisMobile = faker.phone.number('##########');
        const address = faker.location.streetAddress();
        const city = faker.location.city();
        const notes = faker.lorem.words(5);
        const herFirstName = faker.person.firstName('female');
        const herLastName = faker.person.lastName();
        const herEmail = faker.internet.email({ firstName: herFirstName, lastName: herLastName });
        const herMobile = faker.phone.number('##########');
        const zip = faker.location.zipCode();
        const allergyNote = faker.lorem.word();
        const emergencyName1 = faker.person.fullName();
        const emergencyRelationship1 = 'Friend';
        const emergencyPhone1 = faker.phone.number('##########');
        const emergencyName2 = faker.person.fullName();
        const emergencyRelationship2 = 'Sibling';
        const emergencyPhone2 = faker.phone.number('##########');
        const referral = faker.person.fullName();

        // Fill the form
        await $('#hisFirstName').setValue(hisFirstName);
        await $('#hisLastName').setValue(hisLastName);
        await $('#hisEmail').setValue(hisEmail);
        await $('#hisMobile').setValue(hisMobile);
        await $('#address').setValue(address);
        await $('#city').setValue(city);
        await $('#parishId').selectByVisibleText('Holy Spirit Catholic Church');
        await $('#notes').setValue(notes);
        await $('#herFirstName').setValue(herFirstName);
        await $('#herLastName').setValue(herLastName);
        await $('#herEmail').setValue(herEmail);
        await $('#herMobile').setValue(herMobile);
        await $('#state').selectByVisibleText('California');
        await $('#zip').setValue(zip);
        await $('#anniversary_date').setValue('01-01');
        await $('#allergies').setValue(allergyNote);
        await $('#emergency_name1').setValue(emergencyName1);
        await $('#emergency_relationship1').setValue(emergencyRelationship1);
        await $('#emergency_phone1').setValue(emergencyPhone1);
        await $('#emergency_name2').setValue(emergencyName2);
        await $('#emergency_relationship2').setValue(emergencyRelationship2);
        await $('#emergency_phone2').setValue(emergencyPhone2);
        await $('input[name="Website"]').click();
        await $('#referral_from_a_friend_or_family_member').setValue(referral);
        await $('input[name="under_age_35"]').click();

        // Submit the form
        await $('button=Submit').click();

        // ✅ Confirm redirect to manageCouples
        await browser.waitUntil(
            async () => (await browser.getUrl()).includes('manageCouples'),
            {
                timeout: 10000,
                timeoutMsg: '❌ Form did not redirect to manageCouples after submission',
            }
        );
        console.log('✅ Redirected to manageCouples after form submission');
    });
});
