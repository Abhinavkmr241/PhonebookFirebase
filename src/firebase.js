import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyA1t2GyDOPizjF37YpOZWCLHsaV0bIDYi8",
    authDomain: "phonebook-crud-e8404.firebaseapp.com",
    databaseURL: "https://phonebook-crud-e8404.firebaseio.com",
    projectId: "phonebook-crud-e8404",
    storageBucket: "phonebook-crud-e8404.appspot.com",
    messagingSenderId: "373295734015",
    appId: "1:373295734015:web:d79ef086f7f46f33c100ca"
    };
  // Initialize Firebase
  var fireDb = firebase.initializeApp(firebaseConfig);

  export default fireDb.database().ref();