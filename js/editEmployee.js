document.addEventListener('DOMContentLoaded', init());

function getEmployeeId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const employee_id = urlParams.get('employee_id')
  return employee_id;
}

function init() {
  console.log("Edit employee")
  let employee_id = getEmployeeId();
  initSingleEmployee(employee_id);
}

function initSingleEmployee(id){
  fetch("http://localhost:8080/employee/"+ id)
    .then(response => response.json())
    .then(result => renderSingleEmployeeTable(result));
  ;
}

function renderSingleEmployeeTable(data) {
  let employeeContainer = document.querySelector(".singleEmployee_container");

  var employeeItem = `   <label class="mb-1">Fornavn</label>
                          <input name="employee_first_name" class='mb-2' value="${data.employee_first_name}">
                          <label class="mb-1">Efternavn</label>
                          <input name="employee_last_name" class='mb-2' value="${data.employee_last_name}">`;
  employeeContainer.insertAdjacentHTML("afterbegin", employeeItem);
}

document.querySelector("#btnUpdateEmployee").addEventListener("click", async function (e) {
  e.preventDefault();
  const form = document.querySelector("#frmEditEmployee");
  const employee_id = getEmployeeId();
  const urlEditEmployee = "http://localhost:8080/employee/"+employee_id;

  try {
    const formdata = new FormData(form)
    const plainFormData = Object.fromEntries(formdata.entries());
    const jsonString = JSON.stringify(plainFormData)

    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonString
    }

    const response = await fetch(urlEditEmployee, fetchOptions)

    if(!response.ok) {
      console.log("Det gik ikke så godt")
    } else {
      document.querySelector(".msg").innerHTML = "Medarbejder er opdateret. Du vil blive ledt tilbage til den forrige side om 3 sek."
      setTimeout(function () {
        location.href = "/Adventure_Project_Front_End/employee.html";
      }, 3000)
    }

  } catch (error) {
    alert(error)
    console.log(error)
  }
})


