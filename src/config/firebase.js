import { initializeApp} from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyCOQu58gmCZhE9v5r2xarWVecx4BNDRorw",
    authDomain: "wordle-clone-54880.firebaseapp.com",
    projectId: "wordle-clone-54880",
    storageBucket: "wordle-clone-54880.appspot.com",
    messagingSenderId: "420910624417",
    appId: "1:420910624417:web:593d89ff958c40a1d40ae0",
    measurementId: "G-LHXFV7PR83"
  };


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app) 
export const googleProvider = new GoogleAuthProvider()