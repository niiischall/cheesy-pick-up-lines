import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "@firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pickuplines-art.firebaseapp.com",
  projectId: "pickuplines-art",
  storageBucket: "pickuplines-art.appspot.com",
  messagingSenderId: "1054197274005",
  appId: "1:1054197274005:web:c8f990a285cc1d74f9129c",
  measurementId: "G-FT3F03LQTN",
};
const app = initializeApp(firebaseConfig);
getAnalytics(app);

export const googleAuthHelper = () => {
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      if (credential) {
        const token = credential.accessToken;
        const user = result.user;
        console.log(token);
        console.log(user);
      }
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.email;
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(error);
      console.log(errorCode);
      console.log(errorMessage);
      console.log(email);
      console.log(credential);
    });
};
