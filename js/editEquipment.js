document.addEventListener('DOMContentLoaded', init());

function getEquipemntId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const equipment_id = urlParams.get('equipment_id')
  return equipment_id;
}

function init() {
  console.log("Edit equipment")
  let equipment_id = getEquipemntId();
  initSingleEquipmentTable(equipment_id);
}


function initSingleEquipmentTable(id){
  fetch("http://localhost:8080/equipment/"+ id)
    .then(response => response.json())
    .then(result => renderSingleEquipmentTable(result));
  ;
}

function renderSingleEquipmentTable(data) {
  let equipmentContainer = document.querySelector(".singleEquipment_container");

  var equipmentItem = `   <label class="mb-1">Aktivitet</label>
                          <input name="activity" class='mb-2' value="${data.activity}">
                          <label class="mb-1">Udstyr ID</label>
                          <input name="equipment_id" class='mb-2' value="${data.equipment_id}">`;
  equipmentContainer.insertAdjacentHTML("afterbegin", equipmentItem);
}

document.querySelector("#btnUpdateEquipment").addEventListener("click", async function (e) {
  e.preventDefault()
  // ta' fat i formen fra html'en
  const form = document.querySelector("#frmEditEquipment")
  const equipment_id = getEquipemntId();
  const urlEditEquipment = "http://localhost:8080/equipment/"+equipment_id;

  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonString
    }
    const response = await fetch(urlEditEquipment, fetchOptions);
    if (!response.ok) {
      console.log("det gik ikke godt");
    } else {
      console.log("det gik godt")
      document.querySelector(".msg").innerHTML = "Udstyr er opdateret. Du vil blive ledt tilbage til den forrige side om 3 sek."
      setTimeout(function () {
        location.href = "../equipment.html";
      }, 3000)
    }

  } catch (error) {
    alert(error.message);
    console.log(error);
  }
})



