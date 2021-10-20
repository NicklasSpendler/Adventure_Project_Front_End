init();

console.log('test');


function init() {
    fetchData();
}

function getActivityID() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const employee_id = urlParams.get('activity_id')
    return employee_id;
  }

function fetchData() {
    fetch(`http://localhost:8080/activity/${getActivityID()}`)
    .then(response => response.json())
    .then(result => console.log(result));
}