
const baseURL = () => {
    return 'https://recipe-puppy.p.rapidapi.com/';
}

const defaultReq = () => {
    return {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
            "x-rapidapi-key": "d02ad0adf9msh642490ab5e606bfp156cc1jsn12ec2adcd63d"
        }
    }
}


//expects ingredients array, space seperated string for the search term
export async function makeRequest(ingredients, searchTerm){
    let base = baseURL() + "?";
    if (ingredients != [""]){
        base += "i=";
        let i;
        for (i in ingredients){
            if (i == 0){
                base += ingredients[i].toLowerCase().replace(/[^a-z\d ]+/i, '').replace(" ", "%20");
            } else {
                base += "%2C" + ingredients[i].toLowerCase();
            }
        }
    }
    return await( await fetch(base, defaultReq())).json();
}
  
