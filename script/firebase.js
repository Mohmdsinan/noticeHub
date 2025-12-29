// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyB1C2NneOhDhCbKAEFl1mx8y9ttBfCM7Vo",
    authDomain: "noticehub-e49e5.firebaseapp.com",
    projectId: "noticehub-e49e5",
    storageBucket: "noticehub-e49e5.firebasestorage.app",
    messagingSenderId: "357112458996",
    appId: "1:357112458996:web:8196851787f6c85c1bf8a1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)


const form = document.getElementById("eventForm")

form.addEventListener("submit", async (e) => {
    e.preventDefault()

    const eventData = {
        title: document.getElementById("title").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        venue: document.getElementById("venue").value,
        photo: document.getElementById("photo").value,
        description: document.getElementById("description").value,
        registrationLink: document.getElementById("registrationLink").value,
        createdAt: new Date()
    };

    try {
        await addDoc(collection(db, "events"), eventData);
        alert("Event sent successfully");
        form.reset();
        document.querySelector(".file-name").textContent = "No file chosen";
    } catch (error) {
        console.error(error);
        alert("Error submitting event");
    }
});


//changing NO file Chosen to file name
const fileInput = document.getElementById("photo");
const fileName = document.querySelector(".file-name");

fileInput.addEventListener("change", () => {
    fileName.textContent = fileInput.files.length
        ? fileInput.files[0].name
        : "No file chosen";
});
