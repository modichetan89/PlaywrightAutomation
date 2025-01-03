const {test, expect} = require('@playwright/test');

//Resolve synchronisation issues
test('Synchronisation Issues', async ({page}) => {
    const url = 'https://rahulshettyacademy.com/client';
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("[value='Login']");
    const allProducts = page.locator(".card-body b");

    await page.goto(url);
    await userEmail.fill("anshika@gmail.com");
    await password.fill("Iamking@000");
    await loginBtn.click();
    //This will wait until the all networks call get idle(completed), but this option might be little flaky.
    //await page.waitForLoadState('networkidle') 

    //here login might take some time and playwright not wait for all elements to load, and return 0 elements.
    //const titles = await allProducts.allTextContents();  

    //Data is loaded here by service call or say network call. And frontend is rendering it on UI.
    //so we need to implement wait here.  
    //so before calling allTextContents() methods, we need to wait until all network calls are done with the help of waitForLoadState('networkidle'). This is sometimes flaky.

    //Another option is to use waitFor() method before calling allTextContents() methods. e.g. const titles = await allProducts.waitFor().allTextContents();
    //But this waitFor() method will only work when our locator return single element, but in our case returning multiple.
    //const titles = await allProducts.waitFor().allTextContents();

    //So we need to use either first or last or nth option before waitFor() method. It will wait for that particular element, by that time our allTextContents will be able to retrieve all elements.
    await allProducts.first().waitFor();
    const titles = await allProducts.allTextContents();
    console.log(titles)

});