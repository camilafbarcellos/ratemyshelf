import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, GithubAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { getFirestore, query, getDocs, collection, where, addDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLGcbrBNd9tfRJy-YGKGGqSUPZEHnVGzM",
    authDomain: "lpe20241-ddd73.firebaseapp.com",
    projectId: "lpe20241-ddd73",
    storageBucket: "lpe20241-ddd73.appspot.com",
    messagingSenderId: "818501509281",
    appId: "1:818501509281:web:d439a68017351d8a4f10e0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);

// Google sign-in provider
const googleProvider = new GoogleAuthProvider();

// Github sign-in provider
const githubProvider = new GithubAuthProvider();

const signInWithGoogle = async () => {
    try {
        const res = await signInWithPopup(auth, googleProvider);
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "google",
                email: user.email,
            });
        }
    } catch (err) {
        console.error(err);
        alert(err.message);
    }
};

const signInWithGithub = async () => {
    try {
        const res = await signInWithPopup(auth, githubProvider);  
        const user = res.user;
        const q = query(collection(db, "users"), where("uid", "==", user.uid));
        const docs = await getDocs(q);
        if (docs.docs.length === 0) {
            await addDoc(collection(db, "users"), {
                uid: user.uid,
                name: user.displayName,
                authProvider: "github",
                email: user.email,
            });
        }
      } catch (err) {
        console.log(err);
        alert(err.message);
      }
};

const logout = () => {
    signOut(auth);
};

export {
    auth, db,
    signInWithGoogle, signInWithGithub,
    logout,
};