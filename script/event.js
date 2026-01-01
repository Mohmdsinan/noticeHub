// event.js
import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


/* 🔹 Firebase Config */
const firebaseConfig = {
  apiKey: "AIzaSyB1C2NneOhDhCbKAEFl1mx8y9ttBfCM7Vo",
  authDomain: "noticehub-e49e5.firebaseapp.com",
  projectId: "noticehub-e49e5",
};


const eventsGrid = document.getElementById("eventsGrid");

/* 🔹 Fetch & Render Events */
async function loadEvents() {
  eventsGrid.innerHTML = "";

  const q = query(collection(db, "events"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);

  snapshot.forEach(doc => {
    const e = doc.data();
    console.log(e);
    
    eventsGrid.innerHTML += `
      <div class="event-card">
        ${e.photo ? `<img src="${e.photo}" alt="Event poster">` : ""}

        <p class="event-description">${e.description}</p>
        <p class="event-date">${e.date}</p>
        <p class="event-time">${e.time}</p>
        <p class="event-venue">${e.venue}</p>

        ${
          e.registrationLink
            ? `<a href="${e.registrationLink}" target="_blank" class="register-btn">Register</a>`
            : ""
        }
      </div>
    `;
  });
}

loadEvents();
