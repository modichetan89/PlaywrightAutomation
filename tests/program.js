const { log } = require("console");

let i = " | 67893541e2b5443b1f26d270 | ";
const finalOrderIdArray = i.split(" ");
const finalOrderId = i.split(" ")[2];
console.log(finalOrderId);
console.log(finalOrderIdArray);



function removeSpecialCharacters(inputString) {
    // Use a regular expression to match only alphanumeric characters
    const alphanumericString = inputString.replace(/[^a-zA-Z0-9]/g, '');
    return alphanumericString;
}

// Example usage:
const originalString = " | 67893541e2b5443b1f26d270 | ";
const cleanedString = removeSpecialCharacters(originalString);
console.log(cleanedString); // Output: HelloWorld123


//actualOrderId.includes(text)
