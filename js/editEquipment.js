document.addEventListener('DOMContentLoaded', init());

function init() {
  console.log("Edit equipment")
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const equipment_id = urlParams.get('equipment_id')
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
  console.log(data);

  var equipmentItem = `<form class='d-flex mb-2 singleEquipment-item'>
                          <input class='col-sm-2' value="${data.id}">
                          <input class='col-sm-2' value="${data.activity}">
                          <input class='col-sm-2' value="${data.equipment_id}">
                       </form>`;
  equipmentContainer.insertAdjacentHTML("afterend", equipmentItem);

}


