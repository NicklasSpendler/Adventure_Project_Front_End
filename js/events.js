document.addEventListener('DOMContentLoaded', init());

let createEventBtnElem = document.querySelector("#btnCreateEvent");

let activityJson = [];

function init() {
  initActivityTable();
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
  document.querySelector("#maxParticipants").value = activityJson[0].participants
}

function insertActivityToUI(data) {
  let selectContainer = document.querySelector("#sltActivity");
  let activity_item = `<option value="${data.id}">${data.name}</option>`;
  selectContainer.insertAdjacentHTML("beforeend", activity_item);
}

document.querySelector("#sltActivity").addEventListener("change", function () {
  console.log("ændring")
  console.log(activityJson)
  let activityInput = document.querySelector("#sltActivity").value;
  console.log(activityInput)
  for (i = 0; i < activityJson.length; i++) {
    if (activityInput == activityJson[i].name) {
      console.log("ændre antal deltagere")
      document.querySelector("#maxParticipants").value = activityJson[i].participants
    }
  }
})

document.querySelector("#btnSearchTimeSlot").addEventListener("click", function () {
    let activity = document.querySelector("#sltActivity");
    // hent alt udstyret
    console.log(activity.value);

    fetch("http://localhost:8080/findTimeSlotByActivityID/" + activity.value)
      .then(response => response.json())
      .then(result => renderTimeSlotTable(result));
  
})

function renderTimeSlotTable(result){
  if(document.querySelector(".timeSlot-item")) {
    let deleteDivs = document.querySelectorAll(".timeSlot-item")
    for (i = 0; i < deleteDivs.length; i++) {
      deleteDivs[i].remove();
    }
  }


  let timeSlotContainer = document.querySelector("#sltTimeSlot");
  result.forEach(data =>{
    //console.log(data);
    let timeSlot_item = `<option class="timeSlot-item" data-id="${data.timeSlotID}" value="${data.timeSlot}">${data.timeSlot}</option>`;
    timeSlotContainer.insertAdjacentHTML("afterbegin", timeSlot_item);
  });
}

createEventBtnElem.addEventListener("click", async (e)=> {
  e.preventDefault();
  


  try {


    const form = document.querySelector("#frmCreateEvent")
    const url = form.action;
  
    let eventObject = {};
  
    eventObject.date = form.date.value;
    eventObject.event_activity = form.activityID.value;
    eventObject.time_slot = form.timeSlot.value;
    eventObject.max_participants = form.maxParticipants.value;

    eventObjectString = JSON.stringify(eventObject);

    console.log(eventObjectString);

  /*
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: eventObjectString
    }
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      console.log("det gik ikke godt");
    }
*/
  } catch (error) {
    alert(error.message);
    console.log(error);
  }

})
