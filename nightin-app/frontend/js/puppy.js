/**
 * Generates the generic url to be added to for RecipePuppy API
 * @constant
 */
const baseURL = () => {
    return 'https://recipe-puppy.p.rapidapi.com/?p=1&';
}
/**
 * Generates the generic base request for RecipePuppy API
 * We use Rapid API as a proximity to access RecipePuppy, so it uses Nate's account key
 * @constant
 */
const defaultReq = () => {
    return {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
            "x-rapidapi-key": "d02ad0adf9msh642490ab5e606bfp156cc1jsn12ec2adcd63d"
        }
    }
}

/**
 * Generates the correct url and request parameters for the RecipePuppy API
 * @param {string array} ingredients - ingredients to pass to search recipes on
 * Output is json object with the recipes contained in the 'results' key
 */
export async function makeRequest(ingredients){
    let base = baseURL();
    if (ingredients != [""]){
        base += "i=";
        let i;
        for (i in ingredients){
            if (i == 0){
                base += encodeURIComponent(ingredients[i].toLowerCase());
            } else {
                base += "%2C" + encodeURIComponent(ingredients[i].toLowerCase());
            }
        }
    }
    //console.log(base);
    return await( await fetch(base, defaultReq())).json();
}
  
