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
    let dataTable = document.querySelector(".data__table");

    let tableItemNode = document.querySelector(".table__item_clonenode");
    

    result.forEach(activity => {
        let cloneNode = tableItemNode.cloneNode(true);

        cloneNode.classList.remove("hidden");

        let nodeID = cloneNode.querySelector(".item__id p")
        nodeID.textContent = activity.activityID;
    
        let nodeName = cloneNode.querySelector(".item__name p")
        nodeName.textContent = activity.name;
    
        let nodeprice = cloneNode.querySelector(".item__price p")
        nodeprice.textContent = activity.price;
    
        let nodemin_age = cloneNode.querySelector(".item__min_age p")
        nodemin_age.textContent = activity.min_age;
    
        let nodemin_height = cloneNode.querySelector(".item__min_height p")
        nodemin_height.textContent = activity.min_height;
    
        let nodemax_participants = cloneNode.querySelector(".item__max_participants p")
        nodemax_participants.textContent = activity.participants;
        
        

        dataTable.appendChild(cloneNode);
    });



}