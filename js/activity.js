let addFormElem = document.querySelector(".addForm");

let searchInputElem = document.querySelector(".search__input");

let dataTable = document.querySelector(".data__table");

let data;

let tableContent = dataTable.querySelector(".table__content");

document.addEventListener('DOMContentLoaded', init());



function init() {
    initActivityTable();
}

function initActivityTable(){
    fetch("http://localhost:8080/activity")
        .then(response => response.json())
        .then(result => {
            renderAcitivtyTable(result)
            data = result;
        });
}


function renderAcitivtyTable(result) {
    data = result;
    result.forEach(activity => {
        insertActivityToUI(activity);
    });
}

function insertActivityToUI(data){
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

    console.log(data);

    let nodeEditBtn = cloneNode.querySelector(".controlPanel__edit");
    nodeEditBtn.href = `editActivity.html/?activity_id=${data.activityID}`;
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

    tableContent.appendChild(cloneNode);
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
    }

})

let searchTerm;
let searchResult;

searchInputElem.addEventListener("input", (e)=> {
    tableContent.innerHTML = "";
    searchTerm = searchInputElem.value.toLowerCase();

    if (searchInputElem.value != "") {
        searchResult = data.filter((element) => {
            console.log(searchTerm);
            if(element.name.toLowerCase().includes(searchTerm) ||
            element.price.toString().includes(searchTerm) ||
            element.participants.toString().includes(searchTerm) ||
            element.min_age.toString().includes(searchTerm) ||
            element.min_height.toString().includes(searchTerm)) {
                return element
            }
        })

        searchResult.forEach(result => {
            insertActivityToUI(result)
        })


    } else {
        data.forEach(result => {
            insertActivityToUI(result);
        })
    }
})
