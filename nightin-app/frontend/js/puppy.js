<<<<<<< HEAD
=======


>>>>>>> ede18cbf9755a268ae67ee68d46a5e1aa9210e22
export async function makeRequest(url){
    let result;
  
    const res = await fetch(url, {
      "method": "GET",
      "headers": {
          "x-rapidapi-host": "recipe-puppy.p.rapidapi.com",
          "x-rapidapi-key": "d02ad0adf9msh642490ab5e606bfp156cc1jsn12ec2adcd63d"
      }
<<<<<<< HEAD
}).then(response => {
      //alert(response.status);
      result = response.text();
    });
    return result;
=======
  }).then(response => {
      //alert(response.status);
      result = response.text();
     });
     return result;
>>>>>>> ede18cbf9755a268ae67ee68d46a5e1aa9210e22
     //.then(function(data){
    //   let stuff = document.createElement("p");
    //   stuff.textContent = data;
    //   document.getElementById("generate_content").append(stuff);
    // });
<<<<<<< HEAD
};
=======
  };
>>>>>>> ede18cbf9755a268ae67ee68d46a5e1aa9210e22
