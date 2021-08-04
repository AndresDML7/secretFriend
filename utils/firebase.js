import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBih6CI2-2wVFAakERulSIniV4ADOWRb20",
    authDomain: "secretfriend-becf1.firebaseapp.com",
    projectId: "secretfriend-becf1",
    storageBucket: "secretfriend-becf1.appspot.com",
    messagingSenderId: "607151626592",
    appId: "1:607151626592:web:871213aac00846dbbb2605"
  }
  
export const firebaseApp = firebase.initializeApp(firebaseConfig);