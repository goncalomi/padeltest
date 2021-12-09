// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import { getToken, onMessage } from "firebase/messaging";
import "firebase/compat/messaging"
import axios from "axios";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyATLQ3rcxaTNaQktzWXK6Wy8MEGHzfxVKQ",
  authDomain: "padelmatchs.firebaseapp.com",
  projectId: "padelmatchs",
  storageBucket: "padelmatchs.appspot.com",
  messagingSenderId: "714053644510",
  appId: "1:714053644510:web:9cc9be335636cd1cb8924f",
  measurementId: "G-CY9C5THGDJ"
};

// Initialize Firebase
export const app = firebase.initializeApp(firebaseConfig);
export const messaging = firebase.messaging();

export const getDeviceToken = (authToken) => {
    getToken(messaging, { vapidKey: 'BKHi4zZLuy8juDJbnOCxnuRu0O-bocLE033juUGAKZCRQjcjiigXvvnqu-PaNbsyin3Eq--2zNmYAb3M9FJAOX4' }).then((currentToken) => {
    if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...~
        const payload = {
            "registration_id": currentToken,
            "type": "web"
        }
        const headers = {
            Authorization : `Token ${authToken}`
        };

        axios.post('http://127.0.0.1:8000/api/v1/devices/', payload, {headers: headers})
        // Show permission request UI
        // ...
    } else {
        Notification.requestPermission()
    }
    }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // ...
    });
}

onMessage(messaging, (payload) => {
  console.log('Message received. ', payload);
  // ...
});

  