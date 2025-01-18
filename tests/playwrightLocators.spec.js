const {test,expect} = require("@playwright/test");
test('playwright locators demo', async({page})=>{
    const url = "https://rahulshettyacademy.com/angularpractice/";
    await page.goto(url);
    //We do not need to find css for checkbox or radio and then click on it, as in many application clicking on label will also select checkbox and radio options
    await page.getByLabel('Check me out if you Love IceCreams!').check();  
    await page.getByLabel('Employed').click();
    await page.getByLabel('Gender').selectOption('Female');
    //await page.getByLabel('Password').fill('12345'); //it will only work when clicking on label, highlight the password field, there should be some association in code with help of "for and id" tags.
    //placeholder
    await page.getByPlaceholder('Password').fill('12345');
    //getByRole - it shows predefined roles which we can use to locate element
    await page.getByRole('button').click();
    await page.getByRole('button', {name: 'Submit'}).click(); //when there are more than one locator identified by role then we can give second argument like name of button
    //getByText
    const text = await page.getByText('Success! The Form has been submitted successfully!.').isVisible();
    expect(text).toBeTruthy();
    //scroll into view if needed
    //await page.getByRole('link', {name: 'Shop'}).scrollIntoViewIfNeeded();
    await page.getByRole('link', {name: 'Shop'}).click();
    //For text field we should not prefer getByLabel


   /**Requirement --
    * Select a product with help of locator. It shows multiple products.
    * With help of chaining method filter, filter on basis of hasText or has or hasNotText or hasNot
    * Then from that card click on button to add to card with the help of getByRole
    */

   await page.locator('app-card').filter({hasText: 'Nokia Edge'}).getByRole('button', {name: 'Add'}).click();
    
    //await page.pause();
});

