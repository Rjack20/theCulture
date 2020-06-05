import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/storage';
import 'firebase/database'


var app = firebase.initializeApp({
    apiKey: "AIzaSyCCF9XkdSMboaV4rGkarxLlJ6ydTFD1Q9c",
    authDomain: "the-app-af0f5.firebaseapp.com",
    databaseURL: "https://the-app-af0f5.firebaseio.com",
    projectId: "the-app-af0f5",
    storageBucket: "the-app-af0f5.appspot.com",
    messagingSenderId: "1025734886784",
    appId: "1:1025734886784:web:e8f3f4e19a2a8246b12d65",
    measurementId: "G-E6C87NG6N7"
  });

  export default app;