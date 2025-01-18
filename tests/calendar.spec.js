const {test, expect} = require('@playwright/test')
test('calendar validation',async({page}) => {
    const month = '12';
    const date = '1';
    const expectedYear = '2124';
    const expectedDateMonthYear = [month,date,expectedYear];
    await page.goto('https://rahulshettyacademy.com/seleniumPractise/#/OFFERS');
    await page.locator(".react-date-picker__calendar-button").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    await page.locator(".react-calendar__navigation__label__labelText").click();
    const leftArrowDecade = page.locator(".react-calendar__navigation__arrow").nth(0);
    const rightArrowDecade = page.locator(".react-calendar__navigation__arrow").nth(1);
    const decadeYearCal = page.locator(".react-calendar__century-view__decades__decade");
    const defaultDecade = await page.locator(".react-calendar__navigation__label__labelText").textContent();
    const monthLocator = page.locator(".react-calendar__year-view__months__month").nth(Number(month)-1);
    const dateLocator = page.locator("div.react-calendar__month-view__days").locator("button:not(.react-calendar__month-view__days__day--neighboringMonth)").nth(Number(date)-1);
    const yearLocator = page.getByText(expectedYear);
    const actualInputs = page.locator("input.react-date-picker__inputGroup__input");
    const firstYear = defaultDecade.split(' ')[0];
    const calendarYearDecade = Math.trunc(Number(firstYear)/100);
    const expectedYearDecade = Math.trunc(Number(expectedYear)/100);
    console.log(`calendarYearDecade = ${calendarYearDecade} and expectedYearDecade ${expectedYearDecade}`)
    if(calendarYearDecade > expectedYearDecade){
        await leftArrowDecade.click();
        const index = Number(expectedYear.charAt(2));
        await decadeYearCal.nth(index).click();
    }else if(calendarYearDecade < expectedYearDecade){
        await rightArrowDecade.click();
        const index = Number(expectedYear.charAt(2));
        await decadeYearCal.nth(index).click();
    }else{
        const index = Number(expectedYear.charAt(2));
        await decadeYearCal.nth(index).click();
    }
    await yearLocator.click();
    await monthLocator.click();
    await dateLocator.click();
    for(let i =0; i < actualInputs.length; i++){
        const individualValue = actualInputs.getAttribute("value");
        expect(individualValue).toEqual(expectedDateMonthYear[i]);
    }
    
    //await page.pause();

})