const {expect, test} = require('@playwright/test')
//https://www.lambdatest.com/learning-hub/handling-frames-and-windows-in-playwright
test('Browser navigations', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.goto("https://www.google.com/");
    await page.goBack();  //to go back to earlier page
    await page.goForward(); //again back to google
})

test('Validate hidden elements', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();
})

test('Handle javascript alert popups using listeners', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    page.on('dialog', dialog => dialog.accept());  //it will accept dialogs automatically whenever we see dialog box
    await page.locator("#confirmbtn").click();
})


test('Mouse Hover', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");   
    await page.locator("#mousehover").hover();
    await page.locator("div.mouse-hover-content a").nth(0).click();
    await page.pause();
})


test('iFrame and visible locator', async({page}) =>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    const framesPage = page.frameLocator("#courses-iframe");
    await framesPage.locator("li a[href*='lifetime-access']:visible").click();
    const textCheck = await framesPage.locator(".text h2").textContent();
    const subscriberCount = textCheck.split(" ")[1];
    expect(subscriberCount).toEqual('13,522');
    await page.pause();

    // await myFrame?.fill("input[name='fname']", "koushik")  //this ? takes two arguments one is method with locator and second is value need to pass in that locator
    // expect(await myFrame?.locator("p.has-text-info").textContent()).toContain("You have entered")  //here after ? we can write our locator and method to call
  
})


test('child window handling', async ({browser}) => {
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

    //to count the number of page 
    await newPage.waitForLoadState();
    const pages = newPage.context().pages();
    console.log('No.of tabs: ' + pages.length);

    //here we are using newPage and then indentifying the locator
    const text = await newPage.locator('p.red').textContent();
    console.log(text);

    //get domain name from fetched text message and enter in the username field in parent page.
    const domain = text.split('@')[1].split(' ')[0];
    console.log(domain);
    await username.fill(domain);  //here for username domain we are using page which contains the default context.
    console.log(await username.textContent());
    await page.pause(); 
});

//https://www.lambdatest.com/learning-hub/handling-frames-and-windows-in-playwright





