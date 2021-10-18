document.addEventListener('DOMContentLoaded', init());

function init() {
  initEmployeeTable();
  console.log("test")
}

// hent alt udstyret
function initEmployeeTable(){
  console.log("test")
  fetch("http://localhost:8080/employee")
    .then(response => response.json())
    .then(result => renderEmployeeTable(result));
  console.log("test")
  ;
}

function renderEmployeeTable(result){
  console.log("test")
  let employeeContainer = document.querySelector(".employee_container");

  result.forEach(employee =>{
    var employeeObject = `<div class='d-flex mb-2 employee-item'
                          <div class='col-sm-2'>${employee.employee_id}</div>
                          <div class='col-sm-2'>${employee.employee_first_name}</div>
                          <div class='col-sm-2'>${employee.employee_last_name}</div>

                       </div>`;
    employeeContainer.insertAdjacentHTML("afterend", EmployeeItem);

    console.log("test")
  });
}


