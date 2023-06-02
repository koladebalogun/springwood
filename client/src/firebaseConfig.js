import { initializeApp } from "firebase/app";
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyByA83NbgMFfAYpXqmhZWjk_IRTPnP6Auo",
  authDomain: "drawing-canvas-4159f.firebaseapp.com",
  projectId: "drawing-canvas-4159f",
  storageBucket: "drawing-canvas-4159f.appspot.com",
  messagingSenderId: "424927473458",
  appId: "1:424927473458:web:762d2f7cb78e824ff9712b",
  measurementId: "G-4NGS1ZG1WP",
};

// firebase.initializeApp(firebaseConfig);

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    // Persistence successfully enabled
  })
  .catch((error) => {
    console.error("Error enabling persistence:", error);
  });
