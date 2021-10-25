document.addEventListener('DOMContentLoaded', init());
activityJson = [];
function init() {
  initActivityTable();
  console.log("test")
}

document.querySelector("#btnSearchEvents").addEventListener("click", async function (e) {
  let activity = document.querySelector("#sltActivity");
  // hent alt udstyret

  fetch("http://localhost:8080/findEventByActivityID/" + activity.value)
    .then(response => response.json())
    .then(result => renderEventTable(result));
  ;

})

function renderEventTable(result){
  if(document.querySelector(".event-item")) {
    let deleteDivs = document.querySelectorAll(".event-item")
    for (i = 0; i < deleteDivs.length; i++) {
      deleteDivs[i].remove();
    }
  }

  let eventContainer = document.querySelector(".eventsContainer");
  result.forEach(event =>{
    let activityName;
    for (i = 0; i < activityJson.length; i++) {
      if (activityJson[i].id == event.activityID) {
        activityName = activityJson[i].name;
      }
    }
    let date = new Date(event.date);
    let eventItem = `<div class="event-item d-flex form-check">
                            <div class="col-sm-3">
                                <input class="form-check-input" type="radio" name="ChooseEvent" required value="${event.eventID}">
                                ${activityName}
                            </div>
                            <p class="col-sm-3">${event.timeSlot}</p>
                            <p class="col-sm-3">${event.maxParticipants}</p>
                            <p class="col-sm-3">${date.getDate()}-${date.getMonth()}-${date.getFullYear()}</p>
                     </div>`;
    eventContainer.insertAdjacentHTML("afterend", eventItem);
  });
}

// create Reservation
document.querySelector("#frmCreateReservation").addEventListener("submit",function(e) {

  e.preventDefault();
  if(document.querySelector('input[name="ChooseEvent"]:checked')) {
    let eventID = document.querySelector('input[name="ChooseEvent"]:checked').value;
    document.querySelector('input[name="eventID"]').value = eventID;
    postReservationToBackend();
  } else {
    document.querySelector(".msg").innerHTML = "Husk at vælg et Event"
  }

})

async function postReservationToBackend () {
    const form = document.querySelector("#frmCreateReservation");
    const createReservationUrl = form.action;
    try {
      const formData = new FormData(form);
      const plainformdata = Object.fromEntries(formData.entries());
      const jsonString = JSON.stringify(plainformdata)

      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: jsonString
      }

      const response = await fetch(createReservationUrl, fetchOptions);
      if(!response.ok) {
        console.log('Det var satans >:(')
      }

    } catch (error) {
      alert(error)
      console.log(error)
    }
}





// get activies - Select
function initActivityTable(){
  fetch("http://localhost:8080/activity")
    .then(response => response.json())
    .then(result => renderAcitivtyTable(result));
}

function renderAcitivtyTable(result) {
  console.log(result)
  result.forEach(activity => {
    activityJson.push(activity);
    insertActivityToUI(activity);
  });
}

function insertActivityToUI(data) {
  let selectContainer = document.querySelector("#sltActivity");
  let activity_item = `<option value="${data.id}">${data.name}</option>`;
  selectContainer.insertAdjacentHTML("beforeend", activity_item);
}
