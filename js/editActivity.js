init();

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
    .then(result => setData(result));
}

function setData(data){
    console.log(data);

    let editForm__nameElem = document.querySelector(".editForm__name");
    let editForm__priceElem = document.querySelector(".editForm__price");
    let editForm__ageElem = document.querySelector(".editForm__age");
    let editForm__heightElem = document.querySelector(".editForm__height");
    let editForm__participantsElem = document.querySelector(".editForm__participants");

    editForm__nameElem.value = data.name;
    editForm__priceElem.value = data.price;
    editForm__ageElem.value = data.min_age;
    editForm__heightElem.value = data.min_height;
    editForm__participantsElem.value = data.participants;
}


document.querySelector(".editForm__submit").addEventListener("click", async function (e) {
  e.preventDefault()
  // ta' fat i formen fra html'en
  const form = document.querySelector("#frmEditActivity")
  const acitivtyID = getActivityID();
  const urlEditActivity = "http://localhost:8080/activity/"+acitivtyID;

  try {
    const formData = new FormData(form);
    const plainFormData = Object.fromEntries(formData.entries());
    const jsonString = JSON.stringify(plainFormData);
    console.log(jsonString);
    const fetchOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: jsonString
    }
    const response = await fetch(urlEditActivity, fetchOptions);
    if (!response.ok) {
      console.log("det gik ikke godt");
    } else {
      console.log("det gik godt")
      //document.querySelector(".msg").innerHTML = "Udstyr er opdateret. Du vil blive ledt tilbage til den forrige side om 3 sek."
      /*
      setTimeout(function () {
        location.href = "../index.html";
      }, 3000)
      */
    }

  } catch (error) {
    alert(error.message);
    console.log(error);
  }
})