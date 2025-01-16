const {test, expect} = require('@playwright/test');

test('Place a order and verify order details', async({page}) =>{
    const url = 'https://rahulshettyacademy.com/client';
    const requiredProductTitle = 'LG Refrigerator';
    const shippingCountry = ' India';
    const loginEmail = 'modichetan89@gmail.com';
    const loginPassword = 'Modichetan89@';
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const loginBtn = page.locator("[value='Login']");
    const products = page.locator(".card-body");
    //const allProductsTitle = page.locator(".card-body b");
    const productsTitle = page.locator(".card-body").locator("b"); //chaining of locator parentlocator.childlocator (this will be similar to allProductsTitle locator mentioned above)
    const addTocart = page.locator(".card-body").locator("text= Add To Cart");
    const navToCartBtn = page.locator("[routerlink*='cart']");
    const productTitleCartPage = page.locator("h3:has-text('LG Refrigerator')")
    const cartList = page.locator("div.cart li")
    //const cartList2 = page.locator("div.cart li").first();
    const checkoutBtn = page.locator("text='Checkout'");
    const selectCountryDropDown = page.locator("[placeholder*='Country']");
    const dropDownExpandable = page.locator(".ta-results");
    const dropDownExpandableIndividual = page.locator(".ta-results").locator("button");
    const shippingEmail = page.locator(".user__name [type='text']");
    
    const creditCardNumber = page.locator(".input[type='text']").nth(0);
    const cvv = page.locator(".input[type='text']").nth(1);
    const nameOnCard = page.locator(".input[type='text']").nth(2);
    const applyCoupon = page.locator(".input[type='text']").nth(3);
    const expiryDateMonth = page.locator("select.input").nth(0);
    const expiryDateYear = page.locator("select.input").nth(1);
    const applyCouponBtn = page.locator(".btn-primary");
    const invalidCouponMsg = page.locator("text=* Invalid Coupon");
    const placeOrderBtn = page.locator(".action__submit");

    const orderConfirmationMsg = page.locator(".hero-primary");
    const orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    const ordersBtnHeader = page.locator("button[routerlink*='myorders']");
    const orderTable = page.locator("tbody");
    const OrderPageTitle = page.locator("text=Your Orders");

    const orderIds = page.locator("tbody tr th");
    const viewBtns = page.locator("tbody tr button");
    const orderDetailsOrderId = page.locator(".col-text");


    await page.goto(url);
    await userEmail.fill(loginEmail);
    await password.fill(loginPassword);
    await loginBtn.click();
    await products.first().waitFor();
    const titles = await productsTitle.allTextContents();
    //console.log(titles)
    const count = await products.count();
    for(let i = 0; i < count; i++){
        //checking for expected product to found
        if(await productsTitle.nth(i).textContent() === requiredProductTitle){
            //add product to cart
            await addTocart.nth(i).click();
            break;
        }  
    }

    //navigate to cart and verify products present
    await navToCartBtn.click();
    await cartList.waitFor();  //we cannot use waitFor() with multiple elements return by locator, so always use the locator which return only 1 element. e.g. page.locator("div.cart li").first();
    const bool = await productTitleCartPage.isVisible();  //playwright not automatically support the wait for isVisible method, so we need to wait explicitly in above steps to see list showing up or not in cart
    expect(bool).toBeTruthy();

    //checkout and select the country from dropdown
    await checkoutBtn.click();
    await selectCountryDropDown.pressSequentially('Ind');
    await dropDownExpandable.waitFor();
    const optionsCount = await dropDownExpandableIndividual.count();
    for(let i = 0; i < optionsCount; i++) {
        const text = await dropDownExpandableIndividual.nth(i).textContent();
        if(text === " India"){
            await dropDownExpandableIndividual.nth(i).click();
            break;
        }
    }
    //When there are some characters space in a string for search
    //text.includes("India")  -- this method will any string that contains India, so it is not feasible
    //text.trim() ==== "India"  -- here it will trim the text by removing the extra white space
    //text === " India"  -- exact match of string

    //await expect(page.locator(".user__name [type='text']").first()).toHaveText(loginEmail);
    await expect(shippingEmail.first()).toHaveText(loginEmail);
    //Fill credit card details in Personal information
    await creditCardNumber.clear();
    await creditCardNumber.fill("1234565890123456");
    await cvv.fill("123");
    await nameOnCard.fill("Test User");
    await expiryDateMonth.selectOption('05');
    await expiryDateYear.selectOption('31');
    await applyCoupon.fill("125CP");
    await applyCouponBtn.click();
    await expect(invalidCouponMsg).toHaveText("* Invalid Coupon");
    //place order
    await placeOrderBtn.click();
    const orderConfirmationMsgActual = await orderConfirmationMsg.textContent();
    const orderConfirmationMsgExpected = ' Thankyou for the order. ';
    expect(orderConfirmationMsgActual).toStrictEqual(orderConfirmationMsgExpected);
    const actualOrderId = await orderId.textContent();
    //console.log(actualOrderId);
    //const trimOrderId = actualOrderId.split(" ")[2];
    const trimOrderId = actualOrderId.replace(/[^a-zA-Z0-9]/g, '')
    //console.log(trimOrderId);


    //check for order id and confirm it is exist and click on view button for that order and verify order summary page 
    await ordersBtnHeader.waitFor();
    await ordersBtnHeader.click();
    await orderTable.waitFor();
    await expect(OrderPageTitle).toHaveText('Your Orders');


    const orderIdCount = await orderIds.count();
    for(let i = 0; i < orderIdCount; i++){
        const text = await orderIds.nth(i).textContent();
        //we can also write below if condition like actualOrderId.includes(text) 
        if(text === trimOrderId){   
            await viewBtns.first().nth(i).click();
            break;
        }
    }

    const orderIdDetails = await orderDetailsOrderId.textContent();
    expect(actualOrderId.includes(orderIdDetails)).toBeTruthy();
    await page.pause();

});
