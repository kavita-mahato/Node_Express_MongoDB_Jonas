// Creating a replaceTemplate function to replace the place holders 
const replaceTemplate = (temp, product) => {

    // Replaces all the place holders with the actual values
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    // The /(global) flag is used to replace all instances, not just the first one.
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    // If organic then replace otherwise not
    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output;
}

module.exports = replaceTemplate;