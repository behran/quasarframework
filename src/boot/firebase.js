import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

var firebaseConfig = {
  apiKey: 'AIzaSyBw0POrAi2crrxB4gexuUo2P1zFekRI_os',
  authDomain: 'awesome-todo-1350d.firebaseapp.com',
  databaseURL: 'https://awesome-todo-1350d.firebaseio.com',
  projectId: 'awesome-todo-1350d',
  storageBucket: 'awesome-todo-1350d.appspot.com',
  messagingSenderId: '962544769326',
  appId: '1:962544769326:web:2ac2046fd764e960d982bf',
  measurementId: 'G-MY91M5MZ77'
}
// Initialize Firebase
let firebaseApp = firebase.initializeApp(firebaseConfig)
let firebaseAuth = firebaseApp.auth()
let firebaseDb = firebaseApp.database()

export { firebaseAuth, firebaseDb }
