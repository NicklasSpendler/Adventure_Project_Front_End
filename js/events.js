document.addEventListener('DOMContentLoaded', init());

let createEventBtnElem = document.querySelector("#btnCreateEvent");

let activityJson = [];

function init() {
  initActivityTable();
  initWorkerTable();
}


function initWorkerTable() {
  fetch("http://localhost:8080//employee")
    .then(response => response.json())
    .then(result => renderEmployeeDropdown(result))
}

function renderEmployeeDropdown(employeeData) {
  employeeData.forEach(employee => {
    insertEmployeeToUI(employee)
  })
}

function insertEmployeeToUI(employee){
  let selectContainer = document.querySelector("#sltEmployee");
  let employee_item = `<option value="${employee.employee_id}">${employee.employee_first_name}</option>`;
  selectContainer.insertAdjacentHTML("beforeend", employee_item);
}

// get activies - Select
function initActivityTable(){
  fetch("http://localhost:8080/activity")
    .then(response => response.json())
    .then(result => renderAcitivtyTable(result));
}

function renderAcitivtyTable(result) {
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
  let activityInput = document.querySelector("#sltActivity").value;
  for (i = 0; i < activityJson.length; i++) {
    if (activityInput == activityJson[i].name) {
      document.querySelector("#maxParticipants").value = activityJson[i].participants
    }
  }
})

document.querySelector("#btnSearchTimeSlot").addEventListener("click", function () {
    let activity = document.querySelector("#sltActivity");
    // hent alt udstyret

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
    eventObject.activityID = form.activityID.value;
    eventObject.timeSlot = form.timeSlot.value;
    eventObject.maxParticipants = form.maxParticipants.value;
    eventObject.employeeID = form.employeeID.value;

    eventObjectString = JSON.stringify(eventObject);

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
    

  } catch (error) {
    alert(error.message);
    console.log(error);
  }

})
