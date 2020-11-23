export const submitLogin = async function(email, pass) {
    alert("INSIDE USER.JS");
    let data_string = JSON.stringify({
        email: email,
        pass: pass
    });

    let response = await $.ajax("http://localhost:3000" + "/verifyuser", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })
    if(response[0].name === 'NOT_FOUND') {
         $('#pMessage').html(UserMessage2);
    }
    else { 
        window.sessionStorage.setItem('name', response[0].name);
        window.location.href = "index.html";  
    }
}