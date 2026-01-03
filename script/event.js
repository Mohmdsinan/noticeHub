import { db } from "./firebase.js";
import { collection, onSnapshot, query, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const upcomingContainer = document.getElementById("upcomingEvents");
const recentContainer = document.getElementById("recentEvents")

const today = new Date();
today.setHours(0, 0, 0, 0);

onSnapshot(collection(db, "events"), (snapshot) => {
  recentContainer.innerHTML = "";
  upcomingContainer.innerHTML = "";

  snapshot.forEach((doc) => {
    const event = doc.data();
    const eventDate = new Date(event.date);
    eventDate.setHours(0, 0, 0, 0);

    const card = `
     <div class="event-cart">
        <div class="event-img-wrapper">
          <img src="${event.photo}" class="event-img">
        </div>
         <div class="event-details">
            <p class="event-title">${event.title}</p>
          </div>
      </div>
    `
    if (eventDate < today){
      recentContainer.innerHTML += card;
    } else {
      upcomingContainer.innerHTML += card;
    }
  });
});

