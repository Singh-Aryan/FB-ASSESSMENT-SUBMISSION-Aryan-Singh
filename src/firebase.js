import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAhQiEuCA8SMOeJzJWS_T05UqBbn3mIzqc",
  authDomain: "richpanel-fb.firebaseapp.com",
  projectId: "richpanel-fb",
  storageBucket: "richpanel-fb.appspot.com",
  messagingSenderId: "946133449102",
  appId: "1:946133449102:web:42073e58c0ac4e07d08cdf"
  };
  
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
// const db = getFirestore(app);
const db = firebase.firestore();

const logInWithEmailAndPassword = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).then(function(){
    window.location.href= `${window.location.href}connect`;
    }).catch(function(error){
    var errorMsg=error.message;
    window.alert("Error : " +errorMsg)
    });
};
const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;

    const result = email.split('@')[0];
    await db.collection("users").doc(result).set({
      uid: user.uid,
      name,
      email,
    })
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
export {
  auth,
  db,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset
};