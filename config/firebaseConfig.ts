import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAfyekMkH4IsK9q4LQvar5tEKb3SNujPZA",
  authDomain: "activitymonitoring-1925c.firebaseapp.com",
  projectId: "activitymonitoring-1925c",
  storageBucket: "activitymonitoring-1925c.appspot.com",
  messagingSenderId: "304430770503",
  appId: "1:304430770503:web:eb359093ee7b00ad814462",
  measurementId: "G-VVF1EYW05H",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
