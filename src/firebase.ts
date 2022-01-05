import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCAqa3khm5CIZHVZOmCTRFTol1HD2N265I",
  authDomain: "music-app-43af4.firebaseapp.com",
  projectId: "music-app-43af4",
  storageBucket: "music-app-43af4.appspot.com",
  messagingSenderId: "305322615412",
  appId: "1:305322615412:web:99abb56a6c0c1b427e6721",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
