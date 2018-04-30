"use strict";

let firebase = require("firebase/app");

require("firebase/auth");
require("firebase/database");

var config = {    
    apiKey: "AIzaSyALZpK2lBnXrmJ0dIUgGezpHmNtsnDOAnw",
    authDomain: "fir-tester-e631a.firebaseapp.com",
    databaseURL: "https://fir-tester-e631a.firebaseio.com"
};

firebase.initializeApp(config);
let database = firebase.database();


firebase.getFBsettings = () => {
    console.log('config',config);
	return config;
};

module.exports = firebase;