import { auth, db } from "./firebase.js";
import {
    signInWithEmailAndPassword,
    signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
    collection,
    query,
    where,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const loginForm = document.getElementById("loginForm");
const errorText = document.getElementById("errorText");

loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorText.textContent = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    try {
        // 1️⃣ Firebase verifies email + password
        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        const userEmail = userCredential.user.email;

        const qry = query(
            collection(db, "allowedUsers"),
            where("email", "==", userEmail)
        );


        const snapshot = await getDocs(qry);


        if (snapshot.empty) {
            await signOut(auth);
            errorText.textContent = "You are not authorized to access this system.";
            return;
        }

        const userData = snapshot.docs[0].data();
        console.log("Role:", userData.role);
        window.location.href = "eventupload.html";
         
    } catch (error) {
        errorText.textContent = "Invalid email or password.";
        console.error(error);
        
}
});