document.addEventListener('DOMContentLoaded', init());

function init() {
  initActivityTable();
  console.log("test")
}

document.querySelector("#btnSearchEvents").addEventListener("click", async function (e) {
  console.log("søg efter events")
  let activity = document.querySelector("#sltActivity");



})

/*
document.querySelector("#frmCreateReservation").addEventListener("submit", async function (e) {
  e.preventDefault();

  const form = document.querySelector("#frmCreateReservation");
  const createReservationUrl = form.action;

  try {
    const formData = new formData(form);
    const plainformdata = Object.fromEntries(formData.entries);
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
})

 */

// get activies - Select
function initActivityTable(){
  fetch("http://localhost:8080/activity")
    .then(response => response.json())
    .then(result => renderAcitivtyTable(result));
}

function renderAcitivtyTable(result) {
  console.log(result)
  result.forEach(activity => {
    insertActivityToUI(activity);
  });
}

function insertActivityToUI(data) {
  let selectContainer = document.querySelector("#sltActivity");
  let activity_item = `<option value="${data.name}">${data.name}</option>`;
  selectContainer.insertAdjacentHTML("beforeend", activity_item);
}
