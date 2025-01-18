const {test, expect} = require('@playwright/test');

test('Static dropdown, radio buttons, web based popups, checkbox', async ({page}) => {
    const url = 'https://rahulshettyacademy.com/loginpagePractise/';
    const username = page.locator("#username");
    const password = page.locator("#password");
    const professionStaticDropdown = page.locator("select.form-control");
    const radioButton = page.locator(".radiotextsty");
    const webBasedPopup = page.locator("#okayBtn"); // since we are not performing any actions await is not needed. 
    const checkBox = page.locator("#terms");
    //const loginBtn = page.locator("#signInBtn");
    //const allProducts = page.locator(".card-body b");

    await page.goto(url);

    await username.fill("anshika@gmail.com");
    await password.fill("Iamking@000");

    await professionStaticDropdown.selectOption("consult");
    //await radioButton.last().click();
    await radioButton.nth(1).click();
    await webBasedPopup.click();
    console.log(await radioButton.nth(1).isChecked()); //returns boolean
    await expect(radioButton.nth(1)).toBeChecked(); //assertion  - we have given await outside as the action is performed after expect method by toBeChecked method.

    await checkBox.click();
    await expect(checkBox).toBeChecked(); //assertion - we have given await outside as the action is performed after expect method by toBeChecked method.
    await checkBox.uncheck();
    expect(await checkBox.isChecked()).toBeFalsy(); //assertion - we have await inside as actions is perfomed on checkbox location by isChecked method.
    await page.pause();  //This method will pause the current execution of the test and open the browser window. It will allow you to inspect the page and see what is happening.



    //await loginBtn.click();  
    //await allProducts.first().waitFor();
    //const titles = await allProducts.allTextContents();
    //console.log(titles)

});

test('blink text hyperlink assertion', async ({page}) => {
    const link = page.locator("[href*='documents-request']")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(link).toHaveAttribute('class','blinkingText'); //assertion -- since not action performed on the link we have await outside
    await link.click();
    // await page.pause();
});