"use strict";

let $ = require("jquery");
let fbActions = require("./fb-functionality");
let fbConfig = require("./fb-config");
let firebase = require("firebase/app");

let userVar = null;
console.log('userVar', userVar);


// firebase.auth().onAuthStateChanged((firebaseUser, error, completed) => {
//     console.log('fb user', firebaseUser);   
//     if(firebaseUser) {
//     console.log("onAuthStateChanged - firebaseUser ", firebaseUser);  // Running this line twice? Second time showing 'null'...
//     console.log("onAuthStateChanged - firebaseUser.uid ", firebaseUser.uid);

//     userVar = firebaseUser.uid;
//         console.log("user logged in", userVar);
//         // console.log('completed',completed);
//     } else if(error) {
//         console.log("no user logged in", error);
    
//     } else if (completed){
//         console.log('completed',completed);
//     }
// });



// SIGN UP
$("#sign-up").on("click", function() {
    console.log("clicked sign up");
    let userInfo = {
        email : $("#email-input").val(),
        password : $("#password-input").val()
    };
    console.log('userInfo',userInfo);
    fbActions.createUser(userInfo);
});



// SIGN OUT
$("#sign-out").on("click", function() {
    console.log("is the logout happening??");
    fbActions.signOutUser();
});



//  LOGIN
$("#log-in").on("click", function() {
    console.log("log in");
    let userInfo = {
        email : $("#email-input").val(),
        password : $("#password-input").val()
    };

    fbActions.logInUser(userInfo)
        .then(function(data) {
            console.log('data',data);
            userVar = data.uid;
        })
        .catch(function(error){
            console.log('error',error);
        });

    console.log('userVar', userVar);
});



// SUBMIT
$("#submit-data").on("click", function() {
    console.log("data submitted");
    let newData = {
                    data : $("#data-input").val(),
                    uid : userVar};

    fbActions.sendUserDurationAndDate(newData)
        .then(function(FBKey){


            console.log(newData);
            
            // var user = firebase.auth().currentUser;
            console.log('firebase user on Data Submit: ', FBKey); // <--- 'user' is coming back null
            // console.log('firebase user uid on Data Submit: ', userVar); // <--- 'user.uid' is coming back null
            
            fbActions.retrieveCurrentData(userVar)
            .then(function(userObjects){
                console.log('retrieve FB user data: ',userObjects);
            })
            .catch(function(error){
                console.log('error in retrieveCurrentData: ',error);
            });
        })
        .catch(function(error){
            console.log(error);
        });
});


