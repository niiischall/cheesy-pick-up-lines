import { initializeApp } from "@firebase/app";
import { getAnalytics } from "@firebase/analytics";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA8fW3MZDJ5l-2UwuUtcNra1fdZruKEcAg",
  authDomain: "pickuplines-art.firebaseapp.com",
  databaseURL: "https://pickuplines-art-default-rtdb.firebaseio.com",
  projectId: "pickuplines-art",
  storageBucket: "pickuplines-art.appspot.com",
  messagingSenderId: "1054197274005",
  appId: "1:1054197274005:web:c8f990a285cc1d74f9129c",
  measurementId: "G-FT3F03LQTN"
};

const app = initializeApp(firebaseConfig);
getAnalytics(app);

export default getFirestore();