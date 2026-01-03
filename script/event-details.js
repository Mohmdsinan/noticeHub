import { db } from "./firebase.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const eventId = params.get("id");

const container = document.getElementById("eventDetails");

if (!eventId) {
  container.innerHTML = "Event not found";
} else {
  const docRef = doc(db, "events", eventId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    const event = docSnap.data();

    container.innerHTML = `
      <h2>${event.title}</h2>
      <img src="${event.photo}" width="300" />
      <p><strong>Date:</strong> ${event.date}</p>
      <p><strong>Time:</strong> ${event.time}</p>
      <p><strong>Venue:</strong> ${event.venue}</p>
      <p>${event.description}</p>

      ${
        event.registrationLink
          ? `<a href="${event.registrationLink}" target="_blank">Register</a>`
          : ""
      }
    `;
  } else {
    container.innerHTML = "Event not found";
  }
}