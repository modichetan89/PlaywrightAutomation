const {test, expect} = require('@playwright/test');

test('blink text hyperlink assertion', async ({page}) => {
    const link = page.locator("[href*='documents-request']")
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await expect(link).toHaveAttribute('class','blinkingText'); //assertion -- since not action performed on the link we have await outside
    await link.click();
    // await page.pause();
});

test.only('child window handling', async ({browser}) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    const link = page.locator("[href*='documents-request']")
    const username = page.locator("#username");
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

    //const page2 = context.waitForEvent('page'); //listen for the new page to open, and this should be present before clicking on link which open new page
    //Promise states - pending, rejected, fulfilled. We can not use await in above step, otherwise it will keep on waiting for the page to open. 
    //Since it is synchoronous next step won't execute until above step finishes. it will be deadlock condition.
    //So we need to run both above steps and below steps parallely. That means asynchronously need to run. So await is not needed in above step.   
    //await link.click(); //open new page  
    
    //Using the Promise.all(array of steps), this will execute all the steps parallely. It will come out only when promises are fulfilled for all mentioned steps.
    //We store the promise in variables newPage and use that page to perform actions on new page.
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'), 
            link.click()
        ]
    )

    //if we have two child window open, then store it like const [newPage1, newPage2]
    // const [newPage1, newPage2] = await Promise.all(
    //     [
    //         context.waitForEvent('page'), 
    //         link.click()
    //     ]
    // )

    const text = await newPage.locator('p.red').textContent();
    console.log(text);

    //get domain name from fetched text message and enter in the username field in parent page.
    const domain = text.split('@')[1].split(' ')[0];
    console.log(domain);
    await username.fill(domain);  //here for username domain we are using page which contains the default context.
    console.log(await username.textContent());
    await page.pause();

    
});

