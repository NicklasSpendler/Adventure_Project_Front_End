document.addEventListener('DOMContentLoaded', init());

function init() {
  initEmployeeTable();
}

// hent alt udstyret
function initEmployeeTable(){
  fetch("http://localhost:8080/employee")
    .then(response => response.json())
    .then(result => renderEmployeeTable(result));
  ;
}

function renderEmployeeTable(result){
  let employeeContainer = document.querySelector(".employee_container");
  result.forEach(employee =>{
    let employeeObject = `<div class='d-flex mb-2 employee-item'>
                            <div class='col-sm-2'>${employee.employee_id}</div>
                            <div class='col-sm-2'>${employee.employee_first_name}</div>
                            <div class='col-sm-2'>${employee.employee_last_name}</div>
                            <div class="col-sm-2"> <a href="editEmployee.html/?employee_id=${employee.employee_id}">Rediger</a></div>
                            <div class="col-sm-2 btnDeleteEmployee" data-id="${employee.employee_id}">Slet</div>
                          </div>`;
    employeeContainer.insertAdjacentHTML("afterend", employeeObject);
    employeeDelete();
  });

}

// create
document.querySelector("#frmCreateEmployee").addEventListener("submit", async function (e) {
  e.preventDefault();
  const form = document.querySelector("#frmCreateEmployee");
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
    const response = await fetch(url, fetchOptions)

    if(!response) {
      console.log("Det var sgu ikke godt")
    }

    insertEmployeeToUI(plainFormData)


  } catch (error) {
    alert(error)
    console.log(error)
  }
})

function insertEmployeeToUI(data) {
  let employeeContainer = document.querySelector(".employee_container");

  var employeeItem = `<div class='d-flex mb-2 employee-item'>
                          <div class='col-sm-2'></div>
                          <div class='col-sm-2'>${data.employee_first_name}</div>
                          <div class='col-sm-2'>${data.employee_last_name}</div>
                       </div>`;
  employeeContainer.insertAdjacentHTML("afterend", employeeItem);

}

// Delete
function employeeDelete() {
  document.querySelector(".btnDeleteEmployee").addEventListener("click", async function () {
    const id = this.getAttribute("data-id")

    const url = "http://localhost:8080/employee/" + id;

    const fetchOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: ""
    }

    const response = await fetch(url, fetchOptions)

    if (!response.ok) {
      console.log("Det gik ikke godt")
    }
    if (response.ok) {
      let employeeDiv = this.parentNode;
      employeeDiv.remove();
    }
  })
}


