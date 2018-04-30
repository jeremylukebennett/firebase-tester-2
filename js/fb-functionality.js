"use strict";

let firebase = require("firebase/app");
let $ = require("jquery");
let fbConfig = require("./fb-config");



function createUser(userObj) {
    return firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
       .catch(function (error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          console.log("error:", errorCode, errorMessage);
       });
 }
 


function logInUser({ email, password }) {
    console.log("calling loginUser");

    return new Promise((resolve, reject) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
            .then(function (data) {
                console.log("promise.then", data);
                resolve(data);
            })
            .catch(function (error) {
                let errorCode = error.code;
                let errorMessage = error.message;
                console.log("error:", errorCode, errorMessage);
                reject(error);
            });
    });
}


function signOutUser() {
    console.log("sign out");
    firebase.auth().signOut();
}


function sendUserDurationAndDate(value) {
    return $.ajax({
        url: `${fbConfig.getFBsettings().databaseURL}/myData.json`, // "user" can be anything even if it hasn't be added in firebase yet
        type: 'POST',
        data: JSON.stringify(value),
        dataType: 'json'
    }).done((valueID) => {
        return valueID;
    });
}


function retrieveCurrentData(user){
    console.log("This is the user that's being passed: ", user);
    return $.ajax({
        url: `${fbConfig.getFBsettings().databaseURL}//myData.json?orderBy="uid"&equalTo="${user}"`
     }).done((resolve) => {
       console.log("from retrieve user progress function. This should index through the collections and give: ", resolve);
      //  Call function here to display data on screen and pass the 'resolve' inside

      let domDataBox = document.getElementById('yourData');
      domDataBox.innerHTML = ``;

      for (let key in resolve) {
          domDataBox.innerHTML += `• ${resolve[key].data} <br>`;
        }
        // return resolve; //Where is this returning to?

     }).fail((error) => {
       console.log("there was an error");
        return error;
     });
  }


module.exports = {createUser, logInUser, signOutUser, sendUserDurationAndDate, retrieveCurrentData};