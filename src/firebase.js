import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import "firebase/compat/firestore";




const firebaseConfig = {
    apiKey: "AIzaSyDO8F-d4wfX5RljUXDxQXD61kS20NtsZjo",
    authDomain: "watsapp-clone-bb35d.firebaseapp.com",
    projectId: "watsapp-clone-bb35d",
    storageBucket: "watsapp-clone-bb35d.appspot.com",
    messagingSenderId: "507911474709",
    appId: "1:507911474709:web:4c67b21025267be1b6881c"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;
