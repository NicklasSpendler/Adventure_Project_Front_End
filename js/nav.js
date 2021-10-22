document.addEventListener('DOMContentLoaded', init());
function init() {
  navbar()
}

function navbar() {
  const nav = document.querySelector("#navbar");
  const navbar = `<div class="topnav">
                        <link rel="stylesheet" href="css/main.css">
                        <a href="/404.html" class="">FORSIDE</a>
                        <a href="index.html">Events</a>
                        <a href="CreateReservation.html">Lav reservation</a>
                        <a href="activity.html">Aktiviteter</a>
                        <a href="equipment.html">Udstyr</a>
                        <a href="Employee.html">Medarbejdere</a>
                  </div>`;
  nav.insertAdjacentHTML("afterend", navbar);
}
