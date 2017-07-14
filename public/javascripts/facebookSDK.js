    
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1194870907285655',
      cookie     : true,
      xfbml      : true,
      version    : 'v2.8'
    });
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function statusChangeCallback(response) {
    if (response.status === "connected") {
        console.log('Logged in');
        console.log(response.authResponse);
        FB.api('/me', {fields: 'id,name'}, function(userInfo) {
            console.log('Successful login for: ' + userInfo.name);
            //res contains id, name
            console.log(userInfo);
            if (window.location.pathname === "/login") {
                window.location.href = "todolist/user?id=" + userInfo.id;   
            }
        });
    } else {
        console.log("Not authenticated");
        }
    }

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}   

