const {test, expect} = require('@playwright/test');

test('First Playwright Test', function(){
    //playwright code example
    //Since javascript is asynchronous in nature, we need to add await function before every test step,
    //so that it will not execute next step until the test first execution gets finished.
    //Also for asynchronous functions we need to add async keyword before function.  async function(){}
});

test('Second Playwright Test - page', async ({page}) => {
    //Also we can shorten the function by writing it like anonymous function. async () {}
    //Inside function we need to give argument as global fixture {page}
    //Then we can directly call the page.goto() function, it will treat it as a default browser setting. 
    //We do not need below two lines. It will automatically open default browser context and page
    //const context = await browser.newContext();
    //const page = await context.newPage();
    await page.goto('https://www.amazon.in');
});

test('Third Playwright Test - browser context', async ({browser}) => {
    //If we create a context. So that your browser will open with your required plugins, cookies, session etc.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://www.google.com'); 
});

test('Four Playwright Test - Only this will execute', async ({page}) => {
    await page.goto('https://www.google.com'); 
    console.log(await page.title());
    await expect(page).toHaveTitle("Google")

});

//Locators, hidden messages and assertion Demo
test('Validation of incorrect login', async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/'); 
    await page.locator("#username").fill('rahulshetty');
    await page.locator("#password").fill('learning');
    await page.locator("#signInBtn").click();
    //wait until this locator shows up page.
    const errorMsg = await page.locator("[style*='block']").textContent();
    await expect(errorMsg).toMatch('Incorrect username/password.');
    await expect(errorMsg).toContain('Incorrect');
});

//clear the filled fields and reenter the correct data.
//Storing the loators in the variables
//Get first or nth value or all values
test.only('Validation of correct login', async ({page}) => {
    const url = 'https://rahulshettyacademy.com/loginpagePractise/'
    const userName = page.locator("#username");
    const password = page.locator("#password")
    const signInButton = page.locator("#signInBtn")
    const allProductNamesCSS = page.locator(".card-body a")
    await page.goto(url); 
    await userName.fill('rahulshetty');
    await password.fill('learning');
    await signInButton.click();
    await userName.fill("");  //to clean up the existing value
    await password.fill("");  //to clean up the existing value
    await userName.fill("rahulshettyacademy");  
    await password.fill("learning");
    await signInButton.click();
    const firstProductName = await allProductNamesCSS.first().textContent();
    const secondProductName = await allProductNamesCSS.nth(1).textContent();
    console.log(`firstProductName: ${firstProductName} secondProductName: ${secondProductName}`);  
    //allTextContents returns array of elements, even it have 0 length, it considers the test as success. Whereas for single element textContent we get error if not found matching value.
    //There is a chance that all elements not loaded in specified time period of wait and it returns unexpected results.
    const allProductNames = await allProductNamesCSS.allTextContents();  //it return array of all products, it can be empty.   
    console.log(`allProductNames: ${allProductNames}`) 
});



