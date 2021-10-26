document.addEventListener('DOMContentLoaded', init());

function init() {
  navbar()
}

function navbar() {
  const nav = document.querySelector("#navbar");
  const navbar = `<div class="topnav">
                        <link rel="stylesheet" href="css/main.css">
                        <a class="whiteFlicker" href="homePage.html" class="">FORSIDE</a>
                        <a class="yellowFlicker" href="eventCalender.html">Events</a>
                        <a class="greenFlicker" href="CreateReservation.html">Lav reservation</a>
                        <a class="redFlicker" href="activity.html">Aktiviteter</a>
                        <a class="cyanFlicker" href="equipment.html">Udstyr</a>
                        <a class="purpleFlicker" href="Employee.html">Medarbejdere</a>
                        <a class="orangeFlicker" href="timeSlot.html">Tider</a>
                  </div>`;
  nav.insertAdjacentHTML("afterend", navbar);
}
