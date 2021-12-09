// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
//eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
//eslint-disable-next-line
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyATLQ3rcxaTNaQktzWXK6Wy8MEGHzfxVKQ",
    authDomain: "padelmatchs.firebaseapp.com",
    projectId: "padelmatchs",
    storageBucket: "padelmatchs.appspot.com",
    messagingSenderId: "714053644510",
    appId: "1:714053644510:web:9cc9be335636cd1cb8924f",
    measurementId: "G-CY9C5THGDJ"
};
  
// eslint-disable-next-line no-undef
const app = firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

// onBackgroundMessage(messaging, (payload) => {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };

//   //eslint-disable-next-line
//   self.registration.showNotification(notificationTitle,
//     notificationOptions);
// });

