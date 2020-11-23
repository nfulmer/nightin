$(function() {
    $('form').on("click",profile());
});

function profile(){
    let logginname = window.sessionStorage.getItem('name');
    getProfile(logginname);
}

export const getProfile = async function(logginname) {
    let data_string = JSON.stringify({
        email: logginname
    });

    let response = await $.ajax(appconfig.baseurl + "/getuserprofile", {
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        json: true,
        data: data_string
    })
    if(response[0].name === 'NOT_FOUND') {
         $('#pMessage').html(messages.LoginMessage2);
    }
    else { 

    }
}
