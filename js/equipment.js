document.addEventListener('DOMContentLoaded', init());

function init() {
  initEquipmentTable();
}


function initEquipmentTable(){
  fetch("http://localhost:8080/equipment")
    .then(response => response.json())
    .then(result => renderEquipmentTable(result));

  ;
}

function renderEquipmentTable(result) {
  let equipmentContainer = document.querySelector(".equipment_container");

  result.forEach(equipment => {
    var equipmentItem = `<div class='d-flex mb-2 equipment-item'>
                            <div class='col-sm-2'>${equipment.id}</div>
                            <div class='col-sm-2'>${equipment.activity}</div>
                            <div class='col-sm-2'>${equipment.equipment_id}</div>
                            <div class="col-sm-2"> <a href="editEquipment.html/?equipment_id=${equipment.id}">Rediger</a></div>
                         </div>`;
    equipmentContainer.insertAdjacentHTML("afterend", equipmentItem);
  });
}

// create equipment
document.querySelector("#btnCreateequipment").addEventListener("click", async function (e){
  e.preventDefault();
  // ta' fat i formen fra html'en
  const form = document.querySelector("#frmCreateEquipment")
  const url = form.action;

  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(plainFormData);
    const fetchOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonString
    }
    const response = await fetch(url, fetchOptions);
    if (!response.ok) {
      console.log("det gik ikke godt");
    }

    insertEquipmentToUI(plainFormData);

  } catch (error) {
    alert(error.message);
    console.log(error);
  }
});



// create equipment into the UI
function insertEquipmentToUI(data) {
  console.log("create");
  console.log(data);
  let equipmentContainer = document.querySelector(".equipment_container");

  var equipmentItem = `<div class='d-flex mb-2 equipment-item'>
                          <div class='col-sm-2'></div>
                          <div class='col-sm-2'>${data.activity}</div>
                          <div class='col-sm-2'>${data.equipment_id}</div>
                       </div>`;
  equipmentContainer.insertAdjacentHTML("afterend", equipmentItem);
}



