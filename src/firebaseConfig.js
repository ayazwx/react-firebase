import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAwLn_cO-twRI2KX41odn3WgQ6P3zQxwjk",
  authDomain: "react-upload-firebase.firebaseapp.com",
  projectId: "react-upload-firebase",
  storageBucket: "react-upload-firebase.appspot.com",
  messagingSenderId: "490664096668",
  appId: "1:490664096668:web:399e1c2c6cb4b8a750ce59",
};

firebase.initializeApp(firebaseConfig);
export const dataref = firebase.database();
export const storage = firebase.storage();
export default firebase;
