const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyCRXT3MLBUkSjHU5qiqd9K5n-EjQRjXuuQ",
  authDomain: "whatsapp-clone-c2986.firebaseapp.com",
  databaseURL: "https://whatsapp-clone-c2986.firebaseio.com",
  projectId: "whatsapp-clone-c2986",
  storageBucket: "whatsapp-clone-c2986.appspot.com",
  messagingSenderId: "685614672742",
  appId: "1:685614672742:web:63bc7ae0b6343a37b7f6a7",
};
const firebaseapp = firebase.initializeApp(firebaseConfig);
const db = firebaseapp.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
export { auth, provider };
export default db;
