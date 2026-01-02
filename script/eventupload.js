import { db, storage } from "./firebase.js"

import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {  ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";




const form = document.getElementById("eventForm");

//Function to upload Image to Cloudinary and get the url
async function uploadImageToCloudinary(file) {
    const formData = new FormData();

    formData.append("file", file);
    formData.append("upload_preset","NoticeHub Images");

    const response = await fetch(
        "https://api.cloudinary.com/v1_1/dvcyec3oo/image/upload",{
            method: "POST",
            body: formData
        }
    );

    if (!response.ok) {
        throw new Error("Image upload failed");
      }
    
      const data = await response.json();
      return data.secure_url;
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get the selected image file from the file input and validate that a file is chosen
    const fileInput = document.getElementById("photo");
    const file = fileInput.files[0];

    if(!file){
        alert("Please select an image");
        return;
    }

    const imageURL = await uploadImageToCloudinary(file);

    //Adding the data
    const eventData = {
        tilte: document.getElementById("title").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        venue: document.getElementById("venue").value,
        photo: imageURL,
        description: document.getElementById("description").value,
        registrationLink: document.getElementById("registrationLink").value,
        createdAt: new Date()
    };


    try {
        //saving Data into Firestore
        await addDoc(collection(db, "events"), eventData);
        alert("Event added successfully");
        form.reset();
        document.querySelector(".file-name").textContent = "No file chosen";
    } catch (err) {
        console.error(err);
        alert("Error adding event");
    }


})

//Changing NO file Chosen to file name
const fileInput = document.getElementById("photo");
const fileName = document.querySelector(".file-name");

fileInput.addEventListener("change", ()=>{
    fileName.textContent = fileInput.files.length
        ? fileInput.files[0].name
        : "No file chosen";
})