let addFormElem = document.querySelector(".addForm");

document.addEventListener('DOMContentLoaded', init());

function init() {
    initActivityTable();
}


function initActivityTable(){
    fetch("http://localhost:8080/activity")
        .then(response => response.json())
        .then(result => renderAcitivtyTable(result));

        ;
}

function renderAcitivtyTable(result) {
    result.forEach(activity => {
        insertActivityToUI(activity);
    });
}

function insertActivityToUI(data){
    let dataTable = document.querySelector(".data__table");
    let tableItemNode = document.querySelector(".table__item_clonenode");

    let cloneNode = tableItemNode.cloneNode(true);

    cloneNode.classList.remove("hidden");

    let nodeID = cloneNode.querySelector(".item__id p")
    nodeID.textContent = data.activityID;

    let nodeName = cloneNode.querySelector(".item__name p")
    nodeName.textContent = data.name;

    let nodeprice = cloneNode.querySelector(".item__price p")
    nodeprice.textContent = data.price;

    let nodemin_age = cloneNode.querySelector(".item__min_age p")
    nodemin_age.textContent = data.min_age;

    let nodemin_height = cloneNode.querySelector(".item__min_height p")
    nodemin_height.textContent = data.min_height;

    let nodemax_participants = cloneNode.querySelector(".item__participants p")
    nodemax_participants.textContent = data.participants;

    let nodeEditBtn = cloneNode.querySelector(".controlPanel__edit");
    nodeEditBtn.dataset.id = data.activityID;

    let nodeDeleteBtn = cloneNode.querySelector(".controlPanel__delete");
    nodeDeleteBtn.dataset.id = data.activityID;



    nodeDeleteBtn.addEventListener("click", async function(e){
        const id = this.dataset.id;

        const url = "http://localhost:8080/activity/" + id;

        const fetchOptions = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          },
          body: ""
        }

        const response = await fetch(url, fetchOptions);

        if (!response.ok) {
          console.log("det gik ikke godt");
        }
        if (response.ok) {
          let equipmentDiv = this.parentNode.parentNode;
          equipmentDiv.remove();
        }
    });





    dataTable.appendChild(cloneNode);
}

addFormElem.addEventListener("submit", async function(e) {
    e.preventDefault();

    form = addFormElem;
    const url = addFormElem.action;

    try {
        const formData = new FormData(form);
        const plainFormData = Object.fromEntries(formData.entries());
        const jsonString = JSON.stringify(plainFormData);
        console.log(jsonString)
        const fetchOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonString
        }
        const response = await fetch(url, fetchOptions);
        if(!response.ok) {
            console.log('Det var satans >:(')
        }

        insertActivityToUI(plainFormData);

    } catch (error) {
        alert(error.message);
        console.log(error)
    }

})
