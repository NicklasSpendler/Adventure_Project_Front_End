document.addEventListener('DOMContentLoaded', init());

let dataTable = document.querySelector(".data__table");

let tableContent = dataTable.querySelector(".table__content");

function init() {
    initEventTable()
}

function initEventTable(){
    fetch("http://localhost:8080/event")
    .then(response => response.json())
    .then(result => {
        renderEventTable(result)
    });
}

function renderEventTable(eventData){
    eventData.forEach(eventEle => {
        insertEventToUI(eventEle);
    });
}

function insertEventToUI(eventData) {
    console.log(eventData);
    let tableItemNode = document.querySelector(".table__item_clonenode");

    let cloneNode = tableItemNode.cloneNode(true);

    cloneNode.classList.remove("hidden");

    let nodeId = cloneNode.querySelector(".item__id p");
    nodeId.textContent = eventData.eventID;

    let aktvitetsNavn = cloneNode.querySelector(".item__aktivitet");
    aktvitetsNavn.textContent = eventData.activity.name;

    let date = new Date(eventData.date);
    let nodeDate = cloneNode.querySelector(".item__date p");
    nodeDate.textContent = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    let nodeTime = cloneNode.querySelector(".item__time p");
    nodeTime.textContent = eventData.timeSlot;

    let nodeEmployee = cloneNode.querySelector(".item__employee p");
    nodeEmployee.textContent = eventData.employee.employee_first_name;

    let nodeParticipants = cloneNode.querySelector(".item__participants p");
    nodeParticipants.textContent = eventData.activity.participants;

    let nodeMaxParticipants = cloneNode.querySelector(".item__maxParticipants p");
    nodeMaxParticipants.textContent = eventData.maxParticipants;

    tableContent.appendChild(cloneNode);
}