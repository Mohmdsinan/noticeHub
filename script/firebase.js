// firebase.js
import { initializeApp } from
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

import { getFirestore } from
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import { getStorage } from
    "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

import { firebaseConfig } from "../.gitignore/firebaseConfig";


export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
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

    console.log(eventData);
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


document.getElementById("eventForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const fileInput = document.getElementById("photo");
    const file = fileInput.files[0];

    if (!file) {
        alert("Please select an image");
        return;
    }

    // Create unique file name
    const fileRef = ref(storage, `event-images/${Date.now()}-${file.name}`);

    // Upload file
    await uploadBytes(fileRef, file);

    // Get downloadable URL
    const imageURL = await getDownloadURL(fileRef);

});