"use strict"

$(document).ready(function() {
    
    //when logout button clicked, redirect user back to login page
    $(".logoutButton").on("click", function() {
        FB.logout(function(response) {
            window.location.href = '/login';
        });
    });
    
});